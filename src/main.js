/**
 * Gemgraphy — Main Entry Point
 * Hash-based SPA router + i18n
 */

import { renderHeader, renderMobileNav, initHeaderScroll, initMobileMenu } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { initFadeIn } from './components/fade-in.js';
import { renderHome } from './pages/home.js';
import { renderSoshokuSho } from './pages/soshoku-sho.js';
import { renderGemgraphy } from './pages/gemgraphy.js';
import { renderBeadsgraphy } from './pages/beadsgraphy.js';
import { renderArtist } from './pages/artist.js';
import { renderGallery, initGallery } from './pages/gallery.js';
import { renderContact } from './pages/contact.js';

// --- State ---
let currentLang = localStorage.getItem('gemgraphy-lang') || 'ja';
let translations = {};

// --- Route Map ---
const routes = {
  '#/': renderHome,
  '#/soshoku-sho': renderSoshokuSho,
  '#/gemgraphy': renderGemgraphy,
  '#/beadsgraphy': renderBeadsgraphy,
  '#/artist': renderArtist,
  '#/gallery': renderGallery,
  '#/contact': renderContact,
};

// --- i18n ---
async function loadTranslations(lang) {
  try {
    const base = import.meta.env.BASE_URL;
    const response = await fetch(`${base}locales/${lang}.json`);
    translations = await response.json();
  } catch (e) {
    console.error('Failed to load translations:', e);
  }
}

function toggleLang() {
  currentLang = currentLang === 'ja' ? 'en' : 'ja';
  localStorage.setItem('gemgraphy-lang', currentLang);
  document.documentElement.setAttribute('data-lang', currentLang);
  document.documentElement.setAttribute('lang', currentLang);
  loadTranslations(currentLang).then(() => renderPage());
}

// --- Router ---
function getCurrentPath() {
  return window.location.hash || '#/';
}

function renderPage() {
  const path = getCurrentPath();
  const renderFn = routes[path] || renderHome;

  // Update document title
  document.title = translations.site?.title || 'Gemgraphy';

  // Update header
  const headerEl = document.getElementById('site-header');
  if (headerEl) {
    headerEl.className = 'header';
    headerEl.innerHTML = renderHeader(translations, path);
    initHeaderScroll();

    // Bind desktop language toggle
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) langToggle.addEventListener('click', toggleLang);
  }

  // Update mobile navigation (separate from header to avoid backdrop-filter issue)
  const mobileNavEl = document.getElementById('mobile-nav');
  if (mobileNavEl) {
    mobileNavEl.innerHTML = renderMobileNav(translations, path);
    initMobileMenu();

    // Bind mobile language toggle
    const langToggleMobile = document.getElementById('lang-toggle-mobile');
    if (langToggleMobile) langToggleMobile.addEventListener('click', toggleLang);
  }

  // Update main content with page transition
  const contentEl = document.getElementById('page-content');
  if (contentEl) {
    contentEl.className = 'page-transition';
    contentEl.innerHTML = renderFn(translations);

    // Trigger page transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        contentEl.classList.add('page-transition--visible');
      });
    });

    // Initialize page-specific features
    if (path === '#/gallery') {
      initGallery();
    }

    // Initialize fade-in animations
    initFadeIn();
  }

  // Update footer
  const footerEl = document.getElementById('site-footer');
  if (footerEl) {
    footerEl.className = 'footer';
    footerEl.innerHTML = renderFooter(translations);
  }

  // Scroll to top on page change
  window.scrollTo(0, 0);
}

// --- Init ---
async function init() {
  document.documentElement.setAttribute('data-lang', currentLang);
  document.documentElement.setAttribute('lang', currentLang);
  await loadTranslations(currentLang);
  renderPage();
}

// Listen for hash changes
window.addEventListener('hashchange', renderPage);

// Start the app
init();
