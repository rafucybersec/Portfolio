import React from 'react';
import Image from 'next/image';
import { Calendar, MapPin, BookOpen, Code, Award, Trophy, Users } from 'lucide-react';

const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 transition-colors duration-300 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white dark:text-white font-satoshi">
          Academic <span className="text-cyber-green-dark dark:text-cyber-green">Background</span>
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="bg-[#00ff9d]/5 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-[#00ff9d]/20 hover:border-[#00ff9d]/30 transition-all duration-300 group">

            {/* Header row with Hamdard logo */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden border border-[#00ff9d]/20 bg-white/10 transition-all duration-500 group-hover:scale-[1.1] group-hover:border-[#00ff9d]/40">
                <Image
                  src="/icons/hamdard.jpg"
                  alt="Hamdard University"
                  width={56}
                  height={56}
                  className="object-cover rounded-xl"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h3 className="text-lg md:text-xl font-bold text-cyber-green font-satoshi">
                    Bachelor of Science in Computer Science
                  </h3>
                  <div className="flex items-center gap-2 text-cyber-green text-sm font-satoshi mt-2 sm:mt-0">
                    <Calendar size={14} />
                    <span>2019 - 2023</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm text-white font-satoshi">
                  <span className="font-medium">Hamdard University</span>
                  <span className="w-1 h-1 bg-cyber-green rounded-full"></span>
                  <span className="flex items-center gap-1"><MapPin size={12} /> Islamabad</span>
                </div>
              </div>
            </div>

            {/* Achievement badges */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 px-3 py-2 bg-[#00ff9d]/8 rounded-lg border border-[#00ff9d]/15">
                <Award size={16} className="text-cyber-green flex-shrink-0" />
                <span className="text-sm text-cyber-green font-satoshi font-medium">
                  Merit Scholarship Recipient for maintaining a top-tier GPA across consecutive semesters
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-[#00ff9d]/8 rounded-lg border border-[#00ff9d]/15">
                <Trophy size={16} className="text-cyber-green flex-shrink-0" />
                <span className="text-sm text-cyber-green font-satoshi font-medium">
                  Top 3 finish in multiple university CTF competitions
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-[#00ff9d]/8 rounded-lg border border-[#00ff9d]/15">
                <Users size={16} className="text-cyber-green flex-shrink-0" />
                <span className="text-sm text-cyber-green font-satoshi font-medium">
                  Co-founded the cybersecurity awareness society, ran workshops for 100+ students
                </span>
              </div>
            </div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Key Courses */}
              <div>
                <div className="flex items-center gap-1.5 mb-3">
                  <BookOpen size={14} className="text-cyber-green" />
                  <h4 className="text-xs font-bold text-cyber-green uppercase tracking-wider font-satoshi">Key Courses</h4>
                </div>
                <div className="space-y-2">
                  {["Cyber & Information Security", "Network Security", "Artificial Intelligence", "Machine Learning", "Mobile App Development", "Software Engineering", "Database Management Systems", "Data Structures & Algorithms"].map((course, i) => (
                    <div key={i} className="flex items-center gap-2 text-white text-sm font-satoshi hover:text-cyber-green transition-colors">
                      <span className="text-cyber-green text-[10px]">&#9656;</span>
                      {course}
                    </div>
                  ))}
                </div>
              </div>

              {/* FYP + Extra Info */}
              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <Code size={14} className="text-cyber-green" />
                    <h4 className="text-xs font-bold text-cyber-green uppercase tracking-wider font-satoshi">Final Year Project</h4>
                  </div>
                  <a 
                    href="https://github.com/rafucybersec/Multi-Sensor-Intrusion-Detection-IOT" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block bg-[#00ff9d]/5 rounded-lg p-4 border-l-3 border-cyber-green hover:bg-[#00ff9d]/10 transition-colors cursor-pointer"
                  >
                    <h5 className="font-bold text-cyber-green text-sm mb-1.5 font-satoshi hover-glitch">IoT Intrusion Detection Systems</h5>
                    <p className="text-xs text-white font-satoshi leading-relaxed">Built an IoT security system using ESP32, motion/gas/fire sensors, and ESP32-CAM with real-time alerts via a Flutter Firebase mobile app. Improved response time by 60% compared to traditional monitoring.</p>
                  </a>
                </div>

                {/* Research Interests */}
                <div>
                  <h4 className="text-xs font-bold text-cyber-green uppercase tracking-wider font-satoshi mb-3">Areas of Focus</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Threat Detection", "SIEM Engineering", "Incident Response", "IoT Security", "Network Defense", "Red Teaming"].map((area, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 bg-[#00ff9d]/10 text-cyber-green border border-[#00ff9d]/20 rounded-full font-satoshi">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
