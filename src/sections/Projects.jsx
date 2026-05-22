import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "../data/projects";
import { playHoverBeep, playTacticalClick, playRadioStatic, playSelectSweep } from "../utils/audio";
import { Shield, Folder, ExternalLink, Terminal, Compass, X, Target, Radio, AlertTriangle } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function Projects() {
  const [filter, setFilter] = useState("ALL");
  const [selectedMission, setSelectedMission] = useState(null);

  // Group selectors
  const categories = [
    { id: "ALL", label: "ALL CAMPAIGNS" },
    { id: "MOBILE APP", label: "MOBILE SYSTEMS" },
    { id: "FLUTTER PACKAGE", label: "PACKAGES & LIBS" },
    { id: "WEB PORTAL", label: "WEB PORTALS" }
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
      className="py-24 bg-[#0B0D0F] military-grid border-b border-[#4D5B3D]/25 select-none relative font-orbitron overflow-hidden"
    >
      <div className="absolute inset-0 scanline-container opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 text-center lg:text-left">
          <div className="text-[10px] text-[#95FF00] tracking-[0.3em] font-black uppercase mb-1.5 flex items-center justify-center lg:justify-start gap-2">
            <span className="w-2 h-2 bg-[#95FF00] animate-pulse"></span>
            ACTIVE_CAMPAIGNS // MISSIONS_INVENTORY
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-widest uppercase">
            OPERATIONAL MISSIONS
          </h2>
          <div className="w-24 h-[3px] bg-[#95FF00] mt-3 mx-auto lg:mx-0 shadow-[0_0_8px_#95FF00]"></div>
        </div>

        {/* Filter Operations Desk Tab list */}
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
                className={`px-5 py-2.5 border text-xs font-black tracking-widest uppercase transition-all duration-200 cursor-pointer hoverable ${
                  active 
                    ? "bg-[#95FF00]/10 border-[#95FF00] text-[#95FF00] shadow-[0_0_10px_rgba(149,255,0,0.15)]" 
                    : "bg-[#1B1F24]/50 border-[#4D5B3D]/30 text-[#4D5B3D] hover:border-[#95FF00]/60 hover:text-white"
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
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onMouseEnter={playHoverBeep}
                onClick={() => handleOpenBriefing(project)}
                className="bg-[#1B1F24]/85 border border-[#4D5B3D]/30 rounded p-5 flex flex-col justify-between cursor-pointer group hover:border-[#95FF00] hover:bg-[#95FF00]/5 transition-all select-none hoverable relative aspect-[5/4] sm:aspect-[4/3] backdrop-blur-md"
              >
                {/* Corner indicator */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#95FF00]/40 group-hover:border-[#95FF00]"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#95FF00]/40 group-hover:border-[#95FF00]"></div>

                {/* Card Top Details & Quick Launch */}
                <div className="flex justify-between items-center text-[8px] text-[#4D5B3D] tracking-widest mb-4 relative z-20 w-full select-none">
                  <span>OP_CODE // {project.codename}</span>
                  
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
                        className="p-1 rounded bg-[#0B0D0F]/90 border border-[#4D5B3D]/30 text-[#A8B0B8] hover:text-[#95FF00] hover:border-[#95FF00] transition-colors cursor-pointer hoverable"
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
                        className="px-1.5 py-0.5 rounded bg-[#0B0D0F]/90 border border-[#4D5B3D]/30 text-[#A8B0B8] hover:text-[#95FF00] hover:border-[#95FF00] transition-colors cursor-pointer hoverable font-mono text-[7px] font-black"
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
                        className="p-1 rounded bg-[#0B0D0F]/90 border border-[#4D5B3D]/30 text-[#A8B0B8] hover:text-[#95FF00] hover:border-[#95FF00] transition-colors cursor-pointer hoverable"
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
                        className="p-1 rounded bg-[#0B0D0F]/90 border border-[#4D5B3D]/30 text-[#A8B0B8] hover:text-[#95FF00] hover:border-[#95FF00] transition-colors cursor-pointer hoverable"
                        title="Live Simulation"
                      >
                        <ExternalLink size={11} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Project Title */}
                <div className="mb-4">
                  <span className="block text-[8px] text-[#4D5B3D] tracking-[0.2em] uppercase">{project.category}</span>
                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-[#95FF00] transition-colors leading-tight uppercase font-orbitron mt-1">
                    {project.title}
                  </h3>
                </div>

                {/* Brief description snippet */}
                <p className="text-xs text-[#A8B0B8]/75 leading-relaxed font-light font-inter mb-6 line-clamp-3 select-text">
                  {project.description}
                </p>

                {/* Card Footer loadout tags */}
                <div className="flex flex-wrap gap-1 border-t border-[#4D5B3D]/15 pt-4 justify-between items-center w-full">
                  <div className="flex flex-wrap gap-1 max-w-[70%]">
                    {project.tech.slice(0, 3).map((techItem, i) => (
                      <span 
                        key={i} 
                        className="text-[7px] font-mono px-1.5 py-0.5 bg-[#0B0D0F]/90 border border-[#4D5B3D]/20 text-[#A8B0B8] rounded uppercase"
                      >
                        {techItem}
                      </span>
                    ))}
                  </div>
                  
                  <span className="text-[8px] font-bold text-[#95FF00] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity uppercase shrink-0">
                    EX_BRIEFING &gt;
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Cinematic Mission Briefing Dossier Modal */}
        <AnimatePresence>
          {selectedMission && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9995] bg-[#0B0D0F]/95 backdrop-blur-md flex items-center justify-center p-4 font-mono select-none crt-grid"
            >
              <div className="absolute inset-0 scanline-container opacity-25 pointer-events-none"></div>

              {/* Modal Container card */}
              <motion.div 
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                className="bg-[#1B1F24] border border-[#4D5B3D] max-w-2xl w-full rounded flex flex-col justify-between relative shadow-[0_0_40px_rgba(149,255,0,0.15)] overflow-hidden"
              >
                {/* Tactical targeting corner frames */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#95FF00]/60 pointer-events-none"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#95FF00]/60 pointer-events-none"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#95FF00]/60 pointer-events-none"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#95FF00]/60 pointer-events-none"></div>

                {/* Header bar */}
                <div className="flex justify-between items-center bg-black/60 border-b border-[#4D5B3D]/30 px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-[#95FF00] animate-pulse" />
                    <span className="font-orbitron font-black text-xs sm:text-sm tracking-widest text-[#95FF00] uppercase">
                      MISSION BRIEFING: {selectedMission.codename}
                    </span>
                  </div>
                  
                  {/* Close trigger button */}
                  <button 
                    onClick={handleCloseBriefing}
                    onMouseEnter={playHoverBeep}
                    className="p-1.5 border border-[#4D5B3D]/30 rounded text-[#A8B0B8] hover:text-[#95FF00] hover:border-[#95FF00] transition-colors cursor-pointer hoverable"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Report Body */}
                <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6 font-mono text-xs text-[#A8B0B8] select-text">
                  
                  {/* Metadata matrix */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/40 border border-[#4D5B3D]/20 p-4 rounded font-orbitron select-none">
                    <div>
                      <span className="block text-[7px] text-[#4D5B3D] tracking-widest">CAMPAIGN TITLE</span>
                      <span className="font-bold text-white text-[10px] uppercase truncate block">{selectedMission.title}</span>
                    </div>
                    <div>
                      <span className="block text-[7px] text-[#4D5B3D] tracking-widest">DEPLOYMENT LEVEL</span>
                      <span className="font-bold text-[#95FF00] text-[10px] uppercase block">{selectedMission.difficulty || "LEVEL_B"}</span>
                    </div>
                    <div>
                      <span className="block text-[7px] text-[#4D5B3D] tracking-widest">UNIT STANCE</span>
                      <span className="font-bold text-red-500 text-[10px] uppercase block">{selectedMission.status}</span>
                    </div>
                    <div>
                      <span className="block text-[7px] text-[#4D5B3D] tracking-widest">OPERATOR SECTOR</span>
                      <span className="font-bold text-[#A8B0B8] text-[10px] uppercase block">CROSS_PLATFORM</span>
                    </div>
                  </div>

                  {/* Section 1: Detailed Field Log */}
                  <div className="space-y-2">
                    <span className="text-[8px] text-[#4D5B3D] tracking-[0.25em] font-orbitron uppercase block border-b border-[#4D5B3D]/15 pb-1">// MISSION DIRECTIVE SUMMARY</span>
                    <p className="font-inter text-xs text-[#A8B0B8]/90 leading-relaxed font-light font-inter">
                      {selectedMission.description}
                    </p>
                  </div>

                  {/* Section 2: Technical Specs */}
                  <div className="space-y-2.5">
                    <span className="text-[8px] text-[#4D5B3D] tracking-[0.25em] font-orbitron uppercase block border-b border-[#4D5B3D]/15 pb-1">// COMPILING HARDWARE CONFIG</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedMission.tech.map((techItem, i) => (
                        <span 
                          key={i} 
                          className="text-[9px] px-2 py-0.5 bg-[#4D5B3D]/15 border border-[#4D5B3D]/30 text-white rounded font-mono uppercase"
                        >
                          {techItem}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Section 3: Interactive Link Terminals */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[8px] text-[#4D5B3D] tracking-[0.25em] font-orbitron uppercase block border-b border-[#4D5B3D]/15 pb-1 select-none">// ACTION DIRECTIVES (COMPLETED OBJECTIVES)</span>
                    
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
                          className="flex-1 py-2.5 px-4 bg-[#1B1F24] border border-[#4D5B3D]/40 text-[#A8B0B8] hover:border-[#95FF00] hover:text-[#95FF00] transition-colors rounded flex items-center justify-center gap-2 cursor-pointer hoverable font-orbitron text-[10px] uppercase font-bold"
                        >
                          <FaGithub size={13} />
                          EXTRACT LOGS (GITHUB)
                        </a>
                      )}
                      
                      {/* Live Link (Standard web preview) */}
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
                          className="flex-1 py-2.5 px-4 bg-[#95FF00] text-black hover:bg-white transition-colors rounded flex items-center justify-center gap-2 cursor-pointer hoverable font-orbitron text-[10px] uppercase font-bold"
                        >
                          <ExternalLink size={13} />
                          LAUNCH SIMULATION (LIVE)
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
                          className="flex-1 py-2.5 px-4 bg-[#95FF00] text-black hover:bg-white transition-colors rounded flex items-center justify-center gap-2 cursor-pointer hoverable font-orbitron text-[10px] uppercase font-bold"
                        >
                          <ExternalLink size={13} />
                          DEPLOY DEPOT (PLAY STORE)
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
                          className="flex-1 py-2.5 px-4 bg-[#95FF00] text-black hover:bg-white transition-colors rounded flex items-center justify-center gap-2 cursor-pointer hoverable font-orbitron text-[10px] uppercase font-bold"
                        >
                          <ExternalLink size={13} />
                          DEPLOY MODULE (PUB.DEV)
                        </a>
                      )}
                    </div>
                  </div>

                </div>

                {/* Footer System Console status */}
                <div className="bg-black/60 border-t border-[#4D5B3D]/30 px-6 py-4 font-mono text-[9px] text-[#4D5B3D] tracking-widest uppercase flex justify-between select-none">
                  <span>SECURE_LINK // CONNECTED</span>
                  <span>MONTA_SEC_CORE</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
