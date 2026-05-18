'use client';

import React, { useRef, useEffect } from 'react';
import { Project } from '../types';
import { ExternalLink, Shield, Search, Code, Lock, Construction } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import '@/lib/gsap'; // registers ScrollTrigger

const projectsData: Project[] = [
  {
    id: 1,
    title: "Active Directory Attack Simulation & Hardening",
    description: "Emulated post-exploitation techniques in a Windows AD lab using Atomic Red Team, Mimikatz, and PowerShell. Integrated Wazuh SIEM to detect 20+ MITRE-mapped TTPs and performed CIS-based hardening, achieving 80% compliance improvement.",
    category: "security",
    tags: ["Active Directory", "Kali Linux", "Wazuh", "Mimikatz", "Atomic Red Team", "PowerShell", "CIS Benchmarks"],
    links: { github: "https://github.com/rafucybersec/Active-Directory-Attack-Simulation-and-Hardening-Lab" }
  },
  {
    id: 2,
    title: "ThreatHawk SIEM Deployment & Custom Detection Engineering",
    description: "Deployed ThreatHawk and Wazuh SIEM across multi-vendor enterprise environments. Built 30+ custom detection rules and log parsers for Huawei routers, WatchGuard firewalls, TrendMicro EDR, CrowdStrike, and spyware/grayware events. Reduced false positives by 45% through systematic rule tuning.",
    category: "security",
    tags: ["ThreatHawk", "Wazuh", "Huawei", "WatchGuard", "TrendMicro EDR", "CrowdStrike", "Log Parsing", "Detection Engineering"],
    links: {}
  },
  {
    id: 3,
    title: "GCC Compliance Mapping Automation",
    description: "Built a compliance mapping framework with Python scripts that cross-reference ISO 27001 controls against NCA ECC, SAMA CSF, ADHICS, PDPL, UAE IA, and Bahrain NCSC. Scripts auto-detect existing ISO controls in rules and append matched regional framework controls from a master spreadsheet, cutting manual mapping effort by 60%.",
    category: "security",
    tags: ["ISO 27001", "NCA ECC", "SAMA CSF", "ADHICS", "PDPL", "NIST", "GDPR", "Python", "Compliance Automation"],
    links: {}
  },
  {
    id: 4,
    title: "NoxShield SIEM",
    description: "Full-featured security operations dashboard with live Wazuh API integration, geolocation attack maps, MITRE ATT&CK visualization, and compliance tracking (PCI-DSS, HIPAA, NIST). Backed by SQLite with auto-refreshing data pipelines.",
    category: "security",
    tags: ["Next.js", "TypeScript", "Wazuh API", "Recharts", "SQLite", "Zustand", "MITRE ATT&CK"],
    links: { github: "https://github.com/rafucybersec/NoxShield" }
  },
  {
    id: 5,
    title: "Rafu Portfolio",
    description: "A cybersecurity-themed portfolio featuring GSAP animations, 3D skills globe, interactive hacking terminal, and custom target cursor. Built with Next.js and deployed on Vercel with optimized OG previews.",
    category: "development",
    tags: ["Next.js", "TypeScript", "GSAP", "Tailwind CSS", "Three.js", "Vercel"],
    links: { github: "https://github.com/rafucybersec/rafu-portfolio", demo: "https://rafucybersec.vercel.app" }
  },
  {
    id: 6,
    title: "Multi-Sensor Intrusion Detection IoT",
    description: "IoT security solution using ESP32, motion/gas/fire sensors, and ESP32-CAM. Engineered a Flutter + Firebase mobile app for real-time alerts, improving response time by 60%.",
    category: "development",
    tags: ["IoT", "ESP32", "ESP32-CAM", "Flutter", "Dart", "Firebase", "C++"],
    links: { github: "https://github.com/rafucybersec/Multi-Sensor-Intrusion-Detection-IOT" }
  }
];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const getIcon = (category: string) => {
    switch (category) {
      case 'security': return <Shield size={40} className="text-black dark:text-black" />;
      case 'forensics': return <Search size={40} className="text-black dark:text-black" />;
      case 'development': return <Code size={40} className="text-black dark:text-black" />;
      default: return <Lock size={40} className="text-black dark:text-black" />;
    }
  };

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;

    // Wait for layout to settle
    const timer = setTimeout(() => {
      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth;
      };

      const ctx = gsap.context(() => {
        gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${getScrollAmount()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }, sectionRef);

      // Store ctx for cleanup
      (sectionRef.current as any).__gsapCtx = ctx;
    }, 300);

    return () => {
      clearTimeout(timer);
      const ctx = (sectionRef.current as any)?.__gsapCtx;
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden scroll-mt-20">
      {/* Header */}
      <div className="pt-20 pb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white dark:text-white font-satoshi">
          Featured <span className="text-cyber-green-dark dark:text-cyber-green">Projects</span>
        </h2>
        <p className="text-center text-white text-sm font-satoshi mt-3">Scroll to explore</p>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex gap-8 px-8 md:px-16 pb-20 will-change-transform"
        style={{ width: 'auto', height: 'auto' }}
      >
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="project-card group bg-[#00ff9d]/5 backdrop-blur-md border border-[#00ff9d]/20 rounded-xl overflow-hidden hover:border-cyber-green transition-all duration-300 hover:-translate-y-2 flex-shrink-0 w-[340px] md:w-[420px]"
          >
            <div className="h-44 bg-gradient-to-br from-cyber-green-dark to-cyber-green-dark dark:from-cyber-green dark:to-cyber-blue flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              <div className="transform group-hover:scale-110 transition-transform duration-300 bg-white/20 p-4 rounded-full backdrop-blur-sm">
                {getIcon(project.category)}
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-cyber-green group-hover:text-cyber-green transition-colors font-satoshi leading-tight">{project.title}</h3>
                <span className="text-xs font-satoshi py-1 px-2 rounded bg-[#00ff9d]/10 text-cyber-green capitalize border border-cyber-green flex-shrink-0 ml-2">{project.category}</span>
              </div>

              <p className="text-white text-sm mb-5 line-clamp-4 font-satoshi">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tags.slice(0, 5).map((tag, i) => (
                  <span key={i} className="text-xs text-white bg-[#00ff9d]/10 px-2 py-0.5 rounded font-satoshi">
                    #{tag}
                  </span>
                ))}
                {project.tags.length > 5 && (
                  <span className="text-xs text-white/50 px-1 py-0.5 font-satoshi">
                    +{project.tags.length - 5}
                  </span>
                )}
              </div>

              <div className="flex gap-4 pt-4 border-t border-white/5">
                {project.links.github ? (
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-cyber-green hover:text-white transition-colors font-satoshi hover-glitch">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg> Code
                  </a>
                ) : (
                  <span className="flex items-center gap-2 text-sm font-medium text-cyber-green font-satoshi">
                    <Construction size={16} /> Work in Progress
                  </span>
                )}
                {project.links.demo && (
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-cyber-green hover:text-white transition-colors font-satoshi hover-glitch">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;