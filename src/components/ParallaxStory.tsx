import { useEffect, useRef } from 'react';

export const ParallaxStory = () => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let active = false;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const depth = reduced.matches ? 0 : Math.max(-1, Math.min(1, (window.innerHeight / 2 - rect.top - rect.height / 2) / ((window.innerHeight + rect.height) / 2)));
      element.style.setProperty('--depth', depth.toFixed(4));
    };
    const schedule = () => { if (active && !frame) frame = requestAnimationFrame(update); };
    const observer = new IntersectionObserver(([entry]) => { active = entry.isIntersecting; if (active) schedule(); }, { rootMargin: '100px' });
    observer.observe(element);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reduced.addEventListener('change', update);
    update();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); reduced.removeEventListener('change', update); };
  }, []);
  return (
    <section ref={ref} className="parallax-story" aria-labelledby="visual-story-title">
      <img src="/projects/fotografias/1-cover.webp" width="1600" height="1067" loading="lazy" alt="Roda de samba registrada por Felipe Irala" />
      <div className="container"><h2 id="visual-story-title"><span>O cotidiano</span><span>vira repertório.</span></h2><p>Música, encontros e um olhar sempre em movimento.</p></div>
    </section>
  );
};
