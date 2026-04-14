const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const langButtons = document.querySelectorAll('.lang-btn');
const translatable = document.querySelectorAll('[data-en][data-sw]');

function setLanguage(lang) {
  translatable.forEach(el => {
    el.style.opacity = '0';
  });

  setTimeout(() => {
    translatable.forEach(el => {
      const text = el.dataset[lang];
      if (text !== undefined) {
        el.innerHTML = text;
      }
      el.style.opacity = '1';
    });
  }, 80);

  document.documentElement.lang = lang === 'sw' ? 'sw' : 'en';
  localStorage.setItem('preferredLang', lang);
  langButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
}

langButtons.forEach(button => {
  button.addEventListener('click', () => {
    setLanguage(button.dataset.lang);
  });
});

const savedLang = localStorage.getItem('preferredLang') === 'sw' ? 'sw' : 'en';
setLanguage(savedLang);

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 0.08}s`;
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));
