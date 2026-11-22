(() => {
  'use strict';
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;
  const tiles = [...hero.querySelectorAll('.tile')];
  const trail = hero.querySelector('[data-cursor-trail]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const urls = tiles.map(tile => tile.querySelector('img')?.getAttribute('src')).filter(Boolean);
  const MAX_STAMPS = 24;
  const STEP_PX = 24;
  const STAMP_MS = 720;
  const stamps = [];
  let ready = false, lastPoint = null, nextImage = 0;

  function reveal() {
    if (ready) return;
    ready = true;
    hero.classList.add('is-started');
    tiles.forEach((tile, i) => {
      tile.style.transitionDelay = reduced ? '0ms' : `${260 + 70 * i}ms`;
    });
  }

  function spawn(x, y) {
    if (!urls.length || !trail || !ready) return;
    const img = document.createElement('img');
    img.className = 'trail-stamp';
    img.src = urls[nextImage++ % urls.length];
    img.alt = '';
    img.draggable = false;
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    trail.appendChild(img);
    stamps.push(img);
    if (stamps.length > MAX_STAMPS) stamps.shift()?.remove();
    const animation = img.animate([
      { opacity: .98, transform: 'translate3d(-50%, -50%, 0) scale(1)', offset: 0 },
      { opacity: .95, transform: 'translate3d(-50%, -50%, 0) scale(1)', offset: .27 },
      { opacity: 0, transform: 'translate3d(-50%, -50%, 0) scale(.94)', offset: 1 }
    ], { duration: STAMP_MS, easing: 'cubic-bezier(.18,.45,.2,1)', fill: 'forwards' });
    animation.finished.catch(() => {}).finally(() => {
      img.remove();
      const index = stamps.indexOf(img);
      if (index !== -1) stamps.splice(index, 1);
    });
  }

  function move(event) {
    if (!ready || !finePointer || reduced || event.pointerType === 'touch') return;
    if (event.target.closest('.hero-header')) { lastPoint = null; return; }
    const rect = hero.getBoundingClientRect();
    const x = event.clientX - rect.left, y = event.clientY - rect.top;
    if (!lastPoint) { lastPoint = { x, y }; spawn(x, y); return; }
    const dx = x - lastPoint.x, dy = y - lastPoint.y;
    const distance = Math.hypot(dx, dy);
    if (distance < STEP_PX) return;
    const steps = Math.min(8, Math.floor(distance / STEP_PX));
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      spawn(lastPoint.x + dx * t, lastPoint.y + dy * t);
    }
    lastPoint = { x, y };
  }

  hero.addEventListener('pointermove', move, { passive: true });
  hero.addEventListener('pointerleave', () => { lastPoint = null; });
  window.addEventListener('blur', () => { lastPoint = null; });

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