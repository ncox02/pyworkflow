// Mobile nav toggle
function toggleMobileNav() {
  const nav = document.getElementById('mobileNav');
  nav.classList.toggle('open');
}

// Close mobile nav on link click
document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('mobileNav').classList.remove('open');
  });
});

// Highlight active nav link based on current page
(function() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
})();

// Smooth scroll for TOC links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Fade-in sections on scroll
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.step-item, .pitfall-item, .ai-moment, .setup-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(el);
  });
}

// Theme toggle
const toggleBtn = document.getElementById('themeToggle');
const root = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
  toggleBtn.textContent = savedTheme === 'light' ? '🌙' : '☀️';
}

// Toggle theme
toggleBtn.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';

  if (next === 'dark') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', 'light');
  }

  toggleBtn.textContent = next === 'light' ? '🌙' : '☀️';
  localStorage.setItem('theme', next);
});
