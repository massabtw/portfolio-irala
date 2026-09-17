import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Pause, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { useMediaQuery } from './useMediaQuery';

gsap.registerPlugin(ScrollTrigger);
export function KineticMarquee() {
  const { language } = useLanguage();
  const t = translations[language].experience;
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const syncRef = useRef<() => void>(() => {});
  useEffect(() => syncRef.current(), [paused]);
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = section.current;
    const belt = track.current;
    const unit = group.current;
    if (!element || !belt || !unit || reduced) return;
    let width = 1;
    let offset = 0;
    let speed = -38;
    let direction = -1;
    let inView = false;
    let ticking = false;
    const velocity = ScrollTrigger.create({ trigger: element, start: 'top bottom', end: 'bottom top' });
    const measure = () => { width = Math.max(1, unit.getBoundingClientRect().width); offset %= width; };
    const tick = (_time: number, delta: number) => {
      const v = velocity.getVelocity();
      if (Math.abs(v) > 25) direction = v > 0 ? -1 : 1;
      const target = direction * (38 + Math.min(Math.abs(v) * 0.15, 350));
      const dt = Math.min(delta / 1000, 0.05);
      speed += (target - speed) * (1 - Math.exp(-5 * dt));
      offset = ((offset + speed * dt) % width + width) % width;
      belt.style.transform = `translate3d(${offset - width}px,0,0)`;
    };
    const sync = () => {
      const run = inView && !document.hidden && !pausedRef.current;
      if (run && !ticking) { gsap.ticker.add(tick); ticking = true; }
      if (!run && ticking) { gsap.ticker.remove(tick); ticking = false; }
    };
    syncRef.current = sync;
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); });
    const resize = new ResizeObserver(measure);
    measure(); observer.observe(element); resize.observe(unit);
    document.addEventListener('visibilitychange', sync);
    return () => {
      gsap.ticker.remove(tick); velocity.kill(); observer.disconnect(); resize.disconnect();
      document.removeEventListener('visibilitychange', sync); belt.style.removeProperty('transform');
      syncRef.current = () => {};
    };
  }, [language, reduced]);

  return <section ref={section} className={`kinetic-marquee ${reduced ? 'is-static' : ''}`} aria-label={t.disciplines}>
    <p className="sr-only">{t.marquee.join(' · ')}</p>
    <div className="marquee-window" aria-hidden="true"><div ref={track} className="marquee-track">
      {Array.from({ length: reduced ? 1 : 3 }, (_, copy) => <div ref={copy === 0 ? group : undefined} className="marquee-group" key={copy}>
        {t.marquee.map((word, index) => <span className={index % 2 ? 'marquee-outline' : ''} key={word}>{word}<span className="marquee-separator">•</span></span>)}
      </div>)}
    </div></div>
    {!reduced && <button className="marquee-toggle icon-button" type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? t.playMarquee : t.pauseMarquee} aria-pressed={paused}>
      {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
    </button>}
  </section>;
}
