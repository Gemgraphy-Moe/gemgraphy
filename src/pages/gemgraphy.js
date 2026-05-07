/**
 * Gemgraphy Page — Full Content
 */
export function renderGemgraphy(t) {
  const g = t.gemgraphy;

  // Helper to convert \n to <br>
  const nl = (text) => text.replace(/\n/g, '<br>');

  // Value cards (5 items)
  const values = [
    { title: g.value1Title, desc: g.value1Desc },
    { title: g.value2Title, desc: g.value2Desc },
    { title: g.value3Title, desc: g.value3Desc },
    { title: g.value4Title, desc: g.value4Desc },
    { title: g.value5Title, desc: g.value5Desc },
  ];

  const valueCards = values
    .map(
      (v, i) => `
      <div class="feature-card fade-in fade-in--delay-${i + 1}">
        <h3 class="feature-card__title">${v.title}</h3>
        <hr class="divider" />
        <p class="feature-card__desc text-body">${nl(v.desc)}</p>
      </div>`
    )
    .join('');

  // Materials list
  const materialsItems = g.materialsList
    .map((item) => `<li class="expand-list__item">${item}</li>`)
    .join('');

  // For You list
  const forItems = g.forList
    .map((item) => `<li class="expand-list__item">${item}</li>`)
    .join('');

  // Usage examples
  const usageItems = g.forUsages
    .map((item) => `<li class="expand-list__item">${item}</li>`)
    .join('');

  return `
    <!-- Hero -->
    <section class="hero hero--page">
      <div class="hero__bg" style="background-image: url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&q=80');"></div>
      <div class="hero__overlay"></div>
      <div class="hero__content">
        <h1 class="hero__title" style="font-family: var(--font-en); letter-spacing: 0.2em;">${g.heroTitle}</h1>
        <div class="hero__divider"></div>
        <p class="hero__lead">${nl(g.heroSub)}</p>
        <p class="hero__desc">${g.heroSub2}</p>
        <a href="#/contact" class="cta-btn" style="margin-top: var(--space-xl); border-color: var(--color-accent-light); color: var(--color-text-on-dark); opacity: 0; animation: heroFadeIn 1s ease-out 1.4s forwards;">${g.heroCta}</a>
      </div>
    </section>

    <!-- Gemgraphyとは -->
    <section class="section">
      <div class="container container--narrow">
        <div class="section__header fade-in">
          <p class="text-overline">${g.whatOverline}</p>
          <h2 class="heading-2 heading-jp">${g.whatTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="prose fade-in">
          <p class="prose__paragraph">${g.whatBody1}</p>
          <p class="prose__paragraph">${g.whatBody2}</p>
          <p class="prose__paragraph prose__paragraph--accent">${g.whatBody3}</p>
        </div>
      </div>
    </section>

    <!-- Photo Break -->
    <section class="photo-break fade-in">
      <div class="photo-break__image">
        <img src="https://images.unsplash.com/photo-1551913902-c92207136625?w=1600&q=80" alt="Gemgraphy" loading="lazy" />
      </div>
    </section>

    <!-- 大切にしていること -->
    <section class="section section--alt">
      <div class="container">
        <div class="section__header fade-in">
          <p class="text-overline">${g.valuesOverline}</p>
          <h2 class="heading-2 heading-jp">${g.valuesTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="feature-grid feature-grid--gemgraphy">
          ${valueCards}
        </div>
      </div>
    </section>

    <!-- 素材と表現 -->
    <section class="section">
      <div class="container">
        <div class="content-block fade-in">
          <div class="content-block__image">
            <img src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80" alt="素材と表現" loading="lazy" />
          </div>
          <div class="content-block__text">
            <p class="text-overline">${g.materialsOverline}</p>
            <h2 class="heading-2 heading-jp">${g.materialsTitle}</h2>
            <hr class="divider" />
            <p class="text-body" style="margin-bottom: var(--space-lg);">${g.materialsDesc}</p>
            <ul class="expand-list" style="text-align: left;">
              ${materialsItems}
            </ul>
            <p class="text-body" style="margin-top: var(--space-lg);">${g.materialsClosing}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 制作のプロセス -->
    <section class="section section--alt">
      <div class="container container--narrow">
        <div class="section__header fade-in">
          <p class="text-overline">${g.processOverline}</p>
          <h2 class="heading-2 heading-jp">${g.processTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="prose fade-in">
          <p class="prose__paragraph">${g.processBody1}</p>
          <p class="prose__paragraph">${nl(g.processBody2)}</p>
          <p class="prose__paragraph prose__paragraph--accent">${g.processBody3}</p>
        </div>
      </div>
    </section>

    <!-- Photo Break -->
    <section class="photo-break fade-in">
      <div class="photo-break__image">
        <img src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1600&q=80" alt="制作" loading="lazy" />
      </div>
    </section>

    <!-- 制作について -->
    <section class="section section--dark">
      <div class="container container--narrow text-center">
        <div class="fade-in">
          <p class="text-overline">${g.craftOverline}</p>
          <h2 class="heading-2 heading-jp" style="margin-bottom: var(--space-lg);">${g.craftTitle}</h2>
          <p class="text-body" style="max-width: 640px; margin: 0 auto var(--space-lg);">${nl(g.craftBody1)}</p>
          <p class="text-body" style="max-width: 640px; margin: 0 auto;">${g.craftBody2}</p>
        </div>
      </div>
    </section>

    <!-- 光と空間の中で -->
    <section class="section">
      <div class="container container--narrow">
        <div class="section__header fade-in">
          <p class="text-overline">${g.lightOverline}</p>
          <h2 class="heading-2 heading-jp">${g.lightTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="prose fade-in">
          <p class="prose__paragraph">${g.lightBody1}</p>
          <p class="prose__paragraph">${g.lightBody2}</p>
          <p class="prose__paragraph prose__paragraph--accent">${g.lightBody3}</p>
        </div>
      </div>
    </section>

    <!-- こんな方へ -->
    <section class="section section--alt">
      <div class="container container--narrow">
        <div class="section__header fade-in">
          <p class="text-overline">${g.forOverline}</p>
          <h2 class="heading-2 heading-jp">${g.forTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="prose fade-in">
          <ul class="expand-list">
            ${forItems}
          </ul>
          <p class="prose__paragraph" style="margin-top: var(--space-xl); font-weight: 500; color: var(--color-text);">${g.forUsagesTitle}</p>
          <ul class="expand-list">
            ${usageItems}
          </ul>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section section--dark">
      <div class="container container--narrow text-center fade-in">
        <h2 class="heading-2 heading-jp" style="margin-bottom: var(--space-lg);">${g.ctaTitle}</h2>
        <p class="text-body" style="max-width: 600px; margin: 0 auto var(--space-xl);">${g.ctaBody}</p>
        <a href="#/contact" class="cta-btn">${g.ctaLink}</a>
      </div>
    </section>
  `;
}
