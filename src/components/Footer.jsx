import { useState, useEffect } from "react";
import { playHoverBeep, playTacticalClick } from "../utils/audio";
import { useTheme } from "../context/ThemeContext";
import { ChevronUp, Radio, Smartphone, Heart } from "lucide-react";

export default function Footer() {
  const { theme } = useTheme();
  const [seconds, setSeconds] = useState(0);

  const isCod = theme === "cod";

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
    <footer className={`border-t transition-all duration-500 py-12 ${
      isCod 
        ? "bg-[#0B0D0F] border-[#4D5B3D]/30 font-orbitron select-none relative overflow-hidden" 
        : "bg-[#0F172A] border-white/5 font-inter select-none relative overflow-hidden shadow-2xl"
    }`}>
      
      {/* Background scan overlays (COD only) */}
      {isCod && <div className="absolute inset-0 scanline-container opacity-5 pointer-events-none"></div>}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b pb-8 mb-8 ${
          isCod ? "border-[#4D5B3D]/15" : "border-white/5"
        }`}>
          
          {/* Column 1 - Identity Info */}
          <div className="text-center md:text-left space-y-2">
            <span className={`text-[10px] font-black tracking-[0.2em] uppercase block ${
              isCod ? "text-[#95FF00]" : "text-white text-xs bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text text-transparent"
            }`}>
              FAHIM MONTASIR OPI
            </span>
            <p className={`text-[9px] tracking-widest uppercase block leading-tight ${
              isCod ? "text-[#4D5B3D]" : "text-slate-400 font-semibold"
            }`}>
              {isCod ? "OPERATIVE DOSSIER // CROSS-PLATFORM SPECIALIST" : "MOBILE APP DEVELOPER // CROSS-PLATFORM ARCHITECT"}
            </p>
            <p className={`text-[8px] uppercase select-text ${isCod ? "text-[#4D5B3D]" : "text-slate-500"}`}>
              {isCod 
                ? `SYS_TICKS: ${String(seconds).padStart(6, '0')} // OP_ENV: ACTIVE` 
                : `UPTIME: ${seconds}s // ENV: PRODUCTION`}
            </p>
          </div>

          {/* Column 2 - Mini Scanning Display / Tech Pulse */}
          <div className="flex flex-col items-center justify-center space-y-3 select-none">
            <div className={`relative w-12 h-12 border rounded-full flex items-center justify-center bg-black/40 overflow-hidden transition-colors ${
              isCod ? "border-[#4D5B3D]/50" : "border-white/10"
            }`}>
              {/* Radar Sweeper Dial / Gradient spinner */}
              {isCod ? (
                <>
                  <div className="radar-sweep-indicator"></div>
                  <Radio size={12} className="text-[#95FF00] opacity-40 animate-pulse" />
                </>
              ) : (
                <div className="absolute inset-0.5 rounded-full bg-slate-950 flex items-center justify-center">
                  <Smartphone size={14} className="text-[#22D3EE] animate-bounce opacity-70" />
                  <div className="absolute inset-0 rounded-full border border-dashed border-[#8B5CF6]/30 animate-spin opacity-60" style={{ animationDuration: '8s' }}></div>
                </div>
              )}
              
              {/* Radar grids crosshairs */}
              {isCod && (
                <>
                  <div className="absolute w-full h-[0.5px] bg-[#4D5B3D]/25"></div>
                  <div className="absolute h-full w-[0.5px] bg-[#4D5B3D]/25"></div>
                </>
              )}
            </div>
            <span className={`text-[7px] tracking-widest uppercase ${isCod ? "text-[#4D5B3D]" : "text-slate-500 font-semibold"}`}>
              {isCod ? "PASSIVE_SECTOR_RADAR" : "CREATIVE_CORE_ALIVE"}
            </span>
          </div>

          {/* Column 3 - Back to Top trigger */}
          <div className="flex justify-center md:justify-end select-none">
            <button
              onClick={handleScrollToTop}
              onMouseEnter={playHoverBeep}
              className={`px-5 py-2.5 transition-all flex items-center gap-2 cursor-pointer hoverable text-[9px] font-black tracking-widest uppercase ${
                isCod
                  ? "border border-[#4D5B3D]/30 text-[#A8B0B8] hover:border-[#95FF00] hover:text-[#95FF00] bg-[#1B1F24]/50 rounded"
                  : "border border-white/10 text-slate-300 hover:border-[#8B5CF6]/50 hover:text-white bg-slate-800/40 rounded-lg hover:shadow-[0_2px_15px_rgba(139,92,246,0.15)]"
              }`}
            >
              <ChevronUp size={13} className="animate-bounce" />
              {isCod ? "RETRACT TO LOBBY" : "SCROLL TO APEX"}
            </button>
          </div>

        </div>

        {/* Bottom row copyrights and stack tags */}
        <div className={`flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] tracking-widest uppercase ${
          isCod ? "text-[#4D5B3D]" : "text-slate-500 font-medium"
        }`}>
          <div>
            <span>{isCod ? "© 2026 // FAHIM MONTASIR OPI // CLASSIFIED INTEL" : "© 2026 // FAHIM MONTASIR OPI // HANDCRAFTED DESIGN"}</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 select-text">
            {isCod ? (
              <>
                <span>KEY: MONTA_SH4_256</span>
                <span>PING: 18MS</span>
                <span>SERVER: GEO_STATION_ALPHA</span>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1">BUILT WITH <Heart size={10} className="text-[#8B5CF6]" /> & REACT</span>
                <span>FLUTTER / DART / SUPABASE</span>
                <span>SECURE // HTTPS</span>
              </>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}

