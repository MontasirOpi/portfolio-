import { useState, useEffect, useMemo } from "react";
import { playHoverBeep, playTacticalClick } from "../utils/audio";
import { useTheme } from "../context/ThemeContext";
import { Menu, X, Smartphone, Sparkles } from "lucide-react";
import { profileData } from "../data/profile";

export default function Navbar() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isCod = theme === "cod";

  const menuItems = useMemo(() => [
    { id: "hero", label: isCod ? "LOBBY" : "HOME", subtitle: isCod ? "HOME" : "LOBBY" },
    { id: "about", label: isCod ? "DOSSIER" : "ABOUT", subtitle: isCod ? "ABOUT" : "DOSSIER" },
    { id: "skills", label: isCod ? "LOADOUT" : "SKILLS", subtitle: isCod ? "SKILLS" : "LOADOUT" },
    { id: "experience", label: isCod ? "CAMPAIGNS" : "EXPERIENCE", subtitle: isCod ? "EXP" : "CAMPAIGNS" },
    { id: "projects", label: isCod ? "MISSIONS" : "PROJECTS", subtitle: isCod ? "WORK" : "MISSIONS" },
    { id: "services", label: isCod ? "ROLES" : "SERVICES", subtitle: isCod ? "SERVICES" : "ROLES" },
    { id: "achievements", label: isCod ? "MEDALS" : "AWARDS", subtitle: isCod ? "AWARDS" : "MEDALS" },
    { id: "contact", label: isCod ? "COMMS" : "CONTACT", subtitle: isCod ? "CONTACT" : "COMMS" }
  ], [isCod]);

  // Dynamic scrolling state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Trigger when section occupies center screen
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    menuItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [theme, menuItems]); // Re-observe when items update due to theme switch

  const handleNavClick = (id) => {
    setIsOpen(false);
    playTacticalClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[990] transition-all duration-300 ${
        isCod ? "font-orbitron" : "font-inter"
      } ${
        scrolled 
          ? isCod 
            ? "bg-[#0B0D0F]/90 backdrop-blur-md border-b border-[#4D5B3D]/30 py-3" 
            : "bg-[#0F172A]/85 backdrop-blur-lg border-b border-white/5 py-3 shadow-lg shadow-black/15"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Identity */}
          <div 
            onClick={() => handleNavClick("hero")}
            className="flex items-center gap-2.5 cursor-pointer group hoverable"
            onMouseEnter={playHoverBeep}
          >
            {isCod ? (
              <div className="w-8 h-8 bg-[#1B1F24] border border-[#95FF00] flex items-center justify-center relative shadow-[0_0_8px_rgba(149,255,0,0.2)]">
                <span className="font-black text-sm text-[#95FF00] group-hover:scale-110 transition-transform">⚙️</span>
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#95FF00]"></div>
              </div>
            ) : (
              <div className="w-9 h-9 bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] rounded-lg flex items-center justify-center relative shadow-md shadow-[#8B5CF6]/20">
                <Smartphone size={16} className="text-white group-hover:scale-110 transition-transform" />
                <Sparkles size={8} className="absolute -top-0.5 -right-0.5 text-cyan-200 animate-pulse" />
              </div>
            )}

            <div>
              <span className={`font-black tracking-widest text-sm transition-colors uppercase ${
                isCod ? "text-[#A8B0B8] group-hover:text-[#95FF00]" : "text-white group-hover:text-[#22D3EE]"
              }`}>
                {isCod ? "OP_CENTER" : "OPI.DEV"}
              </span>
              <span className={`block text-[8px] tracking-[0.3em] uppercase leading-none mt-0.5 ${
                isCod ? "text-[#4D5B3D]" : "text-slate-400 font-semibold"
              }`}>
                {isCod ? profileData.alias : "MOBILE BUILDER"}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Options */}
          <nav className="hidden lg:flex items-center gap-2">
            {menuItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={playHoverBeep}
                  className={`relative text-left cursor-pointer transition-all duration-200 hoverable flex flex-col justify-center ${
                    isCod
                      ? `px-4 py-2 border min-w-[90px] ${
                          active 
                            ? "bg-[#95FF00]/10 border-[#95FF00] text-[#95FF00] shadow-[0_0_10px_rgba(149,255,0,0.1)]" 
                            : "bg-[#1B1F24]/30 border-[#4D5B3D]/20 text-[#A8B0B8] hover:border-[#95FF00]/40 hover:text-white"
                        }`
                      : `px-4 py-2 rounded-lg ${
                          active
                            ? "bg-slate-800 text-white font-semibold shadow-inner border border-white/5"
                            : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                        }`
                  }`}
                >
                  <span className={`text-[10px] font-bold tracking-wider leading-none uppercase ${
                    !isCod && active ? "text-[#22D3EE]" : ""
                  }`}>
                    {item.label}
                  </span>
                  
                  {isCod ? (
                    <span className={`text-[7px] tracking-widest leading-none mt-1 ${active ? "text-[#95FF00]" : "text-[#4D5B3D]"}`}>
                      {item.subtitle}
                    </span>
                  ) : (
                    <span className={`text-[6px] tracking-widest leading-none mt-0.5 ${active ? "text-[#8B5CF6] font-bold" : "text-slate-500"}`}>
                      {item.subtitle}
                    </span>
                  )}

                  {active && isCod && (
                    <span className="absolute right-1 bottom-1 w-1.5 h-1.5 bg-[#95FF00]"></span>
                  )}
                  {active && !isCod && (
                    <span className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-4 h-[2px] rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE]"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => {
                setIsOpen(!isOpen);
                playTacticalClick();
              }}
              onMouseEnter={playHoverBeep}
              className={`p-2 border transition-colors cursor-pointer hoverable ${
                isCod
                  ? "border-[#4D5B3D]/30 text-[#A8B0B8] bg-[#1B1F24]/60 hover:text-[#95FF00] hover:border-[#95FF00]"
                  : "border-white/10 rounded-lg text-slate-300 bg-slate-800/80 hover:text-[#22D3EE] hover:border-[#22D3EE]/50"
              }`}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className={`lg:hidden fixed inset-0 top-[60px] z-[980] p-6 select-none transition-all duration-300 ${
          isCod 
            ? "bg-[#0B0D0F]/95 border-t border-[#4D5B3D]/30 military-grid" 
            : "bg-[#0F172A]/95 border-t border-white/5 backdrop-blur-xl"
        }`}>
          {isCod && <div className="absolute inset-0 scanline-container opacity-20 pointer-events-none"></div>}
          
          <div className="flex flex-col gap-3 max-w-md mx-auto relative z-10">
            <div className={`text-[10px] tracking-widest mb-2 border-b pb-1 ${
              isCod ? "text-[#4D5B3D] border-[#4D5B3D]/20" : "text-slate-400 border-white/5"
            }`}>
              {isCod ? "// CHOOSE SECTOR DEPLOYMENT" : "NAVIGATION SECTORS"}
            </div>
            
            {menuItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={playHoverBeep}
                  className={`w-full py-3.5 px-4 text-left border relative cursor-pointer flex items-center justify-between transition-all ${
                    isCod
                      ? active 
                        ? "bg-[#95FF00]/10 border-[#95FF00] text-[#95FF00]" 
                        : "bg-[#1B1F24]/50 border-[#4D5B3D]/30 text-[#A8B0B8]"
                      : active
                        ? "bg-[#8B5CF6]/10 border-[#8B5CF6]/30 text-white rounded-lg"
                        : "bg-slate-800/30 border-white/5 text-slate-400 rounded-lg hover:text-white"
                  }`}
                >
                  <div>
                    <span className="block text-xs font-bold tracking-widest">{item.label}</span>
                    <span className={`block text-[8px] tracking-wider uppercase ${isCod ? "text-[#4D5B3D]" : "text-[#22D3EE]"}`}>{item.subtitle}</span>
                  </div>
                  {active && (
                    isCod 
                      ? <span className="w-2 h-2 bg-[#95FF00] shadow-[0_0_8px_#95FF00]"></span>
                      : <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]"></span>
                  )}
                </button>
              );
            })}

            <div className={`mt-8 border p-3 text-[9px] tracking-widest leading-relaxed ${
              isCod 
                ? "border-[#4D5B3D]/20 bg-[#1B1F24]/30 text-[#4D5B3D]" 
                : "border-white/5 bg-slate-900/40 text-slate-500 rounded-lg"
            }`}>
              {isCod 
                ? "OPERATIONAL DOSSIER OF FAHIM MONTASIR OPI. ALL RIGHTS CLASSIFIED. SYS_STATE // STANDBY"
                : "OPI.DEV MOBILE BUILDER ECOSYSTEM. MADE WITH REACT, FLUTTER & CRAFTED PIXELS."}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

