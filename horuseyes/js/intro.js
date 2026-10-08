/**
 * HORUSEYE // 3D CINEMATIC INTRO: THE AWAKENING OF HORUS
 * - Procedural 3D Falcon-Headed Horus Deity with articulated feathered wings
 * - Hovering 3D Sacred Eye of Horus tracking user mouse gaze
 * - Swirling Desert Sandstorm vortex particles
 * - Golden Egyptian Matrix Hieroglyph Rain background
 * - Automatic Egyptian BGM activation with instant mute option
 */

class Horus3DIntro {
  constructor() {
    this.overlay = document.getElementById('horusIntroOverlay');
    if (!this.overlay) return;

    this.container = document.getElementById('intro3DCanvasContainer');
    this.matrixCanvas = document.getElementById('introMatrixCanvas');
    this.enterBtn = document.getElementById('introEnterBtn');
    this.skipBtn = document.getElementById('introSkipBtn');
    this.muteBtn = document.getElementById('introMuteBtn');
    this.loadingBar = document.getElementById('introLoadingBar');
    this.loadingProgress = document.getElementById('introLoadingProgress');
    this.loadingStatus = document.getElementById('introLoadingStatus');

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.horusGroup = null;
    this.headGroup = null;
    this.eye3DGroup = null;
    this.leftWing = null;
    this.rightWing = null;
    this.sandParticles = null;
    this.clock = new THREE.Clock();

    this.mouseX = 0;
    this.mouseY = 0;
    this.targetRotationX = 0;
    this.targetRotationY = 0;

    this.matrixCtx = null;
    this.matrixColumns = [];
    this.glyphs = ["𓁹", "𓋹", "𓊽", "𓇳", "𓅃", "𓊖", "𓈗", "𓇯", "𓏛", "𓁀", "𓆃", "𓉐", "𓌳", "𓇼", "𓆏"];

    this.isEntered = false;

    this.init();
  }

  init() {
    this.initMatrixRain();
    this.initThreeScene();
    this.createHorusDeity();
    this.createFloatingEye3D();
    this.createSandstormVortex();
    this.initEvents();
    this.simulateLoading();
    this.animate();
  }

  // 1. Matrix Hieroglyph Rain Background
  initMatrixRain() {
    if (!this.matrixCanvas) return;
    this.matrixCtx = this.matrixCanvas.getContext('2d');
    this.resizeMatrix();

    window.addEventListener('resize', () => {
      this.resizeMatrix();
      if (this.camera && this.renderer) {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      }
    });

    const colCount = Math.floor(this.matrixCanvas.width / 32);
    this.matrixColumns = [];
    for (let i = 0; i < colCount; i++) {
      this.matrixColumns.push({
        y: Math.random() * -this.matrixCanvas.height,
        speed: 1.2 + Math.random() * 2.5,
        chars: []
      });
    }
  }

  resizeMatrix() {
    this.matrixCanvas.width = window.innerWidth;
    this.matrixCanvas.height = window.innerHeight;
  }

  drawMatrixRain() {
    if (!this.matrixCtx) return;
    // Semi-transparent fade creates golden trails
    this.matrixCtx.fillStyle = 'rgba(5, 7, 14, 0.18)';
    this.matrixCtx.fillRect(0, 0, this.matrixCanvas.width, this.matrixCanvas.height);

    this.matrixCtx.font = "20px 'Chakra Petch', 'Segoe UI Historic', sans-serif";

    for (let i = 0; i < this.matrixColumns.length; i++) {
      const col = this.matrixColumns[i];
      const char = this.glyphs[Math.floor(Math.random() * this.glyphs.length)];
      const x = i * 32;

      // Glow effect for lead character
      this.matrixCtx.fillStyle = '#ffea79';
      this.matrixCtx.shadowColor = '#ffd700';
      this.matrixCtx.shadowBlur = 10;
      this.matrixCtx.fillText(char, x, col.y);

      // Trailing amber glyphs
      this.matrixCtx.fillStyle = 'rgba(212, 163, 60, 0.45)';
      this.matrixCtx.shadowBlur = 4;
      this.matrixCtx.fillText(char, x, col.y - 24);

      col.y += col.speed;
      if (col.y > this.matrixCanvas.height + 50) {
        col.y = -40;
        col.speed = 1.2 + Math.random() * 2.5;
      }
    }
  }

