import React, { useState, useEffect } from "react";
import { playHoverBeep } from "../utils/audio";

export default function TacticalCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if the user is on mobile/tablet/touch device
    const checkDevice = () => {
      const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      setIsMobile(isTouch);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    const handleMouseDown = () => {
      setClicked(true);
    };

    const handleMouseUp = () => {
      setClicked(false);
    };

    // Attach mouse event listeners
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Track button/link hover states and trigger micro hover sounds
    const handleLinkHoverStart = () => {
      setLinkHovered(true);
      playHoverBeep();
    };

    const handleLinkHoverEnd = () => {
      setLinkHovered(false);
    };

    const registerHoverListeners = () => {
      const hoverables = document.querySelectorAll("a, button, [role='button'], .hoverable");
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkHoverStart);
        el.removeEventListener("mouseleave", handleLinkHoverEnd);
        el.addEventListener("mouseenter", handleLinkHoverStart);
        el.addEventListener("mouseleave", handleLinkHoverEnd);
      });
    };

    registerHoverListeners();

    // Create a MutationObserver to watch for dynamic DOM updates and re-register hover listeners
    const observer = new MutationObserver(registerHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      
      const hoverables = document.querySelectorAll("a, button, [role='button'], .hoverable");
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkHoverStart);
        el.removeEventListener("mouseleave", handleLinkHoverEnd);
      });
      observer.disconnect();
    };
  }, [isMobile]);

  if (isMobile || hidden) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {/* Outer crosshair brackets */}
      <div
        className={`relative w-8 h-8 flex items-center justify-center transition-all duration-300 border border-[#95FF00]/40 rounded-full ${
          clicked ? "scale-75 border-[#95FF00]" : ""
        } ${linkHovered ? "scale-[1.6] border-[#95FF00] bg-[#95FF00]/5 rotate-45" : ""}`}
      >
        {/* Four crosshair tick lines */}
        <div className="absolute top-0 w-0.5 h-1.5 bg-[#95FF00]"></div>
        <div className="absolute bottom-0 w-0.5 h-1.5 bg-[#95FF00]"></div>
        <div className="absolute left-0 w-1.5 h-0.5 bg-[#95FF00]"></div>
        <div className="absolute right-0 w-1.5 h-0.5 bg-[#95FF00]"></div>

        {/* Dynamic Inner dot */}
        <div
          className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
            linkHovered ? "bg-[#95FF00] scale-150" : "bg-[#95FF00]/80"
          }`}
        />
      </div>
    </div>
  );
}
