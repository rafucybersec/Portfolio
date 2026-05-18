import React from 'react';
import { TrendingUp, ShieldCheck, Zap, Target, Clock, FileSearch } from 'lucide-react';

const insights = [
  {
    icon: ShieldCheck,
    value: "45%",
    label: "False Positive Reduction",
    detail: "Systematic rule tuning across SIEM platforms",
  },
  {
    icon: Target,
    value: "35%",
    label: "Threat Coverage Gained",
    detail: "Closed unmonitored attack surfaces with custom rules",
  },
  {
    icon: Zap,
    value: "30+",
    label: "Custom Detection Rules",
    detail: "Built for Wazuh, ThreatHawk, and QRadar",
  },
  {
    icon: Clock,
    value: "<10 min",
    label: "Incident MTTR",
    detail: "Down from 30+ min with structured playbooks",
  },
  {
    icon: FileSearch,
    value: "60%",
    label: "Faster Compliance Mapping",
    detail: "Automated ISO 27001 to NCA/SAMA/ADHICS correlation",
  },
  {
    icon: TrendingUp,
    value: "200+",
    label: "Daily Events Triaged",
    detail: "Real-time monitoring across enterprise environments",
  },
];

const Insights: React.FC = () => {
  return (
    <section id="insights" className="py-16 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white font-satoshi">
          Impact <span className="text-cyber-green">Insights</span>
        </h2>
        <p className="text-center text-white text-sm font-satoshi mb-12">
          Numbers from real SOC deployments and security engineering work
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {insights.map((item, index) => (
            <div
              key={index}
              className="group relative text-center p-5 rounded-xl border border-[#00ff9d]/15 bg-[#00ff9d]/5 hover:border-[#00ff9d]/40 hover:bg-[#00ff9d]/10 transition-all duration-300"
            >
              <div className="flex justify-center mb-3">
                <item.icon
                  size={22}
                  className="text-cyber-green opacity-60 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-cyber-green font-satoshi mb-1">
                {item.value}
              </div>
              <div className="text-xs font-bold text-white uppercase tracking-wide font-satoshi mb-2">
                {item.label}
              </div>
              <div className="text-[11px] text-white/90 font-satoshi leading-tight">
                {item.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insights;
