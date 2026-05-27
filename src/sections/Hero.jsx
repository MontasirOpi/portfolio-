import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { profileData } from "../data/profile";
import { socialLinks } from "../data/socialLinks";
import { playHoverBeep, playTacticalClick, playSelectSweep } from "../utils/audio";
import { Shield, Target, Send, FileText, Mail, Sparkles, Cpu, Layers, BarChart3 } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const codRoles = [
  "BUILDING HIGH-PERFORMANCE FLUTTER APPS",
  "ARCHITECTING CLEAN STATE ARCHITECTURE",
  "DEPRECATING LEGACY CODEBASES",
  "OPTIMIZING OTA CAMPAIGN SYSTEMS",
  "INTEGRATING REAL-TIME MQTT & WEBSOCKETS"
];

const devRoles = [
  "const mobile = { engine: 'Flutter', state: 'BLoC' };",
  "const stack = ['Dart', 'Javascript', 'Swift', 'Kotlin'];",
  "const mission = 'Craft pixel-perfect app interfaces';",
  "const performance = '60FPS smooth scroll rendering';",
  "const backend = { cloud: 'Firebase', api: 'GraphQL' };"
];

export default function Hero() {
  const { theme } = useTheme();
  const [typedText, setTypedText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const isCod = theme === "cod";
  const roles = isCod ? codRoles : devRoles;

  // Typewriter logic
  useEffect(() => {
    // Reset typewriter when theme changes asynchronously to prevent cascading renders
    const timer = setTimeout(() => {
      setTypedText("");
      setCharIdx(0);
      setRoleIdx(0);
      setIsDeleting(false);
    }, 50);
    return () => clearTimeout(timer);
  }, [theme]);

  useEffect(() => {
    if (roles.length === 0) return;
    const activeRole = roles[roleIdx] || "";
    let timer;
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(activeRole.substring(0, charIdx - 1));
        setCharIdx(prev => prev - 1);
      }, isCod ? 40 : 25);
    } else {
      timer = setTimeout(() => {
        setTypedText(activeRole.substring(0, charIdx + 1));
        setCharIdx(prev => prev + 1);
      }, isCod ? 70 : 45);
    }

    if (!isDeleting && charIdx === activeRole.length) {
      // Pause at full text
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && charIdx === 0) {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setRoleIdx((prev) => (prev + 1) % roles.length);
      }, 50);
    }

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, roleIdx, theme, isCod, roles]);

  const handleScrollTo = (id) => {
    playTacticalClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="hero"
      className={`min-h-screen relative flex items-center justify-center pt-28 pb-16 overflow-hidden select-none transition-all duration-700 ${
        isCod ? "military-grid crt-grid" : ""
      }`}
    >
      {/* Background overlays / scans (COD only) */}
      {isCod && <div className="absolute inset-0 scanline-container opacity-20 pointer-events-none"></div>}

      {/* Modern Gradient Blobs (Mobile Dev Theme only) */}
      {!isCod && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Animated Blob 1 */}
          <motion.div 
            animate={{ 
              x: [0, 40, -20, 0],
              y: [0, -50, 30, 0],
            }}
            transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blob-purple blur-3xl opacity-60"
          />
          {/* Animated Blob 2 */}
          <motion.div 
            animate={{ 
              x: [0, -30, 50, 0],
              y: [0, 40, -40, 0],
            }}
            transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blob-cyan blur-3xl opacity-50"
          />
          {/* Ambient SaaS grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column - Stats / Dossier Info */}
        <div className={`lg:col-span-7 flex flex-col justify-center text-left order-2 lg:order-1 ${
          isCod ? "font-orbitron" : "font-inter"
        }`}>
          {/* Header Badge */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`flex items-center gap-2 mb-4 py-1.5 px-3 rounded w-fit text-[10px] tracking-widest font-black ${
              isCod 
                ? "bg-[#95FF00]/10 border border-[#95FF00]/30 text-[#95FF00]" 
                : "bg-white/5 border border-white/10 text-[#22D3EE] backdrop-blur-md rounded-full px-4"
            }`}
          >
            {isCod ? (
              <>
                <Shield size={12} className="animate-pulse" />
                <span>OPERATOR DOSSIER // LEVEL 04_SECURE</span>
              </>
            ) : (
              <>
                <Sparkles size={11} className="text-[#8B5CF6] animate-bounce" />
                <span className="font-semibold uppercase">FLUTTER & MOBILE ARCHITECT</span>
              </>
            )}
          </motion.div>

          {/* Name Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-2"
          >
            {isCod ? (
              <h1 
                data-text={profileData.fullName.toUpperCase()}
                className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tighter glitch-text hover:text-[#95FF00] transition-colors"
              >
                {profileData.fullName.toUpperCase()}
              </h1>
            ) : (
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none text-white">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-[#8B5CF6] via-[#22D3EE] to-white bg-clip-text text-transparent">
                  Montasir
                </span>
              </h1>
            )}
          </motion.div>

          {/* Subtitle / Role Tag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-xs sm:text-sm font-black tracking-[0.25em] mb-6 flex items-center gap-2 ${
              isCod ? "text-[#95FF00]" : "text-slate-300 font-semibold"
            }`}
          >
            <span>{profileData.title.toUpperCase()}</span>
            <span className="opacity-40">|</span>
            <span className={isCod ? "text-[#A8B0B8]" : "text-[#22D3EE]"}>{profileData.subtitle}</span>
          </motion.div>

          {/* Dynamic Typewriter Command Output */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`border-l-2 pl-3 py-1 mb-8 max-w-lg leading-relaxed min-h-[48px] ${
              isCod 
                ? "font-mono text-xs sm:text-sm text-[#A8B0B8] border-[#95FF00]" 
                : "font-mono text-xs sm:text-sm text-slate-300 border-[#8B5CF6]"
            }`}
          >
            <span className={isCod ? "text-[#4D5B3D] font-bold" : "text-[#8B5CF6] font-semibold"}>
              {isCod ? "MONTA_OS://" : "opi.dev >"}
            </span>{" "}
            <span className={isCod ? "cursor-blink" : "text-cyan-300"}>{typedText}</span>
            {!isCod && <span className="w-1.5 h-3 bg-white inline-block animate-pulse ml-0.5" />}
          </motion.div>

          {/* Dossier Short Intro */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`text-sm max-w-xl mb-10 leading-relaxed font-light ${
              isCod ? "font-inter text-[#A8B0B8]/80" : "font-inter text-slate-400"
            }`}
          >
            {profileData.bio}
          </motion.p>

          {/* Main Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto"
          >
            {isCod ? (
              <>
                <button
                  onClick={() => handleScrollTo("contact")}
                  onMouseEnter={playHoverBeep}
                  className="px-8 py-3.5 bg-[#95FF00] text-black font-black text-xs tracking-[0.25em] btn-tactical cursor-pointer hover:bg-white hover:shadow-[0_0_15px_rgba(149,255,0,0.4)] transition-all flex items-center justify-center gap-2 hoverable uppercase border border-[#95FF00]"
                >
                  <Send size={14} />
                  DEPLOY COMMS
                </button>
                <a
                  href={socialLinks.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHoverBeep}
                  onClick={playTacticalClick}
                  className="px-8 py-3.5 bg-[#1B1F24]/80 text-[#A8B0B8] border border-[#4D5B3D]/40 font-black text-xs tracking-[0.25em] btn-tactical cursor-pointer hover:border-[#95FF00] hover:text-[#95FF00] transition-all flex items-center justify-center gap-2 hoverable uppercase"
                >
                  <FileText size={14} />
                  EXTRACT CV
                </a>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleScrollTo("contact")}
                  onMouseEnter={playHoverBeep}
                  className="px-8 py-3.5 bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white font-bold text-xs tracking-[0.15em] rounded-xl cursor-pointer shadow-lg shadow-[#8B5CF6]/25 hover:shadow-[#8B5CF6]/45 transition-all flex items-center justify-center gap-2 hoverable uppercase transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Send size={14} />
                  DEPLOY PROJECT
                </button>
                <a
                  href={socialLinks.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHoverBeep}
                  onClick={playTacticalClick}
                  className="px-8 py-3.5 bg-slate-800/60 text-slate-200 border border-white/5 font-bold text-xs tracking-[0.15em] rounded-xl cursor-pointer hover:bg-slate-800 hover:border-[#8B5CF6]/50 transition-all flex items-center justify-center gap-2 hoverable uppercase transform hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-md"
                >
                  <FileText size={14} />
                  ACQUIRE RESUME
                </a>
              </>
            )}
          </motion.div>

          {/* HUD Social Links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className={`flex items-center gap-4 border-t pt-6 w-fit ${
              isCod ? "border-[#4D5B3D]/25" : "border-white/5"
            }`}
          >
            <span className={`text-[9px] tracking-widest uppercase ${isCod ? "text-[#4D5B3D]" : "text-slate-500 font-bold"}`}>
              {isCod ? "SATCOM_LINKS:" : "DEV_SIGNATURES:"}
            </span>
            <div className="flex gap-3">
              {[
                { url: socialLinks.github, icon: FaGithub, title: isCod ? "GitHub Vault" : "GitHub Profile" },
                { url: socialLinks.linkedin, icon: FaLinkedin, title: isCod ? "LinkedIn SATCOM" : "LinkedIn Connect" },
                { url: socialLinks.email, icon: Mail, title: isCod ? "Direct Uplink" : "Direct Email" }
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={idx}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onMouseEnter={playHoverBeep}
                    onClick={playTacticalClick}
                    className={`w-8 h-8 flex items-center justify-center transition-all hover:scale-110 hoverable cursor-pointer ${
                      isCod 
                        ? "rounded bg-[#1B1F24]/60 border border-[#4D5B3D]/30 text-[#A8B0B8] hover:text-[#95FF00] hover:border-[#95FF00]" 
                        : "rounded-lg bg-slate-800/40 border border-white/5 text-slate-300 hover:text-[#22D3EE] hover:border-[#8B5CF6]/40 backdrop-blur-sm"
                    }`}
                    title={social.title}
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right Column - AAA Rotating Radar / Animated Phone Mockup */}
        <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2 py-8 relative">
          
          <AnimatePresence mode="wait">
            {isCod ? (
              // COD Theme - Radar Sweep Indicator
              <motion.div
                key="cod-radar"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-72 h-72 sm:w-96 sm:h-96 relative border border-[#4D5B3D]/30 rounded-full flex items-center justify-center bg-[#0B0D0F]/10 backdrop-blur-sm"
              >
                {/* Radar background glow */}
                <div className="absolute w-72 h-72 rounded-full bg-[#95FF00]/5 blur-3xl pointer-events-none"></div>
                {/* Outer coordinate ring */}
                <div className="absolute inset-2 border border-[#4D5B3D]/10 rounded-full pointer-events-none"></div>
                {/* Crosshairs lines */}
                <div className="absolute w-full h-[1px] bg-[#4D5B3D]/20"></div>
                <div className="absolute h-full w-[1px] bg-[#4D5B3D]/20"></div>
                
                {/* Compass degree markings */}
                <span className="absolute top-2.5 text-[8px] text-[#4D5B3D] tracking-widest">N 000°</span>
                <span className="absolute right-2.5 text-[8px] text-[#4D5B3D] tracking-widest">E 090°</span>
                <span className="absolute bottom-2.5 text-[8px] text-[#4D5B3D] tracking-widest">S 180°</span>
                <span className="absolute left-2.5 text-[8px] text-[#4D5B3D] tracking-widest">W 270°</span>

                {/* Sweep radar wedge */}
                <div className="radar-sweep-indicator"></div>

                {/* Simulated Targets (Targeting blips) */}
                <motion.div 
                  animate={{ opacity: [0.2, 1, 0.2] }} 
                  transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
                  className="absolute top-1/4 left-1/3 w-2.5 h-2.5 rounded-full bg-[#95FF00] flex items-center justify-center shadow-[0_0_8px_#95FF00]"
                >
                  <div className="absolute inset-0 rounded-full border border-[#95FF00] animate-ping opacity-60"></div>
                </motion.div>

                <motion.div 
                  animate={{ opacity: [1, 0.1, 1] }} 
                  transition={{ repeat: Infinity, duration: 5, delay: 2 }}
                  className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-[#95FF00]/80 flex items-center justify-center shadow-[0_0_6px_#95FF00]"
                >
                  <div className="absolute inset-0 rounded-full border border-[#95FF00] animate-ping opacity-40"></div>
                </motion.div>

                {/* Center target circle */}
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#95FF00]/30 flex items-center justify-center">
                  <Target className="text-[#95FF00] animate-pulse opacity-60" size={24} />
                </div>

                <div className="absolute bottom-0 text-center font-orbitron text-[8px] text-[#4D5B3D] tracking-widest uppercase bg-black/60 px-2 py-0.5 border border-[#4D5B3D]/30 rounded">
                  LOBBY_STATE // RDR_SCANNING
                </div>
              </motion.div>
            ) : (
              // Mobile Developer Theme - High-fidelity phone preview and floating widgets
              <motion.div
                key="dev-showcase"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative flex justify-center items-center w-full max-w-[400px]"
              >
                {/* Ambient blob behind mockup */}
                <div className="absolute w-64 h-64 bg-[#8B5CF6]/15 blur-3xl rounded-full animate-pulse pointer-events-none" />

                {/* Smartphone Device Frame Container */}
                <motion.div 
                  whileHover={{ y: -8, rotateY: 3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-[240px] h-[480px] bg-slate-950 rounded-[40px] p-2.5 border-4 border-slate-800 shadow-2xl relative z-10"
                >
                  {/* Smartphone Camera Notch */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-14 h-4 bg-slate-850 rounded-full z-30 flex items-center justify-between px-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                    <span className="w-4 h-1 rounded-full bg-slate-800"></span>
                  </div>

                  {/* Smartphone Screen Contents */}
                  <div className="w-full h-full bg-gradient-to-b from-[#1E1B4B] via-[#0F172A] to-[#0F172A] rounded-[32px] overflow-hidden p-4 pt-8 text-white relative flex flex-col justify-between">
                    
                    {/* Simulated App Header */}
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <span className="block text-[8px] text-slate-400 leading-none">ACTIVE USER</span>
                        <span className="text-[10px] font-bold text-slate-100">Fahim Opi</span>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[7px] font-bold border border-white/10">⚙️</div>
                    </div>

                    {/* App Frosted card dashboard */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-md mb-3 flex-grow flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] font-semibold text-[#22D3EE] tracking-wide">FLUTTER INSIGHTS</span>
                        <Layers size={10} className="text-[#8B5CF6]" />
                      </div>
                      
                      {/* Animated SVG Chart Widget */}
                      <div className="h-16 flex items-end justify-between gap-1 w-full my-2 bg-slate-900/40 rounded-lg p-2.5 relative overflow-hidden">
                        {/* Interactive sweeping line */}
                        <svg className="absolute inset-0 w-full h-full text-[#8B5CF6]/25" viewBox="0 0 100 40" preserveAspectRatio="none">
                          <path d="M0,40 C30,30 40,5 60,18 C80,30 90,2 100,20 L100,40 Z" fill="currentColor" />
                          <motion.path 
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            d="M0,40 C30,30 40,5 60,18 C80,30 90,2 100,20" 
                            fill="none" 
                            stroke="#22D3EE" 
                            strokeWidth="1.5" 
                          />
                        </svg>
                        <span className="absolute bottom-1 right-2 text-[6px] text-slate-500 font-mono">60FPS</span>
                      </div>

                      <div className="flex justify-between items-center text-[8px] text-slate-300">
                        <span>Smooth Physics</span>
                        <span className="text-emerald-400 font-bold">100% OK</span>
                      </div>
                    </div>

                    {/* Compact Interactive Elements */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-white/5 border border-white/10 p-2 rounded-xl backdrop-blur-md text-center flex flex-col items-center">
                        <Cpu size={12} className="text-[#22D3EE] mb-1" />
                        <span className="text-[8px] text-slate-300">Core Render</span>
                        <span className="text-[8px] font-bold text-white">SKIA / IMP</span>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-2 rounded-xl backdrop-blur-md text-center flex flex-col items-center">
                        <BarChart3 size={12} className="text-[#8B5CF6] mb-1" />
                        <span className="text-[8px] text-slate-300">Uptime State</span>
                        <span className="text-[8px] font-bold text-white">99.9% LIVE</span>
                      </div>
                    </div>

                    {/* App Bottom nav bar mockup */}
                    <div className="h-7 w-full bg-slate-900/80 rounded-xl border border-white/5 flex items-center justify-around px-2 text-[9px]">
                      <span className="text-[#22D3EE]">📱</span>
                      <span className="opacity-40">⚙️</span>
                      <span className="opacity-40">📁</span>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Widget 1 - Flutter Card (TOP LEFT) */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  onClick={playSelectSweep}
                  className="absolute -top-6 -left-10 bg-[#0F172A]/90 border border-white/10 p-3 rounded-2xl shadow-xl flex items-center gap-2.5 backdrop-blur-md z-20 hoverable cursor-pointer hover:border-[#22D3EE]/30 text-left"
                >
                  <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-300 text-xs">⚡</div>
                  <div>
                    <span className="block text-[8px] text-slate-400 font-bold uppercase leading-none">ENGINE</span>
                    <span className="text-[10px] font-bold text-white tracking-wider">FLUTTER SDK</span>
                  </div>
                </motion.div>

                {/* Floating Widget 2 - BLoC State (BOTTOM RIGHT) */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                  onClick={playSelectSweep}
                  className="absolute -bottom-4 -right-8 bg-[#0F172A]/90 border border-white/10 p-3 rounded-2xl shadow-xl flex items-center gap-2.5 backdrop-blur-md z-20 hoverable cursor-pointer hover:border-[#8B5CF6]/30 text-left"
                >
                  <div className="w-7 h-7 rounded-lg bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-300">📦</div>
                  <div>
                    <span className="block text-[8px] text-slate-400 font-bold uppercase leading-none">ARCH</span>
                    <span className="text-[10px] font-bold text-white tracking-wider">BLOC STATE</span>
                  </div>
                </motion.div>

                {/* Floating Widget 3 - Swift (TOP RIGHT) */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="absolute top-1/4 -right-12 bg-[#0F172A]/80 border border-white/5 py-1 px-3 rounded-full text-[8px] font-bold text-slate-300 z-20 shadow-md backdrop-blur-sm"
                >
                  🍎 IOS DEV
                </motion.div>

                {/* Floating Widget 4 - Supabase (BOTTOM LEFT) */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-1/4 -left-12 bg-[#0F172A]/80 border border-white/5 py-1 px-3 rounded-full text-[8px] font-bold text-slate-300 z-20 shadow-md backdrop-blur-sm"
                >
                  ⚡ SUPABASE
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