  // 2. Three.js Scene Setup
  initThreeScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x060812, 0.025);

    this.camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 0.5, 6.2);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);

    // Cinematic Egyptian Lighting
    const ambientLight = new THREE.AmbientLight(0xffddaa, 0.65);
    this.scene.add(ambientLight);

    // Sun God Ra Direct Light
    const sunLight = new THREE.DirectionalLight(0xffe082, 1.6);
    sunLight.position.set(4, 8, 5);
    this.scene.add(sunLight);

    // Cyber Cyan / Gold Rim Light
    const rimLight = new THREE.PointLight(0x00f0ff, 2.4, 20);
    rimLight.position.set(-4, -2, -2);
    this.scene.add(rimLight);

    const goldCoreLight = new THREE.PointLight(0xffd700, 3.5, 12);
    goldCoreLight.position.set(0, 0.4, 1.2);
    this.scene.add(goldCoreLight);
  }

  // 3. Procedural 3D Horus Deity
  createHorusDeity() {
    this.horusGroup = new THREE.Group();

    // Gold & Bronze Materials
    const goldArmorMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x4a3200,
      emissiveIntensity: 0.3
    });

    const bronzeSkinMat = new THREE.MeshStandardMaterial({
      color: 0xb58045,
      metalness: 0.35,
      roughness: 0.45
    });

    const lapisArmorMat = new THREE.MeshStandardMaterial({
      color: 0x0f2b5c,
      metalness: 0.6,
      roughness: 0.3
    });

    const darkBeakMat = new THREE.MeshStandardMaterial({
      color: 0x111116,
      metalness: 0.9,
      roughness: 0.15
    });

    // --- TORSO (Muscular pharaonic warrior) ---
    const chestGeo = new THREE.CylinderGeometry(0.55, 0.35, 1.1, 16);
    const chest = new THREE.Mesh(chestGeo, bronzeSkinMat);
    chest.position.y = 0;
    this.horusGroup.add(chest);

    // Broad Shoulders & Pectoral Armor
    const shoulderGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const leftShoulder = new THREE.Mesh(shoulderGeo, goldArmorMat);
    leftShoulder.position.set(-0.68, 0.45, 0);
    this.horusGroup.add(leftShoulder);

    const rightShoulder = leftShoulder.clone();
    rightShoulder.position.x = 0.68;
    this.horusGroup.add(rightShoulder);

    // Wesekh Collar (Ornate Pharaonic Collar)
    const collarGeo = new THREE.TorusGeometry(0.42, 0.1, 16, 32);
    const collar = new THREE.Mesh(collarGeo, goldArmorMat);
    collar.rotation.x = Math.PI / 2;
    collar.position.y = 0.52;
    this.horusGroup.add(collar);

    // Shendyt Kilt (Waist & Ceremonial apron)
    const kiltGeo = new THREE.ConeGeometry(0.52, 0.8, 16, 1, true);
    const kilt = new THREE.Mesh(kiltGeo, goldArmorMat);
    kilt.rotation.x = Math.PI;
    kilt.position.y = -0.7;
    this.horusGroup.add(kilt);

    // Levitating Lower Legs (Tapering energy)
    const legGeo = new THREE.CylinderGeometry(0.12, 0.04, 1.2, 12);
    const leftLeg = new THREE.Mesh(legGeo, bronzeSkinMat);
    leftLeg.position.set(-0.2, -1.4, 0);
    this.horusGroup.add(leftLeg);

    const rightLeg = leftLeg.clone();
    rightLeg.position.x = 0.2;
    this.horusGroup.add(rightLeg);

    // --- HORUS FALCON HEAD & NEMES HEADDRESS ---
    this.headGroup = new THREE.Group();
    this.headGroup.position.y = 0.82;

    // Head base (Falcon cranium)
    const headGeo = new THREE.SphereGeometry(0.3, 18, 18);
    headGeo.scale(0.9, 1.05, 1.2);
    const head = new THREE.Mesh(headGeo, goldArmorMat);
    this.headGroup.add(head);

    // Curved Sharp Falcon Beak
    const beakGeo = new THREE.ConeGeometry(0.14, 0.55, 16);
    beakGeo.rotateX(-Math.PI / 2.3);
    const beak = new THREE.Mesh(beakGeo, darkBeakMat);
    beak.position.set(0, -0.06, 0.42);
    this.headGroup.add(beak);

    // Piercing Falcon Eyes
    const eyeGeo = new THREE.SphereGeometry(0.065, 12, 12);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.18, 0.06, 0.24);
    this.headGroup.add(leftEye);

    const rightEye = leftEye.clone();
    rightEye.position.x = 0.18;
    this.headGroup.add(rightEye);

    // Nemes Headdress Flaps (Gold & Lapis stripes)
    const nemesGeo = new THREE.BoxGeometry(0.72, 0.7, 0.35);
    const nemes = new THREE.Mesh(nemesGeo, lapisArmorMat);
    nemes.position.set(0, 0.05, -0.15);
    this.headGroup.add(nemes);

    // Atef / Solar Crown of Horus atop head
    const crownGeo = new THREE.ConeGeometry(0.18, 0.65, 16);
    const crown = new THREE.Mesh(crownGeo, goldArmorMat);
    crown.position.set(0, 0.55, -0.05);
    this.headGroup.add(crown);

    this.horusGroup.add(this.headGroup);

    // --- OUTSTRETCHED MAJESTIC FALCON WINGS ---
    this.leftWing = this.buildWing(true);
    this.leftWing.position.set(-0.6, 0.45, -0.2);
    this.horusGroup.add(this.leftWing);

    this.rightWing = this.buildWing(false);
    this.rightWing.position.set(0.6, 0.45, -0.2);
    this.horusGroup.add(this.rightWing);

    // Arms reaching forward to hold the Eye of Horus
    const armGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.7, 12);
    armGeo.rotateX(Math.PI / 3);

    const leftArm = new THREE.Mesh(armGeo, bronzeSkinMat);
    leftArm.position.set(-0.45, 0.25, 0.35);
    leftArm.rotation.z = -0.4;
    this.horusGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, bronzeSkinMat);
    rightArm.position.set(0.45, 0.25, 0.35);
    rightArm.rotation.z = 0.4;
    this.horusGroup.add(rightArm);

    // Place Horus at scene center
    this.horusGroup.position.set(0, -0.2, 0);
    this.scene.add(this.horusGroup);
  }

  // Generates segmented feathered wings
  buildWing(isLeft) {
    const wingGroup = new THREE.Group();
    const wingMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.8,
      roughness: 0.25,
      side: THREE.DoubleSide
    });

    const sign = isLeft ? -1 : 1;
    // Wing primary bone
    const boneGeo = new THREE.CylinderGeometry(0.08, 0.04, 1.4, 12);
    boneGeo.rotateZ(sign * Math.PI / 3.2);
    const bone = new THREE.Mesh(boneGeo, wingMat);
    bone.position.set(sign * 0.7, 0.4, 0);
    wingGroup.add(bone);

    // 12 individual articulated feather blades
    for (let f = 0; f < 12; f++) {
      const featherGeo = new THREE.ConeGeometry(0.12, 1.1 + (f * 0.06), 4);
      featherGeo.rotateZ(sign * (Math.PI / 2.2 + (f * 0.09)));
      const feather = new THREE.Mesh(featherGeo, wingMat);
      feather.position.set(sign * (0.3 + f * 0.16), 0.3 - (f * 0.08), -f * 0.02);
      wingGroup.add(feather);
    }

    return wingGroup;
  }

  // 4. Hovering 3D Sacred Eye of Horus (Identical to site design)
  createFloatingEye3D() {
    this.eye3DGroup = new THREE.Group();

    // Sacred Sclera Contour (Torus arc)
    const scleraMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x997700,
      emissiveIntensity: 0.4
    });

    // Eye Outline (Curved almond shape)
    const eyeContour = new THREE.Group();
    const topArchGeo = new THREE.TorusGeometry(0.38, 0.035, 12, 32, Math.PI * 0.75);
    const topArch = new THREE.Mesh(topArchGeo, scleraMat);
    topArch.rotation.z = Math.PI * 0.62;
    eyeContour.add(topArch);

    const bottomArch = topArch.clone();
    bottomArch.rotation.z = -Math.PI * 0.38;
    eyeContour.add(bottomArch);

    // Sacred Eyebrow
    const browGeo = new THREE.TorusGeometry(0.48, 0.04, 12, 32, Math.PI * 0.65);
    const brow = new THREE.Mesh(browGeo, scleraMat);
    brow.rotation.z = Math.PI * 0.68;
    brow.position.y = 0.24;
    eyeContour.add(brow);

    // Falcon Tear & Spiral below eye
    const tearGeo = new THREE.CylinderGeometry(0.025, 0.015, 0.32, 12);
    const tear = new THREE.Mesh(tearGeo, scleraMat);
    tear.position.set(0, -0.32, 0);
    eyeContour.add(tear);

    const spiralGeo = new THREE.TorusGeometry(0.12, 0.025, 12, 24, Math.PI * 1.4);
    const spiral = new THREE.Mesh(spiralGeo, scleraMat);
    spiral.position.set(0.18, -0.28, 0);
    eyeContour.add(spiral);

    this.eye3DGroup.add(eyeContour);

    // Central Glowing Iris & Core Pupil
    const irisGeo = new THREE.SphereGeometry(0.16, 24, 24);
    const irisMat = new THREE.MeshBasicMaterial({ color: 0xffea79 });
    const iris = new THREE.Mesh(irisGeo, irisMat);
    this.eye3DGroup.add(iris);

    const pupilGeo = new THREE.SphereGeometry(0.09, 18, 18);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const pupil = new THREE.Mesh(pupilGeo, pupilMat);
    pupil.position.z = 0.08;
    this.eye3DGroup.add(pupil);

    const coreGeo = new THREE.SphereGeometry(0.04, 12, 12);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.z = 0.14;
    this.eye3DGroup.add(core);

    // Celestial Energy Aura Rings
    const ringGeo = new THREE.RingGeometry(0.65, 0.68, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6
    });
    const energyRing = new THREE.Mesh(ringGeo, ringMat);
    this.eye3DGroup.add(energyRing);

    // Place Eye of Horus hovering in front of Horus' chest
    this.eye3DGroup.position.set(0, 0.28, 0.95);
    this.eye3DGroup.scale.set(0.9, 0.9, 0.9);
    this.scene.add(this.eye3DGroup);
  }

  // 5. Desert Sandstorm Particle Vortex
  createSandstormVortex() {
    const particleCount = 2400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const goldColor = new THREE.Color(0xffd700);
    const amberColor = new THREE.Color(0xd4a373);
    const cyanColor = new THREE.Color(0x00f0ff);

    for (let i = 0; i < particleCount; i++) {
      // Cylindrical vortex distribution
      const radius = 1.0 + Math.random() * 6.5;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 8;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      // Color variation
      const rand = Math.random();
      const c = rand > 0.8 ? cyanColor : (rand > 0.4 ? goldColor : amberColor);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    this.sandParticles = new THREE.Points(geometry, material);
    this.scene.add(this.sandParticles);
  }

  // 6. User Tracking & Interaction
  initEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

      this.targetRotationY = this.mouseX * 0.45;
      this.targetRotationX = -this.mouseY * 0.35;
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouseX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        this.mouseY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
        this.targetRotationY = this.mouseX * 0.45;
        this.targetRotationX = -this.mouseY * 0.35;
      }
    }, { passive: true });

    // Enter Button Click: Launches BGM, parts sandstorm & transitions
    if (this.enterBtn) {
      this.enterBtn.addEventListener('click', () => {
        this.enterSanctuary();
      });
    }

    // Skip Button
    if (this.skipBtn) {
      this.skipBtn.addEventListener('click', () => {
        this.enterSanctuary(false);
      });
    }

    // Mute BGM Button on intro
    if (this.muteBtn) {
      this.muteBtn.addEventListener('click', () => {
        if (!window.HorusAudio) return;
        const isPlaying = window.HorusAudio.toggleBGM();
        this.muteBtn.innerHTML = isPlaying ? "🔊 BGM ON" : "🔇 BGM OFF";
        this.muteBtn.classList.toggle('muted', !isPlaying);
      });
    }
  }

  // Simulated Loading Sequence for Cinematic Arrival
  simulateLoading() {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 6;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        this.onLoaded();
      }

      if (this.loadingProgress) this.loadingProgress.style.width = `${progress}%`;
      if (this.loadingStatus) {
        if (progress < 40) this.loadingStatus.innerText = "GATHERING DESERT SANDS...";
        else if (progress < 75) this.loadingStatus.innerText = "AWAKENING THE HORUS DEITY...";
        else if (progress < 100) this.loadingStatus.innerText = "ACTIVATING 3D SACRED EYE...";
        else this.loadingStatus.innerText = "PORTAL READY // EL SANTUARIO ESTÁ DESPIERTO";
      }
    }, 90);
  }

  onLoaded() {
    if (this.loadingBar) {
      this.loadingBar.style.display = 'none';
    }
    if (this.enterBtn) {
      this.enterBtn.style.display = 'inline-flex';
      this.enterBtn.classList.add('pulse-ready');
    }
  }

  // Enter the Main Application
  enterSanctuary(startAudio = true) {
    if (this.isEntered) return;
    this.isEntered = true;

    // Start Egyptian BGM automatically
    if (startAudio && window.HorusAudio && !window.HorusAudio.bgmEnabled) {
      window.HorusAudio.toggleBGM();
      const mainBgmBtn = document.getElementById('bgmBtn');
      if (mainBgmBtn) {
        mainBgmBtn.classList.remove('muted');
        mainBgmBtn.innerHTML = `<span class="btn-icon">𓏢</span> BGM ON`;
      }
    }

    // Play Stargate Warp sound effect
    if (window.HorusAudio && window.HorusAudio.playWarp) {
      window.HorusAudio.playWarp();
    }

    // Dissolve intro overlay smoothly
    if (this.overlay) {
      this.overlay.classList.add('intro-fade-out');
      setTimeout(() => {
        this.overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
      }, 950);
    }
  }

  // 7. Render Loop
  animate() {
    if (this.isEntered && this.overlay.style.display === 'none') {
      return; // Stop animation loop when intro closed
    }

    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // 1. Matrix Rain
    this.drawMatrixRain();

    // 2. Levitation & Hovering of Horus Entity
    if (this.horusGroup) {
      // Gentle floating sine oscillation
      this.horusGroup.position.y = -0.2 + Math.sin(elapsedTime * 1.8) * 0.12;

      // Smooth gaze tracking towards cursor
      this.horusGroup.rotation.y += (this.targetRotationY - this.horusGroup.rotation.y) * 0.08;
      this.horusGroup.rotation.x += (this.targetRotationX * 0.4 - this.horusGroup.rotation.x) * 0.08;
    }

    // 3. Head Tilting
    if (this.headGroup) {
      this.headGroup.rotation.y = this.targetRotationY * 0.6;
      this.headGroup.rotation.x = this.targetRotationX * 0.5;
    }

    // 4. Wing Flexing & Organic Flapping
    const wingFlap = Math.sin(elapsedTime * 2.2) * 0.18;
    if (this.leftWing) this.leftWing.rotation.z = wingFlap;
    if (this.rightWing) this.rightWing.rotation.z = -wingFlap;

    // 5. 3D Eye of Horus Levitation & Gaze Tracking
    if (this.eye3DGroup) {
      this.eye3DGroup.position.y = 0.28 + Math.sin(elapsedTime * 2.4) * 0.08;
      this.eye3DGroup.rotation.y = this.targetRotationY * 0.9;
      this.eye3DGroup.rotation.x = this.targetRotationX * 0.9;
      // Pulse energy ring
      this.eye3DGroup.rotation.z += 0.01;
    }

    // 6. Sandstorm Particle Vortex Swirl
    if (this.sandParticles) {
      this.sandParticles.rotation.y += 0.008;
      const positions = this.sandParticles.geometry.attributes.position.array;
      for (let p = 1; p < positions.length; p += 3) {
        positions[p] += 0.015; // upward drift
        if (positions[p] > 4) positions[p] = -4;
      }
      this.sandParticles.geometry.attributes.position.needsUpdate = true;
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}

// Initializer
document.addEventListener('DOMContentLoaded', () => {
  new Horus3DIntro();
});
