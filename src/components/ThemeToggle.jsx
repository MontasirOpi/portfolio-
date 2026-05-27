import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { playHoverBeep, playTacticalClick } from "../utils/audio";
import { Target, Smartphone, Sparkles } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const handleToggleClick = () => {
    playTacticalClick();
    toggleTheme();
  };

  const handleMouseEnter = () => {
    playHoverBeep();
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3">
      {/* Dynamic Animated Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 15, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 15, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`px-3 py-1.5 rounded text-[10px] font-orbitron tracking-widest uppercase pointer-events-none whitespace-nowrap shadow-lg border ${
              theme === "cod"
                ? "bg-[#0B0D0F] border-[#95FF00]/40 text-[#95FF00] shadow-[#95FF00]/10"
                : "bg-[#0F172A]/90 backdrop-blur-md border-[#8B5CF6]/30 text-white shadow-black/45"
            }`}
          >
            {theme === "cod" ? "// INFILTRATE: MOBILE DEV" : "DECRYPT: COD TACTICAL"}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Futuristic Floating Button */}
      <motion.button
        onClick={handleToggleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.12, rotate: theme === "cod" ? 90 : -9, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className={`relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer select-none transition-all duration-300 ${
          theme === "cod"
            ? "bg-black/90 border-2 border-[#95FF00] text-[#95FF00] shadow-[0_0_15px_rgba(149,255,0,0.4)]"
            : "bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] text-white shadow-[0_4px_20px_rgba(139,92,246,0.35)]"
        }`}
      >
        {/* Pulsating background ring for extra visual depth */}
        {theme === "cod" ? (
          <span className="absolute inset-0 rounded-full border border-[#95FF00] animate-ping opacity-25 pointer-events-none" />
        ) : (
          <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] blur-md opacity-50 animate-pulse pointer-events-none" />
        )}

        {/* Dynamic morphing icon layout */}
        <AnimatePresence mode="wait">
          {theme === "cod" ? (
            <motion.div
              key="cod-icon"
              initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25 }}
              className="relative flex items-center justify-center"
            >
              <Target size={22} className="relative z-10 animate-pulse-fast" />
              {/* COD crosshair framing lines */}
              <div className="absolute w-6 h-[1.5px] bg-[#95FF00]/40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute h-6 w-[1.5px] bg-[#95FF00]/40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </motion.div>
          ) : (
            <motion.div
              key="mobile-icon"
              initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25 }}
              className="relative flex items-center justify-center"
            >
              <Smartphone size={22} className="relative z-10" />
              <Sparkles size={11} className="absolute -top-1 -right-1 text-cyan-200 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic corner markings for COD style */}
        {theme === "cod" && (
          <>
            <div className="absolute top-0.5 left-0.5 text-[6px] font-bold opacity-30 select-none">L4</div>
            <div className="absolute bottom-0.5 right-0.5 text-[6px] font-bold opacity-30 select-none">OP</div>
          </>
        )}
      </motion.button>
    </div>
  );
}
