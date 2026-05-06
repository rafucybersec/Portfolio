import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 50;
        setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Force dark mode always
    document.documentElement.classList.add('dark');

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Skills', href: 'skills', id: 'skills' },
    { name: 'Experience', href: 'experience', id: 'experience' },
    { name: 'Projects', href: 'projects', id: 'projects' },
    { name: 'Contact', href: 'contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled
      ? 'bg-[#03001417] backdrop-blur-md shadow-lg shadow-[#00ff9d]/5'
      : 'bg-transparent py-4'
      }`}>
      <div className="w-full px-6 md:px-12 flex justify-between items-center">
        {/* Logo - Left */}
        <Link href="/" className="flex items-center gap-3 group hover-glitch">
          <div className="relative">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              className="text-[#00ff9d] group-hover:text-[#00ff9d] transition-all duration-300 group-hover:scale-105"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6 L10 9.5 L10 18 C10 23.5 18 28 18 28 C18 28 26 23.5 26 18 L26 9.5 Z"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 18 L18 21 L21 18"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x="18"
                y="15"
                fontSize="7"
                fill="currentColor"
                textAnchor="middle"
                className="font-mono font-bold"
                opacity="0.8"
              >
                0x
              </text>
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-mono relative">
            <span className="text-[#00ff9d] group-hover:text-[#00ff9d] transition-colors duration-300">0xRafuSec</span>
          </span>
        </Link>

        {/* Desktop Menu - Center with transparent floating buttons */}
        <div className="hidden md:flex items-center">
          <div className="flex items-center gap-4 px-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                aria-label={`Navigate to ${link.name} section`}
                className="group relative px-4 py-2 text-sm font-medium text-[#00ff9d]/80 hover:text-[#00ff9d] font-mono tracking-wide cursor-pointer transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <span className="text-[#00ff9d] opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2 -translate-x-2 group-hover:translate-x-0 font-bold">&gt;</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">{link.name}</span>
                  <span className="text-[#00ff9d] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-1 animate-pulse font-bold">_</span>
                </span>
                
                {/* Background scanning highlight */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff9d]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                
                {/* Glowing Underline */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00ff9d] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left shadow-[0_0_10px_#00ff9d]"></div>
              </a>
            ))}
          </div>
        </div>

        {/* Social Icons - Right (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-4">
          <a href="https://github.com/0xRafuSec" target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub profile" className="text-[#00ff9d] hover-glitch">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
              <path d="M9 18c-4.51 2-5-2-7-2"/>
            </svg>
          </a>
          <a href="https://linkedin.com/in/muhammadrafayali/" target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn profile" className="text-[#00ff9d] hover-glitch">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect width="4" height="12" x="2" y="9"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white hover:text-[#00ff9d]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-[#030014]/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col p-4 gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.id)}
              className="text-[#00ff9d] hover:text-[#00a3ff] font-medium py-2 px-4 hover:bg-white/5 rounded-lg transition-colors font-mono cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
