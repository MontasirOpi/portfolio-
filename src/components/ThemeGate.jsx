import { useState } from "react";
import { motion } from "framer-motion";
import { playHoverBeep, playTacticalClick, playRadioStatic, playSelectSweep } from "../utils/audio";
import { Target, Smartphone, Sparkles, Shield } from "lucide-react";

export default function ThemeGate({ onSelect }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleSelect = (mode) => {
    playTacticalClick();
    if (mode === "cod") {
      playRadioStatic();
    } else {
      playSelectSweep();
    }
    onSelect(mode);
  };

  const handleHoverStart = (card) => {
    playHoverBeep();
    setHoveredCard(card);
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-[#070A13] flex flex-col justify-between p-6 sm:p-12 text-center select-none font-inter overflow-y-auto">
      {/* Background SaaS subtle grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
      
      {/* Subtle ambient gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blob-purple blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blob-cyan blur-3xl opacity-20 pointer-events-none" />

      {/* Top logo indicator */}
      <div className="text-[10px] tracking-[0.3em] text-slate-500 uppercase font-mono mt-2">
        // CHOOSE INTERFACE ROUTE // SYSTEM V4.3
      </div>

      {/* Main Core Selector */}
      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto w-full py-8">
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-widest uppercase mb-2 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          CHOOSE YOUR INTERFACE
        </h1>
        <p className="text-xs text-slate-400 max-w-md mb-12 tracking-wide font-light">
          Select a decrypted visual paradigm to load Fahim Montasir Opi's core technical portfolio environment.
        </p>

        {/* Dynamic Mode Option Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-stretch">
          
          {/* Card Left: COD Tactical Mode */}
          <motion.div
            onClick={() => handleSelect("cod")}
            onMouseEnter={() => handleHoverStart("cod")}
            onMouseLeave={() => setHoveredCard(null)}
            whileHover={{ scale: 1.025, y: -4 }}
            className={`cursor-pointer text-left p-6 sm:p-8 rounded transition-all duration-300 relative overflow-hidden flex flex-col justify-between aspect-[4/3] sm:aspect-square bg-black/60 border ${
              hoveredCard === "cod"
                ? "border-[#95FF00] shadow-[0_0_30px_rgba(149,255,0,0.15)] bg-black/85"
                : "border-[#4D5B3D]/30"
            }`}
          >
            {/* Tactical grid background overlay inside card */}
            <div className="absolute inset-0 military-grid opacity-10 pointer-events-none" />
            {hoveredCard === "cod" && <div className="absolute inset-0 scanline-container opacity-20 pointer-events-none" />}

            {/* Tactical Corners */}
            <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 transition-colors ${hoveredCard === "cod" ? "border-[#95FF00]" : "border-[#4D5B3D]/40"}`}></div>
            <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 transition-colors ${hoveredCard === "cod" ? "border-[#95FF00]" : "border-[#4D5B3D]/40"}`}></div>
            <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 transition-colors ${hoveredCard === "cod" ? "border-[#95FF00]" : "border-[#4D5B3D]/40"}`}></div>
            <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 transition-colors ${hoveredCard === "cod" ? "border-[#95FF00]" : "border-[#4D5B3D]/40"}`}></div>

            {/* Card Header */}
            <div className="flex justify-between items-start font-mono text-[9px] text-[#4D5B3D] tracking-widest uppercase">
              <span>SYS_DECRYPT // CLASSIFIED</span>
              <Shield size={12} className={hoveredCard === "cod" ? "text-[#95FF00] animate-pulse" : "text-[#4D5B3D]"} />
            </div>

            {/* Main Label */}
            <div className="space-y-3 my-6">
              <div className="w-12 h-12 rounded border border-[#4D5B3D]/40 flex items-center justify-center bg-black/80">
                <Target size={22} className={hoveredCard === "cod" ? "text-[#95FF00] animate-pulse" : "text-[#4D5B3D]"} />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-widest font-orbitron uppercase">
                TACTICAL HUD
              </h2>
              <p className="text-xs text-slate-400 font-light leading-relaxed font-mono">
                Cinema-themed military console featuring radar scanners, target crosshairs, security grids, and heavy synthetic ticks.
              </p>
            </div>

            {/* Card Footer status */}
            <div className="w-full border-t border-[#4D5B3D]/20 pt-4 flex justify-between items-center text-[9px] font-mono text-[#4D5B3D] tracking-wider">
              <span>ESTABLISH LOBBY &gt;&gt;</span>
              <span className={hoveredCard === "cod" ? "text-[#95FF00] font-black" : ""}>STANDBY // DECRYPT</span>
            </div>
          </motion.div>

          {/* Card Right: Professional Dev Mode */}
          <motion.div
            onClick={() => handleSelect("mobile-dev")}
            onMouseEnter={() => handleHoverStart("dev")}
            onMouseLeave={() => setHoveredCard(null)}
            whileHover={{ scale: 1.025, y: -4 }}
            className={`cursor-pointer text-left p-6 sm:p-8 rounded-3xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between aspect-[4/3] sm:aspect-square bg-white/5 border backdrop-blur-md ${
              hoveredCard === "dev"
                ? "border-[#8B5CF6]/50 shadow-[0_0_35px_rgba(139,92,246,0.25)] bg-[#0B0F1B]/75"
                : "border-white/5"
            }`}
          >
            {/* Ambient inner soft blob glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full blob-purple blur-3xl opacity-20 pointer-events-none" />

            {/* Card Header */}
            <div className="flex justify-between items-start font-mono text-[9px] text-slate-500 tracking-wider">
              <span>SECURE_UPLINK // CLIENT_GATE</span>
              <Sparkles size={11} className={hoveredCard === "dev" ? "text-[#22D3EE] animate-bounce" : "text-slate-500"} />
            </div>

            {/* Main Label */}
            <div className="space-y-3 my-6">
              <div className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center bg-slate-900 shadow-md">
                <Smartphone size={20} className={hoveredCard === "dev" ? "text-[#22D3EE] animate-bounce" : "text-slate-400"} />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase">
                PROFESSIONAL DEV
              </h2>
              <p className="text-xs text-slate-300 font-light leading-relaxed font-sans">
                Premium glassmorphism layouts featuring iOS widgets, interactive live code sandboxes, smooth gradient sweeps, and refined developer profiles.
              </p>
            </div>

            {/* Card Footer status */}
            <div className="w-full border-t border-white/5 pt-4 flex justify-between items-center text-[9px] font-mono text-slate-500 tracking-wider">
              <span>MOUNT SYSTEM ENGINE &gt;&gt;</span>
              <span className={`font-bold transition-colors ${hoveredCard === "dev" ? "text-[#22D3EE]" : ""}`}>READY // CONNECT</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Operational footer info */}
      <div className="text-[9px] text-slate-600 tracking-wider uppercase">
        © 2026 FAHIM MONTASIR OPI // DIRECT DEPLOY CHANNELS
      </div>
    </div>
  );
}
