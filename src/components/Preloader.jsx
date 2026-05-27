import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { playRadioStatic, playSelectSweep, playTacticalClick, toggleSoundState } from "../utils/audio";
import { Volume2, VolumeX } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Preloader({ onComplete }) {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [soundChoice, setSoundChoice] = useState(false);

  const isCod = theme === "cod";

  const codLogs = [
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

  const devLogs = [
    "INITIALIZING SECURE SSL HANDSHAKE...",
    "ESTABLISHING API GATEWAY NODE (OPI.DEV)...",
    "CONNECTION STABLE. LATENCY: 18MS.",
    "LOADING DEVELOPER PROFILE ENVIRONMENT...",
    "RESOLVING ASSET MAP: FAHIM MONTASIR OPI...",
    "COMPILED WORK EXPERIENCE & MISSIONS...",
    "ACQUIRING TECHNICAL SKILL ARRAYS...",
    "SYNCHRONIZING SECURE REPOSITORIES...",
    "COMPILING SHADERS & STYLESHEET TOKENS...",
    "SUITE READY FOR SYSTEM MOUNT."
  ];

  const logs = isCod ? codLogs : devLogs;

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
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const segment = 100 / logs.length;
  const logIndex = Math.min(Math.floor(progress / segment), logs.length - 1);
  const currentLog = logs[logIndex];

  const handleDeploy = () => {
    if (soundChoice) {
      toggleSoundState(); // Enable sound
      if (isCod) {
        playRadioStatic();
      } else {
        playSelectSweep();
      }
    }
    playTacticalClick();
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className={`fixed inset-0 z-[9999] flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none ${
        isCod 
          ? "bg-[#0B0D0F] military-grid font-orbitron crt-grid" 
          : "bg-[#0F172A] font-inter"
      }`}
    >
      {/* Background graphics based on theme */}
      {isCod ? (
        <div className="absolute inset-0 scanline-container opacity-40 pointer-events-none"></div>
      ) : (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blob-purple blur-3xl opacity-35" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blob-cyan blur-3xl opacity-35" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px]" />
        </div>
      )}
      
      {/* Corner indicators */}
      <div className={`flex justify-between items-start text-[10px] tracking-widest z-10 ${
        isCod ? "text-[#4D5B3D]" : "text-slate-400 font-mono"
      }`}>
        <div>
          <p>SYS.LOC // DHAKA_BD</p>
          <p>NET.STATUS // ENCRYPTED</p>
        </div>
        <div className="text-right">
          <p>SECURE TERMINAL // V4.3</p>
          <p>{isCod ? "PORTFOLIO_OS // INTEL" : "ENVIRONMENT // ONLINE"}</p>
        </div>
      </div>

      {/* Main Core Loading Console */}
      <div className="flex flex-col items-center justify-center flex-grow max-w-2xl mx-auto w-full z-10">
        <div className="relative mb-8">
          {/* Outer rotating dial */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className={`w-32 h-32 rounded-full border-2 border-dashed flex items-center justify-center opacity-70 ${
              isCod ? "border-[#4D5B3D]" : "border-slate-700"
            }`}
          />
          {/* Inner pulsating circle */}
          <motion.div 
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute inset-4 rounded-full border flex items-center justify-center bg-black/40 ${
              isCod ? "border-[#95FF00]" : "border-[#8B5CF6]"
            }`}
          >
            <div className={`font-bold text-lg ${isCod ? "text-[#95FF00] text-hud-glow" : "bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text text-transparent"}`}>{progress}%</div>
          </motion.div>
        </div>

        {/* Title operator */}
        <h1 className="text-xl sm:text-2xl font-black text-white text-center mb-1 tracking-widest">
          {isCod ? "SYSTEM INFILTRATION" : "INITIALIZING DEV SUITE"}
        </h1>
        <p className={`text-xs tracking-[0.25em] mb-8 text-center uppercase ${
          isCod ? "text-[#95FF00] text-hud-glow" : "text-[#22D3EE] font-semibold"
        }`}>
          {isCod ? "CALLSIGN: OPERATOR_OPI" : "ENVIRONMENT: OPI.DEV SYSTEM"}
        </p>

        {/* Terminal Logs Window */}
        <div className={`w-full p-4 font-mono text-[10px] sm:text-xs text-[#A8B0B8] h-32 flex flex-col justify-end gap-1.5 rounded relative backdrop-blur-md transition-all duration-300 ${
          isCod 
            ? "bg-[#1B1F24]/90 border border-[#4D5B3D]/40" 
            : "bg-[#0F172A]/90 border border-white/5 shadow-2xl rounded-2xl"
        }`}>
          {/* Corners decoration (COD only) */}
          {isCod && (
            <>
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#95FF00]"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#95FF00]"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#95FF00]"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#95FF00]"></div>
            </>
          )}
          
          <div className={`${isCod ? "text-[#4D5B3D]" : "text-slate-500"} font-bold`}>
            {isCod ? "// RECENT BOOT LOGS:" : "// SUITE PARSING STREAM:"}
          </div>
          <div className="opacity-40">{logIndex > 1 ? logs[logIndex - 2] : ""}</div>
          <div className="opacity-60">{logIndex > 0 ? logs[logIndex - 1] : ""}</div>
          <div className={`font-medium flex items-center gap-2 ${isCod ? "text-[#95FF00]" : "text-[#22D3EE]"}`}>
            <motion.div 
              animate={{ opacity: [1, 0, 1] }} 
              transition={{ repeat: Infinity, duration: 1 }} 
              className={`w-1.5 h-3 ${isCod ? "bg-[#95FF00]" : "bg-[#22D3EE]"}`} 
            />
            {currentLog}
          </div>
        </div>

        {/* Tactical Sound Selection Overlay */}
        {!isReady ? (
          <div className="mt-8 flex flex-col items-center">
            <div className={`w-64 h-2 bg-black/60 relative overflow-hidden rounded border ${
              isCod ? "border-[#4D5B3D]/30" : "border-white/5"
            }`}>
              <motion.div 
                className={`absolute top-0 left-0 h-full ${
                  isCod ? "bg-gradient-to-r from-[#4D5B3D] to-[#95FF00]" : "bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE]"
                }`}
                style={{ width: `${progress}%` }} 
              />
            </div>
            <span className={`text-[9px] mt-2 tracking-widest uppercase ${isCod ? "text-[#4D5B3D]" : "text-slate-500 font-semibold"}`}>
              {isCod ? "SHADER COMPILATION IN PROGRESS" : "RESOLVING SYSTEM RESOURCES"}
            </span>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex flex-col items-center gap-4 w-full"
          >
            {/* Audio configuration check */}
            <div className={`flex items-center gap-3 bg-black/60 p-2.5 rounded-xl max-w-sm w-full justify-between border ${
              isCod ? "border-[#4D5B3D]/30" : "border-white/5"
            }`}>
              <span className="text-[10px] text-slate-300 tracking-wider uppercase font-semibold">
                {isCod ? "INITIALIZE AUDIO SYSTEMS?" : "ENABLE AMBIENT AUDIO?"}
              </span>
              <button 
                onClick={() => setSoundChoice(!soundChoice)} 
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-[10px] font-bold transition-all border cursor-pointer ${
                  soundChoice 
                    ? isCod
                      ? "bg-[#95FF00]/10 text-[#95FF00] border-[#95FF00]" 
                      : "bg-[#8B5CF6]/15 text-[#22D3EE] border-[#8B5CF6]/30"
                    : isCod
                      ? "bg-transparent text-[#4D5B3D] border-[#4D5B3D]/40"
                      : "bg-transparent text-slate-500 border-white/5"
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
              className={`px-8 py-3.5 font-black text-sm tracking-widest cursor-pointer uppercase transition-all duration-300 w-full max-w-xs border ${
                isCod
                  ? "bg-[#95FF00] text-black btn-tactical border-[#95FF00] hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] hover:scale-105 active:scale-95"
                  : "bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white rounded-xl border-transparent hover:shadow-[0_4px_25px_rgba(139,92,246,0.35)] hover:-translate-y-0.5 active:translate-y-0"
              }`}
            >
              {isCod ? "DEPLOY OPERATOR" : "ENTER DEVELOPER SUITE"}
            </button>
          </motion.div>
        )}
      </div>

      {/* Operational footer info */}
      <div className={`flex justify-between items-end text-[9px] tracking-wider z-10 ${
        isCod ? "text-[#4D5B3D]" : "text-slate-500 font-mono"
      }`}>
        <div>
          <p>© 2026 // MONTA.CODES</p>
        </div>
        <div className="text-right">
          <p>{isCod ? "LOAD STATE // INFILTRATION_READY" : "SYSTEM STATE // MOUNTED"}</p>
        </div>
      </div>
    </motion.div>
  );
}
