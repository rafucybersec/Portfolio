import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Download, Terminal } from 'lucide-react';
import { gsap } from 'gsap';
import HeroSkillsCircle from './HeroSkillsCircle';

const Hero: React.FC = () => {
  const [descriptionDisplayed, setDescriptionDisplayed] = useState('');
  const [nameDisplayed, setNameDisplayed] = useState('');
  const [titleDisplayed, setTitleDisplayed] = useState('');

  // Refs for GSAP entrance
  const badgeRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  // Cool animated reveal for name (letter by letter with fade-in and scale)
  useEffect(() => {
    const fullName = "Muhammad Rafay Ali";
    setNameDisplayed('');
    let charIndex = 0;

    const nameInterval = setInterval(() => {
      if (charIndex < fullName.length) {
        setNameDisplayed(fullName.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(nameInterval);
      }
    }, 80);

    return () => clearInterval(nameInterval);
  }, []);

  // Typing animation for title (starts after name completes)
  useEffect(() => {
    const fullTitle = "CYBER SECURITY ENGINEER";
    const delay = 18 * 80 + 300;
    let titleInterval: ReturnType<typeof setInterval> | null = null;

    const timeoutId = setTimeout(() => {
      setTitleDisplayed('');
      let charIndex = 0;

      titleInterval = setInterval(() => {
        if (charIndex < fullTitle.length) {
          setTitleDisplayed(fullTitle.substring(0, charIndex + 1));
          charIndex++;
        } else {
          if (titleInterval) clearInterval(titleInterval);
        }
      }, 50);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (titleInterval) clearInterval(titleInterval);
    };
  }, []);

  // Typing animation for description (starts after title completes)
  useEffect(() => {
    const fullDescription = "Transforming logs into intelligence and vulnerabilities into fortifications through precision threat detection and automated incident response.";
    const delay = 18 * 80 + 23 * 50 + 400;
    let typingInterval: ReturnType<typeof setInterval> | null = null;

    const timeoutId = setTimeout(() => {
      setDescriptionDisplayed('');
      let charIndex = 0;

      typingInterval = setInterval(() => {
        if (charIndex < fullDescription.length) {
          setDescriptionDisplayed(fullDescription.substring(0, charIndex + 1));
          charIndex++;
        } else {
          if (typingInterval) clearInterval(typingInterval);
        }
      }, 15);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (typingInterval) clearInterval(typingInterval);
    };
  }, []);

  // GSAP entrance timeline
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    if (badgeRef.current) {
      tl.fromTo(badgeRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
    }
    if (nameRef.current) {
      tl.fromTo(nameRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.1");
    }
    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");
    }
    if (descRef.current) {
      tl.fromTo(descRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2");
    }
    if (buttonsRef.current) {
      tl.fromTo(buttonsRef.current.children, { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" }, "-=0.2");
    }
    if (socialsRef.current) {
      tl.fromTo(socialsRef.current.children, { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.3, ease: "power2.out" }, "-=0.1");
    }

    return () => { tl.kill(); };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-32 overflow-hidden" id="home">
      {/* Subtle radial gradient overlays for hero-specific depth */}
      <div className="absolute inset-0 z-[1] pointer-events-none" />
      <div className="absolute inset-0 z-[1] pointer-events-none" />

      {/* Main Hero Content */}
      <div className="w-full px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">

          {/* LEFT SIDE - Text Content */}
          <div className="flex-1 text-left max-w-2xl">
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-green-dark/30 dark:border-cyber-green/30 bg-cyber-green/5 text-cyber-green-dark dark:text-cyber-green text-sm font-satoshi mb-6 shadow-none dark:shadow-neon-green"
            >
              <span className="relative flex h-2.2 w-2.2">
                <span
                  className="absolute inline-flex h-full w-full rounded-full bg-cyber-green-dark dark:bg-cyber-green"
                  style={{ animation: 'badgePulse 1.8s ease-in-out infinite' }}
                ></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyber-green-dark dark:bg-cyber-green"></span>
              </span>
              Available For Hire
            </div>

            <h1 ref={nameRef} className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight text-white font-satoshi font-bold whitespace-nowrap">
              <span className="inline-block">
                {nameDisplayed.split('').map((char, index) => {
                  const isSpace = char === ' ';
                  const charKey = `${char}-${index}`;
                  const isGradientPart = index >= 9;
                  const animationDelay = index * 100;

                  return (
                    <span
                      key={charKey}
                      className={`inline-block ${isGradientPart && !isSpace
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyber-green-dark to-cyber-blue-dark dark:from-cyber-green dark:to-cyber-blue'
                        : ''
                        }`}
                      style={{
                        animation: `letterReveal 0.6s ease-out ${animationDelay}ms both`,
                        transformOrigin: 'center',
                      }}
                    >
                      {isSpace ? '\u00A0' : char}
                    </span>
                  );
                })}
                {nameDisplayed.length < 18 && (
                  <span className="inline-block w-1 h-8 md:h-12 bg-cyber-green-dark dark:bg-cyber-green animate-pulse ml-1" />
                )}
              </span>
            </h1>

            <div ref={subtitleRef} className="flex items-center justify-center lg:justify-start gap-2 mb-8">
              <Terminal className="text-cyber-green-dark dark:text-cyber-green w-5 h-5 md:w-8 md:h-8" />
              <h2 className="text-xl md:text-3xl text-gray-800 dark:text-gray-200 font-satoshi font-bold tracking-wider bg-black/5 dark:bg-black/30 px-4 py-1 rounded border-l-4 border-cyber-green-dark dark:border-cyber-green">
                <span className="inline-block">
                  {titleDisplayed.split('').map((char, index) => {
                    const isSpace = char === ' ';
                    const charKey = `title-${char}-${index}`;
                    const isGradientPart = index >= 6;

                    return (
                      <span
                        key={charKey}
                        className={`inline-block ${isGradientPart && !isSpace
                          ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyber-green-dark to-cyber-blue-dark dark:from-cyber-green dark:to-cyber-blue'
                          : ''
                          }`}
                      >
                        {isSpace ? '\u00A0' : char}
                      </span>
                    );
                  })}
                  {titleDisplayed.length < 23 && (
                    <span className="inline-block w-1 h-6 md:h-8 bg-cyber-green-dark dark:bg-cyber-green animate-pulse ml-1" />
                  )}
                </span>
              </h2>
            </div>

            <p ref={descRef} className="text-gray-600 dark:text-cyber-green/80 mb-10 leading-relaxed font-satoshi text-xl md:text-base border-t border-b border-gray-200 dark:border-[#00ff9d]/20 py-4 bg-[#00ff9d]/5 dark:bg-[#00ff9d]/5 backdrop-blur-sm">
              <span className="text-cyber-blue-dark dark:text-cyber-blue">&gt;&gt;</span>{' '}
              <span className="inline">
                {descriptionDisplayed}
                {descriptionDisplayed.length < 175 && (
                  <span className="inline-block w-2 h-4 bg-cyber-green-dark dark:bg-cyber-green animate-pulse ml-1" />
                )}
              </span>
            </p>

            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8">
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                aria-label="Navigate to contact section"
                className="group relative px-5 py-2.5 bg-cyber-green-dark dark:bg-cyber-green text-white dark:text-black font-bold font-satoshi text-sm rounded-sm overflow-hidden hover:shadow-[0_0_20px_rgba(0,163,101,0.5)] dark:hover:shadow-[0_0_20px_#00ff9d] transition-all duration-300 flex items-center gap-2 skew-x-[-10deg] hover:scale-105 cursor-pointer whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-cyber-green-dark dark:focus:ring-cyber-green focus:ring-offset-2"
              >
                <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shimmer skew-x-[10deg]"></div>
                <span className="skew-x-[10deg] flex items-center gap-2 relative z-10">
                  Initiate Contact
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              <a
                href="/projects"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('projects');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                aria-label="Navigate to projects section"
                className="group relative px-5 py-2.5 border border-cyber-green-dark dark:border-cyber-green text-cyber-green-dark dark:text-cyber-green font-bold font-satoshi text-sm rounded-sm overflow-hidden hover:bg-cyber-green-dark/5 dark:hover:bg-cyber-green/10 transition-all duration-300 flex items-center gap-2 skew-x-[-10deg] hover:shadow-[0_0_10px_rgba(0,163,101,0.3)] dark:hover:shadow-[0_0_10px_#00ff9d] hover:scale-105 cursor-pointer whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-cyber-green-dark dark:focus:ring-cyber-green focus:ring-offset-2"
              >
                <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-cyber-green-dark/10 dark:via-cyber-green/20 to-transparent group-hover:animate-shimmer skew-x-[10deg]"></div>
                <span className="skew-x-[10deg] relative z-10">View Projects</span>
              </a>

              <a
                href="https://rafucybersec.vercel.app/resume"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download resume PDF (opens in new tab)"
                className="group relative px-5 py-2.5 border border-cyber-blue-dark dark:border-cyber-blue text-cyber-blue-dark dark:text-cyber-blue font-bold font-satoshi text-sm rounded-sm overflow-hidden hover:bg-cyber-blue-dark/5 dark:hover:bg-cyber-blue/10 transition-all duration-300 flex items-center gap-2 skew-x-[-10deg] hover:shadow-[0_0_10px_rgba(0,150,170,0.3)] dark:hover:shadow-[0_0_10px_#00e1ff] hover:scale-105 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-cyber-blue-dark dark:focus:ring-cyber-blue focus:ring-offset-2"
              >
                <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-cyber-blue-dark/10 dark:via-cyber-blue/20 to-transparent group-hover:animate-shimmer skew-x-[10deg]"></div>
                <span className="skew-x-[10deg] flex items-center gap-2 relative z-10">
                  <Download size={18} />
                  Download CV
                </span>
              </a>
            </div>

            {/* ── Social Icons ── */}
            <div ref={socialsRef} className="flex justify-center lg:justify-start gap-6">

              {/* GitHub — fill-based SVG, color via CSS filter */}
              <a
                href="https://github.com/0xRafuSec"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit GitHub profile (opens in new tab)"
                className="group transition-all duration-300 hover:scale-125 hover:rotate-[360deg] focus:outline-none focus:ring-2 focus:ring-[#00D080] rounded"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  aria-hidden="true"
                  className="opacity-70 group-hover:opacity-100 transition-all duration-300 hover:scale-[1.2] hover:rotate-[360deg]"
                  style={{ fill: '#00D080', filter: 'none' }}
                  onMouseEnter={e => {
                    (e.currentTarget as SVGElement).style.filter = 'drop-shadow(0 0 5px #00D080)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as SVGElement).style.filter = 'none';
                  }}
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>

              {/* LinkedIn — stroke-based SVG, color via currentColor on the SVG element */}
              <a
                href="https://linkedin.com/in/muhammadrafayali/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit LinkedIn profile (opens in new tab)"
                className="group transition-all duration-300 hover:scale-125 hover:rotate-[360deg] focus:outline-none focus:ring-2 focus:ring-[#0A66C2] rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00D080"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="opacity-70 group-hover:opacity-100 transition-all duration-300 hover:scale-[1.2] hover:rotate-[360deg]"
                  onMouseEnter={e => {
                    (e.currentTarget as SVGElement).style.filter = 'drop-shadow(0 0 5px #00D080)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as SVGElement).style.filter = 'none';
                  }}
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              {/* Instagram — stroke-based SVG, color via explicit stroke */}
              <a
                href="https://instagram.com/rafucybersec/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Instagram profile (opens in new tab)"
                className="group transition-all duration-300 hover:scale-125 hover:rotate-[360deg] focus:outline-none focus:ring-2 focus:ring-[#E1306C] rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00D080"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="opacity-70 group-hover:opacity-100 transition-all duration-300 hover:scale-[1.2] hover:rotate-[360deg]"
                  onMouseEnter={e => {
                    (e.currentTarget as SVGElement).style.filter = 'drop-shadow(0 0 5px #00D080)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as SVGElement).style.filter = 'none';
                  }}
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

            </div>
            {/* ── End Social Icons ── */}

          </div>
          {/* END LEFT SIDE */}

          {/* RIGHT SIDE - Skills Circle (Desktop Only) */}
          <div className="hidden lg:flex flex-2 items-center justify-end lg:pr-8 xl:pr-1">
            <HeroSkillsCircle />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
