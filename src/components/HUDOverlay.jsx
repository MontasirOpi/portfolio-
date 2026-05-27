import { useState, useEffect, useRef } from "react";
import { toggleSoundState, playRadioStatic, playTacticalClick } from "../utils/audio";
import { useTheme } from "../context/ThemeContext";
import { Volume2, VolumeX, MapPin, Monitor } from "lucide-react";

export default function HUDOverlay() {
  const { theme } = useTheme();
  const [fps, setFps] = useState(60);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");
  
  const frameCount = useRef(0);
  const lastTime = useRef(0);
  const requestRef = useRef(null);

  const isCod = theme === "cod";

  // Calculate real FPS
  useEffect(() => {
    const calcFps = (now) => {
      frameCount.current += 1;
      if (lastTime.current === 0) {
        lastTime.current = now;
      }
      if (now > lastTime.current + 1000) {
        setFps(Math.round((frameCount.current * 1000) / (now - lastTime.current)));
        frameCount.current = 0;
        lastTime.current = now;
      }
      requestRef.current = requestAnimationFrame(calcFps);
    };
    
    requestRef.current = requestAnimationFrame(calcFps);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Update clock
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const hrs = String(d.getHours()).padStart(2, '0');
      const mins = String(d.getMinutes()).padStart(2, '0');
      const secs = String(d.getSeconds()).padStart(2, '0');
      setTime(`${hrs}:${mins}:${secs}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleSound = () => {
    const nextState = toggleSoundState();
    setSoundEnabled(nextState);
    if (nextState) {
      playRadioStatic();
    } else {
      playTacticalClick();
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className={`fixed top-0 left-0 w-full h-[3px] z-[999] transition-colors duration-500 ${isCod ? "bg-[#1B1F24]" : "bg-slate-900/40"}`}>
        <div 
          className={`h-full transition-all duration-300 ${
            isCod 
              ? "bg-gradient-to-r from-[#4D5B3D] via-[#95FF00] to-white shadow-[0_0_8px_#95FF00]" 
              : "bg-gradient-to-r from-[#8B5CF6] via-[#22D3EE] to-white shadow-[0_0_8px_#22D3EE]"
          }`} 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Persistent Noise Overlay (COD only) */}
      {isCod && <div className="noise-overlay" />}

      {/* Floating HUD Panel - TOP RIGHT */}
      <div className={`fixed ${scrolled ? "top-20" : "top-24"} right-6 z-[998] flex items-center gap-3 select-none hidden md:flex transition-all duration-300`}>
        {/* Comms status widget */}
        <div className={`px-3 py-1.5 rounded flex items-center gap-2 text-[10px] tracking-widest border backdrop-blur-sm transition-all duration-500 ${
          isCod 
            ? "font-orbitron bg-[#0B0D0F]/80 border-[#4D5B3D]/30 text-[#A8B0B8]" 
            : "font-mono bg-[#1E293B]/70 border-white/10 text-slate-200"
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse-fast ${isCod ? "bg-[#95FF00]" : "bg-emerald-400"}`}></span>
          <span>{isCod ? "COMMS_LINK: ONLINE" : "DEV_MODE: ONLINE"}</span>
        </div>

        {/* Global Sound Control Widget */}
        <button 
          onClick={handleToggleSound}
          className={`flex items-center gap-2 border px-3 py-1.5 rounded cursor-pointer transition-all duration-300 text-[10px] ${
            isCod 
              ? `font-orbitron ${
                  soundEnabled 
                    ? "bg-[#95FF00]/10 text-[#95FF00] border-[#95FF00] shadow-[0_0_10px_rgba(149,255,0,0.2)]" 
                    : "bg-[#0B0D0F]/80 text-[#4D5B3D] border-[#4D5B3D]/30 hover:border-[#95FF00] hover:text-[#95FF00]"
                }` 
              : `font-mono ${
                  soundEnabled
                    ? "bg-[#8B5CF6]/20 text-[#22D3EE] border-[#8B5CF6]/50 shadow-[0_0_12px_rgba(139,92,246,0.25)]"
                    : "bg-[#1E293B]/70 text-slate-400 border-white/5 hover:border-[#8B5CF6] hover:text-white"
                }`
          }`}
        >
          {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
          <span className="tracking-widest">{soundEnabled ? "SYS_AUDIO: ON" : "SYS_AUDIO: MUTE"}</span>
        </button>
      </div>

      {/* HUD FPS Overlay - TOP LEFT */}
      <div className={`fixed ${scrolled ? "top-20" : "top-24"} left-6 z-[998] select-none text-[9px] tracking-widest hidden md:block leading-relaxed p-2.5 rounded border transition-all duration-300 backdrop-blur-sm ${
        isCod
          ? "font-orbitron text-[#4D5B3D] bg-[#0B0D0F]/45 border-transparent hover:border-[#4D5B3D]/25"
          : "font-mono text-slate-400 bg-[#1E293B]/45 border-white/5 hover:border-[#8B5CF6]/20"
      }`}>
        <div className={`flex items-center gap-1.5 font-bold ${isCod ? "text-[#95FF00]" : "text-[#22D3EE]"}`}>
          <Monitor size={10} />
          <span>FPS // {fps}</span>
          <span className="opacity-45">|</span>
          <span className={isCod ? "text-[#A8B0B8]" : "text-white"}>{time}</span>
        </div>
        <div className="opacity-75">{isCod ? "PING // 18ms" : "LATENCY // 18ms"}</div>
        <div className="opacity-75">{isCod ? "UPLINK // SAT_GEO_105A" : "STACK // FLUTTER_REACT"}</div>
      </div>

      {/* Floating Tactical HUD Panel - BOTTOM LEFT */}
      <div className={`fixed bottom-6 left-6 z-[998] select-none text-[9px] tracking-widest hidden md:block transition-all duration-500 ${
        isCod ? "font-orbitron text-[#4D5B3D]" : "font-mono text-slate-400/80"
      }`}>
        <div className="flex items-center gap-1">
          <MapPin size={10} className={isCod ? "text-[#95FF00]" : "text-[#22D3EE]"} />
          <span>{isCod ? "SECTOR: LAT_23.8 // LON_90.3" : "LOC // DHAKA, BANGLADESH"}</span>
        </div>
        <div>{isCod ? "CALLSIGN: OPI_V4.3" : "PORTFOLIO // VERSION_4.3"}</div>
      </div>

      {/* Floating Audio Controller for Mobile */}
      <div className="fixed top-4 right-4 z-[998] md:hidden">
        <button 
          onClick={handleToggleSound}
          className={`p-2.5 rounded-full border cursor-pointer transition-all duration-300 ${
            isCod 
              ? soundEnabled 
                ? "bg-[#95FF00]/10 text-[#95FF00] border-[#95FF00]" 
                : "bg-[#0B0D0F]/90 text-[#4D5B3D] border-[#4D5B3D]/30"
              : soundEnabled
                ? "bg-[#8B5CF6]/20 text-[#22D3EE] border-[#8B5CF6]/50 shadow-lg"
                : "bg-[#1E293B]/80 text-slate-400 border-white/10"
          }`}
        >
          {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
        </button>
      </div>
    </>
  );
}

