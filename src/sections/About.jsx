import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profileData } from "../data/profile";
import { playHoverBeep, playSelectSweep } from "../utils/audio";
import { User, GraduationCap, Compass, ShieldAlert, Award } from "lucide-react";

export default function About() {
  const [activeTab, setActiveTab] = useState("biometrics");

  const tabs = [
    { id: "biometrics", label: "BIOMETRICS", icon: User },
    { id: "training", label: "SERVICE RECORD", icon: GraduationCap },
    { id: "objectives", label: "MISSION GOALS", icon: Compass }
  ];

  const handleTabClick = (tabId) => {
    playSelectSweep();
    setActiveTab(tabId);
  };

  return (
    <section 
      id="about" 
      className="py-24 bg-[#0B0D0F] border-b border-[#4D5B3D]/25 select-none relative font-orbitron overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center lg:text-left relative">
          <div className="text-[10px] text-[#95FF00] tracking-[0.3em] font-black uppercase mb-1.5 flex items-center justify-center lg:justify-start gap-2">
            <span className="w-2 h-2 bg-[#95FF00] animate-pulse"></span>
            SECURE_INTEL // CLASSIFIED_DOSSIER
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-widest uppercase">
            OPERATOR DOSSIER
          </h2>
          <div className="w-24 h-[3px] bg-[#95FF00] mt-3 mx-auto lg:mx-0 shadow-[0_0_8px_#95FF00]"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column - Operator Profile Card */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="bg-[#1B1F24]/85 border border-[#4D5B3D]/30 p-6 rounded flex flex-col justify-between flex-grow tactical-border backdrop-blur-md relative">
              <div className="tactical-corner-bl"></div>
              <div className="tactical-corner-br"></div>
              
              {/* Card Header info */}
              <div className="flex justify-between items-start text-[9px] text-[#4D5B3D] tracking-widest uppercase mb-4 border-b border-[#4D5B3D]/20 pb-2">
                <span>CLS // COMBATANT</span>
                <span>SYS_STABLE</span>
              </div>

              {/* Photo Frame */}
              <div className="relative border border-[#4D5B3D]/50 bg-black/60 rounded overflow-hidden aspect-[4/5] mb-6 flex items-center justify-center scanline-container group">
                {/* Targeting Corners overlay */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#95FF00]/60 z-20 pointer-events-none group-hover:scale-110 transition-transform"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#95FF00]/60 z-20 pointer-events-none group-hover:scale-110 transition-transform"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#95FF00]/60 z-20 pointer-events-none group-hover:scale-110 transition-transform"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#95FF00]/60 z-20 pointer-events-none group-hover:scale-110 transition-transform"></div>
                
                {/* Stylized custom CoD Operator Photo */}
                <img 
                  src="/operator.png" 
                  alt="Fahim Montasir Opi Dossier"
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                />

                {/* Radar Grid Graphic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                <div className="absolute bottom-2 left-2 z-20 text-[8px] bg-black/80 px-2 py-0.5 border border-[#4D5B3D]/40 text-[#95FF00] tracking-widest">
                  OPI // ACT_DUTY
                </div>
              </div>

              {/* dossier profile details */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#4D5B3D]">FULL_NAME:</span>
                  <span className="font-bold text-white text-right">{profileData.fullName.toUpperCase()}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#4D5B3D]">CALLSIGN:</span>
                  <span className="font-bold text-[#95FF00] tracking-widest">OPI_V4.3</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#4D5B3D]">LOCATION:</span>
                  <span className="font-medium text-white">{profileData.location.toUpperCase()}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#4D5B3D]">CLEARANCE:</span>
                  <span className="text-red-500 font-bold flex items-center gap-1 text-[9px] border border-red-500/30 px-1 bg-red-500/10">
                    <ShieldAlert size={8} /> LEVEL_4
                  </span>
                </div>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 gap-2 border-t border-[#4D5B3D]/20 pt-4">
                {profileData.stats.map((stat, i) => (
                  <div key={i} className="bg-black/35 border border-[#4D5B3D]/15 p-2 rounded text-center">
                    <div className="text-[#95FF00] text-sm font-black">{stat.value}</div>
                    <div className="text-[7px] text-[#4D5B3D] tracking-wider leading-none mt-1 uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - File Dossier Terminal */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="bg-[#1B1F24]/85 border border-[#4D5B3D]/30 rounded flex flex-col flex-grow backdrop-blur-md relative overflow-hidden">
              {/* Tab Header row */}
              <div className="flex border-b border-[#4D5B3D]/30 bg-black/45">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      onMouseEnter={playHoverBeep}
                      className={`flex-1 py-4 px-3 flex items-center justify-center gap-2 cursor-pointer transition-all border-r last:border-r-0 border-[#4D5B3D]/20 text-[10px] sm:text-xs font-black tracking-widest hoverable ${
                        active 
                          ? "bg-[#1B1F24] text-[#95FF00] border-t-2 border-t-[#95FF00]" 
                          : "text-[#4D5B3D] hover:text-[#A8B0B8] bg-transparent"
                      }`}
                    >
                      <Icon size={14} className={active ? "text-[#95FF00]" : "text-[#4D5B3D]"} />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Window */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-start relative select-text font-inter">
                {/* Background grid overlay */}
                <div className="absolute inset-0 military-grid opacity-10 pointer-events-none"></div>

                <AnimatePresence mode="wait">
                  {activeTab === "biometrics" && (
                    <motion.div
                      key="biometrics"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 relative z-10"
                    >
                      <div>
                        <h3 className="font-orbitron font-black text-sm text-[#95FF00] tracking-widest border-b border-[#4D5B3D]/30 pb-2 mb-4">// PHYSICAL PROFILE & SUMMARY</h3>
                        <p className="text-sm text-[#A8B0B8]/90 leading-relaxed font-light font-inter">
                          {profileData.bio}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="bg-black/35 border border-[#4D5B3D]/15 p-4 rounded font-orbitron">
                          <span className="block text-[8px] text-[#4D5B3D] tracking-widest mb-1">TACTICAL EMAIL (PRIMARY)</span>
                          <a 
                            href={`mailto:${profileData.emails.primary}`}
                            onMouseEnter={playHoverBeep}
                            className="text-xs font-bold text-white hover:text-[#95FF00] transition-colors"
                          >
                            {profileData.emails.primary}
                          </a>
                        </div>
                        <div className="bg-black/35 border border-[#4D5B3D]/15 p-4 rounded font-orbitron">
                          <span className="block text-[8px] text-[#4D5B3D] tracking-widest mb-1">TACTICAL EMAIL (ALT)</span>
                          <a 
                            href={`mailto:${profileData.emails.secondary}`}
                            onMouseEnter={playHoverBeep}
                            className="text-xs font-bold text-white hover:text-[#95FF00] transition-colors"
                          >
                            {profileData.emails.secondary}
                          </a>
                        </div>
                        <div className="bg-black/35 border border-[#4D5B3D]/15 p-4 rounded font-orbitron">
                          <span className="block text-[8px] text-[#4D5B3D] tracking-widest mb-1">COMMS CELL (PRIMARY)</span>
                          <span className="text-xs font-bold text-white block">{profileData.phones.primary}</span>
                        </div>
                        <div className="bg-black/35 border border-[#4D5B3D]/15 p-4 rounded font-orbitron">
                          <span className="block text-[8px] text-[#4D5B3D] tracking-widest mb-1">DEPLOYED HQ ADDRESS</span>
                          <span className="text-xs font-bold text-white block leading-tight">{profileData.address}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "training" && (
                    <motion.div
                      key="training"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 relative z-10"
                    >
                      <h3 className="font-orbitron font-black text-sm text-[#95FF00] tracking-widest border-b border-[#4D5B3D]/30 pb-2 mb-4">// ACADEMIC PREPARATION LOGS</h3>
                      
                      <div className="space-y-4">
                        {profileData.education.map((edu, i) => (
                          <div 
                            key={i}
                            className="relative pl-6 border-l-2 border-[#4D5B3D]/40 before:content-[''] before:absolute before:-left-[5px] before:top-1.5 before:w-2.5 before:h-2.5 before:rounded-full before:bg-[#95FF00] before:shadow-[0_0_8px_#95FF00]"
                          >
                            <span className="font-orbitron text-[9px] text-[#95FF00] font-black tracking-widest block mb-1">{edu.period}</span>
                            <h4 className="text-sm font-bold text-white leading-tight mb-1 font-orbitron">{edu.degree}</h4>
                            <p className="text-xs text-[#A8B0B8] mb-1 font-inter">{edu.institution}</p>
                            <span className="inline-block text-[9px] font-orbitron font-black px-1.5 py-0.5 bg-[#4D5B3D]/25 border border-[#4D5B3D]/40 text-[#A8B0B8] rounded uppercase">
                              {edu.result}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "objectives" && (
                    <motion.div
                      key="objectives"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 relative z-10 font-orbitron"
                    >
                      <div>
                        <h3 className="font-black text-sm text-[#95FF00] tracking-widest border-b border-[#4D5B3D]/30 pb-2 mb-4">// CORE DEV PASSIONS</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {profileData.passions.map((passion, idx) => (
                            <div key={idx} className="bg-black/35 border border-[#4D5B3D]/15 p-3 rounded flex items-center gap-2">
                              <Award size={14} className="text-[#95FF00] shrink-0" />
                              <span className="text-xs text-white tracking-wide font-medium">{passion}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        <h3 className="font-black text-sm text-[#95FF00] tracking-widest border-b border-[#4D5B3D]/30 pb-2 mb-4">// TACTICAL UPGRADE PARADIGMS</h3>
                        <div className="space-y-3 font-mono">
                          {profileData.currentLearning.map((item, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between items-center text-[10px] text-[#A8B0B8]">
                                <span>{item.topic.toUpperCase()}</span>
                                <span className="text-[#95FF00] font-bold">{item.progress}% LOADED</span>
                              </div>
                              <div className="h-1.5 w-full bg-black/60 rounded overflow-hidden border border-[#4D5B3D]/20">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${item.progress}%` }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1, ease: "easeOut" }}
                                  className="h-full bg-gradient-to-r from-[#4D5B3D] to-[#95FF00]"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Terminal System Status line */}
              <div className="bg-black/45 border-t border-[#4D5B3D]/30 px-6 py-3 font-mono text-[9px] text-[#4D5B3D] tracking-widest uppercase flex justify-between">
                <span>SYS_DDR // VER_92.10</span>
                <span>UPLINK_READY</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
