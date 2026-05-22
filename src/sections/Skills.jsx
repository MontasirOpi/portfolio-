import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillsData } from "../data/skills";
import { playHoverBeep, playSelectSweep } from "../utils/audio";
import { Shield, Zap, Crosshair, Award } from "lucide-react";

export default function Skills() {
  // Default selected skill for the Weapon Analysis details panel
  const [selectedWeapon, setSelectedWeapon] = useState({
    name: "DART",
    level: 90,
    type: "MAIN CALIBER",
    description: "Primary weapon for high-efficiency, multi-platform runtime."
  });

  const handleWeaponHover = (weapon) => {
    playHoverBeep();
    setSelectedWeapon(weapon);
  };

  return (
    <section 
      id="skills" 
      className="py-24 bg-[#0B0D0F] military-grid border-b border-[#4D5B3D]/25 select-none relative font-orbitron overflow-hidden"
    >
      <div className="absolute inset-0 scanline-container opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center lg:text-left">
          <div className="text-[10px] text-[#95FF00] tracking-[0.3em] font-black uppercase mb-1.5 flex items-center justify-center lg:justify-start gap-2">
            <span className="w-2 h-2 bg-[#95FF00] animate-pulse"></span>
            ARSENAL_LOADOUT // WEAPON_SELECTION
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-widest uppercase">
            WEAPON LOADOUT
          </h2>
          <div className="w-24 h-[3px] bg-[#95FF00] mt-3 mx-auto lg:mx-0 shadow-[0_0_8px_#95FF00]"></div>
        </div>

        {/* Arsenal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Columns - Weapons & Gear Inventory */}
          <div className="lg:col-span-8 space-y-8 flex flex-col justify-between">
            
            {/* Primary Weapons (Languages) */}
            <div>
              <div className="text-[10px] text-[#4D5B3D] tracking-[0.25em] mb-3 uppercase flex items-center gap-2">
                <span>[SLOT_01] PRIMARY WEAPONS (LANGUAGES)</span>
                <span className="h-[1px] bg-[#4D5B3D]/30 flex-grow"></span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skillsData.primaryWeapons.map((weapon, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => handleWeaponHover(weapon)}
                    className="p-4 bg-[#1B1F24]/80 border border-[#4D5B3D]/30 rounded cursor-pointer transition-all hover:border-[#95FF00] hover:bg-[#95FF00]/5 flex items-center justify-between hoverable group"
                  >
                    <div>
                      <span className="block text-xs font-bold text-white group-hover:text-[#95FF00] transition-colors">{weapon.name}</span>
                      <span className="block text-[8px] text-[#4D5B3D] tracking-wider mt-0.5">{weapon.type}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-xs font-black text-[#95FF00]">{weapon.level}%</span>
                      <span className="block text-[8px] text-[#4D5B3D] uppercase">CALIBER</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Weapons (Frameworks) */}
            <div>
              <div className="text-[10px] text-[#4D5B3D] tracking-[0.25em] mb-3 uppercase flex items-center gap-2">
                <span>[SLOT_02] SECONDARY WEAPONS (FRAMEWORKS)</span>
                <span className="h-[1px] bg-[#4D5B3D]/30 flex-grow"></span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skillsData.secondaryWeapons.map((weapon, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => handleWeaponHover(weapon)}
                    className="p-4 bg-[#1B1F24]/80 border border-[#4D5B3D]/30 rounded cursor-pointer transition-all hover:border-[#95FF00] hover:bg-[#95FF00]/5 flex items-center justify-between hoverable group"
                  >
                    <div>
                      <span className="block text-xs font-bold text-white group-hover:text-[#95FF00] transition-colors">{weapon.name}</span>
                      <span className="block text-[8px] text-[#4D5B3D] tracking-wider mt-0.5">{weapon.type}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-xs font-black text-[#95FF00]">{weapon.level}%</span>
                      <span className="block text-[8px] text-[#4D5B3D] uppercase">POWER</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tactical Gear & Attachments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Tactical Gear (Databases) */}
              <div>
                <div className="text-[10px] text-[#4D5B3D] tracking-[0.25em] mb-3 uppercase flex items-center gap-2">
                  <span>[TACTICAL] DATABASES</span>
                </div>
                <div className="space-y-2">
                  {skillsData.tacticalGear.map((gear, idx) => (
                    <div
                      key={idx}
                      onMouseEnter={() => handleWeaponHover(gear)}
                      className="p-3 bg-[#1B1F24]/50 border border-[#4D5B3D]/20 rounded cursor-pointer transition-all hover:border-[#95FF00] hover:bg-[#95FF00]/5 flex items-center justify-between hoverable group"
                    >
                      <span className="text-[11px] font-bold text-white group-hover:text-[#95FF00] transition-colors">{gear.name}</span>
                      <span className="text-[10px] font-bold text-[#95FF00]">{gear.level}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attachments (Tools) */}
              <div>
                <div className="text-[10px] text-[#4D5B3D] tracking-[0.25em] mb-3 uppercase flex items-center gap-2">
                  <span>[HARDWARE] ATTACHMENTS</span>
                </div>
                <div className="space-y-2">
                  {skillsData.attachments.map((tool, idx) => (
                    <div
                      key={idx}
                      onMouseEnter={() => handleWeaponHover(tool)}
                      className="p-3 bg-[#1B1F24]/50 border border-[#4D5B3D]/20 rounded cursor-pointer transition-all hover:border-[#95FF00] hover:bg-[#95FF00]/5 flex items-center justify-between hoverable group"
                    >
                      <span className="text-[11px] font-bold text-white group-hover:text-[#95FF00] transition-colors">{tool.name}</span>
                      <span className="text-[10px] font-bold text-[#95FF00]">{tool.level}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - CoD Weapon Spec Sheet Analyzer */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="bg-[#1B1F24]/90 border border-[#4D5B3D]/40 p-6 rounded flex flex-col justify-between flex-grow tactical-border backdrop-blur-md relative font-mono text-[10px] text-[#A8B0B8]">
              <div className="tactical-corner-bl"></div>
              <div className="tactical-corner-br"></div>

              {/* Console Header */}
              <div className="flex justify-between items-start text-[8px] text-[#4D5B3D] tracking-widest border-b border-[#4D5B3D]/20 pb-2 mb-6 uppercase">
                <span>INTEL_DEVICE // ANALYZER</span>
                <span>STATUS_CLEAR</span>
              </div>

              {/* Holographic grid wireframe */}
              <div className="relative border border-[#4D5B3D]/30 bg-black/60 rounded p-4 h-40 flex flex-col items-center justify-center overflow-hidden mb-6 scanline-container">
                <div className="absolute inset-0 military-grid opacity-30 pointer-events-none"></div>
                
                {/* Simulated Waveform SVG */}
                <svg className="w-full h-16 text-[#95FF00] opacity-70" viewBox="0 0 100 40">
                  <path 
                    d="M 0,20 Q 10,5 20,20 T 40,20 T 60,20 T 80,35 T 100,20" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5"
                    className="animate-pulse"
                  />
                  <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(77,91,61,0.2)" strokeWidth="0.5" />
                </svg>

                <div className="text-[8px] text-[#4D5B3D] mt-4 uppercase tracking-[0.2em]">HOLO_CALIBRATION_STABLE</div>
              </div>

              {/* Weapon Description info */}
              <div className="space-y-4 mb-6">
                <div className="border-b border-[#4D5B3D]/25 pb-2">
                  <span className="block text-[8px] text-[#4D5B3D] tracking-widest uppercase">WEAPON UNIT IDENTIFICATION</span>
                  <span className="font-orbitron font-black text-base text-white tracking-widest mt-1 block">
                    {selectedWeapon.name}
                  </span>
                  <span className="inline-block px-1.5 py-0.5 bg-[#95FF00]/10 border border-[#95FF00]/30 text-[#95FF00] text-[7px] font-bold uppercase rounded mt-1.5 tracking-wider">
                    {selectedWeapon.type}
                  </span>
                </div>

                <div>
                  <span className="block text-[8px] text-[#4D5B3D] tracking-widest uppercase mb-1">TACTICAL PERFORMANCE Intel</span>
                  <p className="font-inter text-xs text-[#A8B0B8]/80 leading-relaxed font-light">
                    {selectedWeapon.description}
                  </p>
                </div>
              </div>

              {/* Simulated Stats bars */}
              <div className="space-y-2.5 border-t border-[#4D5B3D]/20 pt-4 mb-2">
                <div className="text-[8px] text-[#4D5B3D] tracking-widest uppercase mb-1">WEAPON STAT COMPARISONS</div>
                
                {/* Damage bar */}
                <div>
                  <div className="flex justify-between text-[8px] text-[#A8B0B8] mb-1">
                    <span>DESTRUCTIVE IMPACT (LEVEL)</span>
                    <span className="text-[#95FF00] font-bold">{selectedWeapon.level}%</span>
                  </div>
                  <div className="h-1 bg-black/60 rounded overflow-hidden">
                    <motion.div 
                      key={`${selectedWeapon.name}-dmg`}
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedWeapon.name ? selectedWeapon.level : 0}%` }}
                      transition={{ duration: 0.6 }}
                      className="h-full bg-[#95FF00]" 
                    />
                  </div>
                </div>

                {/* Range bar (Simulated) */}
                <div>
                  <div className="flex justify-between text-[8px] text-[#A8B0B8] mb-1">
                    <span>OPERATIONAL RANGE (STRETCH)</span>
                    <span className="text-[#95FF00] font-bold">{Math.min(selectedWeapon.level + 8, 100)}%</span>
                  </div>
                  <div className="h-1 bg-black/60 rounded overflow-hidden">
                    <motion.div 
                      key={`${selectedWeapon.name}-rng`}
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedWeapon.name ? Math.min(selectedWeapon.level + 8, 100) : 0}%` }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="h-full bg-[#95FF00]/80" 
                    />
                  </div>
                </div>

                {/* Mobility bar (Simulated) */}
                <div>
                  <div className="flex justify-between text-[8px] text-[#A8B0B8] mb-1">
                    <span>STYLING & RESPONSIVENESS (MOBILITY)</span>
                    <span className="text-[#95FF00] font-bold">{Math.max(selectedWeapon.level - 12, 50)}%</span>
                  </div>
                  <div className="h-1 bg-black/60 rounded overflow-hidden">
                    <motion.div 
                      key={`${selectedWeapon.name}-mob`}
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedWeapon.name ? Math.max(selectedWeapon.level - 12, 50) : 0}%` }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="h-full bg-[#95FF00]/60" 
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Combat Perks Section - SLOT 03 */}
        <div className="mt-12 font-orbitron select-none">
          <div className="text-[10px] text-[#4D5B3D] tracking-[0.25em] mb-4 uppercase flex items-center gap-2">
            <span>[BARRACKS] COMBAT PERKS (ARCHITECTURES & PROTOCOLS)</span>
            <span className="h-[1px] bg-[#4D5B3D]/30 flex-grow"></span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {skillsData.combatPerks.map((perk, idx) => (
              <div
                key={idx}
                onMouseEnter={playHoverBeep}
                className="bg-[#1B1F24]/85 border border-[#4D5B3D]/30 p-4 rounded flex gap-4 hover:border-[#95FF00] hover:bg-[#95FF00]/5 transition-all select-text duration-200"
              >
                <div className="w-10 h-10 rounded-full border border-[#95FF00] flex items-center justify-center shrink-0 bg-[#95FF00]/10 text-[#95FF00] shadow-[0_0_8px_rgba(149,255,0,0.15)]">
                  <Zap size={16} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] bg-[#4D5B3D]/25 border border-[#4D5B3D]/30 px-1 rounded text-[#4D5B3D] font-mono leading-none py-0.5">{perk.perkSlot}</span>
                    <span className="text-xs font-bold text-white uppercase font-orbitron">{perk.name}</span>
                  </div>
                  <p className="text-[10px] text-[#A8B0B8]/75 leading-relaxed font-inter font-light mt-1.5">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
