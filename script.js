// Nav scroll state
const nav = document.getElementById('nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
  if (mobileClose) mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
}

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
}

// Hero ambient particles (respects reduced motion)
const particleCanvas = document.getElementById('heroParticles');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (particleCanvas && !prefersReducedMotion) {
  const ctx = particleCanvas.getContext('2d');
  let w, h, particles;

  function resize() {
    const rect = particleCanvas.parentElement.getBoundingClientRect();
    w = particleCanvas.width = rect.width;
    h = particleCanvas.height = rect.height;
  }

  function makeParticles() {
    const count = Math.max(24, Math.floor((w * h) / 26000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      speed: Math.random() * 0.35 + 0.08,
      drift: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.15
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
      if (p.x < -4) p.x = w + 4;
      if (p.x > w + 4) p.x = -4;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(226,196,122,${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }

  resize();
  makeParticles();
  tick();
  window.addEventListener('resize', () => { resize(); makeParticles(); }, { passive: true });
}

// 3D tilt on book covers
if (!prefersReducedMotion) {
  document.querySelectorAll('.book-card').forEach(card => {
    const cover = card.querySelector('.book-cover img, .book-cover .cover-placeholder');
    if (!cover) return;
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      cover.style.transform = `scale(1.06) rotateX(${(-py * 10).toFixed(2)}deg) rotateY(${(px * 12).toFixed(2)}deg)`;
    });
    card.addEventListener('mouseleave', () => { cover.style.transform = ''; });
  });
}

// Animated stat counters
const statEls = document.querySelectorAll('.stat-number');
if (statEls.length) {
  const animateStat = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimal || '0', 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const statIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStat(entry.target);
        statIo.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statEls.forEach(el => statIo.observe(el));
}

// FAQ accordion (homepage)
document.querySelectorAll('.faq-question').forEach(btn => {
  const answer = btn.nextElementSibling;
  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-question').forEach(other => {
      other.setAttribute('aria-expanded', 'false');
      other.nextElementSibling.style.maxHeight = null;
    });
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// Newsletter form (client-side only placeholder)
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = document.getElementById('newsletterNote');
    if (note) note.textContent = 'Thank you — you\'re on the list.';
  });
}
