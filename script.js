const header = document.getElementById('header');
const menuBtn = document.querySelector('.menu-btn');
const menuOverlay = document.querySelector('.menu-overlay');
const menuClose = document.querySelector('.menu-close');
const menuLinks = document.querySelectorAll('.menu-group a');

function openMenu() {
  menuOverlay.classList.add('open');
  menuOverlay.setAttribute('aria-hidden', 'false');
  menuBtn.classList.add('active');
  menuBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  menuOverlay.classList.remove('open');
  menuOverlay.setAttribute('aria-hidden', 'true');
  menuBtn.classList.remove('active');
  menuBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

menuBtn.addEventListener('click', () => {
  menuOverlay.classList.contains('open') ? closeMenu() : openMenu();
});

menuClose.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', (e) => {
  if (e.target === menuOverlay) closeMenu();
});

menuLinks.forEach(link => link.addEventListener('click', closeMenu));

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});

/* Hero Slider */
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDotsContainer = document.querySelector('.hero-dots');
const heroPrev = document.querySelector('.hero-prev');
const heroNext = document.querySelector('.hero-next');
let heroIndex = 0;
let heroTimer;

if (heroSlides.length && heroDotsContainer) {
  heroSlides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `${i + 1}번 슬라이드`);
    dot.addEventListener('click', () => goToHero(i));
    heroDotsContainer.appendChild(dot);
  });

  const heroDots = heroDotsContainer.querySelectorAll('.hero-dot');

  function goToHero(index) {
    heroSlides[heroIndex].classList.remove('active');
    heroDots[heroIndex].classList.remove('active');
    heroIndex = (index + heroSlides.length) % heroSlides.length;
    heroSlides[heroIndex].classList.add('active');
    heroDots[heroIndex].classList.add('active');
  }

  function nextHero() {
    goToHero(heroIndex + 1);
  }

  function startHeroTimer() {
    heroTimer = setInterval(nextHero, 5000);
  }

  function resetHeroTimer() {
    clearInterval(heroTimer);
    startHeroTimer();
  }

  heroPrev?.addEventListener('click', () => { goToHero(heroIndex - 1); resetHeroTimer(); });
  heroNext?.addEventListener('click', () => { goToHero(heroIndex + 1); resetHeroTimer(); });
  startHeroTimer();
}

/* Product Tabs */
document.querySelectorAll('.product-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const category = tab.dataset.category;
    document.querySelectorAll('.product-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.product-list').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.querySelector(`.product-list[data-panel="${category}"]`)?.classList.add('active');
  });
});

/* News Tabs */
document.querySelectorAll('.news-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const panel = tab.dataset.tab;
    document.querySelectorAll('.news-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.news-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.querySelector(`.news-panel[data-panel="${panel}"]`)?.classList.add('active');
  });
});

/* Scroll Animations */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
);

document.querySelectorAll(
  '.tile, .product-card, .about-stat, .vision-card, .news-item, .invest-card, .service-block, .section-head, .cta-inner'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});
