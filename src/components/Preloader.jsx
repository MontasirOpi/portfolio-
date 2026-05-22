import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playRadioStatic, playTacticalClick, toggleSoundState } from "../utils/audio";
import { Shield, Radio, Cpu, RefreshCw, Volume2, VolumeX } from "lucide-react";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentLog, setCurrentLog] = useState("");
  const [logIndex, setLogIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [soundChoice, setSoundChoice] = useState(false);

  const logs = [
    "AUTHENTICATING SECURE NETWORK...",
    "ESTABLISHING SATCOM LINK (ALPHA)...",
    "UPLINK STABLE. PING: 18MS.",
    "LOADING TACTICAL OPERATOR SCHEMATICS...",
    "EXTRACTING BIO DOSSIER: FAHIM MONTASIR OPI...",
    "DECRYPTING ARCHIVED MISSIONS & PROJECTS...",
    "WEAPON LOADOUT (SKILLS) INVENTORIED...",
    "SYNCHRONIZING FLEET CONTROL INTERFACES...",
    "RENDER STATE COMPILING SHADERS: 100%...",
    "READY FOR FIELD INFILTRATION."
  ];

  useEffect(() => {
    // Fast progress ticker
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        // Random incremental steps
        const step = Math.floor(Math.random() * 8) + 3;
        return Math.min(prev + step, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Sync logs with progress
    const segment = 100 / logs.length;
    const nextLogIdx = Math.min(Math.floor(progress / segment), logs.length - 1);
    if (nextLogIdx !== logIndex) {
      setLogIndex(nextLogIdx);
      setCurrentLog(logs[nextLogIdx]);
    }
  }, [progress, logIndex]);

  const handleDeploy = () => {
    if (soundChoice) {
      toggleSoundState(); // Enable sound
      playRadioStatic();
    }
    playTacticalClick();
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] bg-[#0B0D0F] military-grid flex flex-col justify-between p-6 sm:p-12 font-orbitron overflow-hidden select-none crt-grid"
    >
      {/* HUD Scanner overlay */}
      <div className="absolute inset-0 scanline-container opacity-40 pointer-events-none"></div>
      
      {/* Corner indicators */}
      <div className="flex justify-between items-start text-[10px] text-[#4D5B3D] tracking-widest z-10">
        <div>
          <p>SYS.LOC // DHAKA_BD</p>
          <p>NET.STATUS // ENCRYPTED</p>
        </div>
        <div className="text-right">
          <p>SECURE TERMINAL // V4.3</p>
          <p>PORTFOLIO_OS // INTEL</p>
        </div>
      </div>

      {/* Main Core Loading Console */}
      <div className="flex flex-col items-center justify-center flex-grow max-w-2xl mx-auto w-full z-10">
        <div className="relative mb-8">
          {/* Outer rotating dial */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 rounded-full border-2 border-dashed border-[#4D5B3D] flex items-center justify-center opacity-70"
          />
          {/* Inner pulsating circle */}
          <motion.div 
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-4 rounded-full border border-[#95FF00] flex items-center justify-center bg-black/40"
          >
            <div className="text-[#95FF00] font-bold text-lg">{progress}%</div>
          </motion.div>
        </div>

        {/* Title operator */}
        <h1 className="text-xl sm:text-2xl font-black text-[#A8B0B8] text-center mb-1 tracking-widest">
          SYSTEM INFILTRATION
        </h1>
        <p className="text-xs text-[#95FF00] tracking-[0.25em] mb-8 text-center text-hud-glow">
          CALLSIGN: OPERATOR_OPI
        </p>

        {/* Terminal Logs Window */}
        <div className="w-full bg-[#1B1F24]/90 border border-[#4D5B3D]/40 p-4 font-mono text-[10px] sm:text-xs text-[#A8B0B8] h-32 flex flex-col justify-end gap-1.5 rounded relative backdrop-blur-md">
          {/* Corners decoration */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#95FF00]"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#95FF00]"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#95FF00]"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#95FF00]"></div>
          
          <div className="text-[#4D5B3D]">// RECENT BOOT LOGS:</div>
          <div className="opacity-40">{logIndex > 1 ? logs[logIndex - 2] : ""}</div>
          <div className="opacity-60">{logIndex > 0 ? logs[logIndex - 1] : ""}</div>
          <div className="text-[#95FF00] font-medium flex items-center gap-2">
            <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-3 bg-[#95FF00]" />
            {currentLog}
          </div>
        </div>

        {/* Tactical Sound Selection Overlay */}
        {!isReady ? (
          <div className="mt-8 flex flex-col items-center">
            <div className="w-64 h-2 bg-[#1B1F24] border border-[#4D5B3D]/30 relative overflow-hidden rounded">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#4D5B3D] to-[#95FF00]" 
                style={{ width: `${progress}%` }} 
              />
            </div>
            <span className="text-[9px] text-[#4D5B3D] mt-2 tracking-widest uppercase">SHADER COMPILATION IN PROGRESS</span>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex flex-col items-center gap-4 w-full"
          >
            {/* Audio configuration check */}
            <div className="flex items-center gap-3 bg-black/60 border border-[#4D5B3D]/30 p-2.5 rounded max-w-sm w-full justify-between">
              <span className="text-[10px] text-[#A8B0B8] tracking-wider uppercase">INITIALIZE AUDIO SYSTEMS?</span>
              <button 
                onClick={() => setSoundChoice(!soundChoice)} 
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-[10px] font-bold transition-all border ${
                  soundChoice 
                    ? "bg-[#95FF00]/10 text-[#95FF00] border-[#95FF00]" 
                    : "bg-transparent text-[#4D5B3D] border-[#4D5B3D]/40"
                }`}
              >
                {soundChoice ? (
                  <>
                    <Volume2 size={12} /> ON
                  </>
                ) : (
                  <>
                    <VolumeX size={12} /> MUTED
                  </>
                )}
              </button>
            </div>

            {/* Deploy Trigger Button */}
            <button
              onClick={handleDeploy}
              className="px-8 py-3 bg-[#95FF00] text-black font-black text-sm tracking-widest btn-tactical cursor-pointer hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 w-full max-w-xs uppercase border border-[#95FF00]"
            >
              DEPLOY OPERATOR
            </button>
          </motion.div>
        )}
      </div>

      {/* Operational footer info */}
      <div className="flex justify-between items-end text-[9px] text-[#4D5B3D] tracking-wider z-10">
        <div>
          <p>© 2026 // MONTA.CODES</p>
        </div>
        <div className="text-right">
          <p>LOAD STATE // INFILTRATION_READY</p>
        </div>
      </div>
    </motion.div>
  );
}
