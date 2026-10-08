/**
 * HORUSEYES // SACRED WEDJAT CYBERNETIC GAZE & GLYPH MATRIX
 * Interactive Eye of Horus that follows the mouse across the screen with
 * organic damping, glowing iris mechanics, and atmospheric ambient hieroglyphs.
 */

class EyeOfHorusTracker {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.irisEl = this.container.querySelector('.horus-iris');
    this.pupilEl = this.container.querySelector('.horus-pupil');
    this.pupilGlowEl = this.container.querySelector('.horus-pupil-glow');
    this.eyeSvg = this.container.querySelector('.horus-eye-svg');

    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;
    this.currentIrisX = 0;
    this.currentIrisY = 0;
    this.targetIrisX = 0;
    this.targetIrisY = 0;

    this.initEvents();
    this.renderLoop();
  }

  initEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.calculateEyeTracking();
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouseX = e.touches[0].clientX;
        this.mouseY = e.touches[0].clientY;
        this.calculateEyeTracking();
      }
    }, { passive: true });

    // Interactive click: eye dilates and pulses
    if (this.container) {
      this.container.addEventListener('click', () => {
        this.triggerBlinkPulse();
        if (window.HorusAudio) window.HorusAudio.playEyeFocus();
      });
    }
  }

  calculateEyeTracking() {
    if (!this.container) return;
    const rect = this.container.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    const dx = this.mouseX - eyeCenterX;
    const dy = this.mouseY - eyeCenterY;
    const dist = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx);

    // Limit movement inside eye sclera (max offset ~18px horizontal, ~12px vertical)
    const maxRadiusX = 18;
    const maxRadiusY = 12;
    const normalizedDist = Math.min(dist / 350, 1);

    this.targetIrisX = Math.cos(angle) * (maxRadiusX * normalizedDist);
    this.targetIrisY = Math.sin(angle) * (maxRadiusY * normalizedDist);
  }

  triggerBlinkPulse() {
    this.container.classList.add('eye-pulse-active');
    setTimeout(() => {
      this.container.classList.remove('eye-pulse-active');
    }, 600);
  }

  renderLoop() {
    // Smooth lerp (linear interpolation) for silky natural tracking
    const lerpSpeed = 0.12;
    this.currentIrisX += (this.targetIrisX - this.currentIrisX) * lerpSpeed;
    this.currentIrisY += (this.targetIrisY - this.currentIrisY) * lerpSpeed;

    if (this.irisEl) {
      this.irisEl.style.transform = `translate(${this.currentIrisX}px, ${this.currentIrisY}px)`;
    }

    requestAnimationFrame(() => this.renderLoop());
  }
}

/**
 * GLYPH MATRIX BACKGROUND SYSTEM
 * Floating celestial hieroglyphs with gentle cyber-glow drift
 */
class EgyptianGlyphBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.hieroglyphs = ["𓁹", "𓋹", "𓊽", "𓅓", "𓇳", "𓏟", "𓆄", "𓊡", "𓃭", "𓇯", "𓌳", "𓊖", "𓇼", "𓈗", "𓈅"];
    this.particles = [];
    this.particleCount = 28;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.initParticles();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        glyph: this.hieroglyphs[Math.floor(Math.random() * this.hieroglyphs.length)],
        size: Math.random() * 16 + 18,
        speedY: (Math.random() * 0.35 + 0.1) * -1, // gentle upward float
        speedX: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.22 + 0.05,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulse: Math.random() * Math.PI,
        colorType: Math.random() > 0.4 ? 'gold' : 'cyan'
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let p of this.particles) {
      p.y += p.speedY;
      p.x += p.speedX;
      p.pulse += p.pulseSpeed;

      // Wrap around screen
      if (p.y < -30) {
        p.y = this.canvas.height + 20;
        p.x = Math.random() * this.canvas.width;
      }
      if (p.x < -20) p.x = this.canvas.width + 10;
      if (p.x > this.canvas.width + 20) p.x = -10;

      const dynamicOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));

      this.ctx.font = `${p.size}px 'Noto Sans Egyptian Hieroglyphs', 'Segoe UI Historic', 'Chakra Petch', sans-serif`;
      this.ctx.fillStyle = p.colorType === 'gold' 
        ? `rgba(255, 215, 0, ${dynamicOpacity})` 
        : `rgba(0, 240, 255, ${dynamicOpacity})`;
      this.ctx.shadowColor = p.colorType === 'gold' ? 'rgba(255, 200, 0, 0.4)' : 'rgba(0, 240, 255, 0.4)';
      this.ctx.shadowBlur = 8;
      this.ctx.fillText(p.glyph, p.x, p.y);
    }

    requestAnimationFrame(() => this.animate());
  }
}

// Initializer on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new EyeOfHorusTracker('horusEyeWidget');
  new EgyptianGlyphBackground('glyphCanvas');
});
