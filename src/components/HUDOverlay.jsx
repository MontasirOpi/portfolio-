import React, { useState, useEffect, useRef } from "react";
import { toggleSoundState, getSoundState, playRadioStatic, playTacticalClick } from "../utils/audio";
import { Volume2, VolumeX, Radio, ShieldCheck, MapPin } from "lucide-react";

export default function HUDOverlay() {
  const [fps, setFps] = useState(60);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [time, setTime] = useState("");
  
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const requestRef = useRef(null);

  // Calculate real FPS
  useEffect(() => {
    const calcFps = (now) => {
      frameCount.current += 1;
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
      <div className="fixed top-0 left-0 w-full h-[3px] bg-[#1B1F24] z-[999]">
        <div 
          className="h-full bg-gradient-to-r from-[#4D5B3D] via-[#95FF00] to-white shadow-[0_0_8px_#95FF00]" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Persistent Noise Overlay */}
      <div className="noise-overlay" />

      {/* Floating Tactical HUD Panel - TOP RIGHT */}
      <div className="fixed top-6 right-6 z-[998] flex items-center gap-4 select-none font-orbitron text-[10px] hidden md:flex">
        {/* Connection status */}
        <div className="bg-[#0B0D0F]/80 border border-[#4D5B3D]/30 px-3 py-1.5 rounded flex items-center gap-2 text-[#A8B0B8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#95FF00] animate-pulse-fast"></span>
          <span className="tracking-widest">COMMS_LINK: ONLINE</span>
        </div>

        {/* Global Sound Control Widget */}
        <button 
          onClick={handleToggleSound}
          className={`flex items-center gap-2 border px-3 py-1.5 rounded cursor-pointer transition-all duration-300 ${
            soundEnabled 
              ? "bg-[#95FF00]/10 text-[#95FF00] border-[#95FF00] shadow-[0_0_10px_rgba(149,255,0,0.2)]" 
              : "bg-[#0B0D0F]/80 text-[#4D5B3D] border-[#4D5B3D]/30 hover:border-[#95FF00] hover:text-[#95FF00]"
          }`}
        >
          {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
          <span className="tracking-widest">{soundEnabled ? "SYS_AUDIO: ON" : "SYS_AUDIO: MUTE"}</span>
        </button>
      </div>

      {/* HUD FPS Overlay - TOP LEFT */}
      <div className="fixed top-6 left-6 z-[998] select-none font-orbitron text-[9px] text-[#4D5B3D] tracking-widest hidden md:block leading-relaxed bg-[#0B0D0F]/45 p-2 rounded border border-transparent hover:border-[#4D5B3D]/25 transition-all">
        <div className="flex items-center gap-1.5 text-[#95FF00]">
          <span className="font-bold">FPS // {fps}</span>
          <span className="opacity-40">|</span>
          <span className="text-[8px] text-[#A8B0B8]">{time}</span>
        </div>
        <div>PING // 18ms</div>
        <div>UPLINK // SAT_GEO_105A</div>
        <div>SYSTEM // ACTIVE</div>
      </div>

      {/* Floating Tactical HUD Panel - BOTTOM LEFT */}
      <div className="fixed bottom-6 left-6 z-[998] select-none font-orbitron text-[9px] text-[#4D5B3D] tracking-widest hidden md:block">
        <div className="flex items-center gap-1">
          <MapPin size={10} className="text-[#95FF00]" />
          <span>SECTOR: LAT_23.8 // LON_90.3</span>
        </div>
        <div>CALLSIGN: OPI_V4.3</div>
      </div>

      {/* Floating Audio Controller for Mobile (Top-right corner, compact) */}
      <div className="fixed top-4 right-4 z-[998] md:hidden">
        <button 
          onClick={handleToggleSound}
          className={`p-2.5 rounded-full border cursor-pointer ${
            soundEnabled 
              ? "bg-[#95FF00]/10 text-[#95FF00] border-[#95FF00]" 
              : "bg-[#0B0D0F]/90 text-[#4D5B3D] border-[#4D5B3D]/30"
          }`}
        >
          {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
        </button>
      </div>
    </>
  );
}
