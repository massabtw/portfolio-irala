import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

export const Hero = () => {
  const scene = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = scene.current;
    const panel = stage.current;
    if (!element || !panel) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let active = true;
    const update = () => {
      frame = 0;
      if (reduced.matches) { element.style.setProperty('--scene-progress', '0'); return; }
      const bounds = element.getBoundingClientRect();
      const distance = element.offsetHeight - panel.offsetHeight;
      const top = window.innerWidth <= 760 ? 76 : 96;
      const progress = distance > 0 ? Math.min(1, Math.max(0, (top - bounds.top) / distance)) : 0;
      element.style.setProperty('--scene-progress', progress.toFixed(4));
    };
    const schedule = () => { if (!frame && active) frame = requestAnimationFrame(update); };
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active) schedule();
    }, { rootMargin: '100px' });
    observer.observe(element);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reduced.addEventListener('change', update);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reduced.removeEventListener('change', update);
    };
  }, []);

  return (
    <section ref={scene} id="inicio" className="immersive-hero">
      <div ref={stage} className="scene-stage">
        <div className="container scene-layout">
          <div className="scene-copy">
            <p className="scene-intro">Felipe Irala · Designer gráfico</p>
            <h1><span>Um olhar.</span><span>Muitas formas.</span></h1>
            <p className="scene-description">Entre marcas, música e o cotidiano.<br />Transformo ideias em identidades visuais com propósito e personalidade.</p>
            <a className="text-link" href="#trabalhos">Explore meus trabalhos <ArrowDown size={18} aria-hidden="true" /></a>
          </div>
          <div className="scene-art" aria-hidden="true">
            <div className="scene-piece scene-photo"><img src="/projects/fotografias/1-cover-preview.webp" alt="" width="640" height="427" /></div>
            <div className="scene-piece scene-brand"><img src="/projects/ritmo-doce/1-cover-preview.webp" alt="" width="640" height="640" /></div>
            <div className="scene-piece scene-album"><img src="/projects/songs-key-of-life/1-cover-preview.webp" alt="" width="640" height="640" /></div>
          </div>
          <div className="scene-bottom">
            <span>Curitiba, Brasil</span>
            <div className="scene-scroll"><span>Role para explorar</span><span className="scene-track" aria-hidden="true"><span /></span></div>
            <a href="#sobre">Conheça quem cria <ArrowDown size={14} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
};
