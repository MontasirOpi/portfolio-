import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { projectsData } from "../data/projects";
import { playHoverBeep, playTacticalClick, playRadioStatic, playSelectSweep } from "../utils/audio";
import { Shield, ExternalLink, X, Smartphone } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function Projects() {
  const { theme } = useTheme();
  const [filter, setFilter] = useState("ALL");
  const [selectedMission, setSelectedMission] = useState(null);

  const isCod = theme === "cod";

  // Group selectors
  const categories = [
    { id: "ALL", label: isCod ? "ALL CAMPAIGNS" : "ALL PRODUCTS" },
    { id: "MOBILE APP", label: isCod ? "MOBILE SYSTEMS" : "MOBILE APPS" },
    { id: "FLUTTER PACKAGE", label: isCod ? "PACKAGES & LIBS" : "PACKAGES & SDKs" },
    { id: "WEB PORTAL", label: isCod ? "WEB PORTALS" : "WEB PLATFORMS" }
  ];

  const filteredProjects = filter === "ALL" 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  const handleOpenBriefing = (project) => {
    playRadioStatic();
    setSelectedMission(project);
  };

  const handleCloseBriefing = () => {
    playTacticalClick();
    setSelectedMission(null);
  };

  return (
    <section 
      id="projects" 
      className={`py-24 transition-colors duration-700 ${
        isCod 
          ? "bg-[#0B0D0F] military-grid border-b border-[#4D5B3D]/25 select-none relative font-orbitron overflow-hidden" 
          : "bg-[#0F172A] border-b border-white/5 relative font-inter overflow-hidden"
      }`}
    >
      {isCod && <div className="absolute inset-0 scanline-container opacity-10 pointer-events-none"></div>}

      {/* Decorative background details (Mobile theme) */}
      {!isCod && (
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full blob-purple blur-3xl opacity-10 pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 text-center lg:text-left">
          <div className={`text-[10px] tracking-[0.3em] font-black uppercase mb-1.5 flex items-center justify-center lg:justify-start gap-2 ${
            isCod ? "text-[#95FF00]" : "text-[#8B5CF6]"
          }`}>
            <span className={`w-2 h-2 animate-pulse ${isCod ? "bg-[#95FF00]" : "bg-[#8B5CF6]"}`}></span>
            {isCod ? "ACTIVE_CAMPAIGNS // MISSIONS_INVENTORY" : "FEATURED APPLICATIONS // PRODUCTION RELEASES"}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-widest uppercase">
            {isCod ? "OPERATIONAL MISSIONS" : "DIGITAL PRODUCTS"}
          </h2>
          <div className={`w-24 h-[3px] mt-3 mx-auto lg:mx-0 shadow-lg ${
            isCod ? "bg-[#95FF00] shadow-[#95FF00]/40" : "bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] shadow-[#8B5CF6]/30"
          }`}></div>
        </div>

        {/* Filter Tab list */}
        <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-12">
          {categories.map((cat) => {
            const active = filter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playSelectSweep();
                  setFilter(cat.id);
                }}
                onMouseEnter={playHoverBeep}
                className={`px-5 py-2.5 transition-all duration-200 cursor-pointer hoverable ${
                  isCod
                    ? `border text-xs font-black tracking-widest uppercase ${
                        active 
                          ? "bg-[#95FF00]/10 border-[#95FF00] text-[#95FF00] shadow-[0_0_10px_rgba(149,255,0,0.15)]" 
                          : "bg-[#1B1F24]/50 border-[#4D5B3D]/30 text-[#4D5B3D] hover:border-[#95FF00]/60 hover:text-white"
                      }`
                    : `text-xs font-bold tracking-wider rounded-xl border ${
                        active
                          ? "bg-slate-800 border-[#8B5CF6]/40 text-[#22D3EE] shadow-md shadow-[#8B5CF6]/5"
                          : "bg-slate-900/40 border-white/5 text-slate-400 hover:border-slate-700 hover:text-white"
                      }`
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onMouseEnter={playHoverBeep}
                onClick={() => handleOpenBriefing(project)}
                className={`flex flex-col justify-between cursor-pointer group transition-all select-none hoverable relative aspect-[5/4] sm:aspect-[4/3] backdrop-blur-md ${
                  isCod 
                    ? "bg-[#1B1F24]/85 border border-[#4D5B3D]/30 rounded p-5 hover:border-[#95FF00] hover:bg-[#95FF00]/5" 
                    : "glass-card rounded-2xl p-5"
                }`}
              >
                {/* Corner indicator (COD only) */}
                {isCod && (
                  <>
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#95FF00]/40 group-hover:border-[#95FF00]"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#95FF00]/40 group-hover:border-[#95FF00]"></div>
                  </>
                )}

                {/* Card Top Details & Quick Launch */}
                <div className={`flex justify-between items-center text-[8px] tracking-widest mb-4 relative z-20 w-full select-none ${
                  isCod ? "text-[#4D5B3D]" : "text-slate-400 font-bold font-mono"
                }`}>
                  <span>{isCod ? `OP_CODE // ${project.codename}` : `PRODUCT_ID // ${project.id.toUpperCase()}`}</span>
                  
                  {/* Direct Launch Actions */}
                  <div className="flex gap-2">
                    {project.links.github && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playTacticalClick();
                          window.open(project.links.github, "_blank", "noopener,noreferrer");
                        }}
                        onMouseEnter={playHoverBeep}
                        className={`p-1 border transition-colors cursor-pointer hoverable ${
                          isCod 
                            ? "rounded bg-[#0B0D0F]/90 border-[#4D5B3D]/30 text-[#A8B0B8] hover:text-[#95FF00] hover:border-[#95FF00]" 
                            : "rounded-md bg-slate-950 border-white/5 text-slate-400 hover:text-white hover:border-[#22D3EE]"
                        }`}
                        title="GitHub Depot"
                      >
                        <FaGithub size={11} />
                      </button>
                    )}
                    {project.links.pub && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playTacticalClick();
                          window.open(project.links.pub, "_blank", "noopener,noreferrer");
                        }}
                        onMouseEnter={playHoverBeep}
                        className={`px-1.5 py-0.5 border transition-colors cursor-pointer hoverable font-mono text-[7px] font-black ${
                          isCod
                            ? "rounded bg-[#0B0D0F]/90 border-[#4D5B3D]/30 text-[#A8B0B8] hover:text-[#95FF00] hover:border-[#95FF00]"
                            : "rounded bg-slate-950 border-white/5 text-slate-400 hover:text-white hover:border-[#22D3EE]"
                        }`}
                        title="Pub.dev Module"
                      >
                        PUB
                      </button>
                    )}
                    {project.links.playStore && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playTacticalClick();
                          window.open(project.links.playStore, "_blank", "noopener,noreferrer");
                        }}
                        onMouseEnter={playHoverBeep}
                        className={`p-1 border transition-colors cursor-pointer hoverable ${
                          isCod 
                            ? "rounded bg-[#0B0D0F]/90 border-[#4D5B3D]/30 text-[#A8B0B8] hover:text-[#95FF00] hover:border-[#95FF00]" 
                            : "rounded-md bg-slate-950 border-white/5 text-slate-400 hover:text-white hover:border-[#22D3EE]"
                        }`}
                        title="Play Store app"
                      >
                        <ExternalLink size={11} />
                      </button>
                    )}
                    {project.links.live && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playTacticalClick();
                          window.open(project.links.live, "_blank", "noopener,noreferrer");
                        }}
                        onMouseEnter={playHoverBeep}
                        className={`p-1 border transition-colors cursor-pointer hoverable ${
                          isCod 
                            ? "rounded bg-[#0B0D0F]/90 border-[#4D5B3D]/30 text-[#A8B0B8] hover:text-[#95FF00] hover:border-[#95FF00]" 
                            : "rounded-md bg-slate-950 border-white/5 text-slate-400 hover:text-white hover:border-[#22D3EE]"
                        }`}
                        title="Live Simulation"
                      >
                        <ExternalLink size={11} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Project Title */}
                <div className="mb-4">
                  <span className={`block text-[8px] tracking-[0.2em] uppercase font-bold ${
                    isCod ? "text-[#4D5B3D]" : "text-[#8B5CF6]"
                  }`}>{project.category}</span>
                  <h3 className={`text-base sm:text-lg font-black transition-colors leading-tight uppercase mt-1 ${
                    isCod ? "font-orbitron text-white group-hover:text-[#95FF00]" : "font-inter text-white group-hover:text-[#22D3EE]"
                  }`}>
                    {project.title}
                  </h3>
                </div>

                {/* Brief description snippet */}
                <p className="text-xs text-slate-300 leading-relaxed font-light font-inter mb-6 line-clamp-3 select-text">
                  {project.description}
                </p>

                {/* Card Footer tags */}
                <div className={`flex flex-wrap gap-1 border-t pt-4 justify-between items-center w-full ${
                  isCod ? "border-[#4D5B3D]/15" : "border-white/5"
                }`}>
                  <div className="flex flex-wrap gap-1 max-w-[70%]">
                    {project.tech.slice(0, 3).map((techItem, i) => (
                      <span 
                        key={i} 
                        className={`text-[7px] font-mono px-1.5 py-0.5 border rounded uppercase ${
                          isCod 
                            ? "bg-[#0B0D0F]/90 border-[#4D5B3D]/20 text-[#A8B0B8]" 
                            : "bg-slate-950 border-white/5 text-slate-400"
                        }`}
                      >
                        {techItem}
                      </span>
                    ))}
                  </div>
                  
                  <span className={`text-[8px] font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity uppercase shrink-0 ${
                    isCod ? "text-[#95FF00]" : "text-[#22D3EE]"
                  }`}>
                    {isCod ? "EX_BRIEFING >" : "VIEW BRIEF >"}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dynamic Theme-specific Briefing Modal */}
        <AnimatePresence>
          {selectedMission && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed inset-0 z-[9995] backdrop-blur-md flex items-center justify-center p-4 select-none ${
                isCod ? "bg-[#0B0D0F]/95 crt-grid font-mono" : "bg-[#0F172A]/80 font-inter"
              }`}
            >
              {isCod && <div className="absolute inset-0 scanline-container opacity-25 pointer-events-none"></div>}

              {/* Modal Container card */}
              <motion.div 
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                className={`max-w-2xl w-full rounded flex flex-col justify-between relative overflow-hidden transition-all duration-500 ${
                  isCod 
                    ? "bg-[#1B1F24] border border-[#4D5B3D] shadow-[0_0_40px_rgba(149,255,0,0.15)]" 
                    : "glass-panel shadow-black/50 border border-white/10 rounded-3xl"
                }`}
              >
                {/* Tactical targeting corner frames (COD only) */}
                {isCod && (
                  <>
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#95FF00]/60 pointer-events-none"></div>
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#95FF00]/60 pointer-events-none"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#95FF00]/60 pointer-events-none"></div>
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#95FF00]/60 pointer-events-none"></div>
                  </>
                )}

                {/* Header bar */}
                <div className={`flex justify-between items-center px-6 py-4 border-b ${
                  isCod ? "bg-black/60 border-[#4D5B3D]/30" : "bg-slate-900/50 border-white/5"
                }`}>
                  <div className="flex items-center gap-2">
                    {isCod ? (
                      <>
                        <Shield size={16} className="text-[#95FF00] animate-pulse" />
                        <span className="font-orbitron font-black text-xs sm:text-sm tracking-widest text-[#95FF00] uppercase">
                          MISSION BRIEFING: {selectedMission.codename}
                        </span>
                      </>
                    ) : (
                      <>
                        <Smartphone size={16} className="text-[#22D3EE]" />
                        <span className="font-bold text-xs sm:text-sm tracking-wide text-white uppercase">
                          PROJECT SPECIFICATION BRIEF
                        </span>
                      </>
                    )}
                  </div>
                  
                  {/* Close trigger button */}
                  <button 
                    onClick={handleCloseBriefing}
                    onMouseEnter={playHoverBeep}
                    className={`p-1.5 border transition-colors cursor-pointer hoverable ${
                      isCod 
                        ? "border-[#4D5B3D]/30 rounded text-[#A8B0B8] hover:text-[#95FF00] hover:border-[#95FF00]" 
                        : "border-white/5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Report Body */}
                <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6 text-xs text-slate-300 select-text">
                  
                  {/* Metadata matrix */}
                  <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded font-mono select-none ${
                    isCod ? "bg-black/40 border border-[#4D5B3D]/20 font-orbitron" : "bg-slate-900/50 border border-white/5 font-sans"
                  }`}>
                    <div>
                      <span className={`block text-[7px] tracking-widest ${isCod ? "text-[#4D5B3D]" : "text-slate-500"}`}>
                        {isCod ? "CAMPAIGN TITLE" : "PRODUCT NAME"}
                      </span>
                      <span className="font-bold text-white text-[10px] uppercase truncate block">{selectedMission.title}</span>
                    </div>
                    <div>
                      <span className={`block text-[7px] tracking-widest ${isCod ? "text-[#4D5B3D]" : "text-slate-500"}`}>
                        {isCod ? "DEPLOYMENT LEVEL" : "ARCHITECTURE GRADE"}
                      </span>
                      <span className={`font-bold text-[10px] uppercase block ${isCod ? "text-[#95FF00]" : "text-[#22D3EE]"}`}>
                        {isCod ? (selectedMission.difficulty || "LEVEL_B") : "PRODUCTION"}
                      </span>
                    </div>
                    <div>
                      <span className={`block text-[7px] tracking-widest ${isCod ? "text-[#4D5B3D]" : "text-slate-500"}`}>
                        {isCod ? "UNIT STANCE" : "RELEASE STATUS"}
                      </span>
                      <span className={`font-bold text-[10px] uppercase block ${isCod ? "text-red-500" : "text-emerald-400"}`}>
                        {selectedMission.status}
                      </span>
                    </div>
                    <div>
                      <span className={`block text-[7px] tracking-widest ${isCod ? "text-[#4D5B3D]" : "text-slate-500"}`}>
                        {isCod ? "OPERATOR SECTOR" : "ENGINEERING MODEL"}
                      </span>
                      <span className="font-bold text-white text-[10px] uppercase block">CROSS_PLATFORM</span>
                    </div>
                  </div>

                  {/* Section 1: Detailed Field Log */}
                  <div className="space-y-2">
                    <span className={`text-[8px] tracking-[0.25em] block border-b pb-1 ${
                      isCod ? "text-[#4D5B3D] font-orbitron border-[#4D5B3D]/15" : "text-[#8B5CF6] font-semibold border-white/5"
                    }`}>
                      {isCod ? "// MISSION DIRECTIVE SUMMARY" : "PROJECT DIRECTIVE SUMMARY"}
                    </span>
                    <p className="font-inter text-xs text-slate-300 leading-relaxed font-light select-text">
                      {selectedMission.description}
                    </p>
                  </div>

                  {/* Section 2: Technical Specs */}
                  <div className="space-y-2.5">
                    <span className={`text-[8px] tracking-[0.25em] block border-b pb-1 ${
                      isCod ? "text-[#4D5B3D] font-orbitron border-[#4D5B3D]/15" : "text-[#8B5CF6] font-semibold border-white/5"
                    }`}>
                      {isCod ? "// COMPILING HARDWARE CONFIG" : "SYSTEM STACK HARDWARE"}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedMission.tech.map((techItem, i) => (
                        <span 
                          key={i} 
                          className={`text-[9px] px-2 py-0.5 border rounded font-mono uppercase ${
                            isCod 
                              ? "bg-[#4D5B3D]/15 border-[#4D5B3D]/30 text-white" 
                              : "bg-slate-800 border-white/5 text-[#22D3EE]"
                          }`}
                        >
                          {techItem}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Section 3: Action directives */}
                  <div className="space-y-3 pt-2">
                    <span className={`text-[8px] tracking-[0.25em] block border-b pb-1 select-none ${
                      isCod ? "text-[#4D5B3D] font-orbitron border-[#4D5B3D]/15" : "text-[#8B5CF6] font-semibold border-white/5"
                    }`}>
                      {isCod ? "// ACTION DIRECTIVES (COMPLETED OBJECTIVES)" : "PRODUCT ACCESS & DOCUMENTATION"}
                    </span>
                    
                    <div className="flex flex-col sm:flex-row gap-3 select-none">
                      {/* GitHub Link */}
                      {selectedMission.links.github && (
                        <a 
                          href={selectedMission.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={playHoverBeep}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            playTacticalClick();
                            window.open(selectedMission.links.github, "_blank", "noopener,noreferrer");
                          }}
                          className={`flex-1 py-2.5 px-4 border text-[10px] uppercase font-bold flex items-center justify-center gap-2 cursor-pointer hoverable transition-all ${
                            isCod 
                              ? "bg-[#1B1F24] border-[#4D5B3D]/40 text-[#A8B0B8] hover:border-[#95FF00] hover:text-[#95FF00] font-orbitron" 
                              : "bg-slate-800/60 border-white/10 text-slate-200 hover:border-[#8B5CF6] hover:text-white rounded-xl font-sans"
                          }`}
                        >
                          <FaGithub size={13} />
                          {isCod ? "EXTRACT LOGS (GITHUB)" : "CODE DEPOT (GITHUB)"}
                        </a>
                      )}
                      
                      {/* Live Link */}
                      {selectedMission.links.live && (
                        <a 
                          href={selectedMission.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={playHoverBeep}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            playTacticalClick();
                            window.open(selectedMission.links.live, "_blank", "noopener,noreferrer");
                          }}
                          className={`flex-1 py-2.5 px-4 font-bold flex items-center justify-center gap-2 cursor-pointer hoverable transition-colors ${
                            isCod 
                              ? "bg-[#95FF00] text-black hover:bg-white font-orbitron text-[10px] uppercase" 
                              : "bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white hover:opacity-95 rounded-xl font-sans text-xs"
                          }`}
                        >
                          <ExternalLink size={13} />
                          {isCod ? "LAUNCH SIMULATION (LIVE)" : "LAUNCH PRODUCT"}
                        </a>
                      )}

                      {/* Play Store Link */}
                      {selectedMission.links.playStore && (
                        <a 
                          href={selectedMission.links.playStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={playHoverBeep}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            playTacticalClick();
                            window.open(selectedMission.links.playStore, "_blank", "noopener,noreferrer");
                          }}
                          className={`flex-1 py-2.5 px-4 font-bold flex items-center justify-center gap-2 cursor-pointer hoverable transition-colors ${
                            isCod 
                              ? "bg-[#95FF00] text-black hover:bg-white font-orbitron text-[10px] uppercase" 
                              : "bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white hover:opacity-95 rounded-xl font-sans text-xs"
                          }`}
                        >
                          <ExternalLink size={13} />
                          {isCod ? "DEPLOY DEPOT (PLAY STORE)" : "LAUNCH APP STORE"}
                        </a>
                      )}

                      {/* Pub.dev Link */}
                      {selectedMission.links.pub && (
                        <a 
                          href={selectedMission.links.pub}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={playHoverBeep}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            playTacticalClick();
                            window.open(selectedMission.links.pub, "_blank", "noopener,noreferrer");
                          }}
                          className={`flex-1 py-2.5 px-4 font-bold flex items-center justify-center gap-2 cursor-pointer hoverable transition-colors ${
                            isCod 
                              ? "bg-[#95FF00] text-black hover:bg-white font-orbitron text-[10px] uppercase" 
                              : "bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white hover:opacity-95 rounded-xl font-sans text-xs"
                          }`}
                        >
                          <ExternalLink size={13} />
                          {isCod ? "DEPLOY MODULE (PUB.DEV)" : "LAUNCH PUB.DEV MODULE"}
                        </a>
                      )}
                    </div>
                  </div>

                </div>

                {/* Footer status */}
                <div className={`px-6 py-4 tracking-widest uppercase flex justify-between select-none ${
                  isCod ? "bg-black/60 border-t border-[#4D5B3D]/30 text-[#4D5B3D] font-mono text-[9px]" : "bg-slate-900/50 border-t border-white/5 text-slate-500 font-sans text-[8px]"
                }`}>
                  <span>{isCod ? "SECURE_LINK // CONNECTED" : "CONNECTION // SECURED"}</span>
                  <span>{isCod ? "MONTA_SEC_CORE" : "opi.dev system"}</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

