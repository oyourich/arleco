(() => {
  'use strict';

  const hero = document.querySelector('[data-hero]');
  if (!hero) return;
  const trail = hero.querySelector('[data-cursor-trail]');
  const urls = [1, 2, 3, 4, 5].map(i => `./assets/hero/hero-0${i}.jpg`);

  // Measured along cursor travel, NOT at every pointer event.
  const STEP_PX = 140;
  const STAMP_LIFETIME_MS = 950;
  const MAX_STAMPS = 9;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const enabled = finePointer && !reducedMotion && Boolean(trail);

  let ready = false;
  let lastPoint = null;
  let distanceSinceStamp = 0;
  let nextImage = 0;
  const stamps = [];

  function reveal() {
    if (ready) return;
    ready = true;
    hero.classList.add('is-started');
  }

  function spawn(x, y) {
    const img = document.createElement('img');
    img.className = 'trail-stamp';
    img.src = urls[nextImage++ % urls.length];
    img.alt = '';
    img.draggable = false;
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    trail.appendChild(img);

    const stamp = { img, timeout: 0 };
    stamps.push(stamp);

    // Hard cut: no opacity, no scale, no fade.
    const remove = () => {
      clearTimeout(stamp.timeout);
      img.remove();
      const i = stamps.indexOf(stamp);
      if (i >= 0) stamps.splice(i, 1);
    };

    stamp.timeout = setTimeout(remove, STAMP_LIFETIME_MS);
    if (stamps.length > MAX_STAMPS) {
      const oldest = stamps[0];
      oldest.img.remove();
      clearTimeout(oldest.timeout);
      stamps.shift();
    }
  }

  function move(event) {
    if (!ready || !enabled || event.pointerType === 'touch') return;
    if (event.target.closest('.hero-header')) {
      lastPoint = null;
      distanceSinceStamp = 0;
      return;
    }
    const bounds = hero.getBoundingClientRect();
    const current = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };

    if (!lastPoint) {
      lastPoint = current;
      distanceSinceStamp = 0;
      return;
    }

    const dx = current.x - lastPoint.x;
    const dy = current.y - lastPoint.y;
    const distance = Math.hypot(dx, dy);
    if (distance === 0) return;

    // Interpolate along the physical pointer path; at most one stamp per 140px.
    const unitX = dx / distance;
    const unitY = dy / distance;
    let travelled = 0;
    let remaining = distance;

    while (distanceSinceStamp + remaining >= STEP_PX) {
      const toStamp = STEP_PX - distanceSinceStamp;
      travelled += toStamp;
      spawn(lastPoint.x + unitX * travelled, lastPoint.y + unitY * travelled);
      remaining -= toStamp;
      distanceSinceStamp = 0;
    }
    distanceSinceStamp += remaining;
    lastPoint = current;
  }

  hero.addEventListener('pointermove', move, { passive: true });
  const resetPointer = () => { lastPoint = null; distanceSinceStamp = 0; };
  hero.addEventListener('pointerleave', resetPointer);
  window.addEventListener('blur', resetPointer);

  const toggle = hero.querySelector('.menu-toggle');
  const menu = hero.querySelector('.site-menu');
  if (toggle && menu) {
    function closeMenu() { menu.hidden = true; toggle.setAttribute('aria-expanded', 'false'); }
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      menu.hidden = open;
      toggle.setAttribute('aria-expanded', String(!open));
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  }

  window.addEventListener('arleko:loader-complete', reveal, { once: true });
  if (document.body.classList.contains('loader-finished')) reveal();
})();