import React from "react";
import { motion } from "framer-motion";
import { playHoverBeep } from "../utils/audio";
import { Award, Target, Trophy, Flame, ShieldAlert } from "lucide-react";

export default function Achievements() {
  const medals = [
    {
      id: "medal-01",
      icon: Trophy,
      name: "STORE_INFILTRATION_RIBBON",
      title: "10+ STORE APPS DEPLOYED",
      description: "Successfully passed all rigorous device check guidelines to deploy over 10 cross-platform Flutter applications directly into the Google Play Store and Apple App Store.",
      tier: "LEGENDARY"
    },
    {
      id: "medal-02",
      icon: Target,
      name: "OPEN_SOURCE_MODULE_MEDAL",
      title: "date_with_range_picker",
      description: "Published and maintained an open-source Flutter package resolving complex date interval picking workflows with a premium UI layout, available on Pub.dev.",
      tier: "EPIC"
    },
    {
      id: "medal-03",
      icon: Flame,
      name: "FIELD_COMMAND_COMMANDER",
      title: "MOBILE ENGINEERING LEADERSHIP",
      description: "Steer-headed core features architecture, led dynamic sprint pipelines, and conducted advanced code refactoring reviews, acting as a tech anchor at Innovate Solution.",
      tier: "LEGENDARY"
    },
    {
      id: "medal-04",
      icon: Award,
      name: "ALGORITHMIC_SPECIALIST",
      title: "COMPETITIVE PROBLEM SOLVING",
      description: "Secured high standings in mathematical conversion logic and competitive programming environments, achieving solid CGPA marks across all BSc and Diploma campaigns.",
      tier: "RARE"
    }
  ];

  return (
    <section 
      id="achievements" 
      className="py-24 bg-[#0B0D0F] military-grid border-b border-[#4D5B3D]/25 select-none relative font-orbitron overflow-hidden"
    >
      <div className="absolute inset-0 scanline-container opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center lg:text-left">
          <div className="text-[10px] text-[#95FF00] tracking-[0.3em] font-black uppercase mb-1.5 flex items-center justify-center lg:justify-start gap-2">
            <span className="w-2 h-2 bg-[#95FF00] animate-pulse"></span>
            FIELD_DECORATIONS // MEDALS_LOG
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-widest uppercase">
            OPERATIONAL MEDALS
          </h2>
          <div className="w-24 h-[3px] bg-[#95FF00] mt-3 mx-auto lg:mx-0 shadow-[0_0_8px_#95FF00]"></div>
        </div>

        {/* Medals Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {medals.map((medal, i) => {
            const Icon = medal.icon;
            const isLegendary = medal.tier === "LEGENDARY";
            const isEpic = medal.tier === "EPIC";

            return (
              <motion.div
                key={medal.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={playHoverBeep}
                className="bg-[#1B1F24]/85 border border-[#4D5B3D]/30 p-5 rounded flex flex-col justify-between items-center text-center hover:border-[#95FF00] hover:bg-[#95FF00]/5 transition-all duration-300 relative backdrop-blur-md select-text"
              >
                {/* Corner highlights */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#95FF00]/40"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#95FF00]/40"></div>

                {/* Tier Ribbon */}
                <div className="absolute top-3 right-3 select-none">
                  <span className={`text-[7px] font-black px-1.5 py-0.5 rounded uppercase ${
                    isLegendary 
                      ? "bg-red-500/10 text-red-500 border border-red-500/30" 
                      : isEpic 
                        ? "bg-[#95FF00]/10 text-[#95FF00] border border-[#95FF00]/30" 
                        : "bg-[#A8B0B8]/10 text-[#A8B0B8] border border-[#A8B0B8]/30"
                  }`}>
                    {medal.tier}
                  </span>
                </div>

                {/* Medal Icon Badge */}
                <div className="relative mb-6 mt-4 select-none">
                  {/* Rotating decorative target sights behind medal icon */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 rounded-full border border-dashed border-[#4D5B3D]/50 flex items-center justify-center"
                  />
                  <div className="absolute inset-2 border border-[#4D5B3D]/25 rounded-full flex items-center justify-center bg-black/40 text-[#95FF00]">
                    <Icon size={20} className="animate-pulse" />
                  </div>
                </div>

                {/* Text credentials */}
                <div className="space-y-2 mb-4 w-full">
                  <span className="block text-[8px] font-mono text-[#4D5B3D] tracking-widest uppercase select-none">
                    {medal.name}
                  </span>
                  <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide font-orbitron min-h-[36px] flex items-center justify-center leading-tight">
                    {medal.title}
                  </h3>
                  <p className="text-[11px] text-[#A8B0B8]/80 leading-relaxed font-light font-inter select-text">
                    {medal.description}
                  </p>
                </div>

                {/* Footer validation code */}
                <div className="w-full border-t border-[#4D5B3D]/15 pt-3 select-none">
                  <span className="text-[8px] font-mono text-[#4D5B3D] tracking-widest uppercase">STATUS // INVENTORIED</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
