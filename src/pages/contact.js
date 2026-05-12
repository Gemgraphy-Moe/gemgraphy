/**
 * Contact Page
 */
export function renderContact(t) {
    const subjectOptions = Object.entries(t.contact.subjectOptions)
        .map(([value, label]) => `<option value="${value}">${label}</option>`)
        .join('');

    return `
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="page-hero__bg" style="background-image: url('${import.meta.env.BASE_URL}image/Contact/hero.JPG');"></div>
      <div class="hero__overlay"></div>
      <div class="page-hero__content">
        <h1 class="page-hero__title">${t.contact.heroTitle}</h1>
        <div class="hero__divider"></div>
        <p class="page-hero__subtitle">${t.contact.heroSubtitle}</p>
      </div>
    </section>

    <!-- Contact Form -->
    <section class="section">
      <div class="container container--narrow">
        <div class="text-center fade-in" style="margin-bottom: var(--space-2xl);">
          <p class="text-overline">${t.contact.overline}</p>
          <h2 class="heading-2">${t.contact.title}</h2>
          <hr class="divider divider--center" />
          <p class="text-body">${t.contact.desc}</p>
        </div>

        <div id="contact-success" style="display:none; text-align:center; padding: var(--space-xl) 0;">
          <p class="text-body">お問い合わせありがとうございます。<br>内容を確認後、ご連絡いたします。</p>
        </div>
        <form class="contact-form fade-in" id="contact-form">
          <div class="form-group">
            <label for="contact-name">${t.contact.labelName}</label>
            <input type="text" id="contact-name" name="name" required />
          </div>
          <div class="form-group">
            <label for="contact-email">${t.contact.labelEmail}</label>
            <input type="email" id="contact-email" name="email" required />
          </div>
          <div class="form-group">
            <label for="contact-subject">${t.contact.labelSubject}</label>
            <select id="contact-subject" name="subject">
              ${subjectOptions}
            </select>
          </div>
          <div class="form-group">
            <label for="contact-message">${t.contact.labelMessage}</label>
            <textarea id="contact-message" name="message" required></textarea>
          </div>
          <div class="text-center">
            <button type="submit" class="cta-btn">${t.contact.submit}</button>
          </div>
        </form>
      </div>
    </section>
  `;
}
