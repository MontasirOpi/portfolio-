import { useMemo } from "react";
import { motion } from "framer-motion";
import { playHoverBeep } from "../utils/audio";
import { Smartphone, Monitor, Database, Settings } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Services() {
  const { theme } = useTheme();
  const isCod = theme === "cod";

  const capabilities = useMemo(() => [
    {
      id: "cap-01",
      icon: Smartphone,
      title: isCod ? "CROSS-PLATFORM MOBILE ENGINEERING" : "CROSS-PLATFORM MOBILE ENGINEERING",
      description: "Compiling native-grade applications for iOS & Android using Flutter. Focused on building polished, fluid UI/UX, optimized garbage collection profiles, and standard offline-first states.",
      highlight: isCod ? "FLUTTER & DART SPECIALIST" : "FLUTTER & DART SPECIALIST"
    },
    {
      id: "cap-02",
      icon: Monitor,
      title: isCod ? "FRONTEND TACTICAL PORTALS" : "FRONTEND WEB DEVELOPMENT",
      description: "Architecting component-driven web interfaces using React.js and vanilla CSS/Tailwind. Crafting immersive single-page applications with smooth timeline animations and responsive grids.",
      highlight: isCod ? "MODERN REACT DESIGN" : "MODERN FRONTEND ARCHITECT"
    },
    {
      id: "cap-03",
      icon: Database,
      title: isCod ? "SECURE BACKEND ARCHITECTURE" : "SECURE BACKEND INTEGRATION",
      description: "Integrating real-time sync systems using Firebase & Supabase. Configuring secure row-level databases (RLS), custom auth routers, and fast WebSocket/MQTT message brokers.",
      highlight: isCod ? "SUPABASE / FIREBASE" : "REAL-TIME DATABASES"
    },
    {
      id: "cap-04",
      icon: Settings,
      title: isCod ? "OTA & FLEET UPDATE PIPELINES" : "DEVOPS & RELEASE PIPELINES",
      description: "Designing end-to-end Over-The-Air update workflows for large device fleets. Developing campaign planners, targeting segments, live telemetry charts, and automated build pipelines.",
      highlight: isCod ? "AUTOMATION & SCALING" : "CI/CD & AUTOMATION"
    }
  ], [isCod]);

  return (
    <section 
      id="services" 
      className={`py-24 transition-colors duration-700 ${
        isCod 
          ? "bg-[#0B0D0F] border-b border-[#4D5B3D]/25 select-none relative font-orbitron overflow-hidden" 
          : "bg-[#0F172A] border-b border-white/5 relative font-inter overflow-hidden"
      }`}
    >
      {/* Background scan overlays (COD only) */}
      {isCod && <div className="absolute inset-0 scanline-container opacity-10 pointer-events-none"></div>}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center lg:text-left">
          <div className={`text-[10px] tracking-[0.3em] font-black uppercase mb-1.5 flex items-center justify-center lg:justify-start gap-2 ${
            isCod ? "text-[#95FF00]" : "text-[#8B5CF6]"
          }`}>
            <span className={`w-2 h-2 animate-pulse ${isCod ? "bg-[#95FF00]" : "bg-[#8B5CF6]"}`}></span>
            {isCod ? "TACTICAL_SPECS // FIELD_CAPABILITIES" : "🛠️ Core services // development models"}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-widest uppercase">
            {isCod ? "OPERATIONAL SPECS" : "SERVICES & EXPERTISE"}
          </h2>
          <div className={`w-24 h-[3px] mt-3 mx-auto lg:mx-0 shadow-lg ${
            isCod ? "bg-[#95FF00] shadow-[0_0_8px_#95FF00]" : "bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] shadow-[#8B5CF6]/30"
          }`}></div>
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
                className={`p-6 transition-all select-text duration-300 relative backdrop-blur-md ${
                  isCod 
                    ? "bg-[#1B1F24]/85 border border-[#4D5B3D]/30 rounded hover:border-[#95FF00] hover:bg-[#95FF00]/5" 
                    : "glass-card rounded-2xl border border-white/5 hover:border-[#8B5CF6]/30 bg-slate-800/40 hover:bg-slate-800/60 shadow-lg shadow-black/10"
                }`}
              >
                {/* Corner detail decoration (COD only) */}
                {isCod && (
                  <>
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#95FF00]/40"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#95FF00]/40"></div>
                  </>
                )}

                <div className="flex gap-4 items-start">
                  {/* Icon bracket container */}
                  <div className={`w-12 h-12 flex items-center justify-center shrink-0 select-none ${
                    isCod
                      ? "border border-[#4D5B3D]/50 bg-black/40 text-[#95FF00] shadow-[0_0_10px_rgba(149,255,0,0.15)]"
                      : "border border-white/5 bg-slate-900 text-[#22D3EE] rounded-xl"
                  }`}>
                    <Icon size={20} />
                  </div>

                  <div className="space-y-2">
                    {/* Role subtitle */}
                    <span className={`inline-block text-[8px] font-mono px-2 py-0.5 rounded uppercase tracking-wider select-none ${
                      isCod 
                        ? "bg-[#4D5B3D]/25 text-[#95FF00]" 
                        : "bg-[#8B5CF6]/15 text-[#22D3EE] border border-[#8B5CF6]/20 font-bold"
                    }`}>
                      {cap.highlight}
                    </span>

                    {/* Role Title */}
                    <h3 className={`text-sm sm:text-base font-black text-white uppercase tracking-wide ${
                      isCod ? "font-orbitron" : "font-sans font-bold"
                    }`}>
                      {cap.title}
                    </h3>

                    {/* Description Copy */}
                    <p className={`text-xs leading-relaxed ${
                      isCod ? "text-[#A8B0B8]/80 font-inter" : "text-slate-300 font-sans font-light"
                    }`}>
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
