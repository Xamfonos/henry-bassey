/**
 * Site-wide motion, all of it switched off for visitors who prefer reduced motion:
 * - smooth scrolling (Lenis), including in-page anchor links
 * - headings marked [data-words] rise in word by word when they enter the viewport
 * - numbers marked [data-count] count up when they enter the viewport
 * Without JavaScript, or with reduced motion, everything simply shows in its final state.
 */
import Lenis from 'lenis';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduce) {
  // Smooth scrolling. Anchor links offset by the sticky masthead.
  const lenis = new Lenis({ duration: 1.1, anchors: { offset: -100 } });
  const raf = (time: number) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  // Split headings into words, keeping <br> and inline elements intact.
  document.querySelectorAll<HTMLElement>('[data-words]').forEach((el) => {
    let i = 0;
    const walk = (node: Node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const parts = (child.textContent || '').split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
            } else {
              const w = document.createElement('span');
              w.className = 'word';
              w.style.setProperty('--i', String(i++));
              w.textContent = part;
              frag.appendChild(w);
            }
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE && (child as Element).tagName !== 'BR') {
          walk(child);
        }
      });
    };
    walk(el);
    el.classList.add('is-split');
  });

  const countUp = (el: HTMLElement) => {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target)) return;
    const decimals = Number(el.dataset.decimals || 0);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const fmt = (n: number) =>
      prefix + n.toLocaleString('en-GB', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    const start = performance.now();
    const dur = 1100;
    const step = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      el.textContent = fmt(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = fmt(target);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.classList.add('is-in');
        if (el.dataset.count !== undefined && !el.closest('.proof')) countUp(el);
        io.unobserve(el);
      });
    },
    { rootMargin: '0px 0px -12% 0px' },
  );

  // Counters start at zero so they only ever count upwards. Their final value stays in the
  // accessible name, so screen readers never hear the in-between numbers.
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    if (el.closest('.proof')) return;
    el.setAttribute('aria-label', el.textContent || '');
    const decimals = Number(el.dataset.decimals || 0);
    el.textContent = (el.dataset.prefix || '') + (0).toFixed(decimals) + (el.dataset.suffix || '');
  });

  document.querySelectorAll<HTMLElement>('[data-words], [data-count]').forEach((el) => io.observe(el));
}
