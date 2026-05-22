import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { profileData } from "../data/profile";
import { socialLinks } from "../data/socialLinks";
import { playHoverBeep, playTacticalClick } from "../utils/audio";
import { Shield, Target, Terminal, Radio, Send, FileText, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    "BUILDING HIGH-PERFORMANCE FLUTTER APPS",
    "ARCHITECTING CLEAN STATE ARCHITECTURE",
    "DEPRECATING LEGACY CODEBASES",
    "OPTIMIZING OTA CAMPAIGN SYSTEMS",
    "INTEGRATING REAL-TIME MQTT & WEBSOCKETS"
  ];

  // Typewriter logic
  useEffect(() => {
    const activeRole = roles[roleIdx];
    let timer;
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(activeRole.substring(0, charIdx - 1));
        setCharIdx(prev => prev - 1);
      }, 40);
    } else {
      timer = setTimeout(() => {
        setTypedText(activeRole.substring(0, charIdx + 1));
        setCharIdx(prev => prev + 1);
      }, 70);
    }

    if (!isDeleting && charIdx === activeRole.length) {
      // Pause at full text
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setRoleIdx((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, roleIdx]);

  const handleScrollTo = (id) => {
    playTacticalClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="hero"
      className="min-h-screen relative flex items-center justify-center pt-24 pb-12 overflow-hidden military-grid select-none crt-grid"
    >
      {/* Background overlay scans */}
      <div className="absolute inset-0 scanline-container opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column - Dossier Stats & Callouts */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left font-orbitron order-2 lg:order-1">
          {/* Tactical Badge Header */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-3 bg-[#95FF00]/10 border border-[#95FF00]/30 py-1.5 px-3 rounded w-fit text-[#95FF00] text-[10px] tracking-widest font-black"
          >
            <Shield size={12} className="animate-pulse" />
            <span>OPERATOR DOSSIER // LEVEL 04_SECURE</span>
          </motion.div>

          {/* Glitch Main Name */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-1"
          >
            <h1 
              data-text={profileData.fullName.toUpperCase()}
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tighter glitch-text hover:text-[#95FF00] transition-colors"
            >
              {profileData.fullName.toUpperCase()}
            </h1>
          </motion.div>

          {/* Subtitle / Role Tag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs sm:text-sm text-[#95FF00] font-black tracking-[0.3em] mb-6 flex items-center gap-2"
          >
            <span>{profileData.title.toUpperCase()}</span>
            <span className="opacity-40">|</span>
            <span className="text-[#A8B0B8]">{profileData.subtitle}</span>
          </motion.div>

          {/* Dynamic Typewriter Command Output */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-mono text-xs sm:text-sm text-[#A8B0B8] border-l-2 border-[#95FF00] pl-3 py-1 mb-8 max-w-lg leading-relaxed min-h-[48px]"
          >
            <span className="text-[#4D5B3D] font-bold">MONTA_OS://</span>{" "}
            <span className="cursor-blink">{typedText}</span>
          </motion.div>

          {/* Dossier Short Intro */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-inter text-sm text-[#A8B0B8]/80 max-w-xl mb-10 leading-relaxed font-light"
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
          </motion.div>

          {/* HUD Social Links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-4 border-t border-[#4D5B3D]/25 pt-6 w-fit"
          >
            <span className="text-[9px] text-[#4D5B3D] tracking-widest uppercase">SATCOM_LINKS:</span>
            <div className="flex gap-3">
              <a 
                href={socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                onMouseEnter={playHoverBeep}
                onClick={playTacticalClick}
                className="w-8 h-8 rounded bg-[#1B1F24]/60 border border-[#4D5B3D]/30 flex items-center justify-center text-[#A8B0B8] hover:text-[#95FF00] hover:border-[#95FF00] hover:scale-110 transition-all hoverable cursor-pointer"
                title="GitHub Vault"
              >
                <FaGithub size={15} />
              </a>
              <a 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                onMouseEnter={playHoverBeep}
                onClick={playTacticalClick}
                className="w-8 h-8 rounded bg-[#1B1F24]/60 border border-[#4D5B3D]/30 flex items-center justify-center text-[#A8B0B8] hover:text-[#95FF00] hover:border-[#95FF00] hover:scale-110 transition-all hoverable cursor-pointer"
                title="LinkedIn SATCOM"
              >
                <FaLinkedin size={15} />
              </a>
              <a 
                href={socialLinks.email}
                onMouseEnter={playHoverBeep}
                onClick={playTacticalClick}
                className="w-8 h-8 rounded bg-[#1B1F24]/60 border border-[#4D5B3D]/30 flex items-center justify-center text-[#A8B0B8] hover:text-[#95FF00] hover:border-[#95FF00] hover:scale-110 transition-all hoverable cursor-pointer"
                title="Direct Uplink"
              >
                <Mail size={15} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Column - AAA Rotating Radar HUD System */}
        <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2 py-8 relative">
          {/* Radar background glow */}
          <div className="absolute w-72 h-72 rounded-full bg-[#95FF00]/5 blur-3xl pointer-events-none"></div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-72 h-72 sm:w-96 sm:h-96 relative border border-[#4D5B3D]/30 rounded-full flex items-center justify-center bg-[#0B0D0F]/10 backdrop-blur-sm"
          >
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

            {/* Retro tactical operator wireframe mock */}
            <div className="absolute bottom-0 text-center font-orbitron text-[8px] text-[#4D5B3D] tracking-widest uppercase bg-black/60 px-2 py-0.5 border border-[#4D5B3D]/30 rounded">
              LOBBY_STATE // RDR_SCANNING
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
