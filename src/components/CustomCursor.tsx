import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { useMediaQuery } from './useMediaQuery';

export function CustomCursor({ disabled = false }: { disabled?: boolean }) {
  const enabled = useMediaQuery('(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)');
  return enabled && !disabled ? <DesktopCursor /> : null;
}

function DesktopCursor() {
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const follower = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  useEffect(() => {
    const element = root.current;
    const dotElement = dot.current;
    const followElement = follower.current;
    if (!element || !dotElement || !followElement) return;
    const xTo = gsap.quickTo(followElement, 'x', { duration: 0.42, ease: 'power3.out' });
    const yTo = gsap.quickTo(followElement, 'y', { duration: 0.42, ease: 'power3.out' });
    const magnets = new Map<HTMLElement, { x: ReturnType<typeof gsap.quickTo>; y: ReturnType<typeof gsap.quickTo>; original: string }>();
    let magnet: HTMLElement | null = null;
    let bounds: DOMRect | null = null;
    let visible = false;
    const release = () => { if (magnet) { const tween = magnets.get(magnet); tween?.x(0); tween?.y(0); } magnet = null; bounds = null; };
    const hide = () => {
      visible = false; element.classList.remove('is-visible');
      document.documentElement.classList.remove('has-custom-cursor');
      release(); element.dataset.mode = 'default';
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch') { hide(); return; }
      const target = event.target instanceof Element ? event.target : null;
      // A native dialog is in the top layer; leave its native pointer intact.
      if (!target || target.closest('dialog, input, textarea, select, [contenteditable="true"]')) { hide(); return; }
      if (!visible) {
        gsap.set(followElement, { x: event.clientX, y: event.clientY });
        xTo(event.clientX, event.clientX); yTo(event.clientY, event.clientY);
        visible = true; element.classList.add('is-visible'); document.documentElement.classList.add('has-custom-cursor');
      }
      dotElement.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      xTo(event.clientX); yTo(event.clientY);
      const card = target.closest('.project-card');
      const control = !card ? target.closest<HTMLElement>('a, button, .lang-btn, .icon-button') : null;
      element.dataset.mode = card ? 'project' : control ? 'control' : 'default';
      if (control !== magnet) {
        release(); magnet = control;
        if (magnet) {
          bounds = magnet.getBoundingClientRect();
          if (!magnets.has(magnet)) magnets.set(magnet, {
            original: magnet.style.transform,
            x: gsap.quickTo(magnet, 'x', { duration: 0.7, ease: 'elastic.out(1, 0.65)' }),
            y: gsap.quickTo(magnet, 'y', { duration: 0.7, ease: 'elastic.out(1, 0.65)' }),
          });
        }
      }
      if (magnet && bounds) {
        const tween = magnets.get(magnet)!;
        tween.x(gsap.utils.clamp(-8, 8, (event.clientX - bounds.left - bounds.width / 2) * 0.12));
        tween.y(gsap.utils.clamp(-8, 8, (event.clientY - bounds.top - bounds.height / 2) * 0.12));
      }
    };
    const keyboard = (event: KeyboardEvent) => { if (event.key === 'Tab') hide(); };
    const scroll = () => { release(); element.dataset.mode = 'default'; };
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('mouseleave', hide);
    document.addEventListener('keydown', keyboard);
    window.addEventListener('blur', hide);
    window.addEventListener('scroll', scroll, { passive: true });
    return () => {
      document.removeEventListener('pointermove', move); document.removeEventListener('mouseleave', hide);
      document.removeEventListener('keydown', keyboard); window.removeEventListener('blur', hide); window.removeEventListener('scroll', scroll);
      hide(); xTo.tween.kill(); yTo.tween.kill();
      magnets.forEach((tween, node) => { tween.x.tween.kill(); tween.y.tween.kill(); gsap.set(node, { clearProps: 'transform' }); node.style.transform = tween.original; });
    };
  }, []);
  return createPortal(<div ref={root} className="custom-cursor" data-mode="default" aria-hidden="true">
    <div ref={dot} className="cursor-dot"><span /></div>
    <div ref={follower} className="cursor-follower"><span className="cursor-ring"><span>{translations[language].experience.viewProject}</span></span></div>
  </div>, document.body);
}
