import React, { useState, useEffect } from "react";
import { playHoverBeep, playTacticalClick } from "../utils/audio";
import { Menu, X, Shield, Terminal } from "lucide-react";
import { profileData } from "../data/profile";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "hero", label: "LOBBY", subtitle: "HOME" },
    { id: "about", label: "DOSSIER", subtitle: "ABOUT" },
    { id: "skills", label: "LOADOUT", subtitle: "SKILLS" },
    { id: "experience", label: "CAMPAIGNS", subtitle: "EXP" },
    { id: "projects", label: "MISSIONS", subtitle: "WORK" },
    { id: "services", label: "ROLES", subtitle: "SERVICES" },
    { id: "achievements", label: "MEDALS", subtitle: "AWARDS" },
    { id: "contact", label: "COMMS", subtitle: "CONTACT" }
  ];

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
  }, []);

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
      className={`fixed top-0 left-0 w-full z-[990] transition-all duration-300 font-orbitron ${
        scrolled 
          ? "bg-[#0B0D0F]/90 backdrop-blur-md border-b border-[#4D5B3D]/30 py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Tactical Logo */}
          <div 
            onClick={() => handleNavClick("hero")}
            className="flex items-center gap-2 cursor-pointer group hoverable"
            onMouseEnter={playHoverBeep}
          >
            <div className="w-8 h-8 bg-[#1B1F24] border border-[#95FF00] flex items-center justify-center relative shadow-[0_0_8px_rgba(149,255,0,0.2)]">
              <span className="font-black text-sm text-[#95FF00] group-hover:scale-110 transition-transform">⚙️</span>
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#95FF00]"></div>
            </div>
            <div>
              <span className="font-black text-[#A8B0B8] tracking-widest text-sm group-hover:text-[#95FF00] transition-colors uppercase">
                OP_CENTER
              </span>
              <span className="block text-[8px] text-[#4D5B3D] tracking-[0.3em] uppercase leading-none">
                {profileData.alias}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Options */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {menuItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={playHoverBeep}
                  className={`relative px-4 py-2 border text-left cursor-pointer transition-all duration-200 hoverable flex flex-col justify-center min-w-[90px] ${
                    active 
                      ? "bg-[#95FF00]/10 border-[#95FF00] text-[#95FF00] shadow-[0_0_10px_rgba(149,255,0,0.1)]" 
                      : "bg-[#1B1F24]/30 border-[#4D5B3D]/20 text-[#A8B0B8] hover:border-[#95FF00]/40 hover:text-white"
                  }`}
                >
                  <span className="text-[10px] font-bold tracking-wider leading-none uppercase">{item.label}</span>
                  <span className={`text-[7px] tracking-widest leading-none mt-1 ${active ? "text-[#95FF00]" : "text-[#4D5B3D]"}`}>
                    {item.subtitle}
                  </span>
                  {active && (
                    <span className="absolute right-1 bottom-1 w-1.5 h-1.5 bg-[#95FF00]"></span>
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
              className="p-2 border border-[#4D5B3D]/30 text-[#A8B0B8] bg-[#1B1F24]/60 hover:text-[#95FF00] hover:border-[#95FF00] transition-colors cursor-pointer hoverable"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-[#0B0D0F]/95 backdrop-blur-lg z-[980] border-t border-[#4D5B3D]/30 p-6 military-grid select-none">
          <div className="absolute inset-0 scanline-container opacity-20 pointer-events-none"></div>
          
          <div className="flex flex-col gap-3 max-w-md mx-auto relative z-10">
            <div className="text-[10px] text-[#4D5B3D] tracking-widest mb-2 border-b border-[#4D5B3D]/20 pb-1">
              // CHOOSE SECTOR DEPLOYMENT
            </div>
            
            {menuItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={playHoverBeep}
                  className={`w-full py-3.5 px-4 text-left border relative cursor-pointer flex items-center justify-between transition-all ${
                    active 
                      ? "bg-[#95FF00]/10 border-[#95FF00] text-[#95FF00]" 
                      : "bg-[#1B1F24]/50 border-[#4D5B3D]/30 text-[#A8B0B8]"
                  }`}
                >
                  <div>
                    <span className="block text-xs font-bold tracking-widest">{item.label}</span>
                    <span className="block text-[8px] tracking-wider text-[#4D5B3D] uppercase">{item.subtitle}</span>
                  </div>
                  {active && (
                    <span className="w-2 h-2 bg-[#95FF00] shadow-[0_0_8px_#95FF00]"></span>
                  )}
                </button>
              );
            })}

            <div className="mt-8 border border-[#4D5B3D]/20 bg-[#1B1F24]/30 p-3 text-[9px] text-[#4D5B3D] tracking-widest leading-relaxed">
              OPERATIONAL DOSSIER OF FAHIM MONTASIR OPI. ALL RIGHTS CLASSIFIED. SYS_STATE // STANDBY
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
