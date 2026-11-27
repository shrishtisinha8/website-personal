(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const onMediaChange = (media, callback) => {
    if (typeof media.addEventListener === 'function') media.addEventListener('change', callback);
    else if (typeof media.addListener === 'function') media.addListener(callback);
  };

  // The user's choice stays separate from temporary offscreen/background pauses.
  const landing = document.querySelector('.landing-stage');
  const motionToggle = document.getElementById('motion-toggle');
  let motionChoice = null;
  let landingVisible = true;
  const wantsMotion = () => motionChoice === null ? !reducedMotion.matches : motionChoice;
  const updateLandingMotion = () => {
    if (!landing) return;
    const wanted = wantsMotion();
    landing.dataset.motion = wanted && landingVisible && !document.hidden ? 'running' : 'paused';
    if (motionToggle) {
      motionToggle.textContent = wanted ? 'Pause motion' : 'Play motion';
      motionToggle.setAttribute('aria-label', wanted ? 'Pause moving circles' : 'Play moving circles');
      motionToggle.setAttribute('aria-pressed', String(!wanted));
      motionToggle.hidden = false;
    }
  };

  if (landing) {
    const updateLandingVisibility = () => {
      const bounds = landing.getBoundingClientRect();
      landingVisible = bounds.bottom > 0 && bounds.top < window.innerHeight;
      updateLandingMotion();
    };
    updateLandingVisibility();
    if (motionToggle) motionToggle.addEventListener('click', () => {
      motionChoice = !wantsMotion();
      updateLandingMotion();
    });
    let landingObserver;
    try {
      if ('IntersectionObserver' in window) {
        landingObserver = new IntersectionObserver(entries => {
          landingVisible = entries[0].isIntersecting;
          updateLandingMotion();
        });
        landingObserver.observe(landing);
      }
    } catch { landingObserver = null; }
    if (!landingObserver) {
      let visibilityFrame = 0;
      const queueVisibilityCheck = () => {
        if (visibilityFrame) return;
        visibilityFrame = window.requestAnimationFrame(() => {
          visibilityFrame = 0;
          updateLandingVisibility();
        });
      };
      window.addEventListener('scroll', queueVisibilityCheck, { passive: true });
      window.addEventListener('resize', queueVisibilityCheck, { passive: true });
    }
  }

  // Content is visible by default; only a working observer enables reveal styling.
  const revealSelector = [
    '.skills-ribbon', '#about .section-intro', '#about .about-copy', '#education',
    '.working-style', '#work .section-top', '.resume-summary', '.experience-card',
    '.work-blogs', '#interests .section-top', '.interest-card', '.roles-interest-note',
    '.connect-copy', '.booking-card'
  ].join(',');
  const revealTargets = Array.from(document.querySelectorAll(revealSelector));
  let revealObserver = null;
  const reveal = element => {
    element.classList.add('is-visible');
    if (revealObserver) revealObserver.unobserve(element);
  };
  const revealAll = () => {
    if (revealObserver) revealObserver.disconnect();
    revealTargets.forEach(reveal);
  };
  const revealAnchor = hash => {
    if (!hash || hash === '#') return;
    let id;
    try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    revealTargets.forEach(element => {
      if (element === target || element.contains(target) || target.contains(element)) reveal(element);
    });
  };

  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    try {
      revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) reveal(entry.target); });
      }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });
      revealTargets.forEach((element, index) => {
        element.style.setProperty('--reveal-delay', `${(index % 3) * 65}ms`);
        element.classList.add('scroll-reveal');
        const bounds = element.getBoundingClientRect();
        if (bounds.top < window.innerHeight - 32 && bounds.bottom > 0) reveal(element);
        else revealObserver.observe(element);
      });
    } catch {
      if (revealObserver) revealObserver.disconnect();
      revealTargets.forEach(element => element.classList.remove('scroll-reveal'));
    }
  }
  revealAnchor(window.location.hash);
  window.addEventListener('hashchange', () => revealAnchor(window.location.hash));
  document.addEventListener('focusin', event => {
    if (!(event.target instanceof Element)) return;
    revealTargets.forEach(element => { if (element.contains(event.target)) reveal(element); });
  });
  document.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const anchor = event.target.closest('a[href^="#"]');
    if (anchor) revealAnchor(anchor.getAttribute('href'));
  });

  // One small, non-interactive emoji follows fine pointers; the native cursor remains.
  let cursor = null;
  let cursorEnabled = false;
  let cursorFrame = 0;
  let hideTimer = 0;
  let popTimer = 0;
  let pointerX = -100;
  let pointerY = -100;
  let clickPending = false;
  const hideCursor = () => {
    window.clearTimeout(hideTimer);
    window.clearTimeout(popTimer);
    if (cursorFrame) window.cancelAnimationFrame(cursorFrame);
    cursorFrame = 0;
    clickPending = false;
    if (cursor) cursor.classList.remove('is-active', 'is-popping');
  };
  const syncCursorPreference = () => {
    cursorEnabled = finePointer.matches && !reducedMotion.matches;
    if (!cursorEnabled) {
      hideCursor();
      if (cursor) cursor.remove();
      cursor = null;
      return;
    }
    if (cursor) return;
    cursor = document.createElement('span');
    cursor.id = 'cursor-emoji';
    cursor.className = 'cursor-emoji';
    cursor.setAttribute('aria-hidden', 'true');
    const symbol = document.createElement('span');
    symbol.className = 'cursor-symbol';
    symbol.textContent = '🟣';
    cursor.append(symbol);
    document.body.append(cursor);
  };
  const popCursor = () => {
    if (!cursor) return;
    cursor.classList.remove('is-popping');
    // Restart a single-node animation only on arrival or a click, never each move.
    void cursor.offsetWidth;
    cursor.classList.add('is-popping');
    window.clearTimeout(popTimer);
    popTimer = window.setTimeout(() => {
      if (cursor) cursor.classList.remove('is-popping');
    }, 450);
  };
  const paintCursor = () => {
    cursorFrame = 0;
    if (!cursorEnabled || !cursor || document.hidden) return;
    cursor.style.setProperty('--cursor-x', `${pointerX}px`);
    cursor.style.setProperty('--cursor-y', `${pointerY}px`);
    const arriving = !cursor.classList.contains('is-active');
    cursor.classList.add('is-active');
    if (arriving || clickPending) popCursor();
    clickPending = false;
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(hideCursor, 850);
  };
  const trackPointer = event => {
    if (event.pointerType === 'touch') { hideCursor(); return; }
    if (!cursorEnabled) return;
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (event.type === 'pointerdown') clickPending = true;
    if (!cursorFrame) cursorFrame = window.requestAnimationFrame(paintCursor);
  };
  syncCursorPreference();
  document.addEventListener('pointermove', trackPointer, { passive: true });
  document.addEventListener('pointerdown', trackPointer, { passive: true });
  document.documentElement.addEventListener('pointerleave', hideCursor);
  window.addEventListener('blur', hideCursor);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) hideCursor();
    updateLandingMotion();
  });
  onMediaChange(reducedMotion, () => {
    updateLandingMotion();
    syncCursorPreference();
    if (reducedMotion.matches) revealAll();
  });
  onMediaChange(finePointer, syncCursorPreference);
})();
