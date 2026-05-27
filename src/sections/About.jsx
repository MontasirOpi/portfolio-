import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { profileData } from "../data/profile";
import { playHoverBeep, playSelectSweep } from "../utils/audio";
import { User, GraduationCap, Compass, ShieldAlert, Award, Cpu } from "lucide-react";

export default function About() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("biometrics");

  const isCod = theme === "cod";

  const tabs = [
    { id: "biometrics", label: isCod ? "BIOMETRICS" : "ENGINE PATH", icon: isCod ? User : Cpu },
    { id: "training", label: isCod ? "SERVICE RECORD" : "ACADEMICS", icon: isCod ? GraduationCap : GraduationCap },
    { id: "objectives", label: isCod ? "MISSION GOALS" : "ARCHITECTURE", icon: isCod ? Compass : Compass }
  ];

  const handleTabClick = (tabId) => {
    playSelectSweep();
    setActiveTab(tabId);
  };

  return (
    <section 
      id="about" 
      className={`py-24 transition-colors duration-700 ${
        isCod ? "bg-[#0B0D0F] border-b border-[#4D5B3D]/25 select-none relative font-orbitron overflow-hidden" : "bg-[#0F172A] border-b border-white/5 relative font-inter overflow-hidden"
      }`}
    >
      {/* Background overlay scans (COD only) */}
      {isCod && <div className="absolute inset-0 scanline-container opacity-10 pointer-events-none"></div>}

      {/* Background visual detail (Mobile Dev only) */}
      {!isCod && (
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] rounded-full blob-purple blur-3xl opacity-20 pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center lg:text-left relative">
          <div className={`text-[10px] tracking-[0.3em] font-black uppercase mb-1.5 flex items-center justify-center lg:justify-start gap-2 ${
            isCod ? "text-[#95FF00]" : "text-[#8B5CF6]"
          }`}>
            <span className={`w-2 h-2 animate-pulse ${isCod ? "bg-[#95FF00]" : "bg-[#8B5CF6]"}`}></span>
            {isCod ? "SECURE_INTEL // CLASSIFIED_DOSSIER" : "DEVELOPER DOSSIER // CAPABILITIES"}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-widest uppercase">
            {isCod ? "OPERATOR DOSSIER" : "DEVELOPER PROFILE"}
          </h2>
          <div className={`w-24 h-[3px] mt-3 mx-auto lg:mx-0 shadow-lg ${
            isCod ? "bg-[#95FF00] shadow-[#95FF00]/40" : "bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] shadow-[#8B5CF6]/30"
          }`}></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column - Operator Profile Card */}
          <div className="lg:col-span-4 flex flex-col">
            <div className={`p-6 rounded flex flex-col justify-between flex-grow backdrop-blur-md relative transition-all duration-500 ${
              isCod 
                ? "bg-[#1B1F24]/85 border border-[#4D5B3D]/30 tactical-border" 
                : "glass-panel"
            }`}>
              {isCod && (
                <>
                  <div className="tactical-corner-bl"></div>
                  <div className="tactical-corner-br"></div>
                </>
              )}
              
              {/* Card Header info */}
              <div className={`flex justify-between items-start text-[9px] tracking-widest uppercase mb-4 border-b pb-2 ${
                isCod ? "text-[#4D5B3D] border-[#4D5B3D]/20" : "text-slate-400 border-white/5"
              }`}>
                <span>{isCod ? "CLS // COMBATANT" : "ENGINEER // MOBILE"}</span>
                <span>{isCod ? "SYS_STABLE" : "PREMIUM"}</span>
              </div>

              {/* Photo Frame */}
              <div className={`relative border bg-black/60 rounded overflow-hidden aspect-[4/5] mb-6 flex items-center justify-center group ${
                isCod ? "border-[#4D5B3D]/50 scanline-container" : "border-white/5"
              }`}>
                {/* Targeting Corners overlay (COD only) */}
                {isCod && (
                  <>
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#95FF00]/60 z-20 pointer-events-none group-hover:scale-110 transition-transform"></div>
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#95FF00]/60 z-20 pointer-events-none group-hover:scale-110 transition-transform"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#95FF00]/60 z-20 pointer-events-none group-hover:scale-110 transition-transform"></div>
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#95FF00]/60 z-20 pointer-events-none group-hover:scale-110 transition-transform"></div>
                  </>
                )}
                
                {/* Stylized Operator Photo */}
                <img 
                  src="/operator.png" 
                  alt="Fahim Montasir Opi Dossier"
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isCod 
                      ? "grayscale opacity-90 group-hover:scale-105 group-hover:grayscale-0" 
                      : "opacity-95 group-hover:scale-105"
                  }`}
                />

                {/* Radar Grid Graphic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                <div className={`absolute bottom-2 left-2 z-20 text-[8px] px-2 py-0.5 border tracking-widest ${
                  isCod ? "bg-black/80 border-[#4D5B3D]/40 text-[#95FF00]" : "bg-slate-900/90 border-white/5 text-[#22D3EE] rounded-md font-semibold"
                }`}>
                  {isCod ? "OPI // ACT_DUTY" : "OPI // ACTIVE"}
                </div>
              </div>

              {/* dossier profile details */}
              <div className="space-y-2 mb-6 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className={isCod ? "text-[#4D5B3D]" : "text-slate-400"}>FULL_NAME:</span>
                  <span className="font-bold text-white text-right">{profileData.fullName.toUpperCase()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={isCod ? "text-[#4D5B3D]" : "text-slate-400"}>CALLSIGN:</span>
                  <span className={`font-bold ${isCod ? "text-[#95FF00]" : "text-[#8B5CF6]"}`}>OPI_V4.3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={isCod ? "text-[#4D5B3D]" : "text-slate-400"}>LOCATION:</span>
                  <span className="font-medium text-white">{profileData.location.toUpperCase()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={isCod ? "text-[#4D5B3D]" : "text-slate-400"}>CLEARANCE:</span>
                  <span className={`font-bold flex items-center gap-1 text-[9px] border px-1 ${
                    isCod 
                      ? "text-red-500 border-red-500/30 bg-red-500/10" 
                      : "text-emerald-400 border-emerald-400/30 bg-emerald-500/10 rounded-sm"
                  }`}>
                    <ShieldAlert size={8} /> LEVEL_4
                  </span>
                </div>
              </div>

              {/* Statistics Grid */}
              <div className={`grid grid-cols-2 gap-2 border-t pt-4 ${
                isCod ? "border-[#4D5B3D]/20" : "border-white/5"
              }`}>
                {profileData.stats.map((stat, i) => (
                  <div key={i} className={`p-2 text-center transition-all ${
                    isCod 
                      ? "bg-black/35 border border-[#4D5B3D]/15 rounded" 
                      : "bg-slate-800/40 border border-white/5 rounded-xl hover:bg-slate-800/60"
                  }`}>
                    <div className={`text-sm font-black ${isCod ? "text-[#95FF00]" : "text-[#22D3EE]"}`}>{stat.value}</div>
                    <div className={`text-[7px] tracking-wider leading-none mt-1 uppercase ${isCod ? "text-[#4D5B3D]" : "text-slate-400 font-semibold"}`}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - File Dossier Terminal */}
          <div className="lg:col-span-8 flex flex-col">
            <div className={`rounded flex flex-col flex-grow backdrop-blur-md relative overflow-hidden transition-all duration-500 ${
              isCod ? "bg-[#1B1F24]/85 border border-[#4D5B3D]/30" : "glass-panel"
            }`}>
              {/* Tab Header row */}
              <div className={`flex border-b ${isCod ? "border-[#4D5B3D]/30 bg-black/45" : "border-white/5 bg-slate-900/50"}`}>
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      onMouseEnter={playHoverBeep}
                      className={`flex-1 py-4 px-3 flex items-center justify-center gap-2 cursor-pointer transition-all border-r last:border-r-0 border-white/5 text-[10px] sm:text-xs font-black tracking-widest hoverable ${
                        active 
                          ? isCod
                            ? "bg-[#1B1F24] text-[#95FF00] border-t-2 border-t-[#95FF00]" 
                            : "bg-[#0F172A]/80 text-[#22D3EE] border-t-2 border-t-[#8B5CF6]"
                          : "text-slate-500 hover:text-slate-300 bg-transparent"
                      }`}
                    >
                      <Icon size={14} className={active ? (isCod ? "text-[#95FF00]" : "text-[#22D3EE]") : "text-slate-500"} />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Window */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-start relative select-text">
                {/* Background grid overlay (COD only) */}
                {isCod && <div className="absolute inset-0 military-grid opacity-10 pointer-events-none"></div>}

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
                        <h3 className={`font-orbitron font-black text-sm tracking-widest border-b pb-2 mb-4 ${
                          isCod ? "text-[#95FF00] border-[#4D5B3D]/30" : "text-white border-white/5 font-inter font-bold"
                        }`}>{isCod ? "// PHYSICAL PROFILE & SUMMARY" : "DEVELOPMENT MINDSET"}</h3>
                        <p className={`text-sm leading-relaxed font-light ${
                          isCod ? "text-[#A8B0B8]/90 font-inter" : "text-slate-300 font-inter"
                        }`}>
                          {profileData.bio}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        {[
                          { title: "PRIMARY CONNECT", value: profileData.emails.primary, type: "email" },
                          { title: "ALT CONNECT", value: profileData.emails.secondary, type: "email" },
                          { title: "CONTACT TELEMETRY", value: profileData.phones.primary, type: "text" },
                          { title: "ENGINEER SECTOR", value: profileData.address, type: "text" }
                        ].map((info, idx) => (
                          <div key={idx} className={`p-4 transition-all duration-300 ${
                            isCod 
                              ? "bg-black/35 border border-[#4D5B3D]/15 rounded font-orbitron" 
                              : "bg-slate-800/40 border border-white/5 rounded-xl hover:border-[#8B5CF6]/30 font-inter hover:bg-slate-800/60"
                          }`}>
                            <span className={`block text-[8px] tracking-widest mb-1 ${isCod ? "text-[#4D5B3D]" : "text-slate-400 font-semibold"}`}>
                              {info.title}
                            </span>
                            {info.type === "email" ? (
                              <a 
                                href={`mailto:${info.value}`}
                                onMouseEnter={playHoverBeep}
                                className={`text-xs font-bold transition-colors ${
                                  isCod ? "text-white hover:text-[#95FF00]" : "text-white hover:text-[#22D3EE]"
                                }`}
                              >
                                {info.value}
                              </a>
                            ) : (
                              <span className="text-xs font-bold text-white block">{info.value}</span>
                            )}
                          </div>
                        ))}
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
                      <h3 className={`font-orbitron font-black text-sm tracking-widest border-b pb-2 mb-4 ${
                        isCod ? "text-[#95FF00] border-[#4D5B3D]/30" : "text-white border-white/5 font-inter font-bold"
                      }`}>{isCod ? "// ACADEMIC PREPARATION LOGS" : "ACADEMIC BACKGROUND"}</h3>
                      
                      <div className="space-y-5">
                        {profileData.education.map((edu, i) => (
                          <div 
                            key={i}
                            className={`relative pl-6 border-l-2 before:content-[''] before:absolute before:-left-[5px] before:top-1.5 before:w-2.5 before:h-2.5 before:rounded-full transition-all ${
                              isCod 
                                ? "border-[#4D5B3D]/40 before:bg-[#95FF00] before:shadow-[0_0_8px_#95FF00]" 
                                : "border-slate-700 before:bg-gradient-to-r before:from-[#8B5CF6] before:to-[#22D3EE] before:shadow-[0_0_8px_#8B5CF6]"
                            }`}
                          >
                            <span className={`text-[9px] font-black tracking-widest block mb-1 uppercase ${
                              isCod ? "font-orbitron text-[#95FF00]" : "font-mono text-[#22D3EE]"
                            }`}>{edu.period}</span>
                            <h4 className={`text-sm font-bold leading-tight mb-1 ${
                              isCod ? "font-orbitron text-white" : "font-inter text-white"
                            }`}>{edu.degree}</h4>
                            <p className="text-xs text-slate-300 mb-1.5 font-inter">{edu.institution}</p>
                            <span className={`inline-block text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${
                              isCod 
                                ? "font-orbitron bg-[#4D5B3D]/25 border border-[#4D5B3D]/40 text-[#A8B0B8]" 
                                : "font-mono bg-slate-800 border border-white/5 text-[#22D3EE]"
                            }`}>
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
                      className="space-y-6 relative z-10"
                    >
                      <div>
                        <h3 className={`font-orbitron font-black text-sm tracking-widest border-b pb-2 mb-4 ${
                          isCod ? "text-[#95FF00] border-[#4D5B3D]/30" : "text-white border-white/5 font-inter font-bold"
                        }`}>{isCod ? "// CORE DEV PASSIONS" : "ENGINEERING CAPABILITIES"}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {profileData.passions.map((passion, idx) => (
                            <div key={idx} className={`p-3 flex items-center gap-2.5 transition-all duration-300 ${
                              isCod 
                                ? "bg-black/35 border border-[#4D5B3D]/15 rounded" 
                                : "bg-slate-800/40 border border-white/5 rounded-xl hover:border-[#8B5CF6]/20"
                            }`}>
                              <Award size={14} className={isCod ? "text-[#95FF00]" : "text-[#22D3EE]"} />
                              <span className={`text-xs text-white tracking-wide font-medium ${!isCod ? "font-inter" : ""}`}>{passion}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        <h3 className={`font-orbitron font-black text-sm tracking-widest border-b pb-2 mb-4 ${
                          isCod ? "text-[#95FF00] border-[#4D5B3D]/30" : "text-white border-white/5 font-inter font-bold"
                        }`}>{isCod ? "// TACTICAL UPGRADE PARADIGMS" : "RESEARCH & FOCUS PARADIGMS"}</h3>
                        <div className="space-y-3 font-mono">
                          {profileData.currentLearning.map((item, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between items-center text-[10px] text-slate-300">
                                <span className={!isCod ? "font-semibold" : ""}>{item.topic.toUpperCase()}</span>
                                <span className={isCod ? "text-[#95FF00] font-bold" : "text-[#22D3EE] font-bold"}>{item.progress}% LOADED</span>
                              </div>
                              <div className={`h-1.5 w-full bg-black/60 rounded overflow-hidden border ${
                                isCod ? "border-[#4D5B3D]/20" : "border-white/5"
                              }`}>
                                <motion.div 
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${item.progress}%` }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1, ease: "easeOut" }}
                                  className={`h-full ${
                                    isCod 
                                      ? "bg-gradient-to-r from-[#4D5B3D] to-[#95FF00]" 
                                      : "bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE]"
                                  }`}
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
              <div className={`px-6 py-3 font-mono text-[9px] tracking-widest uppercase flex justify-between ${
                isCod ? "bg-black/45 border-t border-[#4D5B3D]/30 text-[#4D5B3D]" : "bg-slate-900/50 border-t border-white/5 text-slate-500"
              }`}>
                <span>{isCod ? "SYS_DDR // VER_92.10" : "SYSTEM // ACTIVE_VER_4.3"}</span>
                <span>{isCod ? "UPLINK_READY" : "ECOSYSTEM_STABLE"}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

