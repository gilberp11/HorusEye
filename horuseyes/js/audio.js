/**
 * HORUSEYE // CYBER-EGYPTIAN AUDIO ENGINE (v5.1)
 * Hypnotic Ancient Egyptian ambient drone with warm Phrygian Ney flute
 * and Sistrum temple chimes. Audible, gentle and relaxing.
 */

class HorusAudioEngine {
  constructor() {
    this.ctx = null;
    this.sfxEnabled = true;
    this.bgmEnabled = false;
    this.masterGain = null;
    this.bgmGain = null;
    this.bgmNodes = [];
    this.bgmInterval = null;
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.bgmGain = this.ctx.createGain();
      // Gentle yet clearly audible volume level (~0.1)
      this.bgmGain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      this.bgmGain.connect(this.ctx.destination);
    } catch (e) {
      console.warn("Web Audio API not supported");
    }
  }

  ensureContext() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleBGM() {
    this.ensureContext();
    this.bgmEnabled = !this.bgmEnabled;

    if (this.bgmEnabled) {
      this.startEgyptianBGM();
    } else {
      this.stopEgyptianBGM();
    }
    return this.bgmEnabled;
  }

  // Soft tactile click for UI buttons
  playHoverTick() {
    if (!this.sfxEnabled || !this.ctx) return;
    this.ensureContext();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1600, now);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(580, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.045);
  }

  // Crystal chime on selection
  playChime(freq = 587.33) {
    if (!this.sfxEnabled || !this.ctx) return;
    this.ensureContext();

    const now = this.ctx.currentTime;
    const harmonics = [freq, freq * 1.5, freq * 2];

    harmonics.forEach((f, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);

      const vol = idx === 0 ? 0.09 : 0.035;
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35 + (idx * 0.05));

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.42);
    });
  }

  // Stargate Warp / Portal Teleport Sweep
  playWarp() {
    if (!this.sfxEnabled || !this.ctx) return;
    this.ensureContext();

    const now = this.ctx.currentTime;

    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(90, now);
    subOsc.frequency.exponentialRampToValueAtTime(260, now + 0.45);
    subGain.gain.setValueAtTime(0.18, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);
    subOsc.start(now);
    subOsc.stop(now + 0.52);

    const shimmerOsc = this.ctx.createOscillator();
    const shimmerGain = this.ctx.createGain();
    shimmerOsc.type = 'triangle';
    shimmerOsc.frequency.setValueAtTime(440, now);
    shimmerOsc.frequency.exponentialRampToValueAtTime(987.77, now + 0.4);
    shimmerGain.gain.setValueAtTime(0.06, now);
    shimmerGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.48);

    shimmerOsc.connect(shimmerGain);
    shimmerGain.connect(this.masterGain);
    shimmerOsc.start(now);
    shimmerOsc.stop(now + 0.5);
  }

  // Ancient Papyrus Unrolling Sound
  playPapyrusUnroll() {
    if (!this.sfxEnabled || !this.ctx) return;
    this.ensureContext();

    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.55;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.45));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(750, now);
    filter.frequency.exponentialRampToValueAtTime(260, now + 0.5);
    filter.Q.setValueAtTime(2.5, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(now);
    this.playChime(440);
  }

  // Eye of Horus Focus Sound
  playEyeFocus() {
    if (!this.sfxEnabled || !this.ctx) return;
    this.ensureContext();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(146.83, now);
    osc.frequency.exponentialRampToValueAtTime(73.41, now + 0.35);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.36);
  }

  // ========================================================
  // PROCEDURAL ANCIENT EGYPTIAN AMBIENT BGM
  // Hypnotic D-Phrygian Dominant Drone + Soft Flute & Temple Chimes
  // ========================================================
  startEgyptianBGM() {
    if (!this.ctx) return;
    this.stopEgyptianBGM();

    const now = this.ctx.currentTime;

    // Harmonic Tanpura / Drone in D (73.4Hz + 146.8Hz + 220Hz)
    const dronePitches = [73.41, 146.83, 220.00];
    dronePitches.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);

      gain.gain.setValueAtTime(0.06 / (idx + 1), now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.bgmGain);

      osc.start();
      this.bgmNodes.push(osc);
    });

    // Melodic notes in Hijaz / Phrygian Dominant scale:
    const hijazScale = [293.66, 311.13, 369.99, 392.00, 440.00, 466.16, 523.25, 587.33];

    const playMelodicNote = () => {
      if (!this.bgmEnabled || !this.ctx) return;

      const t = this.ctx.currentTime;
      const noteFreq = hijazScale[Math.floor(Math.random() * hijazScale.length)];
      const duration = 2.2 + Math.random() * 2.0;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(noteFreq, t);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1100, t);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(0.055, t + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.bgmGain);

      osc.start(t);
      osc.stop(t + duration);

      const nextWait = (2.2 + Math.random() * 2.2) * 1000;
      this.bgmInterval = setTimeout(playMelodicNote, nextWait);
    };

    playMelodicNote();
  }

  stopEgyptianBGM() {
    if (this.bgmInterval) {
      clearTimeout(this.bgmInterval);
      this.bgmInterval = null;
    }
    this.bgmNodes.forEach(node => {
      try {
        node.stop();
        node.disconnect();
      } catch (e) {}
    });
    this.bgmNodes = [];
  }
}

// Global audio singleton explicitly attached to window
window.HorusAudio = new HorusAudioEngine();
