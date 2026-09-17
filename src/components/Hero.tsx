import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
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

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. GSAP ScrollTrigger Multi-Plane Parallax Timeline
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.1,
            invalidateOnRefresh: true,
          },
        });

        // Layered dispersion on scroll
        tl.to(
          photo,
          {
            y: -110,
            x: -45,
            rotation: -18,
            ease: 'none',
          },
          0
        )
          .to(
            brand,
            {
              y: 75,
              x: -25,
              rotation: 12,
              scale: 0.94,
              ease: 'none',
            },
            0
          )
          .to(
            album,
            {
              y: -60,
              x: 40,
              rotation: -3,
              scale: 1.14,
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
      }
    }, section);

    // 2. Interactive 3D Cursor Tilt Micro-Interaction (Awwwards staple)
    let pointerActive = false;
    const handlePointerMove = (e: PointerEvent) => {
      if (prefersReducedMotion || window.innerWidth < 768) return;
      const rect = art.getBoundingClientRect();
      const xNorm = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const yNorm = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      // Clamp values between -1.2 and 1.2
      const clampedX = Math.max(-1.2, Math.min(1.2, xNorm));
      const clampedY = Math.max(-1.2, Math.min(1.2, yNorm));

      pointerActive = true;

      // Rotate stage subtly with spring physics
      gsap.to(art, {
        rotateY: clampedX * 9,
        rotateX: -clampedY * 9,
        transformPerspective: 1100,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      // Individual layer micro-displacement for stereoscopic 3D feel
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
    sectionEl.addEventListener('pointermove', handlePointerMove, { passive: true });
    sectionEl.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      sectionEl.removeEventListener('pointermove', handlePointerMove);
      sectionEl.removeEventListener('pointerleave', handlePointerLeave);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="inicio" className="immersive-hero">
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
            <div ref={photoRef} className="scene-piece scene-photo">
              <img src="/projects/fotografias/1-cover-preview.webp" alt="" width="640" height="427" />
            </div>
            <div ref={brandRef} className="scene-piece scene-brand">
              <img src="/projects/ritmo-doce/2-logo-preview.webp" alt="" width="640" height="640" />
            </div>
            <div ref={albumRef} className="scene-piece scene-album">
              <img src="/projects/songs-key-of-life/1-cover-preview.webp" alt="" width="640" height="640" />
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
