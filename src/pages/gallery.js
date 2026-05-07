/**
 * Gallery Page — Year-grouped layout
 */
export function renderGallery(t) {
  const base = import.meta.env.BASE_URL;

  const galleryData = [
    { year: 2026, files: ['2026-01.JPG', '2026-02.JPG', '2026-03.jpg'] },
    { year: 2025, files: ['2025-01.JPG', '2025-02.jpg', '2025-03.jpg', '2025-04.jpg', '2025-05.jpeg', '2025-06.jpg', '2025-07.jpg', '2025-08.JPG'] },
    { year: 2024, files: ['2024-01.jpg', '2024-02.jpg', '2024-03.jpg', '2024-04.JPEG', '2024-05.JPG', '2024-06.jpg', '2024-07.JPG', '2024-08.jpg', '2024-09.jpg', '2024-10.jpg'] },
    { year: 2023, files: ['2023-01.jpg', '2023-02.jpg', '2023-03.JPG', '2023-04.jpg', '2023-05.JPG', '2023-06.JPG', '2023-07.JPG', '2023-08.jpg'] },
    { year: 2022, files: ['2022-01.JPG', '2022-02.JPG', '2022-03.JPG'] },
    { year: 2019, files: ['2019-01.JPG'] },
    { year: 2018, files: ['2018-01.jpg'] },
    { year: 2016, files: ['2016-01.PNG'] },
    { year: 2015, files: ['2015-01.JPG', '2015-02.JPG', '2015-03.JPG', '2015-04.JPG', '2015-05.JPG', '2015-06.JPG', '2015-07.JPG', '2015-08.JPG', '2015-09.JPG', '2015-10.JPG', '2015-11.JPG'] },
  ];

  const yearSections = galleryData.map(({ year, files }) => {
    const items = files
      .map(
        (file, i) =>
          `<div class="gallery-year__item fade-in fade-in--delay-${(i % 4) + 1}">
            <img src="${base}image/Gallery/${file}" alt="${year}" loading="lazy" />
          </div>`
      )
      .join('');

    return `
      <div class="gallery-year">
        <div class="gallery-year__header fade-in">
          <p class="text-overline">Works</p>
          <h2 class="gallery-year__title">${year}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="gallery-year__grid" data-count="${Math.min(files.length, 3)}">
          ${items}
        </div>
      </div>
    `;
  }).join('');

  return `
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="page-hero__bg" style="background-image: url('${base}image/Gallery/Hero.JPEG');"></div>
      <div class="hero__overlay"></div>
      <div class="page-hero__content">
        <h1 class="page-hero__title">${t.gallery.heroTitle}</h1>
        <p class="page-hero__subtitle">${t.gallery.heroSubtitle}</p>
      </div>
    </section>

    <!-- Gallery Header -->
    <section class="section" style="padding-bottom: var(--space-xl);">
      <div class="container text-center fade-in">
        <p class="text-overline">${t.gallery.overline}</p>
        <h2 class="heading-2">${t.gallery.title}</h2>
        <hr class="divider divider--center" />
        <p class="text-body" style="max-width: 540px; margin: 0 auto;">${t.gallery.desc}</p>
      </div>
    </section>

    <!-- Gallery by Year -->
    <section style="padding-bottom: var(--space-section);">
      <div class="container">
        <div class="gallery-years" id="gallery-grid">
          ${yearSections}
        </div>
      </div>
    </section>

    <!-- Gallery Modal -->
    <div class="gallery-modal" id="gallery-modal">
      <button class="gallery-modal__close" id="gallery-modal-close">✕</button>
      <img class="gallery-modal__img" id="gallery-modal-img" src="" alt="" />
    </div>
  `;
}

/**
 * Initialize gallery modal behavior
 */
export function initGallery() {
  const grid = document.getElementById('gallery-grid');
  const modal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('gallery-modal-img');
  const closeBtn = document.getElementById('gallery-modal-close');

  if (!grid || !modal) return;

  grid.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-year__item');
    if (!item) return;

    const img = item.querySelector('img');
    if (!img) return;

    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modal.classList.add('gallery-modal--open');
    document.body.style.overflow = 'hidden';
  });

  const closeModal = () => {
    modal.classList.remove('gallery-modal--open');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}
