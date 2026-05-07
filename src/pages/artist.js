/**
 * Artist Page — 認定作家
 * Extensible structure: each artist is rendered by renderArtistBlock().
 * Future artists can be added as additional blocks.
 */
export function renderArtist(t) {
  const a = t.artist;

  // Helper to convert \n to <br>
  const nl = (text) => (text || '').replace(/\n/g, '<br>');

  // --- Founder block (first artist) ---
  const founderBlock = `
    <section class="artist-block fade-in">
      <div class="container container--narrow">
        <div class="artist-block__header">
          <p class="text-overline">${a.founderOverline}</p>
          <h2 class="heading-2 heading-jp artist-block__name">${a.founderName}</h2>
          <p class="artist-block__role">${a.founderRole}</p>
          <hr class="divider divider--center" />
        </div>
      </div>

      <!-- Portrait -->
      <div class="artist-portrait fade-in">
        <div class="artist-portrait__frame">
          <img src="https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=900&q=80" alt="${a.founderName}" loading="lazy" />
        </div>
      </div>

      <!-- Statement -->
      <div class="container container--narrow">
        <div class="artist-statement fade-in">
          <p class="artist-statement__paragraph">${nl(a.statement1)}</p>
          <p class="artist-statement__paragraph">${nl(a.statement2)}</p>
          <p class="artist-statement__paragraph">${nl(a.statement3)}</p>
          <p class="artist-statement__paragraph">${nl(a.statement4)}</p>
          <p class="artist-statement__paragraph">${nl(a.statement5)}</p>
          <p class="artist-statement__paragraph artist-statement__paragraph--accent">${nl(a.statement6)}</p>
          <p class="artist-statement__paragraph">${nl(a.statement7)}</p>
          <p class="artist-statement__paragraph artist-statement__paragraph--accent">${nl(a.statement8)}</p>
        </div>
      </div>
    </section>
  `;

  // --- Certification section ---
  const certificationSection = `
    <section class="section section--alt">
      <div class="container container--narrow">
        <div class="section__header fade-in">
          <p class="text-overline">${a.certOverline}</p>
          <h2 class="heading-2 heading-jp">${a.certTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="prose fade-in">
          <p class="prose__paragraph">${nl(a.certBody1)}</p>
          <p class="prose__paragraph">${nl(a.certBody2)}</p>
        </div>
      </div>
    </section>
  `;

  // --- Closing section ---
  const closingSection = `
    <section class="section section--dark">
      <div class="container container--narrow text-center">
        <div class="fade-in">
          <p class="text-overline">${a.closingOverline}</p>
          <hr class="divider divider--center" style="margin-top: var(--space-lg);" />
          <div class="artist-closing">
            <p class="artist-closing__text">${nl(a.closingBody1)}</p>
            <p class="artist-closing__text">${nl(a.closingBody2)}</p>
          </div>
        </div>
      </div>
    </section>
  `;

  return `
    <!-- Hero -->
    <section class="hero hero--page hero--artist">
      <div class="hero__bg" style="background-image: url('https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1920&q=80');"></div>
      <div class="hero__overlay"></div>
      <div class="hero__content">
        <h1 class="hero__title" style="letter-spacing: 0.08em;">${a.heroTitle}</h1>
        <div class="hero__divider"></div>
        <p class="hero__lead">${nl(a.heroLead)}</p>
        <p class="hero__desc">${nl(a.heroDesc)}</p>
      </div>
    </section>

    <!-- Introduction -->
    <section class="section">
      <div class="container container--narrow">
        <div class="prose fade-in">
          <p class="prose__paragraph prose__paragraph--accent">${nl(a.introBody)}</p>
        </div>
      </div>
    </section>

    <!-- Founder -->
    ${founderBlock}

    <!-- Certification -->
    ${certificationSection}

    <!-- Closing -->
    ${closingSection}
  `;
}
