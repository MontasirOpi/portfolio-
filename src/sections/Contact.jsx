import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { profileData } from "../data/profile";
import { socialLinks } from "../data/socialLinks";
import { playHoverBeep, playTacticalClick, playRadioStatic, playSelectSweep } from "../utils/audio";
import { Send, Radio, CheckCircle, Network } from "lucide-react";

export default function Contact() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [commsLogs, setCommsLogs] = useState([]);
  const [isSent, setIsSent] = useState(false);

  const isCod = theme === "cod";

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

    const codLogs = [
      "INITIALIZING DIRECT UPLINK TO OPERATOR FAHIM...",
      "PACKETIZING DATA STREAM...",
      "APPLYING MILITARY-GRADE ENCRYPTION (RSA-4096)...",
      "SENDING SIGNAL BURST TO GEOSTATIONARY SATELLITE...",
      "COMMS WAVE STABLE. DELIVERING ENVELOPE...",
      "TRANSMISSION SUCCESSFUL! UPLINK COMMITTED."
    ];

    const devLogs = [
      "Connecting to api.opi.dev gateway...",
      "Validating dynamic envelope packets...",
      "Applying SSL / HTTPS secure encryption...",
      "Transmitting message payloads...",
      "Optimizing network routes...",
      "Success! Comms envelope successfully delivered."
    ];

    const logSequence = isCod ? codLogs : devLogs;

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
      className={`py-24 transition-colors duration-700 ${
        isCod 
          ? "bg-[#0B0D0F] military-grid border-b border-[#4D5B3D]/25 select-none relative font-orbitron overflow-hidden" 
          : "bg-[#0F172A] border-b border-white/5 relative font-inter overflow-hidden"
      }`}
    >
      {isCod && <div className="absolute inset-0 scanline-container opacity-10 pointer-events-none"></div>}

      {/* Background blobs (Mobile theme) */}
      {!isCod && (
        <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] rounded-full blob-purple blur-3xl opacity-10 pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center lg:text-left">
          <div className={`text-[10px] tracking-[0.3em] font-black uppercase mb-1.5 flex items-center justify-center lg:justify-start gap-2 ${
            isCod ? "text-[#95FF00]" : "text-[#8B5CF6]"
          }`}>
            <span className={`w-2 h-2 animate-pulse ${isCod ? "bg-[#95FF00]" : "bg-[#8B5CF6]"}`}></span>
            {isCod ? "COMMS_CENTER // SATCOM_UPLINK" : "✉️ DIRECT COMMUNICATIONS // NETWORKING CORE"}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-widest uppercase">
            {isCod ? "ESTABLISH COMMS" : "GET IN TOUCH"}
          </h2>
          <div className={`w-24 h-[3px] mt-3 mx-auto lg:mx-0 shadow-lg ${
            isCod ? "bg-[#95FF00] shadow-[#95FF00]/40" : "bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] shadow-[#8B5CF6]/30"
          }`}></div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column - Contact Form */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className={`p-6 rounded flex flex-col justify-between flex-grow backdrop-blur-md relative select-text transition-all duration-500 ${
              isCod 
                ? "bg-[#1B1F24]/85 border border-[#4D5B3D]/30 tactical-border" 
                : "glass-panel rounded-3xl"
            }`}>
              {isCod && (
                <>
                  <div className="tactical-corner-bl"></div>
                  <div className="tactical-corner-br"></div>
                </>
              )}
              
              <div className={`flex justify-between items-start text-[8px] tracking-widest uppercase mb-6 border-b pb-2 select-none ${
                isCod ? "text-[#4D5B3D] border-[#4D5B3D]/20" : "text-slate-400 border-white/5"
              }`}>
                <span>{isCod ? "COMMS_SHELL // TRANSMITTER_V4.3" : "SECURE_MAIL_GATEWAY // API_V1"}</span>
                <span>{isCod ? "STATUS_STANDBY" : "STATUS // ONLINE"}</span>
              </div>

              {!isSent ? (
                <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-inter">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className={`block font-bold text-[9px] tracking-widest uppercase select-none ${
                        isCod ? "font-orbitron text-[#4D5B3D]" : "text-slate-400"
                      }`}>
                        {isCod ? "CALLSIGN (NAME) *" : "Your Name *"}
                      </label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={isTransmitting}
                        className={`w-full bg-black/60 border outline-none p-3 transition-all ${
                          isCod 
                            ? "border-[#4D5B3D]/40 focus:border-[#95FF00] focus:shadow-[0_0_10px_rgba(149,255,0,0.15)] font-orbitron tracking-wide text-white rounded" 
                            : "border-white/5 focus:border-[#8B5CF6] focus:shadow-[0_0_12px_rgba(139,92,246,0.15)] text-slate-100 rounded-xl"
                        }`}
                        placeholder={isCod ? "ENTER CALLSIGN" : "Type your full name"}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className={`block font-bold text-[9px] tracking-widest uppercase select-none ${
                        isCod ? "font-orbitron text-[#4D5B3D]" : "text-slate-400"
                      }`}>
                        {isCod ? "SATCOM ADDRESS (EMAIL) *" : "Your Email *"}
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isTransmitting}
                        className={`w-full bg-black/60 border outline-none p-3 transition-all ${
                          isCod 
                            ? "border-[#4D5B3D]/40 focus:border-[#95FF00] focus:shadow-[0_0_10px_rgba(149,255,0,0.15)] font-orbitron tracking-wide text-white rounded" 
                            : "border-white/5 focus:border-[#8B5CF6] focus:shadow-[0_0_12px_rgba(139,92,246,0.15)] text-slate-100 rounded-xl"
                        }`}
                        placeholder={isCod ? "ENTER SECURE EMAIL" : "Type your email address"}
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="space-y-1.5">
                    <label className={`block font-bold text-[9px] tracking-widest uppercase select-none ${
                      isCod ? "font-orbitron text-[#4D5B3D]" : "text-slate-400"
                    }`}>
                      {isCod ? "TRANSMISSION HEADER (SUBJECT)" : "Subject Header"}
                    </label>
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      disabled={isTransmitting}
                      className={`w-full bg-black/60 border outline-none p-3 transition-all ${
                        isCod 
                          ? "border-[#4D5B3D]/40 focus:border-[#95FF00] focus:shadow-[0_0_10px_rgba(149,255,0,0.15)] font-orbitron tracking-wide text-white rounded" 
                          : "border-white/5 focus:border-[#8B5CF6] focus:shadow-[0_0_12px_rgba(139,92,246,0.15)] text-slate-100 rounded-xl"
                      }`}
                      placeholder={isCod ? "ENTER SUBJECT HEADER" : "Topic of discussion"}
                    />
                  </div>

                  {/* Message body */}
                  <div className="space-y-1.5">
                    <label className={`block font-bold text-[9px] tracking-widest uppercase select-none ${
                      isCod ? "font-orbitron text-[#4D5B3D]" : "text-slate-400"
                    }`}>
                      {isCod ? "DIRECTIVE BODY (MESSAGE) *" : "Message Body *"}
                    </label>
                    <textarea 
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      disabled={isTransmitting}
                      className={`w-full bg-black/60 border outline-none p-3 transition-all text-slate-100 leading-relaxed ${
                        isCod 
                          ? "border-[#4D5B3D]/40 focus:border-[#95FF00] focus:shadow-[0_0_10px_rgba(149,255,0,0.15)] rounded font-inter font-light" 
                          : "border-white/5 focus:border-[#8B5CF6] focus:shadow-[0_0_12px_rgba(139,92,246,0.15)] rounded-2xl font-light"
                      }`}
                      placeholder={isCod ? "TYPE SECURE ENVELOPE..." : "Type your message details here..."}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 select-none">
                    <button
                      type="submit"
                      disabled={isTransmitting}
                      onMouseEnter={playHoverBeep}
                      className={`px-8 py-3.5 cursor-pointer flex items-center justify-center gap-2 hoverable uppercase transition-all duration-300 font-bold ${
                        isCod 
                          ? "bg-[#95FF00] text-black font-black text-xs tracking-[0.25em] btn-tactical border border-[#95FF00] hover:bg-white hover:shadow-[0_0_15px_rgba(149,255,0,0.4)]" 
                          : "bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white text-xs tracking-wider rounded-xl shadow-lg shadow-[#8B5CF6]/20 hover:shadow-[#8B5CF6]/40 hover:-translate-y-0.5"
                      }`}
                    >
                      <Send size={13} />
                      {isCod ? "TRANSMIT WAVE" : "SEND MESSAGE"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className={`flex flex-col items-center justify-center p-8 text-center flex-grow font-orbitron ${!isCod ? "font-sans" : ""}`}>
                  <CheckCircle size={44} className={`mb-4 animate-bounce ${isCod ? "text-[#95FF00]" : "text-[#22D3EE]"}`} />
                  <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-widest mb-2">
                    {isCod ? "UPLINK SUCCESSFUL" : "MESSAGE DELIVERED"}
                  </h3>
                  <p className="font-inter text-xs text-slate-300 leading-relaxed font-light max-w-sm mb-6">
                    {isCod 
                      ? "Operational envelope delivered to HQ. Comms officer Opi will establish return telemetry shortly. Stay secure."
                      : "Your message was successfully routed via api.opi.dev channels. Fahim will review and get in touch with you shortly. Thank you!"}
                  </p>
                  <button
                    onClick={() => {
                      playTacticalClick();
                      setIsSent(false);
                    }}
                    onMouseEnter={playHoverBeep}
                    className={`px-6 py-2.5 bg-transparent transition-all uppercase cursor-pointer hoverable ${
                      isCod
                        ? "border border-[#95FF00] text-[#95FF00] font-black text-[10px] tracking-widest rounded hover:bg-[#95FF00]/10"
                        : "border border-[#8B5CF6] text-[#22D3EE] font-bold text-[10px] tracking-wider rounded-xl hover:bg-[#8B5CF6]/10"
                    }`}
                  >
                    {isCod ? "TRANSMIT ANOTHER WAVE" : "SEND ANOTHER ENVELOPE"}
                  </button>
                </div>
              )}

              {/* Real-time Transmission logs terminal */}
              {isTransmitting && (
                <div className="mt-6 bg-black/90 border border-white/5 p-4 font-mono text-[9px] text-[#A8B0B8] h-28 flex flex-col justify-end gap-1.5 rounded-xl relative select-none shadow-inner">
                  {isCod && (
                    <>
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#95FF00]"></div>
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#95FF00]"></div>
                    </>
                  )}
                  
                  <div className="text-slate-500 font-bold">// BROADCAST_FEED:</div>
                  <div className="space-y-1">
                    {commsLogs.slice(-3).map((log, idx) => (
                      <div key={idx} className={idx === commsLogs.slice(-3).length - 1 ? (isCod ? "text-[#95FF00]" : "text-[#22D3EE]") : "opacity-60"}>
                        &gt; {log}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Matrix details */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Satellite telemetry stats card */}
            <div className={`p-6 rounded flex flex-col justify-between backdrop-blur-md relative select-text font-mono text-[10px] text-[#A8B0B8] transition-all duration-500 ${
              isCod 
                ? "bg-[#1B1F24]/85 border border-[#4D5B3D]/30" 
                : "glass-card rounded-2xl"
            }`}>
              {isCod && (
                <>
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#95FF00]/40"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#95FF00]/40"></div>
                </>
              )}

              <div className={`text-[8px] tracking-widest border-b pb-2 mb-4 uppercase select-none ${
                isCod ? "text-[#4D5B3D] border-[#4D5B3D]/20" : "text-slate-400 border-white/5"
              }`}>
                <span>{isCod ? "SATCOM_ALIGNED // TELEMETRY" : "GATEWAY // SSL_TELEMETRY"}</span>
              </div>

              <div className="space-y-3 font-orbitron">
                <div className="flex justify-between items-center text-xs">
                  <span className={isCod ? "text-[#4D5B3D]" : "text-slate-400 font-mono text-[10px]"}>
                    {isCod ? "OPERATOR:" : "NAME:"}
                  </span>
                  <span className="font-bold text-white uppercase">{profileData.fullName}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className={isCod ? "text-[#4D5B3D]" : "text-slate-400 font-mono text-[10px]"}>
                    {isCod ? "SATCOM SECURE:" : "GATEWAY STANCE:"}
                  </span>
                  <span className={`font-bold tracking-widest uppercase ${isCod ? "text-[#95FF00]" : "text-emerald-400"}`}>
                    {isCod ? "ENCRYPTED" : "SSL // SECURE"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className={isCod ? "text-[#4D5B3D]" : "text-slate-400 font-mono text-[10px]"}>
                    {isCod ? "UPLINK STRENGTH:" : "ACTIVE PING:"}
                  </span>
                  <span className="font-bold text-white uppercase">
                    {isCod ? "99.8% STABLE" : "18ms / dhaka_node"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className={isCod ? "text-[#4D5B3D]" : "text-slate-400 font-mono text-[10px]"}>
                    {isCod ? "COMMS LOCATION:" : "LOCATION ZONE:"}
                  </span>
                  <span className="font-medium text-white uppercase">{profileData.location}</span>
                </div>
              </div>
            </div>

            {/* Social channels tactical buttons */}
            <div className={`p-6 rounded flex flex-col justify-between flex-grow backdrop-blur-md relative select-none transition-all duration-500 ${
              isCod 
                ? "bg-[#1B1F24]/85 border border-[#4D5B3D]/30" 
                : "glass-panel rounded-2xl"
            }`}>
              {isCod && (
                <>
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#95FF00]/40"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#95FF00]/40"></div>
                </>
              )}

              <div className={`text-[8px] tracking-widest border-b pb-2 mb-4 uppercase ${
                isCod ? "text-[#4D5B3D] border-[#4D5B3D]/20" : "text-slate-400 border-white/5"
              }`}>
                <span>{isCod ? "SECURE_CHANNELS // MATRIX" : "DEVELOPER CHANNELS // NET"}</span>
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
                    className={`w-full p-4 border transition-all duration-200 flex items-center justify-between hoverable group cursor-pointer ${
                      isCod
                        ? "bg-black/60 border-[#4D5B3D]/30 hover:border-[#95FF00] hover:bg-[#95FF00]/5 rounded"
                        : "bg-slate-900/40 border-white/5 hover:border-[#8B5CF6]/30 hover:bg-[#8B5CF6]/5 rounded-xl"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-transform group-hover:scale-110 ${
                        isCod ? "border-[#4D5B3D]/50 text-[#95FF00]" : "border-white/5 text-[#22D3EE] bg-slate-900"
                      }`}>
                        {isCod ? <Radio size={14} /> : <Network size={13} />}
                      </div>
                      <span className={`text-[10px] font-black group-hover:text-[#95FF00] transition-colors uppercase tracking-wider ${
                        isCod ? "font-orbitron text-white" : "font-sans text-slate-100 font-semibold"
                      }`}>
                        {chan.name}
                      </span>
                    </div>
                    <span className={`text-[8px] font-bold uppercase tracking-wider group-hover:text-[#95FF00] transition-colors ${
                      isCod ? "text-[#4D5B3D]" : "text-slate-400"
                    }`}>
                      {isCod ? "CONNECT >>" : "ESTABLISH >>"}
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

