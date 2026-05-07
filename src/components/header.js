/**
 * Header Component
 */
export function renderHeader(t, currentPath) {
  const navLinks = [
    { path: '#/', key: 'home' },
    { path: '#/soshoku-sho', key: 'soshokuSho' },
    { path: '#/gemgraphy', key: 'gemgraphy' },
    { path: '#/beadsgraphy', key: 'beadsgraphy' },
    { path: '#/artist', key: 'artist' },
    { path: '#/gallery', key: 'gallery' },
    { path: '#/contact', key: 'contact' },
  ];

  const navHTML = navLinks
    .map(
      (link) =>
        `<a href="${link.path}" class="header__nav-link ${currentPath === link.path ? 'header__nav-link--active' : ''}">${t.nav[link.key]}</a>`
    )
    .join('');

  const mobileNavHTML = navLinks
    .map(
      (link) =>
        `<a href="${link.path}" class="mobile-nav__link">${t.nav[link.key]}</a>`
    )
    .join('');

  return `
    <div class="header__inner">
      <a href="#/" class="header__logo">Gemgraphy</a>
      <nav class="header__nav" id="desktop-nav">
        ${navHTML}
        <button class="header__lang-toggle" id="lang-toggle">${t.langToggle}</button>
      </nav>
      <button class="header__menu-btn" id="mobile-menu-btn" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  `;
}

/**
 * Render Mobile Navigation (separate from header to avoid backdrop-filter containing block)
 */
export function renderMobileNav(t, currentPath) {
  const navLinks = [
    { path: '#/', key: 'home' },
    { path: '#/soshoku-sho', key: 'soshokuSho' },
    { path: '#/gemgraphy', key: 'gemgraphy' },
    { path: '#/beadsgraphy', key: 'beadsgraphy' },
    { path: '#/artist', key: 'artist' },
    { path: '#/gallery', key: 'gallery' },
    { path: '#/contact', key: 'contact' },
  ];

  const mobileNavHTML = navLinks
    .map(
      (link) =>
        `<a href="${link.path}" class="mobile-nav__link">${t.nav[link.key]}</a>`
    )
    .join('');

  return `
    ${mobileNavHTML}
    <button class="header__lang-toggle" id="lang-toggle-mobile">${t.langToggle}</button>
  `;
}

/**
 * Initialize header scroll behavior
 */
export function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * Initialize mobile menu
 */
export function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (!btn || !mobileNav) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('header__menu-btn--open');
    mobileNav.classList.toggle('mobile-nav--open');
    document.body.style.overflow = mobileNav.classList.contains('mobile-nav--open') ? 'hidden' : '';
  });

  // Close mobile nav on link click
  mobileNav.querySelectorAll('.mobile-nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      btn.classList.remove('header__menu-btn--open');
      mobileNav.classList.remove('mobile-nav--open');
      document.body.style.overflow = '';
    });
  });
}
