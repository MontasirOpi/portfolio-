import React from "react";
import { motion } from "framer-motion";
import { playHoverBeep } from "../utils/audio";
import { Smartphone, Monitor, Database, Settings, Shield, Award } from "lucide-react";

export default function Services() {
  const capabilities = [
    {
      id: "cap-01",
      icon: Smartphone,
      title: "CROSS-PLATFORM MOBILE ENGINEERING",
      description: "Compiling native-grade applications for iOS & Android using Flutter. Focused on building polished, fluid UI/UX, optimized garbage collection profiles, and standard offline-first states.",
      highlight: "FLUTTER & DART SPECIALIST"
    },
    {
      id: "cap-02",
      icon: Monitor,
      title: "FRONTEND TACTICAL PORTALS",
      description: "Architecting component-driven web interfaces using React.js and vanilla CSS/Tailwind. Crafting immersive single-page applications with smooth timeline animations and responsive grids.",
      highlight: "MODERN REACT DESIGN"
    },
    {
      id: "cap-03",
      icon: Database,
      title: "SECURE BACKEND ARCHITECTURE",
      description: "Integrating real-time sync systems using Firebase & Supabase. Configuring secure row-level databases (RLS), custom auth routers, and fast WebSocket/MQTT message brokers.",
      highlight: "SUPABASE / FIREBASE"
    },
    {
      id: "cap-04",
      icon: Settings,
      title: "OTA & FLEET UPDATE PIPELINES",
      description: "Designing end-to-end Over-The-Air update workflows for large device fleets. Developing campaign planners, targeting segments, live telemetry charts, and automated build pipelines.",
      highlight: "AUTOMATION & SCALING"
    }
  ];

  return (
    <section 
      id="services" 
      className="py-24 bg-[#0B0D0F] border-b border-[#4D5B3D]/25 select-none relative font-orbitron overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center lg:text-left">
          <div className="text-[10px] text-[#95FF00] tracking-[0.3em] font-black uppercase mb-1.5 flex items-center justify-center lg:justify-start gap-2">
            <span className="w-2 h-2 bg-[#95FF00] animate-pulse"></span>
            TACTICAL_SPECS // FIELD_CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-widest uppercase">
            OPERATIONAL SPECS
          </h2>
          <div className="w-24 h-[3px] bg-[#95FF00] mt-3 mx-auto lg:mx-0 shadow-[0_0_8px_#95FF00]"></div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={playHoverBeep}
                className="bg-[#1B1F24]/85 border border-[#4D5B3D]/30 p-6 rounded hover:border-[#95FF00] hover:bg-[#95FF00]/5 transition-all select-text duration-300 relative backdrop-blur-md"
              >
                {/* Corner detail decoration */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#95FF00]/40"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#95FF00]/40"></div>

                <div className="flex gap-4 items-start">
                  {/* Icon bracket container */}
                  <div className="w-12 h-12 border border-[#4D5B3D]/50 flex items-center justify-center bg-black/40 text-[#95FF00] shadow-[0_0_10px_rgba(149,255,0,0.15)] shrink-0 select-none">
                    <Icon size={20} />
                  </div>

                  <div className="space-y-2">
                    {/* Role subtitle */}
                    <span className="inline-block text-[8px] font-mono px-2 py-0.5 bg-[#4D5B3D]/25 text-[#95FF00] rounded uppercase tracking-wider select-none">
                      {cap.highlight}
                    </span>

                    {/* Role Title */}
                    <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wide">
                      {cap.title}
                    </h3>

                    {/* Description Copy */}
                    <p className="text-xs text-[#A8B0B8]/80 leading-relaxed font-light font-inter">
                      {cap.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
