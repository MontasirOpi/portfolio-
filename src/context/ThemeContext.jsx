/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { playRadioStatic, playSelectSweep } from "../utils/audio";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    // Attempt to load theme from localStorage, default to 'cod'
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("portfolio-theme");
      if (savedTheme === "cod" || savedTheme === "mobile-dev") {
        return savedTheme;
      }
    }
    return "cod";
  });

  // Apply appropriate document classes and update state
  const setTheme = (newTheme) => {
    if (newTheme !== "cod" && newTheme !== "mobile-dev") return;
    
    // Play transition sounds
    if (newTheme === "cod") {
      playRadioStatic();
    } else {
      playSelectSweep();
    }

    setThemeState(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === "cod" ? "mobile-dev" : "cod");
  };

  // Sync class on the document body/element
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("theme-cod", "theme-mobile-dev");
    if (theme === "cod") {
      root.classList.add("theme-cod");
      root.style.colorScheme = "dark";
    } else {
      root.classList.add("theme-mobile-dev");
      root.style.colorScheme = "dark";
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
