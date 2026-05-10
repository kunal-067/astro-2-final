/* ============================================================
   ACHARYA GURU JI — script.js
   Star Canvas · Cursor · Scroll · FAQ · Video · Counter · Modal
   ============================================================ */

'use strict';

/* ══════════════════════════════════════
   1. CUSTOM CURSOR
══════════════════════════════════════ */
(function initCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;
  if (window.innerWidth < 768) return;

  let mx = -100, my = -100;
  let rx = -100, ry = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .svc-card, .pain-card, .wa-card, .video-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '52px';
      ring.style.height = '52px';
      ring.style.borderColor = 'rgba(200,168,75,.9)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '32px';
      ring.style.height = '32px';
      ring.style.borderColor = 'rgba(200,168,75,.6)';
    });
  });
})();


/* ══════════════════════════════════════
   2. HERO STAR CANVAS
══════════════════════════════════════ */
(function initStarCanvas() {
  const canvas = document.getElementById('starCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [], W, H, frame = 0;

  function resize() {
    W = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
    H = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    buildStars();
  }

  function buildStars() {
    stars = [];
    const count = Math.floor((W * H) / 2400);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.8 + 0.25,
        alpha: Math.random() * 0.75 + 0.1,
        speed: Math.random() * 0.5 + 0.04,
        phase: Math.random() * Math.PI * 2,
        gold: Math.random() < 0.57,    // 7% golden
        drift: (Math.random() - 0.5) * 0.18
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    frame += 0.016;
    stars.forEach(s => {
      const tw = s.alpha + Math.sin(frame * s.speed + s.phase) * 0.28;
      const alpha = Math.max(0, Math.min(1, tw));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.gold
        ? `rgba(200,168,75,${alpha})`
        : `rgba(255,255,255,${alpha * 0.85})`;
      ctx.fill();

      // Slow drift
      s.x += s.drift;
      if (s.x < -5) s.x = W + 5;
      if (s.x > W + 5) s.x = -5;
    });
    requestAnimationFrame(draw);
  }

  resize();
  draw();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  });
})();


