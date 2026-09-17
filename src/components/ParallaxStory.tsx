import { useMediaQuery } from './useMediaQuery';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

gsap.registerPlugin(ScrollTrigger);

export const ParallaxStory = () => {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const { language } = useLanguage();
  const t = translations[language];
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const textLine1Ref = useRef<HTMLSpanElement>(null);
  const textLine2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bgImage = bgImageRef.current;
    const content = contentWrapperRef.current;
    const textLine1 = textLine1Ref.current;
    const textLine2 = textLine2Ref.current;
    const subtitle = subtitleRef.current;
    const overlay = overlayRef.current;

    if (!section || !bgImage || !content || !textLine1 || !textLine2 || !subtitle || !overlay) return;

    const prefersReducedMotion = reduced;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Show text statically for users preferring reduced motion
        gsap.set(content, { opacity: 1, pointerEvents: 'auto' });
        gsap.set([textLine1, textLine2], { xPercent: 0, opacity: 1 });
        gsap.set(subtitle, { y: 0, opacity: 1 });
        return;
      }

      const mm = gsap.matchMedia();

      // =========================================================================
      // DESKTOP & TABLET: TWO-PHASE CINEMATIC CHOREOGRAPHY
      // =========================================================================
      mm.add('(min-width: 769px) and (pointer: fine)', () => {
        // Ensure text is initially 100% invisible during descent
        gsap.set(content, { opacity: 0, pointerEvents: 'none' });

        // -----------------------------------------------------------------------
        // FASE 1: Transição de Entrada Ativa (start: 'top bottom' -> 'top top')
        // Enquanto o usuário desce da grade de projetos até o topo desta seção,
        // a foto de samba já se move ativamente em profundidade analógica
        // (eliminando a sensação de imagem estática no momento da transição).
        // O texto permanece 100% oculto nesta fase.
        // -----------------------------------------------------------------------
        gsap.fromTo(
          bgImage,
          {
            yPercent: -22,
            scale: 1.28,
          },
          {
            yPercent: 0,
            scale: 1.15,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top top',
              scrub: 0.9,
              invalidateOnRefresh: true,
            },
          }
        );

        // -----------------------------------------------------------------------
        // FASE 2: Palco Travado & Surgimento Cinematográfico
        // (start: 'top top' -> end: '+=140%', pin: true)
        // Quando a tela trava no topo, o texto surge do nada (fade in + vetores
        // opostos), descansa legível no centro e dissolve suavemente no desfecho.
        // -----------------------------------------------------------------------
        const pinnedTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=140%',
            pin: true,
            scrub: 1.1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // 1. Surgimento do texto (0% a 35% do pin)
        pinnedTl
          .to(
            content,
            {
              opacity: 1,
              pointerEvents: 'auto',
              duration: 0.35,
              ease: 'power2.out',
            },
            0
          )
          .fromTo(
            textLine1,
            { xPercent: -50, opacity: 0 },
            { xPercent: 0, opacity: 1, duration: 0.45, ease: 'power2.out' },
            0
          )
          .fromTo(
            textLine2,
            { xPercent: 50, opacity: 0 },
            { xPercent: 0, opacity: 1, duration: 0.45, ease: 'power2.out' },
            0
          )
          .fromTo(
            subtitle,
            { y: 35, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
            0.15
          )
          .to(
            bgImage,
            {
              scale: 1.02,
              yPercent: 8,
              duration: 1.0,
              ease: 'none',
            },
            0
          )
          .to(
            overlay,
            {
              opacity: 0.7,
              duration: 0.5,
              ease: 'none',
            },
            0
          );

        // 2. Leitura repousada no centro (35% a 70% do pin - mantido estável)

        // 3. Dissolução suave no final do pin (70% a 100% do pin)
        pinnedTl
          .to(
            textLine1,
            {
              xPercent: 18,
              opacity: 0,
              duration: 0.3,
              ease: 'power1.in',
            },
            0.7
          )
          .to(
            textLine2,
            {
              xPercent: -18,
              opacity: 0,
              duration: 0.3,
              ease: 'power1.in',
            },
            0.7
          )
          .to(
            subtitle,
            {
              opacity: 0,
              y: -20,
              duration: 0.25,
              ease: 'power1.in',
            },
            0.75
          );
      });

      // =========================================================================
      // MOBILE: CONTINUOUS UNPINNED VIEWPORT SCRUB (ZERO FREEZES, 60-120 FPS)
      // =========================================================================
      mm.add('(max-width: 768px), (pointer: coarse)', () => {
        // Initial state
        gsap.set(content, { opacity: 0, pointerEvents: 'auto' });
        gsap.set(textLine1, { xPercent: -28, opacity: 0 });
        gsap.set(textLine2, { xPercent: 28, opacity: 0 });
        gsap.set(subtitle, { y: 20, opacity: 0 });

        // Background parallax: active, continuous image translation
        gsap.fromTo(
          bgImage,
          {
            yPercent: -14,
            scale: 1.18,
          },
          {
            yPercent: 12,
            scale: 1.04,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          }
        );

        // Content choreography as section traverses the viewport:
        // Enters theatrical (top 75% -> top 30%), rests legible, dissolves out smoothly (bottom 40% -> bottom 10%)
        const mobileStoryTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'bottom 15%',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        // 1. Entrance: text slides in from opposing vectors and fades in (0% to 35% of timeline)
        mobileStoryTl
          .to(
            content,
            {
              opacity: 1,
              duration: 0.25,
              ease: 'power2.out',
            },
            0
          )
          .to(
            textLine1,
            {
              xPercent: 0,
              opacity: 1,
              duration: 0.35,
              ease: 'power2.out',
            },
            0
          )
          .to(
            textLine2,
            {
              xPercent: 0,
              opacity: 1,
              duration: 0.35,
              ease: 'power2.out',
            },
            0
          )
          .to(
            subtitle,
            {
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out',
            },
            0.08
          )
          .to(
            overlay,
            {
              opacity: 0.72,
              duration: 0.35,
              ease: 'none',
            },
            0
          );

        // 2. Reading plateau: text remains centered & clearly legible (35% to 68%)

        // 3. Gentle exit: text dissolves gracefully before section leaves viewport (68% to 100%)
        mobileStoryTl
          .to(
            textLine1,
            {
              xPercent: 12,
              opacity: 0,
              duration: 0.28,
              ease: 'power1.in',
            },
            0.70
          )
          .to(
            textLine2,
            {
              xPercent: -12,
              opacity: 0,
              duration: 0.28,
              ease: 'power1.in',
            },
            0.70
          )
          .to(
            subtitle,
            {
              y: -14,
              opacity: 0,
              duration: 0.24,
              ease: 'power1.in',
            },
            0.74
          );
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="parallax-story" aria-labelledby="visual-story-title">
      <img
        ref={bgImageRef}
        src="/projects/fotografias/1-cover.webp"
        width="1600"
        height="1067"
        loading="lazy"
        alt={t.story.photoAlt}
        className="parallax-story-img"
      />
      <div ref={overlayRef} className="parallax-story-overlay" aria-hidden="true" />
      <div ref={contentWrapperRef} className="container parallax-story-content">
        <h2 id="visual-story-title">
          <span ref={textLine1Ref} className="story-line story-line-left">{t.story.line1}</span>
          <span ref={textLine2Ref} className="story-line story-line-right">{t.story.line2}</span>
        </h2>
        <p ref={subtitleRef}>{t.story.subtitle}</p>
      </div>
    </section>
  );
};
