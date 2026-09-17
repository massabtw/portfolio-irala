import { useEffect, useRef } from 'react';
import { ArrowUp, ArrowUpRight, MessageCircle, FileText } from 'lucide-react';
import { designerProfile } from '../data/projects';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const { contacts } = designerProfile;
  const footerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLAnchorElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const { scrollTo } = useSmoothScroll();
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const footer = footerRef.current;
    const title = titleRef.current;
    const arrow = arrowRef.current;
    if (!footer || !title) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Monumental headline upward scrub
      gsap.fromTo(
        title,
        {
          y: 40,
          opacity: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 85%',
            end: 'bottom bottom',
            scrub: 1,
          },
        }
      );

      // Arrow dynamic drift
      if (arrow) {
        gsap.fromTo(
          arrow,
          { x: -10, y: 10 },
          {
            x: 0,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: footer,
              start: 'top 80%',
              end: 'bottom bottom',
              scrub: 1,
            },
          }
        );
      }
    }, footer);

    return () => ctx.revert();
  }, []);

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo(0, { duration: 1.5 });
  };

  return (
    <footer ref={footerRef} id="contato" className="contact">
      <div className="container">
        <div className="contact-header">
          <p className="contact-intro">{t.footer.intro}</p>
          <a
            ref={titleRef}
            className="contact-title"
            href={contacts.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.footer.titleLine1}<br />{t.footer.titleLine2}
            <ArrowUpRight ref={arrowRef} aria-hidden="true" />
          </a>
        </div>

        <div>
          <div className="direct-contact">
            <a
              className="whatsapp-contact"
              href={contacts.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={24} aria-hidden="true" />
              <span>
                <strong>{t.footer.whatsappTitle}</strong>
                <span>{contacts.whatsappNumber}</span>
              </span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>

            <a
              className="cv-contact"
              href={t.footer.cvPdf}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.footer.cvTitle}
            >
              <FileText size={24} aria-hidden="true" />
              <span>
                <strong>{t.footer.cvTitle}</strong>
                <span>{t.footer.cvSubtitle}</span>
              </span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>

            <a className="email-contact" href={`mailto:${contacts.email}`}>
              <span>{t.footer.emailSubtitle}</span>
              {contacts.email}
            </a>
          </div>

          <div className="contact-links">
            <div>
              <a href={contacts.instagramUrl} target="_blank" rel="noopener noreferrer">
                Instagram <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <a href={contacts.behanceUrl} target="_blank" rel="noopener noreferrer">
                Behance <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <a href={contacts.linkedinUrl} target="_blank" rel="noopener noreferrer">
                LinkedIn <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Felipe Irala</span>
          <span>{t.footer.cityText}</span>
          <a href="#inicio" onClick={handleBackToTop}>
            {t.footer.backToTop} <ArrowUp size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};
