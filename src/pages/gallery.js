/**
 * Gallery Page
 */
export function renderGallery(t) {
  // Placeholder gallery images
  const images = [
    { src: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80', alt: 'Work 1', class: '' },
    { src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80', alt: 'Work 2', class: 'gallery-grid__item--tall' },
    { src: 'https://images.unsplash.com/photo-1551913902-c92207136625?w=800&q=80', alt: 'Work 3', class: '' },
    { src: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=800&q=80', alt: 'Work 4', class: 'gallery-grid__item--wide' },
    { src: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80', alt: 'Work 5', class: '' },
    { src: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80', alt: 'Work 6', class: '' },
    { src: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800&q=80', alt: 'Work 7', class: '' },
    { src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80', alt: 'Work 8', class: '' },
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', alt: 'Work 9', class: '' },
  ];

  const gridItems = images
    .map(
      (img, i) =>
        `<div class="gallery-grid__item ${img.class} fade-in fade-in--delay-${(i % 4) + 1}" data-gallery-index="${i}">
          <img src="${img.src}" alt="${img.alt}" loading="lazy" />
        </div>`
    )
    .join('');

  return `
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="page-hero__bg" style="background-image: url('https://images.unsplash.com/photo-1551913902-c92207136625?w=1920&q=80');"></div>
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

    <!-- Gallery Grid -->
    <section style="padding-bottom: var(--space-section);">
      <div class="container">
        <div class="gallery-grid" id="gallery-grid">
          ${gridItems}
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
    const item = e.target.closest('.gallery-grid__item');
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
