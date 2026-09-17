import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { designerProfile } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const photoFrameRef = useRef<HTMLDivElement>(null);
  const photoImgRef = useRef<HTMLImageElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const factsRef = useRef<HTMLDListElement>(null);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const section = sectionRef.current;
    const img = photoImgRef.current;
    const copy = copyRef.current;
    const facts = factsRef.current;

    if (!section || !img || !copy) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: Full counter-scroll and editorial copy float
      mm.add('(min-width: 769px)', () => {
        gsap.fromTo(
          img,
          {
            yPercent: -14,
            scale: 1.18,
          },
          {
            yPercent: 14,
            scale: 1.05,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          copy,
          {
            y: 35,
            opacity: 0.85,
          },
          {
            y: -25,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );

        if (facts) {
          gsap.fromTo(
            facts,
            { y: 20 },
            {
              y: -15,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom top',
                scrub: 1.4,
              },
            }
          );
        }
      });

      // Mobile: Calibrated photo window counter-scroll and subtle copy lift
      mm.add('(max-width: 768px)', () => {
        gsap.fromTo(
          img,
          {
            yPercent: -10,
            scale: 1.16,
          },
          {
            yPercent: 10,
            scale: 1.04,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          }
        );

        gsap.fromTo(
          copy,
          {
            y: 20,
            opacity: 0.9,
          },
          {
            y: -10,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.0,
            },
          }
        );

        if (facts) {
          gsap.fromTo(
            facts,
            { y: 12 },
            {
              y: -8,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                end: 'bottom top',
                scrub: 1.1,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="sobre" className="about-section">
      <div className="container about-grid">
        <div className="about-photo">
          <figure>
            <div ref={photoFrameRef} className="about-photo-frame">
              <img
                ref={photoImgRef}
                src="/projects/fotografias/3-rua.webp"
                alt="Registro autoral de fotografia de rua por Felipe Irala"
                width="1200"
                height="1500"
                loading="lazy"
                className="about-parallax-img"
              />
            </div>
            <figcaption>{t.about.caption}</figcaption>
          </figure>
        </div>

        <div ref={copyRef} className="about-copy">
          <p className="section-label">{t.about.label}</p>
          <h2>
            {t.about.headingLine1}<br />{t.about.headingLine2}
          </h2>
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <a
            className="text-link"
            href={designerProfile.contacts.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.about.moreCta} <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <dl ref={factsRef} className="about-facts">
            <div>
              <dt>{t.about.baseLabel}</dt>
              <dd>{t.about.baseVal}</dd>
            </div>
            <div>
              <dt>{t.about.educationLabel}</dt>
              <dd>{t.about.educationVal}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};
