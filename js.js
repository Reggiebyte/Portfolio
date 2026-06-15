// FYC — Fraser Youth Coding | GSAP Animations

if (typeof gsap === 'undefined') {
  console.warn('GSAP not loaded — running without animations');
  throw new Error('GSAP unavailable');
}

gsap.registerPlugin(ScrollTrigger);

// Mark body so CSS reveal-hide only applies when GSAP is confirmed
document.documentElement.classList.add('gsap-ready');

/* ─── Custom Cursor ──────────────────────────────────────────── */
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mX = 0, mY = 0, fX = 0, fY = 0;

document.addEventListener('mousemove', e => {
  mX = e.clientX; mY = e.clientY;
  gsap.to(cursor, { x: mX, y: mY, duration: 0.04, ease: 'none' });
});

(function tickFollower() {
  fX += (mX - fX) * 0.1;
  fY += (mY - fY) * 0.1;
  gsap.set(follower, { x: fX, y: fY });
  requestAnimationFrame(tickFollower);
})();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hovered');    follower.classList.add('hovered'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hovered'); follower.classList.remove('hovered'); });
});

/* ─── Progress Bar ───────────────────────────────────────────── */
const bar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
  bar.style.width = pct + '%';
}, { passive: true });

/* ─── Navigation ─────────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

const menuBtn    = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});
document.querySelectorAll('.mobile-link').forEach(l =>
  l.addEventListener('click', () => {
    menuBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
  })
);

/* ─── Smooth Anchor Scroll ───────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - nav.offsetHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─── Hero Entrance ──────────────────────────────────────────── */
// fromTo forces start state regardless of CSS, so animation always plays
gsap.timeline({ defaults: { ease: 'power3.out' } })
  .fromTo('.hero-badge',    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .8, delay: .2 })
  .fromTo('.hero-line',     { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: .9, stagger: .14 }, '-=.35')
  .fromTo('.hero-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .8 }, '-=.4')
  .fromTo('.hero-actions',  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .7 }, '-=.4')
  .fromTo('.hero-stats',    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .7 }, '-=.3')
  .fromTo('.scroll-indicator', { opacity: 0 },     { opacity: 1, duration: .7 }, '-=.2');

/* ─── Floating Code Snippets ─────────────────────────────────── */
gsap.from('.code-snippet', {
  opacity: 0, y: 14, stagger: .22, duration: 1.2, delay: 1.3, ease: 'power2.out'
});
gsap.to('.code-snippet', {
  y: '+=14', repeat: -1, yoyo: true, ease: 'sine.inOut',
  stagger: { each: .6, from: 'random' }, duration: 3.5
});

/* ─── Orb Drift ──────────────────────────────────────────────── */
gsap.to('.orb-1', { x: 52,  y: 32,  repeat: -1, yoyo: true, ease: 'sine.inOut', duration: 7 });
gsap.to('.orb-2', { x: -38, y: -24, repeat: -1, yoyo: true, ease: 'sine.inOut', duration: 9 });
gsap.to('.orb-3', { x: 28,  y: 44,  repeat: -1, yoyo: true, ease: 'sine.inOut', duration: 8 });

/* ─── Scroll Reveal ──────────────────────────────────────────── */
gsap.utils.toArray('.reveal').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, y: 28 },
    { opacity: 1, y: 0, duration: .85, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none none' }
    }
  );
});

/* ─── Counter Animations ─────────────────────────────────────── */
document.querySelectorAll('.stat-num').forEach(el => {
  const end = parseInt(el.dataset.count, 10);
  ScrollTrigger.create({
    trigger: el, start: 'top 85%', once: true,
    onEnter() {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: end, duration: 1.6, ease: 'power2.out',
        onUpdate() { el.textContent = Math.round(obj.val); }
      });
    }
  });
});

/* ─── Services Stagger + Icon Tilt + Click ───────────────────── */
gsap.fromTo('.service-card',
  { opacity: 0, y: 48 },
  { opacity: 1, y: 0, stagger: .1, duration: .85, ease: 'power3.out',
    scrollTrigger: { trigger: '.services-grid', start: 'top 80%' }
  }
);
document.querySelectorAll('.service-card').forEach(card => {
  const icon = card.querySelector('.service-icon');
  card.addEventListener('mouseenter', () => gsap.to(icon, { rotation: 6, duration: .3, ease: 'back.out(2)' }));
  card.addEventListener('mouseleave', () => gsap.to(icon, { rotation: 0, duration: .3, ease: 'back.out(2)' }));
  card.addEventListener('click', () => {
    const contact = document.getElementById('contact');
    const top = contact.getBoundingClientRect().top + window.scrollY - nav.offsetHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─── Project Cards Parallax ─────────────────────────────────── */
gsap.utils.toArray('.project-card').forEach(card => {
  gsap.to(card, {
    y: -18, ease: 'none',
    scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.2 }
  });
});

/* ─── Team Cards Stagger ─────────────────────────────────────── */
gsap.fromTo('.team-card',
  { opacity: 0, y: 40 },
  { opacity: 1, y: 0, stagger: .12, duration: .85, ease: 'power3.out',
    scrollTrigger: { trigger: '.team-grid', start: 'top 82%' }
  }
);

/* ─── Tech Stack Stagger ─────────────────────────────────────── */
gsap.from('.tech-item', {
  opacity: 0, x: -16, stagger: .07, duration: .5, ease: 'power2.out',
  scrollTrigger: { trigger: '.about-tech-stack', start: 'top 82%' }
});

/* ─── Footer ─────────────────────────────────────────────────── */
gsap.from('.footer-brand, .footer-links', {
  opacity: 0, y: 26, stagger: .1, duration: .75, ease: 'power3.out',
  scrollTrigger: { trigger: '.footer', start: 'top 90%' }
});

// Recalculate all trigger positions after full page render
window.addEventListener('load', () => ScrollTrigger.refresh());

/* ─── Contact Form ───────────────────────────────────────────── */
const form       = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', e => {
  e.preventDefault();
  const btn  = form.querySelector('button[type="submit"]');
  const span = btn.querySelector('span');
  const orig = span.textContent;

  span.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    formStatus.className = 'form-status success';
    formStatus.textContent = "Message sent! We'll get back to you within 24 hours.";
    gsap.from(formStatus, { opacity: 0, y: 8, duration: .4, ease: 'power2.out' });

    form.reset();
    span.textContent = orig;
    btn.disabled = false;

    setTimeout(() => {
      gsap.to(formStatus, {
        opacity: 0, duration: .4,
        onComplete() {
          formStatus.className = 'form-status';
          formStatus.textContent = '';
          gsap.set(formStatus, { opacity: 1 });
        }
      });
    }, 5000);
  }, 1400);
});
