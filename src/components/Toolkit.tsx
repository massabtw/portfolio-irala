import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Toolkit = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const items = grid.querySelectorAll('.service');

      // Desktop: Subtle staggered scroll float
      mm.add('(min-width: 769px)', () => {
        items.forEach((item, index) => {
          gsap.fromTo(
            item,
            { y: index * 24 },
            {
              y: -index * 16,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        });
      });

      // Mobile: Progressive scroll reveal and soft lift
      mm.add('(max-width: 768px)', () => {
        items.forEach((item) => {
          gsap.fromTo(
            item,
            {
              y: 28,
              opacity: 0.55,
            },
            {
              y: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 92%',
                end: 'top 65%',
                scrub: 0.8,
              },
            }
          );
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="habilidades" className="container services" aria-labelledby="services-title">
      <div className="services-heading">
        <p className="section-label">{t.toolkit.label}</p>
        <h2 id="services-title">
          {t.toolkit.titleLine1}<br />{t.toolkit.titleLine2}
        </h2>
      </div>
      <div ref={gridRef} className="services-grid">
        {t.toolkit.services.map(service => (
          <div key={service.title} className="service">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <span>{service.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
