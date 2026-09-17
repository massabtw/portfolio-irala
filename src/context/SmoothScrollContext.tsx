import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
interface SmoothScrollContextType {
  lenis: Lenis | null;
  stopScroll: (owner?: string) => void;
  startScroll: (owner?: string) => void;
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => void;
}
const SmoothScrollContext = createContext<SmoothScrollContextType>({ lenis: null, stopScroll: () => {}, startScroll: () => {}, scrollTo: () => {} });
export const useSmoothScroll = () => useContext(SmoothScrollContext);

export const SmoothScrollProvider = ({ children }: { children: ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const locks = useRef(new Set<string>());
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const stopScroll = useCallback((owner = 'default') => {
    locks.current.add(owner);
    document.documentElement.classList.add('scroll-locked');
    lenisRef.current?.stop();
  }, []);
  const startScroll = useCallback((owner = 'default') => {
    locks.current.delete(owner);
    if (locks.current.size) return;
    document.documentElement.classList.remove('scroll-locked');
    lenisRef.current?.start();
  }, []);
  const scrollTo = useCallback((target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => {
    if (!locks.current.size) lenisRef.current?.scrollTo(target, options);
  }, []);

  useEffect(() => {
    let disposed = false;
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true, syncTouch: false, wheelMultiplier: 0.95,
      prevent: node => !!node.closest('dialog, [data-lenis-prevent]') });
    lenisRef.current = lenis;
    setLenisInstance(lenis);
    if (locks.current.size) lenis.stop();
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    // Lenis handles reduced-motion changes itself, without stopping native scrolling.
    const anchor = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      if (!link) return;
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const element = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!element) return;
      event.preventDefault();
      // Let React close a mobile menu and release its lock first.
      queueMicrotask(() => {
        if (disposed || locks.current.size) return;
        lenis.scrollTo(hash === '#inicio' ? 0 : element, { duration: 1.2, onComplete: () => {
          if (link.classList.contains('skip-link')) { element.tabIndex = -1; element.focus({ preventScroll: true }); }
        } });
      });
    };
    document.addEventListener('click', anchor);
    document.fonts?.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
    return () => {
      disposed = true;
      document.removeEventListener('click', anchor);
      gsap.ticker.remove(tick); lenis.off('scroll', ScrollTrigger.update); lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove('scroll-locked');
    };
  }, []);
  const value = useMemo(() => ({ lenis: lenisInstance, stopScroll, startScroll, scrollTo }), [lenisInstance, stopScroll, startScroll, scrollTo]);
  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
};
