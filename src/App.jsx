import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useTheme } from "./context/ThemeContext";
import Preloader from "./components/Preloader";
import ThemeGate from "./components/ThemeGate";
import TacticalCursor from "./components/TacticalCursor";
import HUDOverlay from "./components/HUDOverlay";
import Navbar from "./components/Navbar";
import ThemeToggle from "./components/ThemeToggle";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Services from "./sections/Services";
import Achievements from "./sections/Achievements";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";

export default function App() {
  const { theme, setTheme } = useTheme();
  
  // Decide whether to show the Theme Selection Gate based on localStorage cache presence.
  const [showThemeGate, setShowThemeGate] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("portfolio-theme");
      return !savedTheme; // Show gate only if no theme has been cached yet
    }
    return false;
  });

  const [isLoading, setIsLoading] = useState(true);

  const handleSelectTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    setShowThemeGate(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showThemeGate ? (
          <ThemeGate key="theme-gate" onSelect={handleSelectTheme} />
        ) : isLoading ? (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        ) : (
          <div 
            key="portfolio-main" 
            className={`min-h-screen relative bg-theme-bg text-theme-text transition-colors duration-1000 ease-in-out font-theme ${
              theme === "cod" ? "theme-cod" : "theme-mobile-dev"
            }`}
          >
            {/* Global HUD controls */}
            <TacticalCursor />
            <HUDOverlay />
            
            {/* Lobby menu navbar */}
            <Navbar />

            {/* Campaign chapters */}
            <main>
              <Hero />
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Services />
              <Achievements />
              <Contact />
            </main>

            {/* Tactical dossier footer */}
            <Footer />

            {/* Floating theme switch action button */}
            <ThemeToggle />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

