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
    { name: 'SKILLS', href: 'skills', id: 'skills' },
    { name: 'EXPERIENCE', href: 'experience', id: 'experience' },
    { name: 'CONTACT', href: 'contact', id: 'contact' },
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
        <Link href="/" className="flex items-center gap-2 group hover-glitch">
          <span className="text-lg font-bold text-[#00ff9d] font-mono relative">
            <span className="text-[#00ff9d] group-hover:text-cyber-green transition-colors duration-300">MUHAMMAD RAFAY</span>
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
              className="text-[#00ff9d] hover:text-white font-medium py-2 px-4 hover:bg-[#00ff9d]/10 rounded-lg transition-colors font-mono cursor-pointer"
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
