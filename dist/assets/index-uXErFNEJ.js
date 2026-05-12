(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function s(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(t){if(t.ep)return;t.ep=!0;const i=s(t);fetch(t.href,i)}})();function y(a,e){const s=[{path:"#/",key:"home"},{path:"#/soshoku-sho",key:"soshokuSho"},{path:"#/gemgraphy",key:"gemgraphy"},{path:"#/beadsgraphy",key:"beadsgraphy"},{path:"#/artist",key:"artist"},{path:"#/gallery",key:"gallery"},{path:"#/contact",key:"contact"}],r=s.map(t=>`<a href="${t.path}" class="header__nav-link ${e===t.path?"header__nav-link--active":""}">${a.nav[t.key]}</a>`).join("");return s.map(t=>`<a href="${t.path}" class="mobile-nav__link">${a.nav[t.key]}</a>`).join(""),`
    <div class="header__inner">
      <a href="#/" class="header__logo">Gemgraphy</a>
      <nav class="header__nav" id="desktop-nav">
        ${r}
        <button class="header__lang-toggle" id="lang-toggle">${a.langToggle}</button>
      </nav>
      <button class="header__menu-btn" id="mobile-menu-btn" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  `}function u(a,e){return`
    ${[{path:"#/",key:"home"},{path:"#/soshoku-sho",key:"soshokuSho"},{path:"#/gemgraphy",key:"gemgraphy"},{path:"#/beadsgraphy",key:"beadsgraphy"},{path:"#/artist",key:"artist"},{path:"#/gallery",key:"gallery"},{path:"#/contact",key:"contact"}].map(t=>`<a href="${t.path}" class="mobile-nav__link">${a.nav[t.key]}</a>`).join("")}
    <button class="header__lang-toggle" id="lang-toggle-mobile">${a.langToggle}</button>
  `}function f(){const a=document.getElementById("site-header");if(!a)return;const e=()=>{window.scrollY>40?a.classList.add("header--scrolled"):a.classList.remove("header--scrolled")};window.addEventListener("scroll",e,{passive:!0}),e()}function $(){const a=document.getElementById("mobile-menu-btn"),e=document.getElementById("mobile-nav");!a||!e||(a.addEventListener("click",()=>{a.classList.toggle("header__menu-btn--open"),e.classList.toggle("mobile-nav--open"),document.body.style.overflow=e.classList.contains("mobile-nav--open")?"hidden":""}),e.querySelectorAll(".mobile-nav__link").forEach(s=>{s.addEventListener("click",()=>{a.classList.remove("header__menu-btn--open"),e.classList.remove("mobile-nav--open"),document.body.style.overflow=""})}))}function b(a){return`
    <div class="container">
      <div class="footer__inner">
        <div>
          <div class="footer__brand">Gemgraphy</div>
          <p class="footer__desc">${a.footer.desc}</p>
        </div>
        <div>
          <div class="footer__heading">${a.footer.navHeading}</div>
          <a href="#/" class="footer__link">${a.nav.home}</a>
          <a href="#/soshoku-sho" class="footer__link">${a.nav.soshokuSho}</a>
          <a href="#/gemgraphy" class="footer__link">${a.nav.gemgraphy}</a>
          <a href="#/beadsgraphy" class="footer__link">${a.nav.beadsgraphy}</a>
          <a href="#/gallery" class="footer__link">${a.nav.gallery}</a>
        </div>
        <div>
          <div class="footer__heading">${a.footer.contactHeading}</div>
          <a href="#/contact" class="footer__link">${a.nav.contact}</a>
          <a href="mailto:${a.footer.email}" class="footer__link">${a.footer.email}</a>
        </div>
      </div>
      <div class="footer__bottom">
        <span class="footer__copyright">${a.footer.copyright}</span>
      </div>
    </div>
  `}function x(){const a=document.querySelectorAll(".fade-in");if(!a.length)return;const e=new IntersectionObserver(s=>{s.forEach(r=>{r.isIntersecting&&(r.target.classList.add("fade-in--visible"),e.unobserve(r.target))})},{threshold:.15,rootMargin:"0px 0px -40px 0px"});a.forEach(s=>e.observe(s))}function m(a){return`
    <!-- Hero -->
    <section class="hero">
      <div class="hero__bg" style="background-image: url('/gemgraphy/image/top/hero.JPG');"></div>
      <div class="hero__overlay"></div>
      <div class="hero__content">
        <h1 class="hero__title hero__title--jp">${a.hero.title}</h1>
        <div class="hero__divider"></div>
        <p class="hero__subtitle">${a.hero.subtitle}</p>
      </div>
      <div class="hero__scroll-indicator">
        <span>${a.hero.scroll}</span>
        <div class="hero__scroll-line"></div>
      </div>
    </section>

    <!-- Introduction -->
    <section class="section">
      <div class="container">
        <div class="section__header fade-in">
          <p class="text-overline">${a.home.introOverline}</p>
          <h2 class="heading-2 heading-jp">${a.home.introTitle}</h2>
          <hr class="divider divider--center" />
          <div style="max-width: 640px; margin: 0 auto;">
            <p class="text-body" style="margin-bottom: var(--space-md);">${a.home.introDesc1.replace(/\n/g,"<br>")}</p>
            <p class="text-body" style="margin-bottom: var(--space-md);">${a.home.introDesc2.replace(/\n/g,"<br>")}</p>
            <p class="text-body">${a.home.introDesc3}</p>
          </div>
        </div>

        <!-- Three Pillars -->
        <div class="pillars">
          <a href="#/soshoku-sho" class="pillar fade-in fade-in--delay-1">
            <div class="pillar__image-wrap">
              <img src="/gemgraphy/image/top/soshoku-sho.JPG" alt="装飾書" />
            </div>
            <p class="text-overline pillar__overline">${a.home.pillar1Overline}</p>
            <h3 class="heading-3 pillar__title">${a.home.pillar1Title}</h3>
            <p class="text-body pillar__desc">${a.home.pillar1Desc}</p>
          </a>
          <a href="#/gemgraphy" class="pillar fade-in fade-in--delay-2">
            <div class="pillar__image-wrap">
              <img src="/gemgraphy/image/top/gemgraphy.JPG" alt="Gemgraphy" />
            </div>
            <p class="text-overline pillar__overline">${a.home.pillar2Overline}</p>
            <h3 class="heading-3 pillar__title">${a.home.pillar2Title}</h3>
            <p class="text-body pillar__desc">${a.home.pillar2Desc}</p>
          </a>
          <a href="#/beadsgraphy" class="pillar fade-in fade-in--delay-3">
            <div class="pillar__image-wrap">
              <img src="/gemgraphy/image/top/beadsgraphy.JPEG" alt="Beadsgraphy" />
            </div>
            <p class="text-overline pillar__overline">${a.home.pillar3Overline}</p>
            <h3 class="heading-3 pillar__title">${a.home.pillar3Title}</h3>
            <p class="text-body pillar__desc">${a.home.pillar3Desc}</p>
          </a>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section section--dark">
      <div class="container text-center fade-in">
        <p class="text-overline" style="margin-bottom: var(--space-md);">Contact</p>
        <h2 class="heading-2 heading-en" style="margin-bottom: var(--space-lg);">${a.home.ctaText}</h2>
        <a href="#/contact" class="cta-btn">${a.nav.contact}</a>
      </div>
    </section>
  `}function k(a){const e=a.soshokuSho,s=n=>n.replace(/\n/g,"<br>"),t=[{title:e.feat1Title,desc:e.feat1Desc},{title:e.feat2Title,desc:e.feat2Desc},{title:e.feat3Title,desc:e.feat3Desc},{title:e.feat4Title,desc:e.feat4Desc}].map((n,p)=>`
      <div class="feature-card fade-in fade-in--delay-${p+1}">
        <h3 class="feature-card__title">${n.title}</h3>
        <hr class="divider" />
        <p class="feature-card__desc text-body">${n.desc}</p>
      </div>`).join(""),i=e.expandList.map(n=>`<li class="expand-list__item">${n}</li>`).join(""),l=e.cultureValues.map(n=>`<li class="culture-value">${n}</li>`).join("");return`
    <!-- Hero — Extended with lead text -->
    <section class="hero hero--page">
      <div class="hero__bg" style="background-image: url('/gemgraphy/image/Soshoku-sho/hero.jpg');"></div>
      <div class="hero__overlay"></div>
      <div class="hero__content">
        <p class="text-overline" style="margin-bottom: var(--space-sm); color: var(--color-accent-light);">${e.heroSubtitle}</p>
        <h1 class="hero__title" style="letter-spacing: 0.08em;">${e.heroTitle}</h1>
        <div class="hero__divider"></div>
        <p class="hero__lead">${e.heroLead}</p>
        <p class="hero__desc">${s(e.heroDesc)}</p>
      </div>
    </section>

    <!-- What is Decorative Calligraphy -->
    <section class="section">
      <div class="container container--narrow">
        <div class="section__header fade-in">
          <p class="text-overline">${e.whatOverline}</p>
          <h2 class="heading-2 heading-jp">${e.whatTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="prose fade-in">
          <p class="prose__paragraph">${s(e.whatBody1)}</p>
          <p class="prose__paragraph">${s(e.whatBody2)}</p>
          <p class="prose__paragraph">${s(e.whatBody3)}</p>
          <p class="prose__paragraph prose__paragraph--accent">${s(e.whatBody4)}</p>
        </div>
      </div>
    </section>

    <!-- Photo Break 1 -->
    <section class="photo-break photo-break--tall fade-in">
      <div class="photo-break__image">
        <img src="/gemgraphy/image/Soshoku-sho/Soshoku-sho-01.jpg" alt="装飾書の世界" loading="lazy" />
      </div>
    </section>

    <!-- Characteristics -->
    <section class="section section--alt">
      <div class="container">
        <div class="section__header fade-in">
          <p class="text-overline">${e.featOverline}</p>
          <h2 class="heading-2 heading-jp">${e.featTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="feature-grid">
          ${t}
        </div>
      </div>
    </section>

    <!-- Expression System -->
    <section class="section">
      <div class="container container--narrow">
        <div class="section__header fade-in">
          <p class="text-overline">${e.systemOverline}</p>
          <h2 class="heading-2 heading-jp">${e.systemTitle}</h2>
          <hr class="divider divider--center" />
          <p class="text-body" style="max-width: 640px; margin: 0 auto;">${s(e.systemDesc)}</p>
        </div>
      </div>
    </section>

    <!-- Gemgraphy subsection -->
    <section class="section section--dark">
      <div class="container">
        <div class="content-block fade-in">
          <div class="content-block__image">
            <img src="/gemgraphy/image/Soshoku-sho/Gemgraphy.JPG" alt="Gemgraphy" loading="lazy" />
          </div>
          <div class="content-block__text">
            <p class="text-overline">Gemgraphy</p>
            <h3 class="heading-3">${e.gemgraphyTitle}</h3>
            <hr class="divider" />
            <p class="text-body">${s(e.gemgraphyDesc)}</p>
            <a href="#/gemgraphy" class="cta-link">${e.linkGemgraphy} →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Beadsgraphy subsection -->
    <section class="section">
      <div class="container">
        <div class="content-block content-block--reverse fade-in">
          <div class="content-block__image">
            <img src="/gemgraphy/image/Soshoku-sho/beadsgraphy.jpg" alt="Beadsgraphy" loading="lazy" />
          </div>
          <div class="content-block__text">
            <p class="text-overline">Beadsgraphy®</p>
            <h3 class="heading-3">${e.beadsgraphyTitle}</h3>
            <hr class="divider" />
            <p class="text-body">${s(e.beadsgraphyDesc)}</p>
            <a href="#/beadsgraphy" class="cta-link">${e.linkBeadsgraphy} →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Photo Break 2 -->
    <section class="photo-break photo-break--tall fade-in">
      <div class="photo-break__image">
        <img src="/gemgraphy/image/Soshoku-sho/Soshoku-sho-02.jpg" alt="光と素材" loading="lazy" />
      </div>
    </section>

    <!-- In Space -->
    <section class="section">
      <div class="container container--narrow">
        <div class="section__header fade-in">
          <p class="text-overline">${e.spaceOverline}</p>
          <h2 class="heading-2 heading-jp">${e.spaceTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="prose fade-in">
          <p class="prose__paragraph">${s(e.spaceBody1)}</p>
          <p class="prose__paragraph">${s(e.spaceBody2)}</p>
          <p class="prose__paragraph prose__paragraph--accent">${s(e.spaceBody3)}</p>
        </div>
      </div>
    </section>

    <!-- Expanding Expressions -->
    <section class="section section--alt">
      <div class="container container--narrow">
        <div class="section__header fade-in">
          <p class="text-overline">${e.expandOverline}</p>
          <h2 class="heading-2 heading-jp">${e.expandTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="prose fade-in">
          <p class="prose__paragraph">${s(e.expandDesc)}</p>
          <ul class="expand-list">
            ${i}
          </ul>
          <p class="prose__paragraph">${s(e.expandClosing)}</p>
        </div>
      </div>
    </section>

    <!-- Cultural Expression -->
    <section class="section section--dark">
      <div class="container container--narrow text-center">
        <div class="fade-in">
          <p class="text-overline">${e.cultureOverline}</p>
          <h2 class="heading-2 heading-jp" style="margin-bottom: var(--space-lg);">${e.cultureTitle}</h2>
          <p class="text-body" style="max-width: 560px; margin: 0 auto var(--space-xl);">${s(e.cultureBody)}</p>
          <ul class="culture-values">
            ${l}
          </ul>
          <p class="text-body" style="margin-top: var(--space-md);">${e.cultureClosing}</p>
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
            <span class="nav-card__link">${e.learnMore} →</span>
          </a>
          <a href="#/beadsgraphy" class="nav-card">
            <p class="text-overline">Beadsgraphy®</p>
            <h3 class="heading-3 heading-en">Beadsgraphy®</h3>
            <span class="nav-card__link">${e.learnMore} →</span>
          </a>
        </div>
      </div>
    </section>
  `}function w(a){const e=a.gemgraphy,s=o=>o.replace(/\n/g,"<br>"),t=[{title:e.value1Title,desc:e.value1Desc},{title:e.value2Title,desc:e.value2Desc},{title:e.value3Title,desc:e.value3Desc},{title:e.value4Title,desc:e.value4Desc},{title:e.value5Title,desc:e.value5Desc}].map((o,h)=>`
      <div class="feature-card fade-in fade-in--delay-${h+1}">
        <h3 class="feature-card__title">${o.title}</h3>
        <hr class="divider" />
        <p class="feature-card__desc text-body">${s(o.desc)}</p>
      </div>`).join(""),i=e.materialsList.map(o=>`<li class="expand-list__item">${o}</li>`).join(""),l=e.forList.map(o=>`<li class="expand-list__item">${o}</li>`).join(""),n=e.forUsages.map(o=>`<li class="expand-list__item">${o}</li>`).join("");return`
    <!-- Hero -->
    <section class="hero hero--page">
      <div class="hero__bg" style="background-image: url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&q=80');"></div>
      <div class="hero__overlay"></div>
      <div class="hero__content">
        ${e.heroTitleSub?`<p class="text-overline" style="margin-bottom: var(--space-sm); color: var(--color-accent-light);">${e.heroTitleSub}</p>`:""}
        <h1 class="hero__title" style="font-family: var(--font-en); letter-spacing: 0.2em;">${e.heroTitle}</h1>
        <div class="hero__divider"></div>
        <p class="hero__lead">${s(e.heroSub)}</p>
        <p class="hero__desc">${e.heroSub2}</p>
      </div>
    </section>

    <!-- Gemgraphyとは -->
    <section class="section">
      <div class="container container--narrow">
        <div class="section__header fade-in">
          <p class="text-overline">${e.whatOverline}</p>
          <h2 class="heading-2 heading-jp">${e.whatTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="prose fade-in">
          <p class="prose__paragraph">${e.whatBody1}</p>
          <p class="prose__paragraph">${e.whatBody2}</p>
          <p class="prose__paragraph prose__paragraph--accent">${e.whatBody3}</p>
        </div>
      </div>
    </section>

    <!-- Photo Break -->
    <section class="photo-break photo-break--tall fade-in">
      <div class="photo-break__image">
        <img src="/gemgraphy/image/Gemgraphy/gemgraphy-01.JPG" alt="Gemgraphy" loading="lazy" />
      </div>
    </section>

    <!-- 大切にしていること -->
    <section class="section section--alt">
      <div class="container">
        <div class="section__header fade-in">
          <p class="text-overline">${e.valuesOverline}</p>
          <h2 class="heading-2 heading-jp">${e.valuesTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="feature-grid feature-grid--gemgraphy">
          ${t}
        </div>
      </div>
    </section>

    <!-- 素材と表現 -->
    <section class="section">
      <div class="container">
        <div class="content-block fade-in">
          <div class="content-block__image">
            <img src="/gemgraphy/image/Gemgraphy/gemgraphy-02.JPG" alt="素材と表現" loading="lazy" />
          </div>
          <div class="content-block__text">
            <p class="text-overline">${e.materialsOverline}</p>
            <h2 class="heading-2 heading-jp">${e.materialsTitle}</h2>
            <hr class="divider" />
            <p class="text-body" style="margin-bottom: var(--space-lg);">${e.materialsDesc}</p>
            <ul class="expand-list" style="text-align: left;">
              ${i}
            </ul>
            <p class="text-body" style="margin-top: var(--space-lg);">${e.materialsClosing}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 制作のプロセス -->
    <section class="section section--alt">
      <div class="container container--narrow">
        <div class="section__header fade-in">
          <p class="text-overline">${e.processOverline}</p>
          <h2 class="heading-2 heading-jp">${e.processTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="prose fade-in">
          <p class="prose__paragraph">${e.processBody1}</p>
          <p class="prose__paragraph">${s(e.processBody2)}</p>
          <p class="prose__paragraph prose__paragraph--accent">${e.processBody3}</p>
        </div>
      </div>
    </section>

    <!-- Photo Break -->
    <section class="photo-break photo-break--tall fade-in">
      <div class="photo-break__image">
        <img src="/gemgraphy/image/Gemgraphy/gemgraphy-03.JPEG" alt="制作" loading="lazy" />
      </div>
    </section>

    <!-- 制作について -->
    <section class="section section--dark">
      <div class="container container--narrow text-center">
        <div class="fade-in">
          <p class="text-overline">${e.craftOverline}</p>
          <h2 class="heading-2 heading-jp" style="margin-bottom: var(--space-lg);">${e.craftTitle}</h2>
          <p class="text-body" style="max-width: 640px; margin: 0 auto var(--space-lg);">${s(e.craftBody1)}</p>
          <p class="text-body" style="max-width: 640px; margin: 0 auto;">${e.craftBody2}</p>
        </div>
      </div>
    </section>

    <!-- 光と空間の中で -->
    <section class="section">
      <div class="container container--narrow">
        <div class="section__header fade-in">
          <p class="text-overline">${e.lightOverline}</p>
          <h2 class="heading-2 heading-jp">${e.lightTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="prose fade-in">
          <p class="prose__paragraph">${e.lightBody1}</p>
          <p class="prose__paragraph">${e.lightBody2}</p>
          <p class="prose__paragraph prose__paragraph--accent">${e.lightBody3}</p>
        </div>
      </div>
    </section>

    <!-- こんな方へ -->
    <section class="section section--alt">
      <div class="container container--narrow">
        <div class="section__header fade-in">
          <p class="text-overline">${e.forOverline}</p>
          <h2 class="heading-2 heading-jp">${e.forTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="prose fade-in">
          <ul class="expand-list">
            ${l}
          </ul>
          <p class="prose__paragraph" style="margin-top: var(--space-xl); font-weight: 500; color: var(--color-text);">${e.forUsagesTitle}</p>
          <ul class="expand-list">
            ${n}
          </ul>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section section--dark">
      <div class="container container--narrow text-center fade-in">
        <h2 class="heading-2 heading-jp" style="margin-bottom: var(--space-lg);">${e.ctaTitle}</h2>
        <p class="text-body" style="max-width: 600px; margin: 0 auto var(--space-xl);">${e.ctaBody}</p>
        <a href="#/contact" class="cta-btn">${e.ctaLink}</a>
      </div>
    </section>
  `}function j(a){const e=a.beadsgraphy,s=o=>o.replace(/\n/g,"<br>"),t=[{title:e.appeal1Title,desc:e.appeal1Desc},{title:e.appeal2Title,desc:e.appeal2Desc},{title:e.appeal3Title,desc:e.appeal3Desc},{title:e.appeal4Title,desc:e.appeal4Desc}].map((o,h)=>`
      <div class="feature-card fade-in fade-in--delay-${h+1}">
        <h3 class="feature-card__title">${o.title}</h3>
        <hr class="divider" />
        <p class="feature-card__desc text-body">${s(o.desc)}</p>
      </div>`).join(""),i=e.flowSteps.map((o,h)=>`<li class="expand-list__item">${o}</li>`).join(""),l=e.forList.map(o=>`<li class="expand-list__item">${o}</li>`).join(""),n=e.scenesList.map(o=>`<li class="expand-list__item">${o}</li>`).join("");return`
    <!-- Hero -->
    <section class="hero hero--page">
      <div class="hero__bg" style="background-image: url('https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=1920&q=80');"></div>
      <div class="hero__overlay"></div>
      <div class="hero__content">
        ${e.heroTitleSub?`<p class="text-overline" style="margin-bottom: var(--space-sm); color: var(--color-accent-light);">${e.heroTitleSub}</p>`:""}
        <h1 class="hero__title" style="font-family: var(--font-en); letter-spacing: 0.2em;">${e.heroTitle}</h1>
        <div class="hero__divider"></div>
        <p class="hero__lead">${e.heroSub}</p>
        <p class="hero__desc">${s(e.heroSub2)}</p>
      </div>
    </section>

    <!-- Beadsgraphyとは -->
    <section class="section">
      <div class="container container--narrow">
        <div class="section__header fade-in">
          <p class="text-overline">${e.whatOverline}</p>
          <h2 class="heading-2 heading-jp">${e.whatTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="prose fade-in">
          <p class="prose__paragraph">${e.whatBody1}</p>
          <p class="prose__paragraph">${s(e.whatBody2)}</p>
          <p class="prose__paragraph prose__paragraph--accent">${s(e.whatBody3)}</p>
        </div>
      </div>
    </section>

    <!-- Photo Break -->
    <section class="photo-break photo-break--tall fade-in">
      <div class="photo-break__image">
        <img src="/gemgraphy/image/Beadsgraphy/beadsgraphy-01.JPEG" alt="Beadsgraphy" loading="lazy" />
      </div>
    </section>

    <!-- 魅力 -->
    <section class="section section--alt">
      <div class="container">
        <div class="section__header fade-in">
          <p class="text-overline">${e.appealOverline}</p>
          <h2 class="heading-2 heading-jp">${e.appealTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="feature-grid">
          ${t}
        </div>
      </div>
    </section>

    <!-- 体験の流れ -->
    <section class="section">
      <div class="container container--narrow">
        <div class="section__header fade-in">
          <p class="text-overline">${e.flowOverline}</p>
          <h2 class="heading-2 heading-jp">${e.flowTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="prose fade-in">
          <p class="prose__paragraph">${e.flowDesc}</p>
          <ul class="expand-list" style="margin: var(--space-xl) 0;">
            ${i}
          </ul>
          <p class="prose__paragraph prose__paragraph--accent">${s(e.flowClosing)}</p>
        </div>
      </div>
    </section>

    <!-- Photo Break -->
    <section class="photo-break photo-break--tall fade-in">
      <div class="photo-break__image">
        <img src="/gemgraphy/image/Beadsgraphy/beadsgraphy-02.jpeg" alt="制作の風景" loading="lazy" />
      </div>
    </section>

    <!-- Gemgraphyとの関係 -->
    <section class="section">
      <div class="container container--narrow">
        <div class="section__header fade-in">
          <p class="text-overline">${e.relationOverline}</p>
          <h2 class="heading-2 heading-jp">${e.relationTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="prose fade-in">
          <p class="prose__paragraph">${e.relationBody1}</p>
          <p class="prose__paragraph">${s(e.relationBody2)}</p>
          <p class="prose__paragraph prose__paragraph--accent">${s(e.relationBody3)}</p>
          <div style="text-align: center; margin-top: var(--space-lg);">
            <a href="#/gemgraphy" class="cta-link">${e.relationLink} →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- こんな方へ & 活用シーン -->
    <section class="section section--alt">
      <div class="container">
        <div class="content-block fade-in">
          <div class="content-block__text" style="flex: 1;">
            <p class="text-overline">${e.forOverline}</p>
            <h2 class="heading-2 heading-jp">${e.forTitle}</h2>
            <hr class="divider" />
            <ul class="expand-list" style="text-align: left;">
              ${l}
            </ul>
          </div>
          <div class="content-block__text" style="flex: 1;">
            <p class="text-overline">${e.scenesOverline}</p>
            <h2 class="heading-2 heading-jp">${e.scenesTitle}</h2>
            <hr class="divider" />
            <ul class="expand-list" style="text-align: left;">
              ${n}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 表現の広がり -->
    <section class="section section--dark">
      <div class="container container--narrow text-center">
        <div class="fade-in">
          <p class="text-overline">${e.expandOverline}</p>
          <h2 class="heading-2 heading-jp" style="margin-bottom: var(--space-lg);">${e.expandTitle}</h2>
          <p class="text-body" style="max-width: 640px; margin: 0 auto var(--space-md);">${s(e.expandBody1)}</p>
          <p class="text-body" style="max-width: 640px; margin: 0 auto;">${s(e.expandBody2)}</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container container--narrow text-center fade-in">
        <h2 class="heading-2 heading-jp" style="margin-bottom: var(--space-lg);">${e.ctaTitle}</h2>
        <p class="text-body" style="max-width: 600px; margin: 0 auto var(--space-xl);">${e.ctaBody}</p>
        <a href="#/contact" class="cta-btn">${e.ctaLink}</a>
      </div>
    </section>
  `}function T(a){const e=a.artist,s=l=>(l||"").replace(/\n/g,"<br>"),r=`
    <section class="artist-block fade-in">
      <div class="container container--narrow">
        <div class="artist-block__header">
          <p class="text-overline">${e.founderOverline}</p>
          <h2 class="heading-2 heading-jp artist-block__name">${e.founderName}</h2>
          <p class="artist-block__role">${e.founderRole}</p>
          <hr class="divider divider--center" />
        </div>
      </div>

      <!-- Portrait -->
      <div class="artist-portrait fade-in">
        <div class="artist-portrait__frame">
          <img src="/gemgraphy/image/Profile/profile.png" alt="${e.founderName}" loading="lazy" />
        </div>
      </div>

      <!-- Statement -->
      <div class="container container--narrow">
        <div class="artist-statement fade-in">
          <p class="artist-statement__paragraph">${s(e.statement1)}</p>
          <p class="artist-statement__paragraph">${s(e.statement2)}</p>
          <p class="artist-statement__paragraph">${s(e.statement3)}</p>
          <p class="artist-statement__paragraph">${s(e.statement4)}</p>
          <p class="artist-statement__paragraph">${s(e.statement5)}</p>
          <p class="artist-statement__paragraph artist-statement__paragraph--accent">${s(e.statement6)}</p>
          <p class="artist-statement__paragraph">${s(e.statement7)}</p>
          <p class="artist-statement__paragraph artist-statement__paragraph--accent">${s(e.statement8)}</p>
        </div>
      </div>
    </section>
  `,t=`
    <section class="section section--alt">
      <div class="container container--narrow">
        <div class="section__header fade-in">
          <p class="text-overline">${e.certOverline}</p>
          <h2 class="heading-2 heading-jp">${e.certTitle}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="prose fade-in">
          <p class="prose__paragraph">${s(e.certBody1)}</p>
          <p class="prose__paragraph">${s(e.certBody2)}</p>
        </div>
      </div>
    </section>
  `,i=`
    <section class="section section--dark">
      <div class="container container--narrow text-center">
        <div class="fade-in">
          <p class="text-overline">${e.closingOverline}</p>
          <hr class="divider divider--center" style="margin-top: var(--space-lg);" />
          <div class="artist-closing">
            <p class="artist-closing__text">${s(e.closingBody1)}</p>
            <p class="artist-closing__text">${s(e.closingBody2)}</p>
          </div>
        </div>
      </div>
    </section>
  `;return`
    <!-- Hero -->
    <section class="hero hero--page hero--artist">
      <div class="hero__bg" style="background-image: url('/gemgraphy/image/Profile/artist-hero.jpg');"></div>
      <div class="hero__overlay"></div>
      <div class="hero__content">
        <p class="text-overline" style="margin-bottom: var(--space-sm); color: var(--color-accent-light);">${e.heroTitleSub}</p>
        <h1 class="hero__title" style="letter-spacing: 0.08em;">${e.heroTitle}</h1>
        <div class="hero__divider"></div>
        <p class="hero__lead">${e.heroLead}</p>
        <p class="hero__desc">${s(e.heroDesc)}</p>
      </div>
    </section>

    <!-- Introduction -->
    <section class="section">
      <div class="container container--narrow">
        <div class="prose fade-in">
          <p class="prose__paragraph prose__paragraph--accent">${s(e.introBody)}</p>
        </div>
      </div>
    </section>

    <!-- Founder -->
    ${r}

    <!-- Certification -->
    ${t}

    <!-- Closing -->
    ${i}
  `}function B(a){const e="/gemgraphy/",r=[{year:2026,files:["2026-01.JPG","2026-02.JPG","2026-03.jpg"]},{year:2025,files:["2025-02.jpg","2025-03.jpg","2025-04.jpg","2025-05.jpeg","2025-06.jpg","2025-07.jpg","2025-08.JPG"]},{year:2024,files:["2024-01.jpg","2024-02.jpg","2024-03.jpg","2024-04.JPEG","2024-05.JPG","2024-06.jpg","2024-07.JPG","2024-08.jpg","2024-09.jpg","2024-10.jpg"]},{year:2023,files:["2023-01.jpg","2023-02.jpg","2023-03.JPG","2023-04.jpg","2023-05.JPG","2023-06.JPG","2023-07.JPG","2023-08.jpg"]},{year:2022,files:["2022-01.JPG","2022-02.JPG","2022-03.JPG"]},{year:2019,files:["2019-01.JPG"]},{year:2018,files:["2018-01.jpg"]},{year:2016,files:["2016-01.PNG"]},{year:2015,files:["2015-01.JPG","2015-02.JPG","2015-03.JPG","2015-04.JPG","2015-05.JPG","2015-06.JPG","2015-07.JPG","2015-08.JPG","2015-09.JPG","2015-10.JPG","2015-11.JPG"]}].map(({year:t,files:i})=>{const l=i.map((n,p)=>`<div class="gallery-year__item fade-in fade-in--delay-${p%4+1}">
            <img src="${e}image/Gallery/${n}" alt="${t}" loading="lazy" />
          </div>`).join("");return`
      <div class="gallery-year">
        <div class="gallery-year__header fade-in">
          <p class="text-overline">Works</p>
          <h2 class="gallery-year__title">${t}</h2>
          <hr class="divider divider--center" />
        </div>
        <div class="gallery-year__grid" data-count="${Math.min(i.length,3)}">
          ${l}
        </div>
      </div>
    `}).join("");return`
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="page-hero__bg" style="background-image: url('${e}image/Gallery/Hero.JPEG');"></div>
      <div class="hero__overlay"></div>
      <div class="page-hero__content">
        <h1 class="page-hero__title">${a.gallery.heroTitle}</h1>
        <div class="hero__divider"></div>
        <p class="page-hero__subtitle">${a.gallery.heroSubtitle}</p>
      </div>
    </section>

    <!-- Gallery Header -->
    <section class="section" style="padding-bottom: var(--space-xl);">
      <div class="container text-center fade-in">
        <p class="text-overline">${a.gallery.overline}</p>
        <h2 class="heading-2">${a.gallery.title}</h2>
        <hr class="divider divider--center" />
        <p class="text-body" style="max-width: 540px; margin: 0 auto;">${a.gallery.desc}</p>
      </div>
    </section>

    <!-- Gallery by Year -->
    <section style="padding-bottom: var(--space-section);">
      <div class="container">
        <div class="gallery-years" id="gallery-grid">
          ${r}
        </div>
      </div>
    </section>

    <!-- Gallery Modal -->
    <div class="gallery-modal" id="gallery-modal">
      <button class="gallery-modal__close" id="gallery-modal-close">✕</button>
      <img class="gallery-modal__img" id="gallery-modal-img" src="" alt="" />
    </div>
  `}function G(){const a=document.getElementById("gallery-grid"),e=document.getElementById("gallery-modal"),s=document.getElementById("gallery-modal-img"),r=document.getElementById("gallery-modal-close");if(!a||!e)return;a.addEventListener("click",i=>{const l=i.target.closest(".gallery-year__item");if(!l)return;const n=l.querySelector("img");n&&(s.src=n.src,s.alt=n.alt,e.classList.add("gallery-modal--open"),document.body.style.overflow="hidden")});const t=()=>{e.classList.remove("gallery-modal--open"),document.body.style.overflow=""};r.addEventListener("click",t),e.addEventListener("click",i=>{i.target===e&&t()}),document.addEventListener("keydown",i=>{i.key==="Escape"&&t()})}function P(a){const e=Object.entries(a.contact.subjectOptions).map(([s,r])=>`<option value="${s}">${r}</option>`).join("");return`
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="page-hero__bg" style="background-image: url('/gemgraphy/image/Contact/hero.JPG');"></div>
      <div class="hero__overlay"></div>
      <div class="page-hero__content">
        <h1 class="page-hero__title">${a.contact.heroTitle}</h1>
        <div class="hero__divider"></div>
        <p class="page-hero__subtitle">${a.contact.heroSubtitle}</p>
      </div>
    </section>

    <!-- Contact Form -->
    <section class="section">
      <div class="container container--narrow">
        <div class="text-center fade-in" style="margin-bottom: var(--space-2xl);">
          <p class="text-overline">${a.contact.overline}</p>
          <h2 class="heading-2">${a.contact.title}</h2>
          <hr class="divider divider--center" />
          <p class="text-body">${a.contact.desc}</p>
        </div>

        <div id="contact-success" style="display:none; text-align:center; padding: var(--space-xl) 0;">
          <p class="text-body">お問い合わせありがとうございます。<br>内容を確認後、ご連絡いたします。</p>
        </div>
        <form class="contact-form fade-in" id="contact-form">
          <div class="form-group">
            <label for="contact-name">${a.contact.labelName}</label>
            <input type="text" id="contact-name" name="name" required />
          </div>
          <div class="form-group">
            <label for="contact-email">${a.contact.labelEmail}</label>
            <input type="email" id="contact-email" name="email" required />
          </div>
          <div class="form-group">
            <label for="contact-subject">${a.contact.labelSubject}</label>
            <select id="contact-subject" name="subject">
              ${e}
            </select>
          </div>
          <div class="form-group">
            <label for="contact-message">${a.contact.labelMessage}</label>
            <textarea id="contact-message" name="message" required></textarea>
          </div>
          <div class="text-center">
            <button type="submit" class="cta-btn">${a.contact.submit}</button>
          </div>
        </form>
      </div>
    </section>
  `}let c=localStorage.getItem("gemgraphy-lang")||"ja",d={};const E={"#/":m,"#/soshoku-sho":k,"#/gemgraphy":w,"#/beadsgraphy":j,"#/artist":T,"#/gallery":B,"#/contact":P};async function _(a){try{d=await(await fetch(`/gemgraphy/locales/${a}.json`)).json()}catch(e){console.error("Failed to load translations:",e)}}function v(){c=c==="ja"?"en":"ja",localStorage.setItem("gemgraphy-lang",c),document.documentElement.setAttribute("data-lang",c),document.documentElement.setAttribute("lang",c),_(c).then(()=>g())}function L(){return window.location.hash||"#/"}function g(){const a=L(),e=E[a]||m;document.title=d.site?.title||"Gemgraphy";const s=document.getElementById("site-header");if(s){s.className="header",s.innerHTML=y(d,a),f();const l=document.getElementById("lang-toggle");l&&l.addEventListener("click",v)}const r=document.getElementById("mobile-nav");if(r){r.innerHTML=u(d),$();const l=document.getElementById("lang-toggle-mobile");l&&l.addEventListener("click",v)}const t=document.getElementById("page-content");t&&(t.className="page-transition",t.innerHTML=e(d),requestAnimationFrame(()=>{requestAnimationFrame(()=>{t.classList.add("page-transition--visible")})}),a==="#/gallery"&&G(),a==="#/contact"&&O(),x());const i=document.getElementById("site-footer");i&&(i.className="footer",i.innerHTML=b(d)),window.scrollTo(0,0)}async function S(){document.documentElement.setAttribute("data-lang",c),document.documentElement.setAttribute("lang",c),await _(c),g()}function O(){const a=document.getElementById("contact-form");a&&a.addEventListener("submit",async e=>{e.preventDefault();const s=a.querySelector('button[type="submit"]'),r=s.textContent;s.disabled=!0,s.textContent="送信中...";const t=new FormData(a);try{if((await fetch("https://formsubmit.co/ajax/gemgraphy@outlook.jp",{method:"POST",headers:{Accept:"application/json"},body:t})).ok)a.style.display="none",document.getElementById("contact-success").style.display="block";else throw new Error}catch{s.disabled=!1,s.textContent=r,alert("送信に失敗しました。時間をおいて再度お試しください。")}})}window.addEventListener("hashchange",g);S();
