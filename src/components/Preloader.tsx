import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { useMediaQuery } from './useMediaQuery';

const SESSION_KEY = 'irala-intro-seen-v1';
export function shouldShowPreloader(force = false) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (force) return true;
  try { return sessionStorage.getItem(SESSION_KEY) !== 'true'; } catch { return true; }
}

export function Preloader({ onReveal, onComplete }: { onReveal: () => void; onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const skip = useRef<() => void>(() => {});
  const { language } = useLanguage();
  const t = translations[language].experience;
  const { stopScroll, startScroll } = useSmoothScroll();
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    let completed = false;
    let revealed = false;
    const reveal = () => { if (!revealed) { revealed = true; onReveal(); } };
    const finish = () => {
      if (completed) return;
      completed = true;
      reveal();
      try { sessionStorage.setItem(SESSION_KEY, 'true'); } catch { /* Storage is optional. */ }
      startScroll('preloader'); onComplete();
    };
    skip.current = finish;
    if (reduced) { finish(); return; }
    stopScroll('preloader');
    const progress = { value: 0 };
    const context = gsap.context(() => {
      gsap.timeline({ onComplete: finish })
        .to(progress, { value: 80, duration: 0.45, ease: 'power2.out', onUpdate: updateCounter })
        .to(progress, { value: 92, duration: 0.5, ease: 'power1.inOut', onUpdate: updateCounter })
        .to(progress, { value: 100, duration: 0.25, ease: 'power2.in', onUpdate: updateCounter })
        .call(reveal)
        .to(element, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' })
        .from('.preloader-name, .preloader-role', { y: 24, opacity: 0, stagger: 0.1, duration: 0.65, ease: 'power3.out' }, 0)
        .to('.preloader-identity', { y: -30, opacity: 0, duration: 0.6 }, 1.2);
    }, element);
    function updateCounter() { if (counter.current) counter.current.textContent = String(Math.round(progress.value)).padStart(2, '0'); }
    // Never leave the page blocked if animation rendering is interrupted.
    const timeout = window.setTimeout(finish, 5000);
    return () => { clearTimeout(timeout); context.revert(); startScroll('preloader'); };
  }, [onReveal, onComplete, reduced, startScroll, stopScroll]);

  return <div ref={root} className="preloader" role="region" aria-label={t.introduction}>
    <div className="preloader-top"><span>FI</span><button type="button" onClick={() => skip.current()}>{t.skipIntro}</button></div>
    <div className="preloader-identity"><p className="preloader-name">FELIPE IRALA</p><p className="preloader-role">{t.role}</p></div>
    <div className="preloader-bottom" aria-hidden="true"><span>PORTFOLIO</span><span className="preloader-counter"><span ref={counter}>00</span><span>%</span></span></div>
  </div>;
}
