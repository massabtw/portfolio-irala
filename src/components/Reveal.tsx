import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

export const Reveal = ({ children, className = '', variant = 'rise', delay = 0 }: { children: ReactNode; className?: string; variant?: 'rise' | 'heading'; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [waiting, setWaiting] = useState(false);
  useEffect(() => {
    const element = ref.current;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!element || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      // Reset only after the entire element leaves the viewport, in either direction.
      setWaiting(!entry.isIntersecting && !element.contains(document.activeElement));
    }, { threshold: 0 });
    const syncMotion = () => {
      observer.disconnect();
      if (media.matches) { setWaiting(false); return; }
      const bounds = element.getBoundingClientRect();
      setWaiting(bounds.bottom <= 0 || bounds.top >= window.innerHeight);
      observer.observe(element);
    };
    syncMotion();
    media.addEventListener('change', syncMotion);
    return () => { observer.disconnect(); media.removeEventListener('change', syncMotion); };
  }, []);
  return <div ref={ref} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties} className={`reveal reveal-${variant} ${waiting ? 'is-waiting' : ''} ${className}`}>{children}</div>;
};