/* ══════════════════════════════════════
   3. URGENCY SECTION — STAR CANVAS
══════════════════════════════════════ */
(function initUrgencyCanvas() {
  const canvas = document.getElementById('urgencyCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [], W, H, frame = 0;

  function resize() {
    W = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
    H = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    buildParticles();
  }

  function buildParticles() {
    particles = [];
    const count = 80;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
        alpha: Math.random() * 0.6 + 0.1,
        gold: Math.random() < 0.4
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    frame++;
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      const flicker = p.alpha + Math.sin(frame * 0.05 + p.x) * 0.2;
      ctx.fillStyle = p.gold
        ? `rgba(200,168,75,${Math.max(0, flicker)})`
        : `rgba(255,255,255,${Math.max(0, flicker * 0.6)})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
      if (p.x < -5) p.x = W + 5;
      if (p.x > W + 5) p.x = -5;
    });
    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', () => setTimeout(resize, 200));
})();


/* ══════════════════════════════════════
   4. STICKY HEADER
══════════════════════════════════════ */
(function initHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  function update() {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();


/* ══════════════════════════════════════
   5. HAMBURGER / MOBILE NAV
══════════════════════════════════════ */
(function initMobileNav() {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('mobileNav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
    btn.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  // Close on backdrop click
  document.addEventListener('click', e => {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !btn.contains(e.target)) {
      closeMobileNav();
    }
  });
})();

function closeMobileNav() {
  const nav = document.getElementById('mobileNav');
  const btn = document.getElementById('hamburger');
  if (nav) nav.classList.remove('open');
  if (btn) btn.classList.remove('active');
  document.body.style.overflow = '';
}


/* ══════════════════════════════════════
   6. SCROLL REVEAL
══════════════════════════════════════ */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
  );

  els.forEach(el => observer.observe(el));
})();


/* ══════════════════════════════════════
   7. ANIMATED STAT COUNTERS
══════════════════════════════════════ */
(function initCounters() {
  const nums = document.querySelectorAll('.snum[data-target]');
  if (!nums.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const dur = 1800;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / dur, 1);
        // Ease out cubic
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(ease * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString();
      }
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  nums.forEach(n => observer.observe(n));
})();


/* ══════════════════════════════════════
   8. FAQ ACCORDION
══════════════════════════════════════ */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');

  // Close all open items
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));

  // Open clicked if it was closed
  if (!isOpen) item.classList.add('open');
}


/* ══════════════════════════════════════
   9. VIDEO PLAY ON CLICK
══════════════════════════════════════ */
function playVideo(card, src) {
  const iframeWrap = card.querySelector('.iframe-wrap');
  const iframe = card.querySelector('iframe');
  const overlay = card.querySelector('.vthumb-overlay');
  if (!iframeWrap || !iframe) return;

  iframe.src = src;
  iframeWrap.classList.add('active');
  if (overlay) overlay.style.display = 'none';
}


/* ══════════════════════════════════════
   10. CONTACT FORM — SUCCESS MODAL
══════════════════════════════════════ */
function handleSubmit(e) {
  e.preventDefault();
  const modal = document.getElementById('modalBg');
  if (modal) modal.classList.add('open');
  e.target.reset();
}

function closeModal() {
  const modal = document.getElementById('modalBg');
  if (modal) modal.classList.remove('open');
}

// Close modal on backdrop click
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modalBg');
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });
  }
});

// Close modal on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});


/* ══════════════════════════════════════
   11. FLOATING WHATSAPP — SHOW AFTER SCROLL
══════════════════════════════════════ */
(function initFloatWa() {
  const btn = document.getElementById('floatWa');
  const insBtn = document.getElementById('floatin')
  if (!btn && !insBtn) return;

  function update() {
    btn.classList.toggle('show', window.scrollY > 400);
    insBtn.classList.toggle('show', window.scrollY > 400);
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();


/* ══════════════════════════════════════
   12. SMOOTH SCROLL FOR ANCHOR LINKS
══════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const headerH = document.getElementById('siteHeader')?.offsetHeight || 80;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH - 10;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ══════════════════════════════════════
   13. WHATSAPP CHAT BODY AUTO-SCROLL
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.wa-body').forEach(body => {
    setTimeout(() => { body.scrollTop = body.scrollHeight; }, 300);
  });
});


/* ══════════════════════════════════════
   14. GOLD PARTICLE MOUSE TRAIL (Desktop)
══════════════════════════════════════ */
(function initParticleTrail() {
  if (window.innerWidth < 900) return;

  let lastX = 0, lastY = 0, throttle = 0;

  document.addEventListener('mousemove', e => {
    if (Date.now() - throttle < 40) return;
    throttle = Date.now();

    const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
    if (dist < 10) return;
    lastX = e.clientX; lastY = e.clientY;

    createParticle(e.clientX, e.clientY);
  });

  function createParticle(x, y) {
    const p = document.createElement('div');
    const size = Math.random() * 5 + 2;
    const gold = Math.random() < 0.65;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 35 + 10;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed - 20;

    Object.assign(p.style, {
      position: 'fixed',
      left: x + 'px',
      top: y + 'px',
      width: size + 'px',
      height: size + 'px',
      borderRadius: '50%',
      background: gold ? 'rgba(200,168,75,0.85)' : 'rgba(255,255,255,0.55)',
      pointerEvents: 'none',
      zIndex: '99980',
      transform: 'translate(-50%,-50%)',
      transition: 'all 0.7s cubic-bezier(.22,.68,0,1.2)',
      willChange: 'transform, opacity'
    });

    document.body.appendChild(p);

    requestAnimationFrame(() => {
      p.style.transform = `translate(calc(-50% + ${vx}px), calc(-50% + ${vy}px))`;
      p.style.opacity = '0';
    });

    setTimeout(() => p.remove(), 750);
  }
})();


/* ══════════════════════════════════════
   15. GALLERY ITEM PARALLAX (subtle)
══════════════════════════════════════ */
(function initGalleryParallax() {
  const items = document.querySelectorAll('.gal-bg');
  if (!items.length || window.innerWidth < 900) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = (center - window.innerHeight / 2) * 0.08;
      item.style.backgroundPositionY = `calc(50% + ${offset}px)`;
    });
  }, { passive: true });
})();


/* ══════════════════════════════════════
   16. ACTIVE NAV HIGHLIGHT ON SCROLL
══════════════════════════════════════ */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === '#' + entry.target.id
            ? 'var(--gold)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();


/* ══════════════════════════════════════
   17. TICKER PAUSE ON HOVER
══════════════════════════════════════ */
(function initTickerPause() {
  const track = document.querySelector('.ticker-track');
  if (!track) return;

  track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
})();


/* ══════════════════════════════════════
   18. ASTRO SYMBOLS INTERACTIVE ROTATE
══════════════════════════════════════ */
(function initAstroWheel() {
  const symbols = document.querySelectorAll('.astro-symbols span');
  if (!symbols.length) return;
  symbols.forEach((span, i) => {
    span.style.cursor = 'default';
    span.addEventListener('mouseenter', () => {
      span.style.color = '#f5e199';
      span.style.transform = 'scale(1.5)';
      span.style.transition = 'all .3s';
    });
    span.addEventListener('mouseleave', () => {
      span.style.color = '';
      span.style.transform = '';
    });
  });
})();


/* ══════════════════════════════════════
   19. FORM INPUT FOCUS EFFECTS
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fg input, .fg select, .fg textarea').forEach(input => {
    const label = input.previousElementSibling;

    input.addEventListener('focus', () => {
      if (label && label.tagName === 'LABEL') {
        label.style.color = 'var(--gold)';
      }
    });
    input.addEventListener('blur', () => {
      if (label && label.tagName === 'LABEL') {
        label.style.color = '';
      }
    });
  });
});


/* ══════════════════════════════════════
   20. SECTION ENTRANCE STAGGER
      (Pain cards, Svc cards, etc.)
══════════════════════════════════════ */
(function initStaggeredReveal() {
  const groups = [
    { parent: '.pain-grid', child: '.pain-card' },
    { parent: '.svc-grid', child: '.svc-card' },
    { parent: '.wa-grid', child: '.wa-card' },
    { parent: '.testi-grid', child: '.testi-card' },
    { parent: '.why-grid', child: '.why-card' },
    { parent: '.video-grid', child: '.video-card' },
    { parent: '.steps-row', child: '.step-card' },
    { parent: '.stats-row', child: '.stat-item' },
  ];

  groups.forEach(({ parent, child }) => {
    const parentEl = document.querySelector(parent);
    if (!parentEl) return;

    const children = parentEl.querySelectorAll(child);
    children.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(35px)';
      el.style.transition = `opacity .6s ease ${i * 0.1}s, transform .6s ease ${i * 0.1}s`;
    });

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        children.forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    observer.observe(parentEl);
  });
})();


/* ══════════════════════════════════════
   21. PHONE SCREEN GLOW ON HOVER
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.wa-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const phone = card.querySelector('.wa-phone');
      if (phone) phone.style.boxShadow = '0 30px 80px rgba(37,211,102,.25), 0 0 0 1px rgba(37,211,102,.15)';
    });
    card.addEventListener('mouseleave', () => {
      const phone = card.querySelector('.wa-phone');
      if (phone) phone.style.boxShadow = '0 25px 70px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.04)';
    });
  });
});


/* ══════════════════════════════════════
   22. SCROLL PROGRESS BAR (top of page)
══════════════════════════════════════ */
(function initProgressBar() {
  const bar = document.createElement('div');
  Object.assign(bar.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    height: '3px',
    width: '0%',
    background: 'linear-gradient(90deg, var(--gold-dim), var(--gold), var(--gold2))',
    zIndex: '99999',
    transition: 'width .1s linear',
    pointerEvents: 'none'
  });
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
})();






/// 
(function () {
  'use strict';

  const canvas = document.getElementById('chakra-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 480, H = 480, CX = W / 2, CY = H / 2;

  /* ── Planet data ── */
  const PLANETS = [
    { name: 'Sun', sym: '☀', desc: 'Soul & vitality', col: '#FFC94D', r: 12, orbit: 82, spd: 0.008, a: 0 },
    { name: 'Moon', sym: '☽', desc: 'Mind & emotions', col: '#C8D8E8', r: 9, orbit: 118, spd: -0.013, a: 1.2 },
    { name: 'Mars', sym: '♂', desc: 'Energy & passion', col: '#E05040', r: 9, orbit: 152, spd: 0.016, a: 2.4 },
    { name: 'Mercury', sym: '☿', desc: 'Communication', col: '#8ECFB0', r: 8, orbit: 184, spd: -0.022, a: 4.0 },
    { name: 'Jupiter', sym: '♃', desc: 'Wisdom & expansion', col: '#E8A060', r: 13, orbit: 216, spd: 0.006, a: 3.1 },
    { name: 'Venus', sym: '♀', desc: 'Love & relationships', col: '#F4A8C0', r: 10, orbit: 178, spd: -0.011, a: 5.2 },
    { name: 'Saturn', sym: '♄', desc: 'Karma & discipline', col: '#C8B090', r: 11, orbit: 206, spd: 0.0045, a: 0.8 },
    { name: 'Rahu', sym: '☊', desc: 'Karmic north node', col: '#9090C8', r: 8, orbit: 136, spd: -0.009, a: 2.8 },
    { name: 'Ketu', sym: '☋', desc: 'Spiritual liberation', col: '#B0A090', r: 8, orbit: 136, spd: -0.009, a: 2.8 + Math.PI },
  ];

  /* ── Stars ── */
  const STARS = Array.from({ length: 170 }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    r: Math.random() * 1.1 + 0.2,
    a: Math.random(),
    da: (Math.random() - 0.5) * 0.006,
  }));

  /* ── Zodiac signs ── */
  const SIGNS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

  let tick = 0;

  /* ── Helpers ── */
  function hexRgb(hex) {
    return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
  }

  /* ── Drawing functions ── */

  function drawStars() {
    STARS.forEach(s => {
      s.a += s.da;
      if (s.a <= 0 || s.a >= 1) s.da *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212,168,67,${(s.a * 0.55).toFixed(2)})`;
      ctx.fill();
    });
  }

  function drawOrbitalRings() {
    [82, 118, 136, 152, 178, 184, 206, 216].forEach((r, i) => {
      ctx.beginPath();
      ctx.arc(CX, CY, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(212,168,67,${(0.32 + i * 0.008).toFixed(3)})`;
      ctx.lineWidth = 0.5;
      ctx.setLineDash([3, 6]);
      ctx.stroke();
      ctx.setLineDash([]);
    });
    /* solid outer border rings */
    [238, 256].forEach(r => {
      ctx.beginPath();
      ctx.arc(CX, CY, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(212,168,67,0.22)';
      ctx.lineWidth = r === 256 ? 1.5 : 0.7;
      ctx.stroke();
    });
  }

  function drawPetals(rot) {
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 + rot;
      const x1 = CX + Math.cos(a) * 38, y1 = CY + Math.sin(a) * 38;
      const x2 = CX + Math.cos(a) * 74, y2 = CY + Math.sin(a) * 74;
      const cx1 = CX + Math.cos(a - 0.38) * 60, cy1 = CY + Math.sin(a - 0.38) * 60;
      const cx2 = CX + Math.cos(a + 0.38) * 60, cy2 = CY + Math.sin(a + 0.38) * 60;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(cx1, cy1, x2, y2);
      ctx.quadraticCurveTo(cx2, cy2, x1, y1);
      ctx.closePath();
      const grd = ctx.createRadialGradient(CX, CY, 18, CX, CY, 82);
      grd.addColorStop(0, 'rgba(212,168,67,0.6)');
      grd.addColorStop(1, 'rgba(212,168,67,0.01)');
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.strokeStyle = 'rgba(212,168,67,0.28)';
      ctx.lineWidth = 0.7;
      ctx.stroke();
    }
  }

  function drawSriYantraStar(rot) {
    ctx.save();
    ctx.translate(CX, CY);
    ctx.rotate(rot);
    for (let tri = 0; tri < 2; tri++) {
      ctx.beginPath();
      const offset = tri === 0 ? -Math.PI / 2 : Math.PI / 6;
      const R = tri === 0 ? 60 : 56;
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2 + offset;
        if (i === 0) ctx.moveTo(Math.cos(a) * R, Math.sin(a) * R);
        else ctx.lineTo(Math.cos(a) * R, Math.sin(a) * R);
      }
      ctx.closePath();
      ctx.strokeStyle = tri === 0 ? 'rgba(212,168,67,0.5)' : 'rgba(170,130,255,0.4)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.fillStyle = tri === 0 ? 'rgba(212,168,67,0.04)' : 'rgba(120,60,200,0.05)';
      ctx.fill();
    }
    ctx.restore();
  }

  function drawEightPointStar(rot) {
    ctx.save();
    ctx.translate(CX, CY);
    ctx.rotate(rot);
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const ao = (i / 8) * Math.PI * 2;
      const ai = ao + Math.PI / 8;
      if (i === 0) ctx.moveTo(Math.cos(ao) * 64, Math.sin(ao) * 64);
      else ctx.lineTo(Math.cos(ao) * 64, Math.sin(ao) * 64);
      ctx.lineTo(Math.cos(ai) * 30, Math.sin(ai) * 30);
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgba(212,168,67,0.2)';
    ctx.lineWidth = 0.8;
    ctx.stroke();
    ctx.restore();
  }

  function drawTicksAndGradations() {
    for (let i = 0; i < 72; i++) {
      const a = (i / 72) * Math.PI * 2;
      const major = i % 9 === 0;
      const r1 = 238, r2 = major ? 226 : 232;
      ctx.beginPath();
      ctx.moveTo(CX + Math.cos(a) * r1, CY + Math.sin(a) * r1);
      ctx.lineTo(CX + Math.cos(a) * r2, CY + Math.sin(a) * r2);
      ctx.strokeStyle = `rgba(212,168,67,${major ? 0.55 : 0.18})`;
      ctx.lineWidth = major ? 1 : 0.5;
      ctx.stroke();
    }
  }

  function drawZodiacRing(rot) {
    SIGNS.forEach((sign, i) => {
      const a = (i / 12) * Math.PI * 2 + rot - Math.PI / 2;
      const R = 248;
      ctx.save();
      ctx.translate(CX + Math.cos(a) * R, CY + Math.sin(a) * R);
      ctx.font = '11px serif';
      ctx.fillStyle = 'rgba(212,168,67,0.9)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(sign, 0, 0);
      ctx.restore();
    });
  }

  function drawCentralGlow() {
    const grd = ctx.createRadialGradient(CX, CY, 0, CX, CY, 78);
    grd.addColorStop(0, 'rgba(212,168,67,0.22)');
    grd.addColorStop(0.45, 'rgba(120,60,200,0.1)');
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.arc(CX, CY, 78, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();
  }

  function drawEnergySpokes(rot) {
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + rot;
      ctx.beginPath();
      ctx.moveTo(CX, CY);
      ctx.lineTo(CX + Math.cos(a) * 232, CY + Math.sin(a) * 232);
      ctx.strokeStyle = 'rgba(212,168,67,0.04)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function drawSpokeDots(rot) {
    [96, 132, 168, 202].forEach(r => {
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2 + rot;
        ctx.beginPath();
        ctx.arc(CX + Math.cos(a) * r, CY + Math.sin(a) * r, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(212,168,67,0.18)';
        ctx.fill();
      }
    });
  }

  function drawPlanet(p) {
    const px = CX + Math.cos(p.a) * p.orbit;
    const py = CY + Math.sin(p.a) * p.orbit;
    const [rr, gg, bb] = hexRgb(p.col);

    /* glow halo */
    ctx.beginPath();
    ctx.arc(px, py, p.r + 5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${rr},${gg},${bb},0.14)`;
    ctx.fill();

    /* planet body */
    const grd = ctx.createRadialGradient(px - p.r * 0.3, py - p.r * 0.3, p.r * 0.1, px, py, p.r);
    grd.addColorStop(0, lighten(p.col, 0.4));
    grd.addColorStop(1, p.col);
    ctx.beginPath();
    ctx.arc(px, py, p.r, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.shadowColor = p.col;
    ctx.shadowBlur = 16;
    ctx.fill();
    ctx.shadowBlur = 0;

    /* symbol */
    ctx.font = `${p.r + 2}px serif`;
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(p.sym, px, py + 1);

    p._px = px; p._py = py;
  }

  function lighten(hex, amt) {
    const [r, g, b] = hexRgb(hex);
    return `rgb(${Math.min(255, r + Math.round(amt * 100))},${Math.min(255, g + Math.round(amt * 100))},${Math.min(255, b + Math.round(amt * 100))})`;
  }

  function drawAspectLines() {
    ctx.save();
    ctx.setLineDash([2, 5]);
    ctx.strokeStyle = 'rgba(212,168,67,0.06)';
    ctx.lineWidth = 0.6;
    for (let i = 0; i < PLANETS.length; i++) {
      for (let j = i + 1; j < PLANETS.length; j++) {
        const pi = PLANETS[i], pj = PLANETS[j];
        if (pi._px && pj._px) {
          ctx.beginPath();
          ctx.moveTo(pi._px, pi._py);
          ctx.lineTo(pj._px, pj._py);
          ctx.stroke();
        }
      }
    }
    ctx.restore();
  }

  /* ── Main render loop ── */
  function render() {
    ctx.clearRect(0, 0, W, H);
    tick += 0.012;

    drawStars();
    drawEnergySpokes(tick * 0.09);
    drawOrbitalRings();
    drawSpokeDots(tick * 0.045);
    drawPetals(tick * 0.1);
    drawEightPointStar(tick * 0.07);
    drawSriYantraStar(tick * 0.055);
    drawCentralGlow();
    drawTicksAndGradations();
    drawZodiacRing(tick * 0.016);
    PLANETS.forEach(p => { p.a += p.spd; drawPlanet(p); });
    drawAspectLines();

    requestAnimationFrame(render);
  }

  render();

  /* ── Tooltip on hover ── */
  const tooltip = document.getElementById('chakra-tooltip');
  const ttName = document.getElementById('chakra-tt-name');
  const ttDesc = document.getElementById('chakra-tt-desc');

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const sx = W / rect.width, sy = H / rect.height;
    const mx = (e.clientX - rect.left) * sx;
    const my = (e.clientY - rect.top) * sy;
    const found = PLANETS.find(p => p._px && Math.hypot(mx - p._px, my - p._py) < p.r + 10);
    if (found) {
      ttName.textContent = found.name + ' ' + found.sym;
      ttDesc.textContent = found.desc;
      tooltip.style.left = ((found._px / sx)) + 'px';
      tooltip.style.top = ((found._py / sy)) + 'px';
      tooltip.classList.add('show');
      canvas.style.cursor = 'pointer';
    } else {
      tooltip.classList.remove('show');
      canvas.style.cursor = 'default';
    }
  });

  canvas.addEventListener('mouseleave', () => {
    tooltip.classList.remove('show');
    canvas.style.cursor = 'default';
  });

}());





/* ========== GALLERY STRIP LIGHTBOX ========== */
(function () {

  /* ── Update these src paths to match your actual image files ── */
  var GS_IMAGES = [
    { src: './assets/Whatsapp reviews/Review1.png', caption: '' },
    { src: './assets/Whatsapp reviews/Review2.png', caption: '' },
    { src: './assets/Whatsapp reviews/Review3.png', caption: '' },
    { src: './assets/Whatsapp reviews/Review4.png', caption: '' },
  ];

  /* ── DOM references ── */
  var lightbox = document.getElementById('gsLightbox');
  var lbImg = document.getElementById('gsLbImg');
  var lbSpinner = document.getElementById('gsLbSpinner');
  var lbCurrent = document.getElementById('gsLbCurrent');
  var lbTotal = document.getElementById('gsLbTotal');
  var lbCaption = document.getElementById('gsLbCaption');
  var lbDots = document.getElementById('gsLbDots');
  var track = document.getElementById('gsTrack');
  var lbIndex = 0;

  /* ── Guard: exit if lightbox not on page ── */
  if (!lightbox) return;

  /* ── Set total count ── */
  if (lbTotal) lbTotal.textContent = GS_IMAGES.length;

  /* ── Build dot indicators ── */
  if (lbDots) {
    GS_IMAGES.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'gs-lb-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to image ' + (i + 1));
      dot.addEventListener('click', function () { gsGoTo(i); });
      lbDots.appendChild(dot);
    });
  }

  /* ── Open lightbox ── */
  window.gsOpenLightbox = function (index) {
    lbIndex = index;
    loadImage(index, null);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  /* ── Close lightbox ── */
  window.gsCloseLightbox = function () {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  /* ── Navigate prev / next ── */
  window.gsLbNav = function (dir) {
    lbIndex = (lbIndex + dir + GS_IMAGES.length) % GS_IMAGES.length;
    loadImage(lbIndex, dir > 0 ? 'right' : 'left');
  };

  /* ── Jump to specific dot index ── */
  function gsGoTo(index) {
    if (index === lbIndex) return;
    var dir = index > lbIndex ? 'right' : 'left';
    lbIndex = index;
    loadImage(lbIndex, dir);
  }

  /* ── Load image with slide transition ── */
  function loadImage(index, direction) {
    var data = GS_IMAGES[index];
    if (!data) return;

    /* Show spinner while loading */
    if (lbImg) lbImg.classList.add('loading');
    if (lbSpinner) lbSpinner.classList.add('visible');

    var tempImg = new Image();

    tempImg.onload = function () {
      lbImg.src = data.src;
      lbImg.alt = data.caption || '';

      lbSpinner.classList.remove('visible');
      lbImg.classList.remove('loading', 'slide-in-right', 'slide-in-left');

      /* Force reflow so animation re-triggers */
      void lbImg.offsetWidth;

      if (direction === 'right') lbImg.classList.add('slide-in-right');
      if (direction === 'left') lbImg.classList.add('slide-in-left');

      /* Update counter */
      if (lbCurrent) lbCurrent.textContent = index + 1;

      /* Update caption */
      if (lbCaption) lbCaption.textContent = data.caption || 'Genuine Astro Guide';

      /* Update dots */
      document.querySelectorAll('.gs-lb-dot').forEach(function (d, i) {
        d.classList.toggle('active', i === index);
      });
    };

    tempImg.onerror = function () {
      if (lbSpinner) lbSpinner.classList.remove('visible');
      if (lbImg) lbImg.classList.remove('loading');
      if (lbCaption) lbCaption.textContent = 'Image not found — check your file path';
    };

    tempImg.src = data.src;
  }

  /* ── Keyboard: Escape / Arrow keys ── */
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') gsCloseLightbox();
    if (e.key === 'ArrowRight') gsLbNav(1);
    if (e.key === 'ArrowLeft') gsLbNav(-1);
  });

  /* ── Touch swipe support ── */
  var touchStartX = 0;
  lightbox.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener('touchend', function (e) {
    var diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) gsLbNav(diff > 0 ? 1 : -1);
  }, { passive: true });

  /* ── Pause strip scroll when lightbox is open ── */
  if (track) {
    new MutationObserver(function () {
      track.style.animationPlayState =
        lightbox.classList.contains('open') ? 'paused' : 'running';
    }).observe(lightbox, { attributes: true, attributeFilter: ['class'] });
  }

})();


