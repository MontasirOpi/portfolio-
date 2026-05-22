import React from "react";
import { motion } from "framer-motion";
import { experienceData } from "../data/experience";
import { playHoverBeep, playTacticalClick } from "../utils/audio";
import { Briefcase, Calendar, MapPin, ChevronRight, Play } from "lucide-react";

export default function Experience() {
  return (
    <section 
      id="experience" 
      className="py-24 bg-[#0B0D0F] border-b border-[#4D5B3D]/25 select-none relative font-orbitron overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center lg:text-left">
          <div className="text-[10px] text-[#95FF00] tracking-[0.3em] font-black uppercase mb-1.5 flex items-center justify-center lg:justify-start gap-2">
            <span className="w-2 h-2 bg-[#95FF00] animate-pulse"></span>
            MISSION_HISTORY // DEPLOYMENTS_LOG
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-widest uppercase">
            OPERATIONAL HISTORY
          </h2>
          <div className="w-24 h-[3px] bg-[#95FF00] mt-3 mx-auto lg:mx-0 shadow-[0_0_8px_#95FF00]"></div>
        </div>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto font-inter">
          
          {/* Main timeline center spine */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#95FF00] via-[#4D5B3D]/40 to-transparent pointer-events-none"></div>

          {/* Timeline entries mapping */}
          <div className="space-y-12">
            {experienceData.map((deployment, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = deployment.status === "ACTIVE DEPLOYMENT";

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
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isActive 
                          ? "bg-black border-[#95FF00] shadow-[0_0_10px_#95FF00]" 
                          : "bg-black border-[#4D5B3D]/80"
                      }`}
                    >
                      <div 
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive ? "bg-[#95FF00] animate-pulse-fast" : "bg-[#4D5B3D]"
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
                    <div className="bg-[#1B1F24]/85 border border-[#4D5B3D]/30 p-5 sm:p-6 rounded hover:border-[#95FF00] transition-colors relative backdrop-blur-md select-text">
                      {/* Corner markings decoration */}
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#95FF00]/40"></div>
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#95FF00]/40"></div>
                      
                      {/* Card heading metadata */}
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-4 border-b border-[#4D5B3D]/25 pb-3">
                        <div>
                          <h3 className="text-base sm:text-lg font-black text-white font-orbitron tracking-wide leading-tight uppercase">
                            {deployment.role}
                          </h3>
                          <span className="text-xs text-[#95FF00] font-black font-orbitron uppercase tracking-wider block mt-1">
                            {deployment.company}
                          </span>
                        </div>
                        
                        {/* Tactical Status Badge */}
                        <div className={`px-2 py-0.5 rounded text-[8px] font-black font-orbitron tracking-widest border leading-none uppercase ${
                          isActive 
                            ? "bg-[#95FF00]/10 text-[#95FF00] border-[#95FF00] animate-pulse" 
                            : "bg-[#4D5B3D]/10 text-[#A8B0B8] border-[#4D5B3D]/40"
                        }`}>
                          {deployment.status}
                        </div>
                      </div>

                      {/* Info lines (Time & HQ) */}
                      <div className="flex flex-wrap gap-x-4 gap-y-1.5 font-orbitron text-[9px] text-[#4D5B3D] tracking-widest uppercase mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={10} className="text-[#95FF00]" />
                          <span>{deployment.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={10} />
                          <span>{deployment.location}</span>
                        </div>
                      </div>

                      {/* Campaign Summary Text */}
                      <p className="text-xs text-[#A8B0B8]/85 leading-relaxed font-light font-inter mb-5">
                        {deployment.summary}
                      </p>

                      {/* Tactical Highlights review */}
                      <div className="space-y-2 mb-5">
                        <span className="block font-orbitron text-[8px] text-[#4D5B3D] tracking-widest uppercase mb-2">// SPECIFIC FIELD ACCOMPLISHMENTS:</span>
                        {deployment.achievements.map((ach, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs font-light text-[#A8B0B8]/95 leading-relaxed">
                            <ChevronRight size={14} className="text-[#95FF00] shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>

                      {/* Deployment gear loadout tags */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#4D5B3D]/15">
                        {deployment.tags.map((tag, i) => (
                          <span 
                            key={i} 
                            className="text-[8px] font-mono px-2 py-0.5 bg-[#0B0D0F]/90 border border-[#4D5B3D]/25 text-[#A8B0B8] rounded uppercase"
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
