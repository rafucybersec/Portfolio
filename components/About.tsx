import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Activity, Database, Eye } from 'lucide-react';
const OutlookIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <Image
    src="/icons/outlook.png"
    alt="Outlook"
    width={size}
    height={size}
    className={className}
  />
);

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 scroll-mt-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-cyber-green-dark dark:text-cyber-green font-satoshi tracking-widest text-sm uppercase mb-2">Introduction</p>
            <h2 className="text-4xl md:text-5xl font-satoshi font-bold text-white dark:text-white">
              Over<span className="text-cyber-green-dark dark:text-cyber-green">view</span>
            </h2>
          </div>

          <div className="bg-transparent backdrop-blur-sm border border-cyber-green-dark rounded-2xl p-8 md:p-12 shadow-none relative overflow-hidden transition-all hover:border-cyber-green/50">
            {/* Decor */}
            <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 pointer-events-none">
              <ShieldCheck size={180} />
            </div>

            <p className="text-lg text-white dark:text-white leading-relaxed mb-6 relative z-10 font-light font-body">
              Hello! I'm <span className="text-cyber-green-dark dark:text-cyber-green text-l md:text-l font-satoshi font-bold">Muhammad Rafay Ali</span>, a <span className="text-cyber-green-dark dark:text-cyber-green text-l md:text-l font-bold">Cyber Security Engineer</span> with 2+ years of hands-on experience in SOC operations, SIEM engineering, threat detection, incident response, and security hardening. Deployed and tuned security platforms across multi-server enterprise environments, cutting undetected threat windows by 35% and false positive rates by 45%.
            </p>

            <p className="text-lg text-white dark:text-white leading-relaxed mb-6 relative z-10 font-light font-body">
              I specialize in <Activity size={18} className="inline mb-1 text-cyber-blue-dark dark:text-cyber-blue mx-1" /> <span className="text-cyber-green-dark dark:text-cyber-green text-l md:text-l font-bold">SOC Operations</span>, <Database size={18} className="inline mb-1 text-purple-600 dark:text-purple-400 mx-1" /> <span className="text-cyber-green-dark dark:text-cyber-green text-l md:text-l font-bold">SIEM Engineering</span>, and <Eye size={18} className="inline mb-1 text-red-600 dark:text-red-400 mx-1" /> <span className="text-cyber-green-dark dark:text-cyber-green text-l md:text-l font-bold">Threat Detection & Response</span>, with expertise in ISO 27001, NCA-ECC, CIS Benchmarks, and MITRE ATT&CK frameworks.
            </p>

            <p className="text-lg text-white dark:text-white leading-relaxed mb-6 relative z-10 font-light font-body">
              Actively sharpening offensive and defensive skills through <span className="text-cyber-green-dark dark:text-cyber-green text-l md:text-l font-bold">TryHackMe</span> and continuous lab-based research, translating attack techniques into practical detection and response strategies. Certified in <span className="text-cyber-green-dark dark:text-cyber-green text-l md:text-l font-bold">ISO/IEC 27001 Lead Auditor, ISC2 CC, SOC Foundations, and Google Cybersecurity Professional</span> programs. Seeking to deliver managed security excellence in SOC/MSSP environments.
            </p>

            <div className="bg-cyber-green/5 border-l-2 border-cyber-green-dark dark:border-cyber-green p-4 mt-8 mb-6 relative z-10">
              <p className="text-cyber-green-dark dark:text-cyber-green text-medium md:text-medium font-satoshi font-bold">
                "Let's collaborate to bring your secure infrastructure to life!"
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-start border-t border-cyber-green-dark dark:border-cyber-green pt-8">
              {/* Email Button */}
              <a href="mailto:muhammad.rafayali@outlook.com" aria-label="Send email to muhammad.rafayali@outlook.com" className="flex items-center gap-2 group bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 rounded-full pl-2 pr-4 py-1.5 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all w-10 hover:w-auto overflow-hidden whitespace-nowrap">
                <div className="min-w-[24px] flex justify-center text-[#0078D4]">
                  <OutlookIcon size={20} />
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-satoshi text-[#0078D4]">muhammad.rafayali@outlook.com</span>
              </a>

              {/* GitHub Button */}
              <a href="https://github.com/rafucybersec" target="_blank" aria-label="Visit GitHub profile" className="flex items-center gap-2 group bg-white dark:bg-white/5 border border-white dark:border-white/10 rounded-full pl-2 pr-4 py-1.5 hover:bg-white dark:hover:bg-white/10 transition-all w-10 hover:w-auto overflow-hidden whitespace-nowrap">
                <div className="min-w-[24px] flex justify-center text-white dark:text-white">
                  <img src="/icons/github_ico.svg" alt="GitHub" width={20} height={20} style={{ filter: 'brightness(0) invert(1)' }} />
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-satoshi text-white dark:text-white">rafucybersec</span>
              </a>

              {/* LinkedIn Button */}
              <a href="https://www.linkedin.com/in/muhammadrafayali/" target="_blank" aria-label="Visit LinkedIn profile" className="flex items-center gap-2 group bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/40 rounded-full pl-2 pr-4 py-1.5 hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-all w-10 hover:w-auto overflow-hidden whitespace-nowrap">
                <div className="min-w-[24px] flex justify-center text-blue-600 dark:text-blue-400">
                  <img src="/icons/linkedin.svg" alt="LinkedIn" width={20} height={20} style={{ filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(190deg) brightness(0.9)' }} />
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-satoshi text-blue-600 dark:text-blue-400">Muhammad Rafay Ali</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
