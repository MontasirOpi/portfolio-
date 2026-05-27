import { motion } from "framer-motion";
import { experienceData } from "../data/experience";
import { playHoverBeep } from "../utils/audio";
import { Calendar, MapPin, ChevronRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Experience() {
  const { theme } = useTheme();
  const isCod = theme === "cod";

  return (
    <section 
      id="experience" 
      className={`py-24 transition-colors duration-700 ${
        isCod 
          ? "bg-[#0B0D0F] border-b border-[#4D5B3D]/25 select-none relative font-orbitron overflow-hidden" 
          : "bg-[#0F172A] border-b border-white/5 relative font-inter overflow-hidden"
      }`}
    >
      {/* Background overlay scans (COD only) */}
      {isCod && <div className="absolute inset-0 scanline-container opacity-10 pointer-events-none"></div>}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center lg:text-left">
          <div className={`text-[10px] tracking-[0.3em] font-black uppercase mb-1.5 flex items-center justify-center lg:justify-start gap-2 ${
            isCod ? "text-[#95FF00]" : "text-[#8B5CF6]"
          }`}>
            <span className={`w-2 h-2 animate-pulse ${isCod ? "bg-[#95FF00]" : "bg-[#8B5CF6]"}`}></span>
            {isCod ? "MISSION_HISTORY // DEPLOYMENTS_LOG" : "⚡ PROFESSIONAL JOURNEY // CAREER PATH"}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-widest uppercase">
            {isCod ? "OPERATIONAL HISTORY" : "WORK EXPERIENCE"}
          </h2>
          <div className={`w-24 h-[3px] mt-3 mx-auto lg:mx-0 shadow-lg ${
            isCod ? "bg-[#95FF00] shadow-[0_0_8px_#95FF00]" : "bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] shadow-[#8B5CF6]/30"
          }`}></div>
        </div>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto font-inter">
          
          {/* Main timeline center spine */}
          <div className={`absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] pointer-events-none ${
            isCod 
              ? "bg-gradient-to-b from-[#95FF00] via-[#4D5B3D]/40 to-transparent" 
              : "bg-gradient-to-b from-[#8B5CF6] via-slate-700/50 to-transparent"
          }`}></div>

          {/* Timeline entries mapping */}
          <div className="space-y-12">
            {experienceData.map((deployment, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = deployment.status === "ACTIVE DEPLOYMENT";

              const translatedStatus = isCod 
                ? deployment.status 
                : (isActive ? "CURRENT EMPLOYMENT" : "COMPLETED ROLE");

              return (
                <div 
                  key={idx}
                  className={`relative flex flex-col sm:flex-row items-stretch justify-between ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline bullet indicator node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-[7px] top-1.5 z-20">
                    <motion.div 
                      whileInView={{ scale: [1, 1.2, 1] }}
                      viewport={{ once: true }}
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                        isCod
                          ? isActive 
                            ? "bg-black border-[#95FF00] shadow-[0_0_10px_#95FF00]" 
                            : "bg-black border-[#4D5B3D]/80"
                          : isActive
                            ? "bg-slate-950 border-[#22D3EE] shadow-[0_0_12px_rgba(34,211,238,0.4)]"
                            : "bg-slate-900 border-slate-700"
                      }`}
                    >
                      <div 
                        className={`w-1.5 h-1.5 rounded-full ${
                          isCod
                            ? isActive ? "bg-[#95FF00] animate-pulse-fast" : "bg-[#4D5B3D]"
                            : isActive ? "bg-[#22D3EE] animate-pulse-fast" : "bg-slate-650"
                        }`} 
                      />
                    </motion.div>
                  </div>

                  {/* Left Column (Empty on desktop to balance out layout) */}
                  <div className="hidden sm:block w-[45%]" />

                  {/* Timeline card component */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    onMouseEnter={playHoverBeep}
                    className="w-[calc(100%-40px)] sm:w-[45%] ml-10 sm:ml-0"
                  >
                    <div className={`p-5 sm:p-6 transition-all relative backdrop-blur-md select-text ${
                      isCod 
                        ? "bg-[#1B1F24]/85 border border-[#4D5B3D]/30 rounded hover:border-[#95FF00] hover:bg-[#95FF00]/5" 
                        : "glass-card rounded-2xl border border-white/5 hover:border-[#8B5CF6]/30 bg-slate-800/40 hover:bg-slate-800/60 shadow-lg shadow-black/10"
                    }`}>
                      {/* Corner markings decoration (COD only) */}
                      {isCod && (
                        <>
                          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#95FF00]/40"></div>
                          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#95FF00]/40"></div>
                        </>
                      )}
                      
                      {/* Card heading metadata */}
                      <div className={`flex flex-wrap justify-between items-start gap-2 mb-4 border-b pb-3 ${
                        isCod ? "border-[#4D5B3D]/25" : "border-white/5"
                      }`}>
                        <div>
                          <h3 className={`text-base sm:text-lg font-black text-white leading-tight uppercase ${
                            isCod ? "font-orbitron tracking-wide" : "font-sans font-bold"
                          }`}>
                            {deployment.role}
                          </h3>
                          <span className={`text-xs uppercase tracking-wider block mt-1 ${
                            isCod ? "font-orbitron font-black text-[#95FF00]" : "font-sans font-semibold text-[#22D3EE]"
                          }`}>
                            {deployment.company}
                          </span>
                        </div>
                        
                        {/* Tactical Status Badge */}
                        <div className={`px-2 py-0.5 rounded text-[8px] font-bold tracking-widest border leading-none uppercase ${
                          isCod
                            ? isActive 
                              ? "bg-[#95FF00]/10 text-[#95FF00] border-[#95FF00] animate-pulse font-orbitron font-black" 
                              : "bg-[#4D5B3D]/10 text-[#A8B0B8] border-[#4D5B3D]/40 font-orbitron"
                            : isActive
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-mono rounded-lg animate-pulse"
                              : "bg-slate-800 text-slate-400 border-white/5 font-mono rounded-lg"
                        }`}>
                          {translatedStatus}
                        </div>
                      </div>

                      {/* Info lines (Time & HQ) */}
                      <div className={`flex flex-wrap gap-x-4 gap-y-1.5 text-[9px] tracking-widest uppercase mb-4 ${
                        isCod ? "font-orbitron text-[#4D5B3D]" : "font-mono text-slate-400"
                      }`}>
                        <div className="flex items-center gap-1">
                          <Calendar size={10} className={isCod ? "text-[#95FF00]" : "text-[#22D3EE]"} />
                          <span>{deployment.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={10} />
                          <span>{deployment.location}</span>
                        </div>
                      </div>

                      {/* Campaign Summary Text */}
                      <p className={`text-xs leading-relaxed font-light mb-5 ${
                        isCod ? "text-[#A8B0B8]/85 font-inter" : "text-slate-300 font-sans"
                      }`}>
                        {deployment.summary}
                      </p>

                      {/* Tactical Highlights review */}
                      <div className="space-y-2 mb-5">
                        <span className={`block text-[8px] tracking-widest uppercase mb-2 ${
                          isCod ? "font-orbitron text-[#4D5B3D]" : "font-sans font-bold text-slate-400"
                        }`}>
                          {isCod ? "// SPECIFIC FIELD ACCOMPLISHMENTS:" : "⚡ KEY CONTRIBUTIONS & ACHIEVEMENTS:"}
                        </span>
                        {deployment.achievements.map((ach, i) => (
                          <div key={i} className={`flex items-start gap-2 text-xs font-light leading-relaxed ${
                            isCod ? "text-[#A8B0B8]/95 font-inter" : "text-slate-300 font-sans"
                          }`}>
                            <ChevronRight size={14} className={`shrink-0 mt-0.5 ${isCod ? "text-[#95FF00]" : "text-[#8B5CF6]"}`} />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>

                      {/* Deployment gear loadout tags */}
                      <div className={`flex flex-wrap gap-1.5 pt-3 border-t ${
                        isCod ? "border-[#4D5B3D]/15" : "border-white/5"
                      }`}>
                        {deployment.tags.map((tag, i) => (
                          <span 
                            key={i} 
                            className={`text-[8px] font-mono px-2 py-0.5 border uppercase ${
                              isCod 
                                ? "bg-[#0B0D0F]/90 border-[#4D5B3D]/25 text-[#A8B0B8] rounded" 
                                : "bg-slate-900 border-white/5 text-[#22D3EE] rounded-lg"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
