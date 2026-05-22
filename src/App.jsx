import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/Preloader";
import TacticalCursor from "./components/TacticalCursor";
import HUDOverlay from "./components/HUDOverlay";
import Navbar from "./components/Navbar";
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
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        ) : (
          <div key="portfolio-main" className="min-h-screen relative bg-[#0B0D0F]">
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
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
