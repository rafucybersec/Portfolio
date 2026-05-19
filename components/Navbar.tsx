'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';

const SECTIONS = [
  { id: 'hero',           label: 'hero' },
  { id: 'about',          label: 'about' },
  { id: 'skills',         label: 'skills' },
  { id: 'experience',     label: 'experience' },
  { id: 'certifications', label: 'certifications' },
  { id: 'projects',       label: 'projects' },
  { id: 'terminal',       label: 'terminal' },
  { id: 'contact',        label: 'contact' },
];

const NAV_LINKS = [
  { name: 'EXPERIENCE', id: 'experience' },
  { name: 'SKILLS',     id: 'skills' },
  { name: 'CONTACT',    id: 'contact' },
];

const NavbarBreadcrumb: React.FC = () => {
  const [isOpen, setIsOpen]                   = useState(false);
  const [scrolled, setScrolled]               = useState(false);
  const [scrollProgress, setScrollProgress]   = useState(0);
  const [activeSection, setActiveSection]     = useState('hero');
  const [prevSection, setPrevSection]         = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHoveringBar, setIsHoveringBar]     = useState(false);

  // ─── scroll progress + active section ──────────────────────────────────────
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress  = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;

    setScrolled(scrollTop > 50);
    setScrollProgress(progress);

    // Replace the entire detection loop with this:
    let current = 'hero';

    // First pass: find section that CONTAINS the midpoint
    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (!el) continue;
      const { top, bottom } = el.getBoundingClientRect();
      const mid = window.innerHeight / 2;
      if (top <= mid && bottom >= mid) {
        current = section.id;
        break;
      }
    }

    // Fallback: last section whose top crossed 30% of screen
    if (current === 'hero') {
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.3) {
          current = section.id;
        }
      }
    }

    setActiveSection((prev) => {
      if (prev !== current) {
        setPrevSection(prev);
        setIsTransitioning(true);
        setTimeout(() => setIsTransitioning(false), 300);
      }
      return current;
    });
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsOpen(false);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsOpen(false);
  };

  const sectionLabel = SECTIONS.find((s) => s.id === activeSection)?.label ?? activeSection;
  const prevLabel    = SECTIONS.find((s) => s.id === prevSection)?.label  ?? prevSection;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#03001417] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      {/* ── Main bar ──────────────────────────────────────────────────────── */}
      <div className="w-full px-6 md:px-12 py-2 flex justify-between items-center">

        {/* LEFT — breadcrumb */}
        <div className="flex items-center font-mono text-sm select-none">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-[#00ff9d]/85 font-bold tracking-[0.16em] hover:text-cyber-green hover-glitch transition-colors duration-200 text-lg"
          >
            RAFAY.
          </button>

          <span className="text-[#00ff9d]/80 mx-2">/</span>

          <span className="relative overflow-hidden h-[18px] flex items-center min-w-[72px]">
            {isTransitioning && prevLabel && (
              <span
                className="absolute text-[#00ff9d]/50 text-[11px] tracking-widest uppercase"
                style={{ animation: 'breadcrumb-out 0.3s ease forwards' }}
              >
                {prevLabel}
              </span>
            )}
            <span
              className="text-[#00ff9d] text-[11px] tracking-widest uppercase"
              style={{ animation: isTransitioning ? 'breadcrumb-in 0.3s ease forwards' : 'none' }}
            >
              {sectionLabel}
            </span>
          </span>
        </div>

        {/* CENTER — desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollTo(e, link.id)}
                aria-label={`Navigate to ${link.name} section`}
                className={`group relative px-4 py-1.5 text-[11px] font-bold font-mono tracking-[0.16em] cursor-pointer transition-all duration-200 overflow-hidden hover-glitch ${
                  isActive ? 'text-[#00ff9d]' : 'text-[#00ff9d]/80 hover:text-[#00ff9d]'
                }`}
                style={{ textShadow: isActive ? '0 0 10px #00ff9dbb' : 'none' }}
              >

                {/* label */}
                <span className="relative flex items-center gap-1.5">
                  {link.name}
                  {isActive && <span className="animate-pulse text-[#00ff9d]">_</span>}
                </span>

                {/* underline — active only */}
                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-[#00ff9d] transition-all duration-300 ${
                  isActive ? 'opacity-100 shadow-[0_0_8px_#00ff9d]' : 'opacity-0'
                }`} />
              </a>
            );
          })}
        </div>

        {/* RIGHT — mobile toggle */}
        <button
          className="md:hidden text-white hover:text-[#00ff9d] transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── Progress bar (no visible track line — only the filled bar) ────── */}
      <div
        className="w-full h-[2px] relative cursor-default"
        onMouseEnter={() => setIsHoveringBar(true)}
        onMouseLeave={() => setIsHoveringBar(false)}
      >
        {/* filled track */}
        <div className="absolute inset-0 overflow-hidden"></div>
        <div
          className="absolute left-0 top-0 h-full bg-[#00ff9d] transition-all duration-150 ease-out"
          style={{
            width: `${scrollProgress}%`,
            boxShadow: '0 0 8px #00ff9d, 0 0 20px #00ff9d55',
          }}
        />
        {/* glowing tip */}
        {scrollProgress > 0 && scrollProgress < 100 && (
          <div
            className="absolute top-0 h-full w-4 bg-[#00ff9d]"
            style={{
              left: `calc(${scrollProgress}% - 8px)`,
              filter: 'blur(4px)',
              opacity: 0.8,
            }}
          />
        )}
        {/* percentage tooltip — only on hover */}
        {isHoveringBar && scrollProgress > 0 && (
          <div
            className="absolute -bottom-2.5 font-mono text-[10px] text-[#00ff9d] px-1.5 py-0.5 rounded pointer-events-none transition-opacity duration-150"
            style={{
              left: `clamp(12px, calc(${scrollProgress}% - 14px), calc(100% - 36px))`,
              textShadow: '0 0 6px #00ff9d',
            }}
          >
            {scrollProgress}%
          </div>
        )}
      </div>

      {/* ── Mobile menu ───────────────────────────────────────────────────── */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#030014]/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2.5 pb-1 font-mono text-[10px] text-[#00ff9d]/40 tracking-widest uppercase border-b border-white/5">
          RAFAY. / {sectionLabel} — {scrollProgress}%
        </div>
        <div className="flex flex-col p-3 gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollTo(e, link.id)}
              className={`font-medium py-1.5 px-3 rounded transition-all font-mono cursor-pointer flex items-center gap-2 text-sm ${
                activeSection === link.id
                  ? 'text-[#00ff9d] bg-[#00ff9d]/10'
                  : 'text-[#00ff9d]/70 hover:text-[#00ff9d] hover:bg-[#00ff9d]/5'
              }`}
              style={{
                textShadow: activeSection === link.id ? '0 0 8px #00ff9d' : '0 0 5px #00ff9d44',
              }}
            >
              {activeSection === link.id && <span className="font-bold">&gt;</span>}
              {link.name}
            </a>
          ))}
        </div>
      </div>

      {/* ── Keyframes ─────────────────────────────────────────────────────── */}
      <style jsx>{`
        @keyframes breadcrumb-out {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-8px); }
        }
        @keyframes breadcrumb-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
};

export default NavbarBreadcrumb;