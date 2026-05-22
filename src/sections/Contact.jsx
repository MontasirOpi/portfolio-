import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profileData } from "../data/profile";
import { socialLinks } from "../data/socialLinks";
import { playHoverBeep, playTacticalClick, playRadioStatic, playSelectSweep } from "../utils/audio";
import { Terminal, Send, Radio, ShieldCheck, Mail, Phone, MapPin, CheckCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [commsLogs, setCommsLogs] = useState([]);
  const [isSent, setIsSent] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playRadioStatic();
    setIsTransmitting(true);
    setCommsLogs([]);

    const logSequence = [
      "INITIALIZING DIRECT UPLINK TO OPERATOR FAHIM...",
      "PACKETIZING DATA STREAM...",
      "APPLYING MILITARY-GRADE ENCRYPTION (RSA-4096)...",
      "SENDING SIGNAL BURST TO GEOSTATIONARY SATELLITE...",
      "COMMS WAVE STABLE. DELIVERING ENVELOPE...",
      "TRANSMISSION SUCCESSFUL! UPLINK COMMITTED."
    ];

    // Simulating interactive terminal printing
    logSequence.forEach((log, index) => {
      setTimeout(() => {
        setCommsLogs((prev) => [...prev, log]);
        playHoverBeep();
        
        if (index === logSequence.length - 1) {
          setTimeout(() => {
            setIsTransmitting(false);
            setIsSent(true);
            setFormData({ name: "", email: "", subject: "", message: "" });
          }, 800);
        }
      }, (index + 1) * 600);
    });
  };

  return (
    <section 
      id="contact" 
      className="py-24 bg-[#0B0D0F] military-grid border-b border-[#4D5B3D]/25 select-none relative font-orbitron overflow-hidden"
    >
      <div className="absolute inset-0 scanline-container opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center lg:text-left">
          <div className="text-[10px] text-[#95FF00] tracking-[0.3em] font-black uppercase mb-1.5 flex items-center justify-center lg:justify-start gap-2">
            <span className="w-2 h-2 bg-[#95FF00] animate-pulse"></span>
            COMMS_CENTER // SATCOM_UPLINK
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-widest uppercase">
            ESTABLISH COMMS
          </h2>
          <div className="w-24 h-[3px] bg-[#95FF00] mt-3 mx-auto lg:mx-0 shadow-[0_0_8px_#95FF00]"></div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column - Contact Form Transmitter Console */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="bg-[#1B1F24]/85 border border-[#4D5B3D]/30 p-6 rounded flex flex-col justify-between flex-grow tactical-border backdrop-blur-md relative select-text">
              <div className="tactical-corner-bl"></div>
              <div className="tactical-corner-br"></div>
              
              <div className="flex justify-between items-start text-[8px] text-[#4D5B3D] tracking-widest uppercase mb-6 border-b border-[#4D5B3D]/20 pb-2 select-none">
                <span>COMMS_SHELL // TRANSMITTER_V4.3</span>
                <span>STATUS_STANDBY</span>
              </div>

              {!isSent ? (
                <form onSubmit={handleFormSubmit} className="space-y-4 font-inter text-xs">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block font-orbitron text-[9px] text-[#4D5B3D] tracking-widest uppercase select-none">CALLSIGN (NAME) *</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={isTransmitting}
                        className="w-full bg-black/60 border border-[#4D5B3D]/40 focus:border-[#95FF00] text-white p-3 rounded outline-none transition-all focus:shadow-[0_0_10px_rgba(149,255,0,0.15)] font-orbitron tracking-wide"
                        placeholder="ENTER CALLSIGN"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block font-orbitron text-[9px] text-[#4D5B3D] tracking-widest uppercase select-none">SATCOM ADDRESS (EMAIL) *</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isTransmitting}
                        className="w-full bg-black/60 border border-[#4D5B3D]/40 focus:border-[#95FF00] text-white p-3 rounded outline-none transition-all focus:shadow-[0_0_10px_rgba(149,255,0,0.15)] font-orbitron tracking-wide"
                        placeholder="ENTER SECURE EMAIL"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="space-y-1">
                    <label className="block font-orbitron text-[9px] text-[#4D5B3D] tracking-widest uppercase select-none">TRANSMISSION HEADER (SUBJECT)</label>
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      disabled={isTransmitting}
                      className="w-full bg-black/60 border border-[#4D5B3D]/40 focus:border-[#95FF00] text-white p-3 rounded outline-none transition-all focus:shadow-[0_0_10px_rgba(149,255,0,0.15)] font-orbitron tracking-wide"
                      placeholder="ENTER SUBJECT HEADER"
                    />
                  </div>

                  {/* Message body */}
                  <div className="space-y-1">
                    <label className="block font-orbitron text-[9px] text-[#4D5B3D] tracking-widest uppercase select-none">DIRECTIVE BODY (MESSAGE) *</label>
                    <textarea 
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      disabled={isTransmitting}
                      className="w-full bg-black/60 border border-[#4D5B3D]/40 focus:border-[#95FF00] text-white p-3 rounded outline-none transition-all focus:shadow-[0_0_10px_rgba(149,255,0,0.15)] font-inter font-light leading-relaxed"
                      placeholder="TYPE SECURE ENVELOPE..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 select-none">
                    <button
                      type="submit"
                      disabled={isTransmitting}
                      onMouseEnter={playHoverBeep}
                      className="px-8 py-3.5 bg-[#95FF00] text-black font-black text-xs tracking-[0.25em] btn-tactical cursor-pointer hover:bg-white hover:shadow-[0_0_15px_rgba(149,255,0,0.4)] transition-all flex items-center justify-center gap-2 hoverable uppercase border border-[#95FF00]"
                    >
                      <Send size={13} />
                      TRANSMIT WAVE
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center flex-grow font-orbitron">
                  <CheckCircle size={44} className="text-[#95FF00] animate-bounce mb-4" />
                  <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-widest mb-2">UPLINK SUCCESSFUL</h3>
                  <p className="font-inter text-xs text-[#A8B0B8]/80 leading-relaxed font-light max-w-sm mb-6">
                    Operational envelope delivered to HQ. Comms officer Opi will establish return telemetry shortly. Stay secure.
                  </p>
                  <button
                    onClick={() => {
                      playTacticalClick();
                      setIsSent(false);
                    }}
                    onMouseEnter={playHoverBeep}
                    className="px-6 py-2.5 border border-[#95FF00] text-[#95FF00] font-black text-[10px] tracking-widest rounded bg-transparent hover:bg-[#95FF00]/10 transition-colors uppercase cursor-pointer hoverable"
                  >
                    TRANSMIT ANOTHER WAVE
                  </button>
                </div>
              )}

              {/* Real-time Transmission logs terminal */}
              {isTransmitting && (
                <div className="mt-6 bg-black/90 border border-[#4D5B3D]/30 p-4 font-mono text-[9px] text-[#A8B0B8] h-28 flex flex-col justify-end gap-1.5 rounded relative select-none">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#95FF00]"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#95FF00]"></div>
                  
                  <div className="text-[#4D5B3D]">// BROADCAST_FEED:</div>
                  <div className="space-y-1">
                    {commsLogs.slice(-3).map((log, idx) => (
                      <div key={idx} className={idx === commsLogs.slice(-3).length - 1 ? "text-[#95FF00]" : "opacity-60"}>
                        &gt; {log}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Social SATCOM links desk */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Satellite uplink stats card */}
            <div className="bg-[#1B1F24]/85 border border-[#4D5B3D]/30 p-6 rounded flex flex-col justify-between backdrop-blur-md relative select-text font-mono text-[10px] text-[#A8B0B8]">
              {/* Corner highlights */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#95FF00]/40"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#95FF00]/40"></div>

              <div className="text-[8px] text-[#4D5B3D] tracking-widest border-b border-[#4D5B3D]/20 pb-2 mb-4 uppercase select-none">
                <span>SATCOM_ALIGNED // TELEMETRY</span>
              </div>

              <div className="space-y-3 font-orbitron">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#4D5B3D]">OPERATOR:</span>
                  <span className="font-bold text-white uppercase">{profileData.fullName}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#4D5B3D]">SATCOM SECURE:</span>
                  <span className="font-bold text-[#95FF00] tracking-widest uppercase">ENCRYPTED</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#4D5B3D]">UPLINK STRENGTH:</span>
                  <span className="font-bold text-white uppercase">99.8% STABLE</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#4D5B3D]">COMMS LOCATION:</span>
                  <span className="font-medium text-white uppercase">{profileData.location}</span>
                </div>
              </div>
            </div>

            {/* Social channels tactical buttons */}
            <div className="bg-[#1B1F24]/85 border border-[#4D5B3D]/30 p-6 rounded flex flex-col justify-between flex-grow backdrop-blur-md relative select-none">
              {/* Corner highlights */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#95FF00]/40"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#95FF00]/40"></div>

              <div className="text-[8px] text-[#4D5B3D] tracking-widest border-b border-[#4D5B3D]/20 pb-2 mb-4 uppercase">
                <span>SECURE_CHANNELS // MATRIX</span>
              </div>

              <div className="space-y-3">
                {socialLinks.channels.map((chan, idx) => (
                  <a
                    key={idx}
                    href={chan.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHoverBeep}
                    onClick={playSelectSweep}
                    className="w-full p-4 bg-black/60 border border-[#4D5B3D]/30 hover:border-[#95FF00] hover:bg-[#95FF00]/5 transition-all duration-200 rounded flex items-center justify-between hoverable group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-[#4D5B3D]/50 flex items-center justify-center text-[#95FF00] group-hover:scale-110 transition-transform">
                        <Radio size={14} />
                      </div>
                      <span className="text-[10px] font-black text-white group-hover:text-[#95FF00] transition-colors uppercase font-orbitron tracking-wider">
                        {chan.name}
                      </span>
                    </div>
                    <span className="text-[8px] font-bold text-[#4D5B3D] uppercase tracking-wider group-hover:text-[#95FF00] transition-colors">
                      CONNECT &gt;&gt;
                    </span>
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
