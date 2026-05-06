import React, { useState } from 'react';
import { Project } from '../types';
import { ExternalLink, Shield, Search, Code, Lock } from 'lucide-react';

const projectsData: Project[] = [
  {
    id: 1,
    title: "Active Directory Attack Simulation & Hardening",
    description: "Emulated post-exploitation techniques in a Windows AD lab using Atomic Red Team, PowerShell, and Mimikatz. Integrated Wazuh SIEM to alert on 20+ MITRE-mapped TTPs and performed CIS-based hardening, achieving 80% increase in compliance.",
    category: "security",
    tags: ["Active Directory", "Kali Linux", "Wazuh", "Mimikatz", "Atomic Red Team", "PowerShell", "CIS Benchmarks"],
    links: { github: "https://github.com/0xRafuSec/Active-Directory-Attack-Simulation-and-Hardening-Lab" }
  },
  {
    id: 2,
    title: "Multi-Sensor Intrusion Detection IoT",
    description: "Developed an IoT-based security solution using ESP32, motion/gas/fire sensors, and ESP32-CAM. Engineered a mobile application using Flutter and Firebase for real-time alerts, improving response time by 60%.",
    category: "development",
    tags: ["IoT", "ESP32", "ESP32-CAM", "Flutter", "Dart", "Firebase", "C++", "Arduino"],
    links: { github: "https://github.com/0xRafuSec/Multi-Sensor-Intrusion-Detection-IOT" }
  }
];

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'security' | 'forensics' | 'development'>('all');

  const filteredProjects = projectsData.filter(
    project => filter === 'all' || project.category === filter
  );

  const getIcon = (category: string) => {
    switch (category) {
      case 'security': return <Shield size={40} className="text-black dark:text-black" />;
      case 'forensics': return <Search size={40} className="text-black dark:text-black" />;
      case 'development': return <Code size={40} className="text-black dark:text-black" />;
      default: return <Lock size={40} className="text-black dark:text-black" />;
    }
  };

  return (
    <section id="projects" className="py-20 transition-colors duration-300 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white dark:text-white font-satoshi">
          Featured <span className="text-cyber-green-dark dark:text-cyber-green">Projects</span>
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['all', 'security', 'development'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all capitalize font-satoshi ${filter === cat
                ? 'bg-cyber-green-dark dark:bg-cyber-green text-white dark:text-black shadow-none dark:shadow-neon-green'
                : 'bg-white/50 dark:bg-[#00ff9d]/5 text-white dark:text-white hover:bg-white dark:hover:bg-[#00ff9d]/10 border border-white dark:border-[#00ff9d]/20'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group bg-white/80 dark:bg-[#00ff9d]/5 backdrop-blur-md border border-white dark:border-[#00ff9d]/20 rounded-xl overflow-hidden hover:border-cyber-green-dark dark:hover:border-cyber-green transition-all duration-300 hover:-translate-y-2 shadow-lg dark:shadow-none">
              <div className="h-48 bg-gradient-to-br from-cyber-green-dark to-cyber-green-dark dark:from-cyber-green dark:to-cyber-blue flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                <div className="transform group-hover:scale-110 transition-transform duration-300 bg-white/20 p-4 rounded-full backdrop-blur-sm">
                  {getIcon(project.category)}
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-cyber-green-dark dark:text-cyber-green group-hover:text-cyber-green-dark dark:group-hover:text-cyber-green transition-colors font-satoshi">{project.title}</h3>
                  <span className="text-xs font-satoshi py-1 px-2 rounded bg-white dark:bg-[#00ff9d]/10 text-cyber-green-dark dark:text-cyber-green capitalize border border-cyber-green-dark dark:border-cyber-green">{project.category}</span>
                </div>

                <p className="text-white dark:text-white text-sm mb-6 line-clamp-5 font-satoshi">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs text-white dark:text-white bg-white dark:bg-[#00ff9d]/10 px-2 py-1 rounded font-satoshi">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-4 border-t border-white dark:border-white/5">
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-cyber-green-dark dark:text-cyber-green hover:text-cyber-green-dark dark:hover:text-cyber-green transition-colors font-satoshi hover-glitch">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg> Code
                    </a>
                  )}
                  {project.links.demo && (
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-cyber-green-dark dark:text-cyber-green hover:text-green dark:hover:text-white transition-colors font-satoshi hover-glitch">
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;