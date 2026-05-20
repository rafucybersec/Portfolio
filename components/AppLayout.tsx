'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { isLowEndDevice, prefersReducedMotion } from '@/lib/performance'
import SplashScreen from './SplashScreen'

const Konami = dynamic(() => import('./Konami'), { ssr: false })
const BackToTop = dynamic(() => import('./BackToTop'))
const StarsCanvas = dynamic(() => import('./StarBackground'), { ssr: false })
const CyberDotCursor = dynamic(() => import('./CyberDotCursor'), { ssr: false })

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)
  const gsapCtxRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    if (!sessionStorage.getItem('hasSeenSplash')) {
      setLoading(true)
    }
  }, [])

  // Phase 1: Set initial hidden states BEFORE browser paints (prevents flash)
  useLayoutEffect(() => {
    if (loading || !mainRef.current) return
    if (prefersReducedMotion()) return

    const lowEnd = isLowEndDevice()
    const sections = mainRef.current.querySelectorAll('section')

    sections.forEach((section) => {
      if (section.id === 'projects') return

      const heading = section.querySelector('h2')
      if (heading) {
        gsap.set(heading, { y: 30, opacity: 0 })
      }

      const cards = section.querySelectorAll(
        '.grid > a, .grid > div, .space-y-12 > div, .space-y-24 > div'
      )
      if (cards.length > 0) {
        gsap.set(cards, { y: lowEnd ? 15 : 30, opacity: 0 })
      }
    })
  }, [loading])

  // Phase 2: Set up ScrollTrigger animations AFTER layout is stable
  useEffect(() => {
    if (loading || !mainRef.current) return
    if (prefersReducedMotion()) return

    const lowEnd = isLowEndDevice()
    let cancelled = false

    const timer = setTimeout(() => {
      if (cancelled || !mainRef.current) return

      const ctx = gsap.context(() => {
        const sections = mainRef.current!.querySelectorAll('section')

        sections.forEach((section) => {
          if (section.id === 'projects') return

          const heading = section.querySelector('h2')
          if (heading) {
            gsap.to(heading, {
              y: 0,
              opacity: 1,
              duration: lowEnd ? 0.4 : 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: heading,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            })
          }

          const cards = section.querySelectorAll(
            '.grid > a, .grid > div, .space-y-12 > div, .space-y-24 > div'
          )
          if (cards.length > 0) {
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              duration: lowEnd ? 0.3 : 0.5,
              stagger: lowEnd ? 0.05 : 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            })
          }
        })
      }, mainRef)

      gsapCtxRef.current = ctx
    }, 200)

    return () => {
      cancelled = true
      clearTimeout(timer)
      if (gsapCtxRef.current) {
        gsapCtxRef.current.revert()
        gsapCtxRef.current = null
      }
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [loading])

  // Content is always visible in the DOM for SEO crawlers.
  // The splash screen overlays on top (z-[100]) for visual users.
  const loadingClass = loading ? 'h-screen overflow-hidden' : ''

  return (
    <>
      {loading && <SplashScreen onComplete={() => {
        sessionStorage.setItem('hasSeenSplash', 'true')
        setLoading(false)
      }} />}

      {/* Hidden Hint for CTF Players */}
      {/* Hint: Try the Konami Code... (Up, Up, Down, Down, Left, Right, Left, Right, B, A) */}

      <div className={`min-h-screen relative font-satoshi selection:bg-cyber-green-dark dark:selection:bg-cyber-green selection:text-white dark:selection:text-black transition-colors duration-300 ${loadingClass}`}>
        <Konami />
        <CyberDotCursor />

        {/* Global Backgrounds */}
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#020a05] via-[#030a06] to-[#020a04]"></div>
        <div className="fixed inset-0 z-[0] bg-[radial-gradient(ellipse_at_top,_#00ff9d10_0%,_transparent_100%)] pointer-events-none"></div>
        <StarsCanvas />

        <div id="main-content" ref={mainRef} className="relative z-20">
          {children}
        </div>

        <BackToTop />
      </div>
    </>
  )
}
