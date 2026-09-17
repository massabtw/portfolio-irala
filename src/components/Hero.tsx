import { useMediaQuery } from './useMediaQuery';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero = ({ introReady = true }: { introReady?: boolean }) => {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const fine = useMediaQuery('(pointer: fine) and (hover: hover)');
  const { language } = useLanguage();
  const t = translations[language];
  const sectionRef = useRef<HTMLElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const albumRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const art = artRef.current;
    const photo = photoRef.current;
    const brand = brandRef.current;
    const album = albumRef.current;
    if (!section || !art || !photo || !brand || !album) return;

    const prefersReducedMotion = reduced;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      const mm = gsap.matchMedia();

      // =========================================================================
      // DESKTOP: MULTI-PLANE PARALLAX TIMELINE & DISPERSION
      // =========================================================================
      mm.add('(min-width: 769px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(
          photo,
          {
            y: -95,
            x: -40,
            rotation: -8,
            ease: 'none',
          },
          0
        )
          .to(
            brand,
            {
              y: 70,
              x: -22,
              rotation: 8,
              scale: 0.95,
              ease: 'none',
            },
            0
          )
          .to(
            album,
            {
              y: -50,
              x: 35,
              rotation: -4,
              scale: 1.12,
              ease: 'none',
            },
            0
          )
          .to(
            titleLine1Ref.current,
            {
              x: -30,
              ease: 'none',
            },
            0
          )
          .to(
            titleLine2Ref.current,
            {
              x: 30,
              ease: 'none',
            },
            0
          )
          .to(
            copyRef.current,
            {
              y: -50,
              opacity: 0.35,
              ease: 'none',
            },
            0
          );
      });

      // =========================================================================
      // MOBILE: LAYERED 3D COMPOSITION DISPERSION & DRIFT
      // =========================================================================
      mm.add('(max-width: 768px)', () => {
        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        });

        mobileTl
          .to(
            photo,
            {
              yPercent: -18,
              xPercent: -14,
              rotation: -5,
              ease: 'none',
            },
            0
          )
          .to(
            brand,
            {
              yPercent: 20,
              xPercent: 14,
              rotation: 6,
              ease: 'none',
            },
            0
          )
          .to(
            album,
            {
              scale: 1.08,
              yPercent: -8,
              ease: 'none',
            },
            0
          )
          .to(
            titleLine1Ref.current,
            {
              x: -16,
              ease: 'none',
            },
            0
          )
          .to(
            titleLine2Ref.current,
            {
              x: 16,
              ease: 'none',
            },
            0
          )
          .to(
            copyRef.current,
            {
              opacity: 0.35,
              y: -22,
              ease: 'none',
            },
            0
          );
      });
    }, section);

    // 2. Interactive 3D Cursor Tilt (Desktop only)
    let pointerActive = false;
    const handlePointerMove = (e: PointerEvent) => {
      if (prefersReducedMotion || window.innerWidth < 768 || e.pointerType === 'touch') return;
      const rect = art.getBoundingClientRect();
      const xNorm = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const yNorm = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      const clampedX = Math.max(-1.2, Math.min(1.2, xNorm));
      const clampedY = Math.max(-1.2, Math.min(1.2, yNorm));

      pointerActive = true;

      gsap.to(art, {
        rotateY: clampedX * 9,
        rotateX: -clampedY * 9,
        transformPerspective: 1100,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      gsap.to(photo, {
        xPercent: clampedX * 5,
        yPercent: clampedY * 5,
        duration: 0.7,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      gsap.to(brand, {
        xPercent: -clampedX * 4,
        yPercent: -clampedY * 4,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      gsap.to(album, {
        xPercent: clampedX * 3,
        yPercent: clampedY * 3,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handlePointerLeave = () => {
      if (!pointerActive) return;
      pointerActive = false;
      gsap.to([art, photo, brand, album], {
        rotateX: 0,
        rotateY: 0,
        xPercent: 0,
        yPercent: 0,
        duration: 0.9,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const sectionEl = section;
    if (fine && !reduced && introReady) {
      sectionEl.addEventListener('pointermove', handlePointerMove, { passive: true });
      sectionEl.addEventListener('pointerleave', handlePointerLeave);
    }

    return () => {
      sectionEl.removeEventListener('pointermove', handlePointerMove);
      sectionEl.removeEventListener('pointerleave', handlePointerLeave);
      gsap.killTweensOf([art, photo, brand, album]);
      ctx.revert();
    };
  }, [reduced, fine, introReady]);

  useLayoutEffect(() => {
    const art = artRef.current;
    if (!art) return;
    const pieces = Array.from(art.querySelectorAll<HTMLElement>('.scene-piece'));
    const context = gsap.context(() => {
      if (reduced) return;
      if (!introReady) { gsap.set(pieces, { opacity: 0 }); return; }
      const resting = pieces.map(piece => ({ x: Number(gsap.getProperty(piece, 'x')), y: Number(gsap.getProperty(piece, 'y')), rotation: Number(gsap.getProperty(piece, 'rotation')) }));
      gsap.fromTo(pieces, { x: 0, y: 0, rotation: 0, scale: 0.7, opacity: 0 },
        { x: i => resting[i].x, y: i => resting[i].y, rotation: i => resting[i].rotation, scale: 1, opacity: 1, duration: 1.05, stagger: 0.11, ease: 'expo.out', clearProps: 'transform,opacity' });
    }, art);
    return () => context.revert();
  }, [introReady, reduced]);

  return (
    <section ref={sectionRef} id="inicio" className="immersive-hero" data-intro-ready={introReady}>
      <div className="scene-stage">
        <div className="container scene-layout">
          <div ref={copyRef} className="scene-copy">
            <p className="scene-intro">{t.hero.intro}</p>
            <h1>
              <span ref={titleLine1Ref} className="hero-title-line">{t.hero.titleLine1}</span>
              <span ref={titleLine2Ref} className="hero-title-line">{t.hero.titleLine2}</span>
            </h1>
            <p className="scene-description" style={{ whiteSpace: 'pre-line' }}>
              {t.hero.description}
            </p>
            <a className="text-link" href="#trabalhos">
              {t.hero.exploreCta} <ArrowDown size={18} aria-hidden="true" />
            </a>
          </div>

          <div ref={artRef} className="scene-art" aria-hidden="true">
            <div className="scene-piece scene-photo">
              <div className="scene-piece-reveal"><div ref={photoRef} className="scene-piece-inner">
                <img src="/projects/fotografias/1-cover-preview.webp" alt="" width="640" height="427" />
              </div></div>
            </div>
            <div className="scene-piece scene-brand">
              <div className="scene-piece-reveal"><div ref={brandRef} className="scene-piece-inner">
                <img src="/projects/ritmo-doce/2-logo-preview.webp" alt="" width="640" height="640" />
              </div></div>
            </div>
            <div className="scene-piece scene-album">
              <div className="scene-piece-reveal"><div ref={albumRef} className="scene-piece-inner">
                <img src="/projects/songs-key-of-life/1-cover-preview.webp" alt="" width="640" height="640" />
              </div></div>
            </div>
          </div>

          <div className="scene-bottom">
            <span>{t.hero.location}</span>
            <a href="#sobre">
              {t.hero.meetCreator} <ArrowDown size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
