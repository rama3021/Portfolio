/* ===================================================
   Ramalakshmi J – Portfolio  |  script.js  v3
   =================================================== */

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── Hamburger menu ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── Scroll-triggered entrance animations ── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.10, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

/* ── Profile image fallback ── */
const profileImg      = document.getElementById('profileImg');
const profileFallback = document.getElementById('profileFallback');
if (profileImg) {
  profileImg.addEventListener('error', () => {
    profileImg.style.display      = 'none';
    profileFallback.style.display = 'flex';
  });
}

/* ── Active nav link on scroll ── */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

/* ── Lightbox ── */
const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

function openLightbox(src, caption) {
  lightboxImg.src        = src;
  lightboxImg.alt        = caption;
  lightboxCaption.textContent = caption;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { lightboxImg.src = ''; }, 300);
}

// Close lightbox on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

/* ── Contact form (demo handler) ── */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn     = e.target.querySelector('.form-submit');
  const success = document.getElementById('formSuccess');

  btn.disabled   = true;
  btn.innerHTML  = '<i class="fas fa-spinner fa-spin"></i> Sending…';

  // Simulate async send (replace with real backend / EmailJS)
  setTimeout(() => {
    btn.innerHTML  = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.disabled   = false;
    success.classList.add('show');
    e.target.reset();
    setTimeout(() => success.classList.remove('show'), 5000);
  }, 1500);
}
