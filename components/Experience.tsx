import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { TimelineItem } from '../types';

const experienceData: TimelineItem[] = [
  {
    id: 1,
    title: "Cyber Security Engineer",
    company: "Encbit",
    date: "Jul 2025 - Present",
    location: "Lahore | Hybrid",
    points: [
      "Managed Wazuh SIEM deployments across 5+ client environments, authoring 15+ custom detection rules and decoders that improved log ingestion accuracy by 30% across 50+ monitored assets.",
      "Conducted OSINT-driven attack surface analysis using Google Dorking, WHOIS, and Shodan identifying and coordinating remediation for 10+ exposed assets while triaging 200+ daily security events.",
      "Maintained continuous offensive/defensive research through TryHackMe labs and MITRE ATT&CK-grounded techniques, directly informing real-world detection engineering decisions."
    ]
  },
  {
    id: 2,
    title: "Cyber Security Analyst",
    company: "Cyber Silo",
    date: "Feb 2025 - Jul 2025",
    location: "Islamabad | Hybrid",
    points: [
      "Engineered custom SIEM detection rules and log parsers on Wazuh and Threat Hawk, increasing detection fidelity by 40% while resolving agent misconfigurations to restore 99% log integrity.",
      "Automated compliance mapping workflows by correlating ISO 27001, NCA-ECC, and SAMA controls via Python scripting, cutting manual alignment effort by 60% and building CIS hardening templates for FortiGate, Cisco, and pfSense firewalls.",
      "Validated threat detection coverage by simulating 20+ MITRE ATT&CK scenarios via Atomic Red Team, verifying rule accuracy and identifying critical coverage gaps across monitored infrastructure."
    ]
  },
  {
    id: 3,
    title: "SOC Analyst",
    company: "Cyber Silo (Client: Allama Iqbal Open University)",
    date: "Feb 2024 - Feb 2025",
    location: "Islamabad | Hybrid",
    points: [
      "Spearheaded SIEM deployment across 30+ servers and endpoints, managing Wazuh EDR with MITRE ATT&CK-mapped rules to close 35% of previously unmonitored attack surfaces.",
      "Reduced false positives by 45% through systematic rule optimization and threat intelligence alignment, while performing real-time IOC analysis, log correlation, and root cause analysis across all telemetry sources.",
      "Designed incident response playbooks for containment, remediation, and escalation workflows cutting MTTR from 30+ minutes to under 10 minutes across the monitored environment."
    ]
  }
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white dark:text-white font-satoshi">
          Work <span className="text-cyber-green-dark dark:text-cyber-green">Experience</span>
        </h2>

        <div className="max-w-4xl mx-auto relative pl-8 md:pl-0">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-green-dark dark:from-cyber-green to-transparent transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {experienceData.map((item, index) => (
              <div key={item.id} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                {/* Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-white dark:bg-black border-4 border-cyber-green-dark dark:border-cyber-green rounded-full transform -translate-x-[7px] md:-translate-x-1/2 mt-6 z-10 shadow-none dark:shadow-[0_0_10px_#00ff9d]"></div>

                {/* Content Side */}
                <div className="flex-1 ml-8 md:ml-0">
                  <div
                    className="block bg-transparent backdrop-blur-sm p-6 rounded-xl border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:border-cyber-green hover:shadow-[0_0_20px_rgba(0,255,136,0.15)] group relative"
                  >
                    <div className="flex flex-col gap-2 mb-4">
                      <h3 className="text-xl font-bold text-cyber-green-dark dark:text-cyber-green group-hover:text-cyber-green-dark dark:group-hover:text-cyber-green transition-colors font-satoshi">{item.title}</h3>
                      <h4 className="text-lg text-white dark:text-white font-medium flex items-center gap-2 font-satoshi">
                        <Briefcase size={16} className="text-cyber-green-dark dark:text-cyber-green" />
                        {item.company}
                      </h4>
                      <div className="flex flex-wrap gap-4 text-sm text-white dark:text-white font-satoshi">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} /> {item.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} /> {item.location}
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-4">
                      {item.points.map((point, i) => (
                        <li key={i} className="text-white dark:text-white text-[13px] flex items-start gap-3 font-satoshi leading-[1.7] pl-3 border-l-2 border-cyber-green-dark/20 dark:border-cyber-green/15 hover:border-cyber-green-dark dark:hover:border-cyber-green transition-colors duration-300">
                          <span className="text-cyber-green-dark dark:text-cyber-green mt-[7px] w-1.5 h-1.5 bg-cyber-green-dark dark:bg-cyber-green rounded-full flex-shrink-0 group-hover:bg-cyber-green-dark dark:group-hover:bg-cyber-green transition-colors"></span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Empty Side for Layout Balance */}
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;