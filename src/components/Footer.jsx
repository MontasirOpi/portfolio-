import React, { useState, useEffect } from "react";
import { playHoverBeep, playTacticalClick } from "../utils/audio";
import { socialLinks } from "../data/socialLinks";
import { profileData } from "../data/profile";
import { Shield, ChevronUp, Radio } from "lucide-react";

export default function Footer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev + 1) % 1000000);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToTop = () => {
    playTacticalClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0B0D0F] border-t border-[#4D5B3D]/30 py-12 font-orbitron select-none relative overflow-hidden">
      
      {/* Background scan overlays */}
      <div className="absolute inset-0 scanline-container opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-[#4D5B3D]/15 pb-8 mb-8">
          
          {/* Column 1 - Identity Info */}
          <div className="text-center md:text-left space-y-2">
            <span className="text-[10px] font-black text-[#95FF00] tracking-[0.2em] uppercase">
              FAHIM MONTASIR OPI
            </span>
            <p className="text-[9px] text-[#4D5B3D] tracking-widest uppercase block leading-tight">
              OPERATIVE DOSSIER // CROSS-PLATFORM SPECIALIST
            </p>
            <p className="text-[8px] text-[#4D5B3D] uppercase select-text">
              SYS_TICKS: {String(seconds).padStart(6, '0')} // OP_ENV: ACTIVE
            </p>
          </div>

          {/* Column 2 - Mini Radar Scanning Display */}
          <div className="flex flex-col items-center justify-center space-y-3 select-none">
            <div className="relative w-12 h-12 border border-[#4D5B3D]/50 rounded-full flex items-center justify-center bg-black/40 overflow-hidden">
              {/* Radar Sweeper Dial */}
              <div className="radar-sweep-indicator"></div>
              
              {/* Radar grids crosshairs */}
              <div className="absolute w-full h-[0.5px] bg-[#4D5B3D]/25"></div>
              <div className="absolute h-full w-[0.5px] bg-[#4D5B3D]/25"></div>
              
              <Radio size={12} className="text-[#95FF00] opacity-40 animate-pulse" />
            </div>
            <span className="text-[7px] text-[#4D5B3D] tracking-widest uppercase">PASSIVE_SECTOR_RADAR</span>
          </div>

          {/* Column 3 - Back to Top trigger */}
          <div className="flex justify-center md:justify-end select-none">
            <button
              onClick={handleScrollToTop}
              onMouseEnter={playHoverBeep}
              className="px-5 py-2.5 border border-[#4D5B3D]/30 text-[#A8B0B8] hover:border-[#95FF00] hover:text-[#95FF00] bg-[#1B1F24]/50 rounded transition-all flex items-center gap-2 cursor-pointer hoverable text-[9px] font-black tracking-widest uppercase"
            >
              <ChevronUp size={13} className="animate-bounce" />
              RETRACT TO LOBBY
            </button>
          </div>

        </div>

        {/* Bottom row copyrights and encryption data bars */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] text-[#4D5B3D] tracking-widest uppercase">
          <div>
            <span>© 2026 // FAHIM MONTASIR OPI // CLASSIFIED INTEL</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 select-text">
            <span>KEY: MONTA_SH4_256</span>
            <span>PING: 18MS</span>
            <span>SERVER: GEO_STATION_ALPHA</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
