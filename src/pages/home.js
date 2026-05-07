/**
 * Home Page
 */
export function renderHome(t) {
  return `
    <!-- Hero -->
    <section class="hero">
      <div class="hero__bg" style="background-image: url('https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1920&q=80');"></div>
      <div class="hero__overlay"></div>
      <div class="hero__content">
        <h1 class="hero__title hero__title--jp">${t.hero.title}</h1>
        <div class="hero__divider"></div>
        <p class="hero__subtitle">${t.hero.subtitle}</p>
      </div>
      <div class="hero__scroll-indicator">
        <span>${t.hero.scroll}</span>
        <div class="hero__scroll-line"></div>
      </div>
    </section>

    <!-- Introduction -->
    <section class="section">
      <div class="container">
        <div class="section__header fade-in">
          <p class="text-overline">${t.home.introOverline}</p>
          <h2 class="heading-2 heading-jp">${t.home.introTitle}</h2>
          <hr class="divider divider--center" />
          <div style="max-width: 640px; margin: 0 auto;">
            <p class="text-body" style="margin-bottom: var(--space-md);">${t.home.introDesc1.replace(/\n/g, '<br>')}</p>
            <p class="text-body" style="margin-bottom: var(--space-md);">${t.home.introDesc2.replace(/\n/g, '<br>')}</p>
            <p class="text-body">${t.home.introDesc3}</p>
          </div>
        </div>

        <!-- Three Pillars -->
        <div class="pillars">
          <a href="#/soshoku-sho" class="pillar fade-in fade-in--delay-1">
            <div class="pillar__image-wrap">
              <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80" alt="装飾書" />
            </div>
            <p class="text-overline pillar__overline">${t.home.pillar1Overline}</p>
            <h3 class="heading-3 pillar__title">${t.home.pillar1Title}</h3>
            <p class="text-body pillar__desc">${t.home.pillar1Desc}</p>
          </a>
          <a href="#/gemgraphy" class="pillar fade-in fade-in--delay-2">
            <div class="pillar__image-wrap">
              <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80" alt="Gemgraphy" />
            </div>
            <p class="text-overline pillar__overline">${t.home.pillar2Overline}</p>
            <h3 class="heading-3 pillar__title">${t.home.pillar2Title}</h3>
            <p class="text-body pillar__desc">${t.home.pillar2Desc}</p>
          </a>
          <a href="#/beadsgraphy" class="pillar fade-in fade-in--delay-3">
            <div class="pillar__image-wrap">
              <img src="https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=600&q=80" alt="Beadsgraphy" />
            </div>
            <p class="text-overline pillar__overline">${t.home.pillar3Overline}</p>
            <h3 class="heading-3 pillar__title">${t.home.pillar3Title}</h3>
            <p class="text-body pillar__desc">${t.home.pillar3Desc}</p>
          </a>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section section--dark">
      <div class="container text-center fade-in">
        <p class="text-overline" style="margin-bottom: var(--space-md);">Contact</p>
        <h2 class="heading-2 heading-en" style="margin-bottom: var(--space-lg);">${t.home.ctaText}</h2>
        <a href="#/contact" class="cta-btn">${t.nav.contact}</a>
      </div>
    </section>
  `;
}
