/**
 * Footer Component
 */
export function renderFooter(t) {
    return `
    <div class="container">
      <div class="footer__inner">
        <div>
          <div class="footer__brand">Gemgraphy</div>
          <p class="footer__desc">${t.footer.desc}</p>
        </div>
        <div>
          <div class="footer__heading">${t.footer.navHeading}</div>
          <a href="#/" class="footer__link">${t.nav.home}</a>
          <a href="#/soshoku-sho" class="footer__link">${t.nav.soshokuSho}</a>
          <a href="#/gemgraphy" class="footer__link">${t.nav.gemgraphy}</a>
          <a href="#/beadsgraphy" class="footer__link">${t.nav.beadsgraphy}</a>
          <a href="#/gallery" class="footer__link">${t.nav.gallery}</a>
        </div>
        <div>
          <div class="footer__heading">${t.footer.contactHeading}</div>
          <a href="#/contact" class="footer__link">${t.nav.contact}</a>
          <a href="mailto:${t.footer.email}" class="footer__link">${t.footer.email}</a>
        </div>
      </div>
      <div class="footer__bottom">
        <span class="footer__copyright">${t.footer.copyright}</span>
      </div>
    </div>
  `;
}
