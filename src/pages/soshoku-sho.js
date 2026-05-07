/**
 * 装飾書 (Decorative Calligraphy) Page — Full Content
 */
export function renderSoshokuSho(t) {
  const s = t.soshokuSho;

  // Helper to convert \n to <br>
  const nl = (text) => text.replace(/\n/g, '<br>');

  // Feature cards
  const features = [
    { title: s.feat1Title, desc: s.feat1Desc },
    { title: s.feat2Title, desc: s.feat2Desc },
    { title: s.feat3Title, desc: s.feat3Desc },
    { title: s.feat4Title, desc: s.feat4Desc },
  ];

  const featureCards = features
    .map(
      (f, i) => `
      <div class="feature-card fade-in fade-in--delay-${i + 1}">
        <h3 class="feature-card__title">${f.title}</h3>
        <hr class="divider" />
        <p class="feature-card__desc text-body">${f.desc}</p>
      </div>`
    )
    .join('');

  // Expand list
  const expandItems = s.expandList
    .map((item) => `<li class="expand-list__item">${item}</li>`)
    .join('');

  // Culture values
  const cultureItems = s.cultureValues
    .map((item) => `<li class="culture-value">${item}</li>`)
    .join('');

  return `
    <!-- Hero — Extended with lead text -->
    <section class="hero hero--page">
      <div class="hero__bg" style="background-image: url('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1920&q=80');"></div>
      <div class="hero__overlay"></div>
      <div class="hero__content">
        <p class="text-overline" style="margin-bottom: var(--space-sm); color: var(--color-accent-light);">${s.heroSubtitle}</p>
        <h1 class="hero__title" style="letter-spacing: 0.08em;">${s.heroTitle}</h1>
        <div class="hero__divider"></div>
        <p class="hero__lead">${s.heroLead}</p>
        <p class="hero__desc">${nl(s.heroDesc)}</p>
      </div>
    </section>

    <!-- What is Decorative Calligraphy -->
    <section class="section">
      <div class="container container--narrow">
        <div class="section__header fade-in">
          <p class="text-overline">${s.whatOverline}</p>
          <h2 class="heading-2 heading-jp">${s.whatTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="prose fade-in">
          <p class="prose__paragraph">${nl(s.whatBody1)}</p>
          <p class="prose__paragraph">${nl(s.whatBody2)}</p>
          <p class="prose__paragraph">${nl(s.whatBody3)}</p>
          <p class="prose__paragraph prose__paragraph--accent">${nl(s.whatBody4)}</p>
        </div>
      </div>
    </section>

    <!-- Photo Break 1 -->
    <section class="photo-break fade-in">
      <div class="photo-break__image">
        <img src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1600&q=80" alt="装飾書の世界" loading="lazy" />
      </div>
    </section>

    <!-- Characteristics -->
    <section class="section section--alt">
      <div class="container">
        <div class="section__header fade-in">
          <p class="text-overline">${s.featOverline}</p>
          <h2 class="heading-2 heading-jp">${s.featTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="feature-grid">
          ${featureCards}
        </div>
      </div>
    </section>

    <!-- Expression System -->
    <section class="section">
      <div class="container container--narrow">
        <div class="section__header fade-in">
          <p class="text-overline">${s.systemOverline}</p>
          <h2 class="heading-2 heading-jp">${s.systemTitle}</h2>
          <hr class="divider divider--center" />
          <p class="text-body" style="max-width: 640px; margin: 0 auto;">${nl(s.systemDesc)}</p>
        </div>
      </div>
    </section>

    <!-- Gemgraphy subsection -->
    <section class="section section--dark">
      <div class="container">
        <div class="content-block fade-in">
          <div class="content-block__image">
            <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80" alt="Gemgraphy" loading="lazy" />
          </div>
          <div class="content-block__text">
            <p class="text-overline">Gemgraphy</p>
            <h3 class="heading-3">${s.gemgraphyTitle}</h3>
            <hr class="divider" />
            <p class="text-body">${nl(s.gemgraphyDesc)}</p>
            <a href="#/gemgraphy" class="cta-link">${s.linkGemgraphy} →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Beadsgraphy subsection -->
    <section class="section">
      <div class="container">
        <div class="content-block content-block--reverse fade-in">
          <div class="content-block__image">
            <img src="https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=800&q=80" alt="Beadsgraphy" loading="lazy" />
          </div>
          <div class="content-block__text">
            <p class="text-overline">Beadsgraphy</p>
            <h3 class="heading-3">${s.beadsgraphyTitle}</h3>
            <hr class="divider" />
            <p class="text-body">${nl(s.beadsgraphyDesc)}</p>
            <a href="#/beadsgraphy" class="cta-link">${s.linkBeadsgraphy} →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Photo Break 2 -->
    <section class="photo-break fade-in">
      <div class="photo-break__image">
        <img src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1600&q=80" alt="光と素材" loading="lazy" />
      </div>
    </section>

    <!-- In Space -->
    <section class="section">
      <div class="container container--narrow">
        <div class="section__header fade-in">
          <p class="text-overline">${s.spaceOverline}</p>
          <h2 class="heading-2 heading-jp">${s.spaceTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="prose fade-in">
          <p class="prose__paragraph">${nl(s.spaceBody1)}</p>
          <p class="prose__paragraph">${nl(s.spaceBody2)}</p>
          <p class="prose__paragraph prose__paragraph--accent">${nl(s.spaceBody3)}</p>
        </div>
      </div>
    </section>

    <!-- Expanding Expressions -->
    <section class="section section--alt">
      <div class="container container--narrow">
        <div class="section__header fade-in">
          <p class="text-overline">${s.expandOverline}</p>
          <h2 class="heading-2 heading-jp">${s.expandTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="prose fade-in">
          <p class="prose__paragraph">${nl(s.expandDesc)}</p>
          <ul class="expand-list">
            ${expandItems}
          </ul>
          <p class="prose__paragraph">${nl(s.expandClosing)}</p>
        </div>
      </div>
    </section>

    <!-- Cultural Expression -->
    <section class="section section--dark">
      <div class="container container--narrow text-center">
        <div class="fade-in">
          <p class="text-overline">${s.cultureOverline}</p>
          <h2 class="heading-2 heading-jp" style="margin-bottom: var(--space-lg);">${s.cultureTitle}</h2>
          <p class="text-body" style="max-width: 560px; margin: 0 auto var(--space-xl);">${nl(s.cultureBody)}</p>
          <ul class="culture-values">
            ${cultureItems}
          </ul>
          <p class="text-body" style="margin-top: var(--space-md);">${s.cultureClosing}</p>
        </div>
      </div>
    </section>

    <!-- Navigation Links -->
    <section class="section">
      <div class="container">
        <div class="nav-cards fade-in">
          <a href="#/gemgraphy" class="nav-card">
            <p class="text-overline">Gemgraphy</p>
            <h3 class="heading-3 heading-en">Gemgraphy</h3>
            <span class="nav-card__link">${s.learnMore} →</span>
          </a>
          <a href="#/beadsgraphy" class="nav-card">
            <p class="text-overline">Beadsgraphy</p>
            <h3 class="heading-3 heading-en">Beadsgraphy</h3>
            <span class="nav-card__link">${s.learnMore} →</span>
          </a>
        </div>
      </div>
    </section>
  `;
}
