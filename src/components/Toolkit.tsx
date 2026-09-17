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
      const items = grid.querySelectorAll('.service');
      // Subtle staggered scroll float on desktop
      if (window.innerWidth >= 768) {
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
      }
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
