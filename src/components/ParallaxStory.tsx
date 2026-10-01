import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

gsap.registerPlugin(ScrollTrigger);

const pieces = [
  { name: 'photo', src: '/projects/fotografias/1-cover.webp', x: 24, y: -28, rotation: 12 },
  { name: 'brand', src: '/projects/ritmo-doce/2-logo-preview.webp', x: -40, y: 35, rotation: -18 },
  { name: 'album', src: '/projects/songs-key-of-life/1-cover.webp', x: 36, y: 42, rotation: 16 },
  { name: 'detail', src: '/projects/fotografias/2-luz-preview.webp', x: -32, y: -35, rotation: -14 },
];

export const ParallaxStory = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add({
        desktop: '(min-width: 769px)',
        mobile: '(max-width: 768px)',
        reduced: '(prefers-reduced-motion: reduce)',
      }, context => {
        const { desktop, reduced } = context.conditions!;
        // CSS is the assembled poster, also used when motion is disabled.
        if (reduced) return;

        const intensity = desktop ? 1 : 0.45;
        const timeline = gsap.timeline({
          scrollTrigger: {
            id: 'living-poster',
            trigger: section,
            start: desktop ? 'top 96px' : 'top 75%',
            end: desktop ? '+=75%' : 'bottom 20%',
            pin: !!desktop,
            scrub: desktop ? 0.8 : 0.5,
            anticipatePin: desktop ? 1 : 0,
            invalidateOnRefresh: true,
          },
        });

        pieces.forEach((piece, index) => {
          const target = section.querySelector(`.poster-piece-${piece.name}`);
          timeline.fromTo(target, {
            xPercent: piece.x * intensity,
            yPercent: piece.y * intensity,
            rotation: piece.rotation * intensity,
            scale: 0.94,
          }, {
            xPercent: 0, yPercent: 0, rotation: 0, scale: 1,
            duration: 0.4, ease: 'power2.inOut',
          }, index * 0.035);

          // The assembled interval gives the viewer time to read the poster.
          timeline.to(target, {
            xPercent: piece.x * intensity * 0.35,
            yPercent: piece.y * intensity * 0.3,
            rotation: piece.rotation * intensity * 0.25,
            duration: 0.22, ease: 'power1.inOut',
          }, 0.78);
        });

        timeline.fromTo('.poster-copy', { y: desktop ? 28 : 14 }, {
          y: 0, duration: 0.4, ease: 'power2.out',
        }, 0);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="parallax-story living-poster" aria-labelledby="visual-story-title">
      <div className="container poster-layout">
        <div className="poster-copy">
          <h2 id="visual-story-title">
            <span>{t.story.line1}</span>
            <span>{t.story.line2}</span>
          </h2>
          <p>{t.story.subtitle}</p>
        </div>
        <div className="poster-art" aria-hidden="true">
          {pieces.map(piece => (
            <div key={piece.name} className={`poster-piece poster-piece-${piece.name}`}>
              <img src={piece.src} alt="" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};