// Native Web Audio API Synthesizer for Tactical HUD Sound Effects
// This avoids loading external MP3 files and operates with zero latency.

let audioCtx = null;
let isSoundEnabled = false;

export const toggleSoundState = () => {
  isSoundEnabled = !isSoundEnabled;
  if (isSoundEnabled && !audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return isSoundEnabled;
};

export const getSoundState = () => isSoundEnabled;

const playTone = (freq, duration, type = 'sine', volume = 0.1) => {
  if (!isSoundEnabled || !audioCtx) return;
  
  // Resume context if suspended (browser security autoplays)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  
  try {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    // Quick attack and decay to prevent popping
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.warn("Web Audio playback failed:", e);
  }
};

// Play tactical click
export const playTacticalClick = () => {
  playTone(800, 0.08, 'triangle', 0.12);
  setTimeout(() => playTone(1200, 0.05, 'square', 0.08), 30);
};

// Play light hover beep
export const playHoverBeep = () => {
  playTone(2200, 0.04, 'sine', 0.05);
};

// Play loadout select sweep
export const playSelectSweep = () => {
  if (!isSoundEnabled || !audioCtx) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  try {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1500, audioCtx.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.2);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
  } catch (error) {
    console.warn("Failed to play select sweep:", error);
  }
};

// Play radio static burst
export const playRadioStatic = () => {
  if (!isSoundEnabled || !audioCtx) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  try {
    const bufferSize = audioCtx.sampleRate * 0.15; // 0.15 seconds
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Fill buffer with white noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = buffer;
    
    // Filter to make it sound like a radio transcever
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1000; // Voice band
    filter.Q.value = 1.0;
    
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.15);
    
    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    noiseNode.start();
  } catch (error) {
    console.warn("Failed to play radio static:", error);
  }
};
