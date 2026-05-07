/**
 * Beadsgraphy Page — Full Content
 */
export function renderBeadsgraphy(t) {
  const b = t.beadsgraphy;

  // Helper to convert \n to <br>
  const nl = (text) => text.replace(/\n/g, '<br>');

  // Appeal cards (4 items)
  const appeals = [
    { title: b.appeal1Title, desc: b.appeal1Desc },
    { title: b.appeal2Title, desc: b.appeal2Desc },
    { title: b.appeal3Title, desc: b.appeal3Desc },
    { title: b.appeal4Title, desc: b.appeal4Desc },
  ];

  const appealCards = appeals
    .map(
      (a, i) => `
      <div class="feature-card fade-in fade-in--delay-${i + 1}">
        <h3 class="feature-card__title">${a.title}</h3>
        <hr class="divider" />
        <p class="feature-card__desc text-body">${nl(a.desc)}</p>
      </div>`
    )
    .join('');

  // Flow steps
  const flowItems = b.flowSteps
    .map((step, i) => `<li class="expand-list__item">${step}</li>`)
    .join('');

  // For You list
  const forItems = b.forList
    .map((item) => `<li class="expand-list__item">${item}</li>`)
    .join('');

  // Scenes list
  const sceneItems = b.scenesList
    .map((item) => `<li class="expand-list__item">${item}</li>`)
    .join('');

  // Hero title sub (Japanese: ビーズグラフィー, English: empty)
  const titleSub = b.heroTitleSub
    ? `<p class="text-overline" style="margin-bottom: var(--space-sm); color: var(--color-accent-light);">${b.heroTitleSub}</p>`
    : '';

  return `
    <!-- Hero -->
    <section class="hero hero--page">
      <div class="hero__bg" style="background-image: url('https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=1920&q=80');"></div>
      <div class="hero__overlay"></div>
      <div class="hero__content">
        ${titleSub}
        <h1 class="hero__title" style="font-family: var(--font-en); letter-spacing: 0.2em;">${b.heroTitle}</h1>
        <div class="hero__divider"></div>
        <p class="hero__lead">${b.heroSub}</p>
        <p class="hero__desc">${nl(b.heroSub2)}</p>
      </div>
    </section>

    <!-- Beadsgraphyとは -->
    <section class="section">
      <div class="container container--narrow">
        <div class="section__header fade-in">
          <p class="text-overline">${b.whatOverline}</p>
          <h2 class="heading-2 heading-jp">${b.whatTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="prose fade-in">
          <p class="prose__paragraph">${b.whatBody1}</p>
          <p class="prose__paragraph">${nl(b.whatBody2)}</p>
          <p class="prose__paragraph prose__paragraph--accent">${nl(b.whatBody3)}</p>
        </div>
      </div>
    </section>

    <!-- Photo Break -->
    <section class="photo-break fade-in">
      <div class="photo-break__image">
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80" alt="Beadsgraphy" loading="lazy" />
      </div>
    </section>

    <!-- 魅力 -->
    <section class="section section--alt">
      <div class="container">
        <div class="section__header fade-in">
          <p class="text-overline">${b.appealOverline}</p>
          <h2 class="heading-2 heading-jp">${b.appealTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="feature-grid">
          ${appealCards}
        </div>
      </div>
    </section>

    <!-- 体験の流れ -->
    <section class="section">
      <div class="container container--narrow">
        <div class="section__header fade-in">
          <p class="text-overline">${b.flowOverline}</p>
          <h2 class="heading-2 heading-jp">${b.flowTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="prose fade-in">
          <p class="prose__paragraph">${b.flowDesc}</p>
          <ul class="expand-list" style="margin: var(--space-xl) 0;">
            ${flowItems}
          </ul>
          <p class="prose__paragraph prose__paragraph--accent">${nl(b.flowClosing)}</p>
        </div>
      </div>
    </section>

    <!-- Photo Break -->
    <section class="photo-break fade-in">
      <div class="photo-break__image">
        <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&q=80" alt="制作の風景" loading="lazy" />
      </div>
    </section>

    <!-- Gemgraphyとの関係 -->
    <section class="section">
      <div class="container container--narrow">
        <div class="section__header fade-in">
          <p class="text-overline">${b.relationOverline}</p>
          <h2 class="heading-2 heading-jp">${b.relationTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="prose fade-in">
          <p class="prose__paragraph">${b.relationBody1}</p>
          <p class="prose__paragraph">${nl(b.relationBody2)}</p>
          <p class="prose__paragraph prose__paragraph--accent">${nl(b.relationBody3)}</p>
          <div style="text-align: center; margin-top: var(--space-lg);">
            <a href="#/gemgraphy" class="cta-link">${b.relationLink} →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- こんな方へ & 活用シーン -->
    <section class="section section--alt">
      <div class="container">
        <div class="content-block fade-in">
          <div class="content-block__text" style="flex: 1;">
            <p class="text-overline">${b.forOverline}</p>
            <h2 class="heading-2 heading-jp">${b.forTitle}</h2>
            <hr class="divider" />
            <ul class="expand-list" style="text-align: left;">
              ${forItems}
            </ul>
          </div>
          <div class="content-block__text" style="flex: 1;">
            <p class="text-overline">${b.scenesOverline}</p>
            <h2 class="heading-2 heading-jp">${b.scenesTitle}</h2>
            <hr class="divider" />
            <ul class="expand-list" style="text-align: left;">
              ${sceneItems}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 表現の広がり -->
    <section class="section section--dark">
      <div class="container container--narrow text-center">
        <div class="fade-in">
          <p class="text-overline">${b.expandOverline}</p>
          <h2 class="heading-2 heading-jp" style="margin-bottom: var(--space-lg);">${b.expandTitle}</h2>
          <p class="text-body" style="max-width: 640px; margin: 0 auto var(--space-md);">${nl(b.expandBody1)}</p>
          <p class="text-body" style="max-width: 640px; margin: 0 auto;">${nl(b.expandBody2)}</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container container--narrow text-center fade-in">
        <h2 class="heading-2 heading-jp" style="margin-bottom: var(--space-lg);">${b.ctaTitle}</h2>
        <p class="text-body" style="max-width: 600px; margin: 0 auto var(--space-xl);">${b.ctaBody}</p>
        <a href="#/contact" class="cta-btn">${b.ctaLink}</a>
      </div>
    </section>
  `;
}
