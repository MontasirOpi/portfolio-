import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { skillsData } from "../data/skills";
import { playHoverBeep } from "../utils/audio";
import { Zap } from "lucide-react";

export default function Skills() {
  const { theme } = useTheme();
  // Default selected skill for the Details panel
  const [selectedWeapon, setSelectedWeapon] = useState({
    name: "DART",
    level: 90,
    type: "MAIN CALIBER",
    description: "Primary weapon for high-efficiency, multi-platform runtime."
  });

  const isCod = theme === "cod";

  const handleWeaponHover = (weapon) => {
    playHoverBeep();
    setSelectedWeapon(weapon);
  };

  // Dynamic code snippets mapped to skills for premium interactive code panel
  const skillCodeSnippets = {
    "DART": `// Dart AOT Compiler
void main() {
  final app = ModernApp(
    platform: Platform.mobile,
    rendering: RenderingEngine.impeller,
  );
  runApp(app);
}`,
    "PYTHON": `# Python Automation
import tensorflow as tf

model = tf.keras.models.Sequential([
  tf.keras.layers.Dense(128, activation='relu'),
  tf.keras.layers.Dropout(0.2),
  tf.keras.layers.Dense(10)
])`,
    "JAVASCRIPT": `// Core JS Engine
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'active', fps: 60 }));
});`,
    "C++": `// C++ Low Level Engine
#include <iostream>
int main() {
    std::cout << "Impeller Engine Initialized" << std::endl;
    return 0;
}`,
    "FLUTTER": `// Flutter Pixel-Perfect UI
class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData.useMaterial3(true),
      home: SmoothScrollWidget(fps: 60),
    );
  }
}`,
    "REACT.JS": `// React.js Virtual DOM Component
export default function Portfolio() {
  const [active, setActive] = useState(true);
  return (
    <div className="frosted-card transition-all">
      <CustomWidget glow={active} />
    </div>
  );
}`,
    "FIREBASE": `// Firebase Secure Database Auth
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Session token aligned.
  });`,
    "SUPABASE": `// Supabase Postgres Realtime Stream
const channels = supabase.channel('room-1')
  .on('postgres_changes', { event: '*', schema: 'public' }, payload => {
    console.log('Realtime telemetry stream:', payload);
  })
  .subscribe();`,
    "MONGODB": `// MongoDB NoSQL Secure Aggregation
db.collection('intel').aggregate([
  { $match: { security_clearance: "LEVEL_4" } },
  { $group: { _id: "$sector", total: { $sum: 1 } } }
]);`,
    "VS CODE": `// settings.json
{
  "editor.experimental.fontLigatures": true,
  "editor.formatOnSave": true,
  "editor.cursorBlinking": "smooth",
  "editor.minimap.enabled": false
}`,
    "ANDROID STUDIO": `// build.gradle.kts
android {
    compileSdk = 34
    defaultConfig {
        applicationId = "app.opi.mobile"
        minSdk = 24
    }
}`,
    "CURSOR": `// AI Laser Coding Prompt
/implement-theme-switch-system
Using Framer Motion spring actions, 
create smooth, glassmorphic elements 
and variable-responsive CSS morphing.`
  };

  return (
    <section 
      id="skills" 
      className={`py-24 transition-colors duration-700 ${
        isCod 
          ? "bg-[#0B0D0F] military-grid border-b border-[#4D5B3D]/25 select-none relative font-orbitron overflow-hidden" 
          : "bg-[#0F172A] border-b border-white/5 relative font-inter overflow-hidden"
      }`}
    >
      {isCod && <div className="absolute inset-0 scanline-container opacity-10 pointer-events-none"></div>}

      {/* Decorative details (Mobile theme) */}
      {!isCod && (
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blob-cyan blur-3xl opacity-15 pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center lg:text-left">
          <div className={`text-[10px] tracking-[0.3em] font-black uppercase mb-1.5 flex items-center justify-center lg:justify-start gap-2 ${
            isCod ? "text-[#95FF00]" : "text-[#8B5CF6]"
          }`}>
            <span className={`w-2 h-2 animate-pulse ${isCod ? "bg-[#95FF00]" : "bg-[#8B5CF6]"}`}></span>
            {isCod ? "ARSENAL_LOADOUT // WEAPON_SELECTION" : "DEVELOPER TOOLKIT // CAPABILITIES"}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-widest uppercase">
            {isCod ? "WEAPON LOADOUT" : "TECHNICAL TOOLKIT"}
          </h2>
          <div className={`w-24 h-[3px] mt-3 mx-auto lg:mx-0 shadow-lg ${
            isCod ? "bg-[#95FF00] shadow-[#95FF00]/40" : "bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] shadow-[#8B5CF6]/30"
          }`}></div>
        </div>

        {/* Arsenal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Columns - Weapons & Gear Inventory */}
          <div className="lg:col-span-8 space-y-8 flex flex-col justify-between">
            
            {/* Primary Weapons (Languages) */}
            <div>
              <div className={`text-[10px] tracking-[0.25em] mb-3 uppercase flex items-center gap-2 ${
                isCod ? "text-[#4D5B3D]" : "text-slate-400 font-semibold"
              }`}>
                <span>{isCod ? "[SLOT_01] PRIMARY WEAPONS (LANGUAGES)" : "[01] CORE PROGRAMMING LANGUAGES"}</span>
                <span className={`h-[1px] flex-grow ${isCod ? "bg-[#4D5B3D]/30" : "bg-white/10"}`}></span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skillsData.primaryWeapons.map((weapon, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => handleWeaponHover(weapon)}
                    className={`p-4 cursor-pointer transition-all flex items-center justify-between hoverable group ${
                      isCod 
                        ? "bg-[#1B1F24]/80 border border-[#4D5B3D]/30 rounded hover:border-[#95FF00] hover:bg-[#95FF00]/5" 
                        : "glass-card rounded-xl hover:border-[#8B5CF6]/40"
                    } ${selectedWeapon.name === weapon.name && !isCod ? "border-[#8B5CF6]/50 bg-slate-800/80 shadow-[0_0_15px_rgba(139,92,246,0.1)]" : ""}`}
                  >
                    <div>
                      <span className={`block text-xs font-bold transition-colors ${
                        isCod ? "text-white group-hover:text-[#95FF00]" : "text-white group-hover:text-[#22D3EE]"
                      }`}>{weapon.name}</span>
                      <span className={`block text-[8px] tracking-wider mt-0.5 ${isCod ? "text-[#4D5B3D]" : "text-slate-400 font-medium"}`}>
                        {isCod ? weapon.type : "LANGUAGE CORE"}
                      </span>
                    </div>
                    <div className="text-right font-mono">
                      <span className={`block text-xs font-black ${isCod ? "text-[#95FF00]" : "text-[#22D3EE]"}`}>{weapon.level}%</span>
                      <span className={`block text-[8px] uppercase ${isCod ? "text-[#4D5B3D]" : "text-slate-500"}`}>
                        {isCod ? "CALIBER" : "CAPACITY"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Weapons (Frameworks) */}
            <div>
              <div className={`text-[10px] tracking-[0.25em] mb-3 uppercase flex items-center gap-2 ${
                isCod ? "text-[#4D5B3D]" : "text-slate-400 font-semibold"
              }`}>
                <span>{isCod ? "[SLOT_02] SECONDARY WEAPONS (FRAMEWORKS)" : "[02] APPLICATION FRAMEWORKS"}</span>
                <span className={`h-[1px] flex-grow ${isCod ? "bg-[#4D5B3D]/30" : "bg-white/10"}`}></span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skillsData.secondaryWeapons.map((weapon, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => handleWeaponHover(weapon)}
                    className={`p-4 cursor-pointer transition-all flex items-center justify-between hoverable group ${
                      isCod 
                        ? "bg-[#1B1F24]/80 border border-[#4D5B3D]/30 rounded hover:border-[#95FF00] hover:bg-[#95FF00]/5" 
                        : "glass-card rounded-xl hover:border-[#8B5CF6]/40"
                    } ${selectedWeapon.name === weapon.name && !isCod ? "border-[#8B5CF6]/50 bg-slate-800/80 shadow-[0_0_15px_rgba(139,92,246,0.15)]" : ""}`}
                  >
                    <div>
                      <span className={`block text-xs font-bold transition-colors ${
                        isCod ? "text-white group-hover:text-[#95FF00]" : "text-white group-hover:text-[#22D3EE]"
                      }`}>{weapon.name}</span>
                      <span className={`block text-[8px] tracking-wider mt-0.5 ${isCod ? "text-[#4D5B3D]" : "text-slate-400 font-medium"}`}>
                        {isCod ? weapon.type : "UI DEV ENGINE"}
                      </span>
                    </div>
                    <div className="text-right font-mono">
                      <span className={`block text-xs font-black ${isCod ? "text-[#95FF00]" : "text-[#22D3EE]"}`}>{weapon.level}%</span>
                      <span className={`block text-[8px] uppercase ${isCod ? "text-[#4D5B3D]" : "text-slate-500"}`}>
                        {isCod ? "POWER" : "COMPETENCY"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tactical Gear & Attachments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Tactical Gear (Databases) */}
              <div>
                <div className={`text-[10px] tracking-[0.25em] mb-3 uppercase ${isCod ? "text-[#4D5B3D]" : "text-slate-400 font-semibold"}`}>
                  <span>{isCod ? "[TACTICAL] DATABASES" : "[03] CLOUD SYSTEMS & DATABASES"}</span>
                </div>
                <div className="space-y-2">
                  {skillsData.tacticalGear.map((gear, idx) => (
                    <div
                      key={idx}
                      onMouseEnter={() => handleWeaponHover(gear)}
                      className={`p-3 cursor-pointer transition-all flex items-center justify-between hoverable group ${
                        isCod 
                          ? "bg-[#1B1F24]/50 border border-[#4D5B3D]/20 rounded hover:border-[#95FF00] hover:bg-[#95FF00]/5" 
                          : "glass-card rounded-xl hover:border-[#8B5CF6]/30"
                      } ${selectedWeapon.name === gear.name && !isCod ? "border-[#8B5CF6]/50 bg-slate-800/80" : ""}`}
                    >
                      <span className={`text-[11px] font-bold transition-colors ${
                        isCod ? "text-white group-hover:text-[#95FF00]" : "text-white group-hover:text-[#22D3EE]"
                      }`}>{gear.name}</span>
                      <span className={`text-[10px] font-mono font-bold ${isCod ? "text-[#95FF00]" : "text-[#22D3EE]"}`}>{gear.level}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attachments (Tools) */}
              <div>
                <div className={`text-[10px] tracking-[0.25em] mb-3 uppercase ${isCod ? "text-[#4D5B3D]" : "text-slate-400 font-semibold"}`}>
                  <span>{isCod ? "[HARDWARE] ATTACHMENTS" : "[04] IDEs & WORK ENVIRONMENTS"}</span>
                </div>
                <div className="space-y-2">
                  {skillsData.attachments.map((tool, idx) => (
                    <div
                      key={idx}
                      onMouseEnter={() => handleWeaponHover(tool)}
                      className={`p-3 cursor-pointer transition-all flex items-center justify-between hoverable group ${
                        isCod 
                          ? "bg-[#1B1F24]/50 border border-[#4D5B3D]/20 rounded hover:border-[#95FF00] hover:bg-[#95FF00]/5" 
                          : "glass-card rounded-xl hover:border-[#8B5CF6]/30"
                      } ${selectedWeapon.name === tool.name && !isCod ? "border-[#8B5CF6]/50 bg-slate-800/80" : ""}`}
                    >
                      <span className={`text-[11px] font-bold transition-colors ${
                        isCod ? "text-white group-hover:text-[#95FF00]" : "text-white group-hover:text-[#22D3EE]"
                      }`}>{tool.name}</span>
                      <span className={`text-[10px] font-mono font-bold ${isCod ? "text-[#95FF00]" : "text-[#22D3EE]"}`}>{tool.level}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Spec Sheet Analyzer / Code Dashboard */}
          <div className="lg:col-span-4 flex flex-col">
            <div className={`p-6 rounded flex flex-col justify-between flex-grow backdrop-blur-md relative font-mono text-[10px] transition-all duration-500 ${
              isCod 
                ? "bg-[#1B1F24]/90 border border-[#4D5B3D]/40 tactical-border text-[#A8B0B8]" 
                : "glass-panel text-slate-300"
            }`}>
              {isCod && (
                <>
                  <div className="tactical-corner-bl"></div>
                  <div className="tactical-corner-br"></div>
                </>
              )}

              {/* Console Header */}
              <div className={`flex justify-between items-start text-[8px] tracking-widest border-b pb-2 mb-6 uppercase ${
                isCod ? "text-[#4D5B3D] border-[#4D5B3D]/20" : "text-slate-400 border-white/5"
              }`}>
                <span>{isCod ? "INTEL_DEVICE // ANALYZER" : "CODE_INTEGRATION // ENGINE"}</span>
                <span>{isCod ? "STATUS_CLEAR" : "STATUS // READY"}</span>
              </div>

              {/* Dynamic Holo Screen or Live Code Sandbox */}
              <div className={`relative border bg-black/60 rounded p-4 h-44 flex flex-col overflow-hidden mb-6 transition-colors duration-500 ${
                isCod 
                  ? "border-[#4D5B3D]/30 scanline-container items-center justify-center" 
                  : "border-white/5 items-start justify-start p-3 select-text"
              }`}>
                {isCod ? (
                  <>
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
                  </>
                ) : (
                  // Elegant Code Editor Sandbox
                  <div className="w-full h-full flex flex-col font-mono text-[9px] text-slate-300 leading-normal select-text">
                    <div className="flex items-center gap-1.5 text-slate-500 text-[8px] mb-2 pb-1.5 border-b border-white/5">
                      <span className="w-2 h-2 rounded-full bg-red-500/50"></span>
                      <span className="w-2 h-2 rounded-full bg-yellow-500/50"></span>
                      <span className="w-2 h-2 rounded-full bg-green-500/50"></span>
                      <span className="ml-2 font-mono text-slate-400">{selectedWeapon.name.toLowerCase().replace(" ", "_")}_demo.swift</span>
                    </div>
                    
                    <pre className="text-[#22D3EE] flex-grow overflow-y-auto whitespace-pre-wrap select-text pr-1 font-mono leading-relaxed select-text">
                      <code className="select-text font-mono">
                        {skillCodeSnippets[selectedWeapon.name.toUpperCase()] || `// No snippet loaded.`}
                      </code>
                    </pre>
                  </div>
                )}
              </div>

              {/* Weapon Description info */}
              <div className="space-y-4 mb-6">
                <div className={`border-b pb-2 ${isCod ? "border-[#4D5B3D]/25" : "border-white/5"}`}>
                  <span className={`block text-[8px] tracking-widest uppercase ${isCod ? "text-[#4D5B3D]" : "text-[#8B5CF6]"}`}>
                    {isCod ? "WEAPON UNIT IDENTIFICATION" : "SYSTEM UTILITY IDENTITY"}
                  </span>
                  <span className="font-orbitron font-black text-base text-white tracking-widest mt-1 block">
                    {selectedWeapon.name}
                  </span>
                  <span className={`inline-block px-1.5 py-0.5 border text-[7px] font-bold uppercase rounded mt-1.5 tracking-wider ${
                    isCod 
                      ? "bg-[#95FF00]/10 border-[#95FF00]/30 text-[#95FF00]" 
                      : "bg-[#22D3EE]/10 border-[#22D3EE]/30 text-[#22D3EE]"
                  }`}>
                    {isCod ? selectedWeapon.type : "CAPABILITY ELEMENT"}
                  </span>
                </div>

                <div>
                  <span className={`block text-[8px] tracking-widest uppercase mb-1 ${isCod ? "text-[#4D5B3D]" : "text-slate-400 font-semibold"}`}>
                    {isCod ? "TACTICAL PERFORMANCE Intel" : "ENGINEERING DEPLOYMENT SUMMARY"}
                  </span>
                  <p className="font-inter text-xs text-slate-300 leading-relaxed font-light select-text">
                    {selectedWeapon.description}
                  </p>
                </div>
              </div>

              {/* Simulated Stats bars */}
              <div className={`space-y-2.5 border-t pt-4 mb-2 ${isCod ? "border-[#4D5B3D]/20" : "border-white/5"}`}>
                <div className={`text-[8px] tracking-widest uppercase mb-1 ${isCod ? "text-[#4D5B3D]" : "text-slate-400 font-semibold"}`}>
                  {isCod ? "WEAPON STAT COMPARISONS" : "MODULE EFFICIENCY CHARACTERISTICS"}
                </div>
                
                {/* Metric 1 */}
                <div>
                  <div className="flex justify-between text-[8px] mb-1">
                    <span>{isCod ? "DESTRUCTIVE IMPACT (LEVEL)" : "ENGINE COMPILER COMPATIBILITY"}</span>
                    <span className={`font-bold ${isCod ? "text-[#95FF00]" : "text-[#22D3EE]"}`}>{selectedWeapon.level}%</span>
                  </div>
                  <div className="h-1 bg-black/60 rounded overflow-hidden">
                    <motion.div 
                      key={`${selectedWeapon.name}-dmg`}
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedWeapon.name ? selectedWeapon.level : 0}%` }}
                      transition={{ duration: 0.6 }}
                      className={`h-full ${isCod ? "bg-[#95FF00]" : "bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE]"}`} 
                    />
                  </div>
                </div>

                {/* Metric 2 */}
                <div>
                  <div className="flex justify-between text-[8px] mb-1">
                    <span>{isCod ? "OPERATIONAL RANGE (STRETCH)" : "SCALABILITY & RUNTIME ROBUSTNESS"}</span>
                    <span className={`font-bold ${isCod ? "text-[#95FF00]" : "text-[#22D3EE]"}`}>{Math.min(selectedWeapon.level + 8, 100)}%</span>
                  </div>
                  <div className="h-1 bg-black/60 rounded overflow-hidden">
                    <motion.div 
                      key={`${selectedWeapon.name}-rng`}
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedWeapon.name ? Math.min(selectedWeapon.level + 8, 100) : 0}%` }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className={`h-full ${isCod ? "bg-[#95FF00]/80" : "bg-[#22D3EE]/80"}`} 
                    />
                  </div>
                </div>

                {/* Metric 3 */}
                <div>
                  <div className="flex justify-between text-[8px] mb-1">
                    <span>{isCod ? "STYLING & RESPONSIVENESS (MOBILITY)" : "UI RENDERING STABILITY & SPEED"}</span>
                    <span className={`font-bold ${isCod ? "text-[#95FF00]" : "text-[#22D3EE]"}`}>{Math.max(selectedWeapon.level - 12, 50)}%</span>
                  </div>
                  <div className="h-1 bg-black/60 rounded overflow-hidden">
                    <motion.div 
                      key={`${selectedWeapon.name}-mob`}
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedWeapon.name ? Math.max(selectedWeapon.level - 12, 50) : 0}%` }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className={`h-full ${isCod ? "bg-[#95FF00]/60" : "bg-[#8B5CF6]/70"}`} 
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Combat Perks Section - SLOT 03 */}
        <div className="mt-12 select-none">
          <div className={`text-[10px] tracking-[0.25em] mb-4 uppercase flex items-center gap-2 ${
            isCod ? "text-[#4D5B3D] font-orbitron" : "text-slate-400 font-inter font-semibold"
          }`}>
            <span>{isCod ? "[BARRACKS] COMBAT PERKS (ARCHITECTURES & PROTOCOLS)" : "CORE ARCHITECTURAL SPECIALIZATIONS"}</span>
            <span className={`h-[1px] flex-grow ${isCod ? "bg-[#4D5B3D]/30" : "bg-white/10"}`}></span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {skillsData.combatPerks.map((perk, idx) => (
              <div
                key={idx}
                onMouseEnter={playHoverBeep}
                className={`p-4 rounded flex gap-4 transition-all duration-200 select-text ${
                  isCod 
                    ? "bg-[#1B1F24]/85 border border-[#4D5B3D]/30 hover:border-[#95FF00] hover:bg-[#95FF00]/5 font-orbitron" 
                    : "glass-card rounded-2xl hover:border-[#8B5CF6]/30 font-inter"
                }`}
              >
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 shadow-md ${
                  isCod 
                    ? "border-[#95FF00] bg-[#95FF00]/10 text-[#95FF00] shadow-[#95FF00]/10" 
                    : "border-[#8B5CF6]/40 bg-gradient-to-tr from-[#8B5CF6]/15 to-[#22D3EE]/15 text-[#22D3EE] shadow-black/20"
                }`}>
                  <Zap size={16} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[8px] border px-1 rounded font-mono leading-none py-0.5 ${
                      isCod ? "bg-[#4D5B3D]/25 border-[#4D5B3D]/30 text-[#4D5B3D]" : "bg-slate-800 border-white/10 text-slate-400 font-semibold"
                    }`}>{isCod ? perk.perkSlot : `SPEC_0${idx + 1}`}</span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{perk.name}</span>
                  </div>
                  <p className="text-[10px] text-slate-300 leading-relaxed font-light mt-1.5 select-text font-inter">
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

