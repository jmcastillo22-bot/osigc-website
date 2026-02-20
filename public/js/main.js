// OSI Global Consulting - Main JavaScript

'use strict';

// ===== Header Scroll Effect =====
const header = document.querySelector('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ===== Mobile Menu =====
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mobileMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== Scroll Animations =====
const animateOnScroll = () => {
  const els = document.querySelectorAll('.service-card, .value-card, .stat-card, .about-text');
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('animate-in'); obs.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
};

// ===== Counter Animation for Stats =====
const animateCounters = () => {
  const counters = document.querySelectorAll('[data-count]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current + suffix;
          if (current >= target) clearInterval(timer);
        }, 25);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
};

// ===== Contact Form Handler =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = contactForm.querySelector('[type="submit"]');
    const data = new FormData(contactForm);
    btn.disabled = true;
    btn.textContent = 'Sending...';
    try {
      const res = await fetch(contactForm.action, {
        method: 'POST', body: data, headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        contactForm.innerHTML = '<div class="form-success"><h3>Thank you!</h3><p>Your message has been received. We will be in touch shortly.</p></div>';
      } else throw new Error();
    } catch {
      btn.disabled = false;
      btn.textContent = 'Send Message';
      const err = Object.assign(document.createElement('p'), { className: 'form-error', textContent: 'Something went wrong. Please email us directly.' });
      contactForm.appendChild(err);
    }
  });
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();
  animateCounters();
  console.log('OSI Global Consulting site loaded');
});