/* ========== TOP BAR CLOSE BUTTON ========== */
var xMark = document.getElementById('x-mark');
if (xMark) {
  xMark.addEventListener('click', function () {
    var bar = document.getElementById('top-bar');
    if (bar) bar.style.display = 'none';
  });
}




// carousel works by translating the container left and right, and keeping track of the current index. Dots are generated dynamically based on the number of testimonial cards, and clicking a dot jumps to that testimonial. The scrollTestimonials function handles the left/right navigation and updates the active dot accordingly.
const carouselWrappers = document.querySelectorAll('.carousel-wrapper');

carouselWrappers.forEach((wrapper) => {

  let index = 0;

  const carouselCards = wrapper.querySelectorAll('.carousel-item');
  const dotsContainer = wrapper.querySelector(".dots");
  const carouselTrack = wrapper.querySelector('.carousel-track');

  const nextBtn = wrapper.querySelector(".carousel-nav.right");
  const prevBtn = wrapper.querySelector(".carousel-nav.left");

  if (!carouselCards.length) return;

  // Create dots
  carouselCards.forEach((c, i) => {

    // const carousel = wrapper.querySelector('.carousel');
    // if (!carousel) return;
    // c.style.width = carousel.offsetWidth + "px";
    const dot = document.createElement("div");
    dot.classList.add("dot");

    if (i === 0) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
      index = i;
      updateCarousel();
    });

    dotsContainer.appendChild(dot);
  });

  const dots = wrapper.querySelectorAll(".dot");

  function updateCarousel() {

    const cardWidth = carouselCards[0].offsetWidth + 24;

    carouselTrack.style.transform =
      `translateX(-${index * cardWidth}px)`;

    dots.forEach(dot => {
      dot.classList.remove("active");
    });

    if (dots[index]) {
      dots[index].classList.add("active");
    }
  }

  nextBtn.addEventListener("click", () => {

    index++;

    if (index >= carouselCards.length) {
      index = 0;
    }

    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {

    index--;

    if (index < 0) {
      index = carouselCards.length - 1;
    }

    updateCarousel();
  });

  // Auto slide
  // setInterval(() => {

  //   index++;

  //   if (index >= carouselCards.length) {
  //     index = 0;
  //   }

  //   updateCarousel();

  // }, 6000);

});