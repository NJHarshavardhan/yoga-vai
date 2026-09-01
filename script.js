(() => {
  'use strict';

  const isTouch = matchMedia('(hover: none), (pointer: coarse)').matches;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     PRELOADER
     ============================================================ */
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.getElementById('preloader-bar-fill');
  const wordSpans = document.querySelectorAll('.preloader-word span');
  wordSpans.forEach((el, i) => { el.style.animationDelay = `${0.35 + i * 0.045}s`; });

  let progress = 0;
  const barTimer = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) progress = 100;
    preloaderBar.style.width = progress + '%';
    if (progress >= 100) clearInterval(barTimer);
  }, 140);

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloaderBar.style.width = '100%';
      setTimeout(() => {
        preloader.classList.add('is-hidden');
        document.body.style.overflow = '';
        startHeroReveal();
      }, 350);
    }, 900);
  });
  // Safety fallback in case load event is slow
  setTimeout(() => {
    if (!preloader.classList.contains('is-hidden')) {
      preloader.classList.add('is-hidden');
      startHeroReveal();
    }
  }, 3200);

  /* ============================================================
     CUSTOM CURSOR
     ============================================================ */
  if (!isTouch) {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });

    function animateRing() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('[data-hover], a, button').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('is-active'));
      el.addEventListener('mouseleave', () => ring.classList.remove('is-active'));
    });
  }

  /* ============================================================
     MAGNETIC BUTTONS
     ============================================================ */
  if (!isTouch) {
    document.querySelectorAll('.btn-magnetic').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.22}px, ${y * 0.35}px)`;
        const txt = btn.querySelector('.btn-text');
        if (txt) txt.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
        const txt = btn.querySelector('.btn-text');
        if (txt) txt.style.transform = '';
      });
    });
  }

  /* ============================================================
     NAVIGATION — scroll state + mobile menu
     ============================================================ */
  const nav = document.getElementById('siteNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  }, { passive: true });

  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileMenuClose');

  function openMenu() {
    mobileMenu.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }
  burger.addEventListener('click', openMenu);
  mobileClose.addEventListener('click', closeMenu);
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  /* ============================================================
     HERO REVEAL SEQUENCE
     ============================================================ */
  function startHeroReveal() {
    document.querySelector('.hero-title').classList.add('is-in');
    document.querySelectorAll('.hero .reveal-item').forEach((el, i) => {
      setTimeout(() => el.classList.add('is-visible'), 500 + i * 140);
    });
  }

  /* ============================================================
     SCROLL REVEAL (IntersectionObserver)
     ============================================================ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

  /* ============================================================
     POSES DATA + INTERACTION
     ============================================================ */
  const poseIcon = `<svg viewBox="0 0 100 100"><circle cx="50" cy="26" r="10" fill="currentColor"/><path d="M50 38 C34 42 26 60 26 74 L74 74 C74 60 66 42 50 38Z" fill="currentColor"/></svg>`;

  const poses = [
    {
      name: 'Tadasana', sanskrit: 'Mountain Pose',
      difficulty: 'Beginner · Hold 20–30s',
      desc: 'Stand tall, feet grounded, arms relaxed by the side. The quiet starting point of every practice.',
      benefit: 'Builds posture awareness and steady focus.'
    },
    {
      name: 'Vrikshasana', sanskrit: 'Tree Pose',
      difficulty: 'Beginner · Hold 15–20s each side',
      desc: 'One foot rests against the standing leg, palms meet overhead. A playful test of balance.',
      benefit: 'Develops balance, concentration and core stability.'
    },
    {
      name: 'Balasana', sanskrit: "Child's Pose",
      difficulty: 'Beginner · Hold 30–60s',
      desc: 'Kneel and fold forward, arms stretched ahead, forehead resting down. A shape of rest.',
      benefit: 'Calms the nervous system and eases tension.'
    },
    {
      name: 'Bhujangasana', sanskrit: 'Cobra Pose',
      difficulty: 'Beginner · Hold 15–20s',
      desc: 'Lying on the belly, hands press down and the chest lifts gently, shoulders soft.',
      benefit: 'Strengthens the back and opens the chest for fuller breath.'
    },
    {
      name: 'Adho Mukha Svanasana', sanskrit: 'Downward Dog',
      difficulty: 'Beginner · Hold 20–30s',
      desc: 'Hands and feet on the mat, hips lifted high — the body forms a gentle triangle.',
      benefit: 'Builds full-body strength and a fun sense of upside-down play.'
    },
    {
      name: 'Sukhasana', sanskrit: 'Easy Seated Pose',
      difficulty: 'Beginner · Hold 1–3 min',
      desc: 'A simple cross-legged seat, spine tall, hands resting on the knees — used for breathing and meditation.',
      benefit: 'Anchors attention for pranayama and quiet reflection.'
    }
  ];

  const posesList = document.getElementById('posesList');
  const poseNum = document.getElementById('poseNum');
  const poseFig = document.getElementById('poseFig');
  const poseDifficulty = document.getElementById('poseDifficulty');
  const poseName = document.getElementById('poseName');
  const poseSanskrit = document.getElementById('poseSanskrit');
  const poseDesc = document.getElementById('poseDesc');
  const poseBenefit = document.getElementById('poseBenefit');

  poseFig.innerHTML = poseIcon;

  poses.forEach((p, i) => {
    const item = document.createElement('div');
    item.className = 'pose-item' + (i === 0 ? ' is-active' : '');
    item.dataset.hover = '';
    item.innerHTML = `
      <span class="pose-item-idx">${String(i + 1).padStart(2, '0')}</span>
      <span class="pose-item-name">${p.name}</span>
      <span class="pose-item-sanskrit">${p.sanskrit}</span>
    `;
    item.addEventListener('click', () => setPose(i));
    if (!isTouch) item.addEventListener('mouseenter', () => setPose(i));
    posesList.appendChild(item);
  });

  function setPose(i) {
    const p = poses[i];
    posesList.querySelectorAll('.pose-item').forEach((el, idx) => el.classList.toggle('is-active', idx === i));
    poseNum.textContent = String(i + 1).padStart(2, '0');
    poseDifficulty.textContent = p.difficulty;
    poseName.textContent = p.name;
    poseSanskrit.textContent = p.sanskrit;
    poseDesc.textContent = p.desc;
    poseBenefit.textContent = p.benefit;
    poseFig.style.transform = 'scale(0.85) rotate(-4deg)';
    setTimeout(() => { poseFig.style.transform = 'scale(1) rotate(0deg)'; }, 60);
  }

  /* ============================================================
     BENEFITS ORBIT
     ============================================================ */
  const benefitsData = [
    { word: 'Flexibility', desc: 'Supports mobility and range of motion.' },
    { word: 'Strength', desc: 'Builds functional body strength.' },
    { word: 'Balance', desc: 'Supports physical stability and coordination.' },
    { word: 'Focus', desc: 'Encourages concentration and quiet awareness.' },
    { word: 'Stress relief', desc: 'Supports relaxation and mindfulness.' },
    { word: 'Sleep', desc: 'Can support healthy relaxation routines.' },
    { word: 'Posture', desc: 'Encourages body awareness and alignment.' },
    { word: 'Breath', desc: 'Encourages conscious, steady breathing.' }
  ];

  const orbitEl = document.getElementById('benefitsOrbit');
  const centerWord = document.getElementById('benefitCenterWord');
  const centerDesc = document.getElementById('benefitCenterDesc');
  let activeBenefit = 3; // Focus, matches static markup default

  function layoutOrbit() {
    const radius = orbitEl.parentElement.offsetWidth * 0.42;
    orbitEl.querySelectorAll('.benefit-node').forEach((node, i) => {
      const angle = (i / benefitsData.length) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      node.style.left = `calc(50% + ${x}px)`;
      node.style.top = `calc(50% + ${y}px)`;
    });
  }

  benefitsData.forEach((b, i) => {
    const node = document.createElement('button');
    node.className = 'benefit-node' + (i === activeBenefit ? ' is-active' : '');
    node.textContent = b.word;
    node.dataset.hover = '';
    node.addEventListener('click', () => setBenefit(i));
    if (!isTouch) node.addEventListener('mouseenter', () => setBenefit(i));
    orbitEl.appendChild(node);
  });

  function setBenefit(i) {
    activeBenefit = i;
    orbitEl.querySelectorAll('.benefit-node').forEach((el, idx) => el.classList.toggle('is-active', idx === i));
    centerWord.style.opacity = 0;
    centerDesc.style.opacity = 0;
    setTimeout(() => {
      centerWord.textContent = benefitsData[i].word;
      centerDesc.textContent = benefitsData[i].desc;
      centerWord.style.opacity = 1;
      centerDesc.style.opacity = 1;
    }, 200);
  }

  layoutOrbit();
  window.addEventListener('resize', layoutOrbit);

  /* ============================================================
     BREATHING ORB
     ============================================================ */
  const breathOrb = document.getElementById('breathOrb');
  const breathWord = document.getElementById('breathWord');
  const breathToggle = document.getElementById('breathToggle');
  const phaseEls = document.querySelectorAll('.breath-phases span');

  const TIMING = { inhale: 4000, hold: 2000, exhale: 6000 }; // ms — easy to tweak
  let breathing = false;
  let breathTimer = null;

  function setPhase(phase) {
    phaseEls.forEach(el => el.classList.toggle('is-active', el.dataset.phase === phase));
    if (phase === 'inhale') {
      breathWord.textContent = 'Inhale';
      breathOrb.style.transition = `transform ${TIMING.inhale}ms ease-in-out`;
      breathOrb.style.transform = 'scale(1.35)';
    } else if (phase === 'hold') {
      breathWord.textContent = 'Hold';
      breathOrb.style.transition = `transform ${TIMING.hold}ms ease-in-out`;
    } else {
      breathWord.textContent = 'Exhale';
      breathOrb.style.transition = `transform ${TIMING.exhale}ms ease-in-out`;
      breathOrb.style.transform = 'scale(1)';
    }
  }

  function breathCycle() {
    if (!breathing) return;
    setPhase('inhale');
    breathTimer = setTimeout(() => {
      if (!breathing) return;
      setPhase('hold');
      breathTimer = setTimeout(() => {
        if (!breathing) return;
        setPhase('exhale');
        breathTimer = setTimeout(breathCycle, TIMING.exhale);
      }, TIMING.hold);
    }, TIMING.inhale);
  }

  breathToggle.addEventListener('click', () => {
    breathing = !breathing;
    const label = breathToggle.querySelector('.btn-text');
    if (breathing) {
      label.textContent = 'Stop';
      breathCycle();
    } else {
      label.textContent = 'Start breathing';
      clearTimeout(breathTimer);
      phaseEls.forEach(el => el.classList.remove('is-active'));
      breathOrb.style.transition = 'transform 1s ease-in-out';
      breathOrb.style.transform = 'scale(1)';
      breathWord.textContent = 'Begin';
    }
  });

  /* ============================================================
     JOURNEY — active stage on scroll
     ============================================================ */
  const journeyStages = document.querySelectorAll('.journey-stage');
  const journeyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('is-active', entry.isIntersecting);
    });
  }, { threshold: 0.5 });
  journeyStages.forEach(s => journeyObserver.observe(s));

  /* ============================================================
     FOOTER YEAR
     ============================================================ */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ============================================================
     THREE.JS — soft floating geometry behind hero
     ============================================================ */
  function initThree() {
    if (typeof THREE === 'undefined') return;
    const canvas = document.getElementById('webgl');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 9;

    // Soft wireframe icosahedron — "calm geometry"
    const geo = new THREE.IcosahedronGeometry(2.6, 1);
    const mat = new THREE.MeshBasicMaterial({ color: 0xc9a24b, wireframe: true, transparent: true, opacity: 0.16 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(3.6, 0.6, 0);
    scene.add(mesh);

    const geo2 = new THREE.IcosahedronGeometry(1.1, 0);
    const mat2 = new THREE.MeshBasicMaterial({ color: 0xb23e7e, wireframe: true, transparent: true, opacity: 0.14 });
    const mesh2 = new THREE.Mesh(geo2, mat2);
    mesh2.position.set(-3.4, -1.4, -2);
    scene.add(mesh2);

    // Particle field
    const particleCount = window.innerWidth < 700 ? 60 : 160;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0xe4c878, size: 0.035, transparent: true, opacity: 0.55 });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5);
      mouseY = (e.clientY / window.innerHeight - 0.5);
    });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    let scrollFrac = 0;
    window.addEventListener('scroll', () => {
      scrollFrac = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    }, { passive: true });

    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      mesh.rotation.x = t * 0.05;
      mesh.rotation.y = t * 0.08;
      mesh2.rotation.x = t * -0.04;
      mesh2.rotation.y = t * 0.06;

      particles.rotation.y = t * 0.015;

      camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 0.8 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      // fade whole scene as user scrolls past hero
      const opacity = Math.max(0, 1 - scrollFrac * 3.2);
      canvas.style.opacity = Math.min(0.9, opacity + 0.08);

      renderer.render(scene, camera);
    }
    animate();
  }

  if (!reducedMotion) {
    initThree();
  } else {
    const c = document.getElementById('webgl');
    if (c) c.style.display = 'none';
  }

})();
