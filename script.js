/* ============================================================
   NOHEA MEDIA — script.js
   ============================================================ */

'use strict';

/* === Footer year === */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================================
   GSAP + LENIS SETUP
   ============================================================ */
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {

gsap.registerPlugin(ScrollTrigger);

const isTouchDevice = 'ontouchstart' in window;
let lenis;

if (!isTouchDevice && typeof Lenis !== 'undefined') {
  lenis = new Lenis();

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
} else {
  ScrollTrigger.normalizeScroll(true);
}

/* Utility: split element text into word spans for animation */
function splitWords(el) {
  const text = el.innerText.trim();
  const words = text.split(/\s+/);
  el.innerHTML = words.map(word =>
    `<span style="display:inline-block;overflow:hidden"><span class="word-inner" style="display:inline-block">${word}</span></span>`
  ).join(' ');
  return el.querySelectorAll('.word-inner');
}

/* ============================================================
   HERO ENTRANCE ANIMATION
   ============================================================ */
const heroTl = gsap.timeline({ delay: 0.3 });

heroTl
  .fromTo('.hero-label',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
  .fromTo('.hero-logo-wrap',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.45')
  .fromTo('.hero-title',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.65')
  .fromTo('.hero-divider',
    { opacity: 0, scaleX: 0 },
    { opacity: 1, scaleX: 1, duration: 0.5, ease: 'power3.out' }, '-=0.6')
  .fromTo('.hero-name',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.35')
  .fromTo('.hero-tagline',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.35')
  .fromTo('.hero-actions',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.35')
  .fromTo('.hero-scroll',
    { opacity: 0 },
    { opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.2');

/* ============================================================
   SCROLL-TRIGGERED ANIMATIONS
   ============================================================ */

/* Section titles — word-by-word reveal */
document.querySelectorAll('.section-title').forEach(title => {
  const words = splitWords(title);
  gsap.from(words, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.08,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: title,
      start: 'top 85%',
      once: true,
    },
  });
});

/* Section labels — fade in */
document.querySelectorAll('.section-label').forEach(label => {
  gsap.from(label, {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: label,
      start: 'top 85%',
      once: true,
    },
  });
});

/* Portfolio cards — staggered fade up */
gsap.from('.portfolio-card', {
  y: 40,
  opacity: 0,
  duration: 0.7,
  stagger: 0.1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.portfolio-grid',
    start: 'top 85%',
    once: true,
  },
});

/* Portfolio filters — fade in */
gsap.from('.portfolio-filters', {
  y: 20,
  opacity: 0,
  duration: 0.6,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.portfolio-filters',
    start: 'top 85%',
    once: true,
  },
});

/* About section — sequential reveal */
const aboutElements = document.querySelectorAll('.about-content > *');
gsap.from(aboutElements, {
  y: 30,
  opacity: 0,
  duration: 0.6,
  stagger: 0.15,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.about-content',
    start: 'top 85%',
    once: true,
  },
});

/* About image — fade in */
gsap.from('.about-image', {
  y: 30,
  opacity: 0,
  duration: 0.7,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.about-image',
    start: 'top 85%',
    once: true,
  },
});

/* Contact info — fade up */
gsap.from('.contact-info > *', {
  y: 30,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.contact-info',
    start: 'top 85%',
    once: true,
  },
});

/* Contact form — fade up */
gsap.from('.contact-form-wrapper', {
  y: 30,
  opacity: 0,
  duration: 0.6,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.contact-form-wrapper',
    start: 'top 85%',
    once: true,
  },
});

} else {
  /* GSAP not available — make hero content visible */
  document.querySelectorAll('.hero-content > *, .hero-scroll').forEach(el => {
    el.style.opacity = '1';
  });
}

/* ============================================================
   NAVBAR — transparent → frosted glass on scroll
   ============================================================ */
const navbar = document.getElementById('navbar');

function handleNavScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll(); // run once on load

/* ============================================================
   MOBILE NAV TOGGLE
   ============================================================ */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close on any nav link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

/* ============================================================
   PORTFOLIO — category filter
   ============================================================ */
const filterBtns    = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    portfolioCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});

/* ============================================================
   PORTFOLIO — YouTube thumbnail + lazy video embed
   ============================================================ */
portfolioCards.forEach(card => {
  const videoId  = (card.dataset.videoId || '').trim();
  const thumbImg = card.querySelector('.thumb-img');
  const playBtn  = card.querySelector('.play-btn');
  const thumbnail = card.querySelector('.card-thumbnail');

  // Load YouTube thumbnail only when videoId is real
  if (videoId && videoId !== 'YOUTUBE_VIDEO_ID') {
    // Try maxresdefault, fall back to hqdefault if it 404s
    const hq = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    const max = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    thumbImg.src = max;
    thumbImg.onerror = () => { thumbImg.src = hq; };
    thumbImg.alt = card.querySelector('.card-title')?.textContent || 'Video';
  }

  // On play click — replace thumbnail with autoplay iframe
  if (playBtn) {
    playBtn.addEventListener('click', e => {
      e.stopPropagation();

      if (!videoId || videoId === 'YOUTUBE_VIDEO_ID') {
        // Guide the user if they haven't set a video ID yet
        console.warn('[Nohea Media] Replace YOUTUBE_VIDEO_ID in index.html with your actual YouTube video ID.');
        return;
      }

      const iframe = document.createElement('iframe');
      iframe.className = 'card-iframe';
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&color=white`;
      iframe.title = card.querySelector('.card-title')?.textContent || 'Video';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;

      // Swap thumbnail for iframe
      thumbnail.innerHTML = '';
      thumbnail.appendChild(iframe);
    });
  }
});

/* ============================================================
   CONTACT FORM
   Uses Formspree by default (https://formspree.io — free tier)
   Or add data-netlify="true" to the form tag for Netlify Forms
   ============================================================ */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm && formSuccess) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.form-submit');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' },
      });

      if (response.ok) {
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
      } else {
        throw new Error(`Server responded with ${response.status}`);
      }
    } catch (err) {
      console.error('[Nohea Media] Form error:', err);
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      alert('Message could not be sent. Please email directly at hello@noheamedia.com');
    }
  });
}

/* ============================================================
   SMOOTH ACTIVE SECTION HIGHLIGHT (optional nav highlight)
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach(a => {
          a.classList.toggle('active-link', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));
