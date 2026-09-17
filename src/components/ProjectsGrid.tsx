import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects, Project } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = ['Todos', 'Identidade Visual', 'Social Media', 'Concept Art', 'Fotografia'] as const;

const readCategory = () => {
  const value = new URLSearchParams(window.location.search).get('categoria');
  return value && (categories as readonly string[]).includes(value) ? value : 'Todos';
};

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelectProject: (project: Project) => void;
}

const ProjectCard = ({ project, index, onSelectProject }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const { language } = useLanguage();
  const t = translations[language];
  const details = t.projectDetails[project.id];
  const projectTitle = details?.title || project.title;
  const projectCategory = details?.category || project.category;

  useEffect(() => {
    const card = cardRef.current;
    const img = imgRef.current;
    const button = card?.querySelector<HTMLButtonElement>('.project-button');
    const picture = card?.querySelector('picture');
    if (!card || !img || !button || !picture) return;
    const media = gsap.matchMedia();
    media.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(picture, { yPercent: -6, scale: 1.12 }, { yPercent: 6, ease: 'none',
        scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 0.9 } });
      if (index % 2) gsap.to(card, { y: -45, ease: 'none',
        scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
    });
    media.add('(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)', () => {
      gsap.set(button, { transformPerspective: 1000, transformOrigin: '50% 50%' });
      gsap.set(img, { scale: 1.05 });
      const rotateX = gsap.quickTo(button, 'rotationX', { duration: 0.7, ease: 'power2.out' });
      const rotateY = gsap.quickTo(button, 'rotationY', { duration: 0.7, ease: 'power2.out' });
      const imageX = gsap.quickTo(img, 'xPercent', { duration: 0.7, ease: 'power2.out' });
      const imageY = gsap.quickTo(img, 'yPercent', { duration: 0.7, ease: 'power2.out' });
      let bounds: DOMRect | null = null;
      const move = (event: PointerEvent) => {
        if (event.pointerType === 'touch') return;
        bounds ??= card.getBoundingClientRect();
        const x = gsap.utils.clamp(-1, 1, (event.clientX - bounds.left) / bounds.width * 2 - 1);
        const y = gsap.utils.clamp(-1, 1, (event.clientY - bounds.top) / bounds.height * 2 - 1);
        rotateY(x * 7); rotateX(-y * 7); imageX(-x * 2); imageY(-y * 2);
        card.style.setProperty('--spot-x', ((x + 1) * 50) + '%');
        card.style.setProperty('--spot-y', ((y + 1) * 50) + '%');
        card.dataset.tilting = 'true';
      };
      const reset = () => {
        bounds = null; rotateX(0); rotateY(0); imageX(0); imageY(0); delete card.dataset.tilting;
      };
      card.addEventListener('pointermove', move, { passive: true });
      card.addEventListener('pointerleave', reset); window.addEventListener('scroll', reset, { passive: true });
      return () => {
        card.removeEventListener('pointermove', move); card.removeEventListener('pointerleave', reset);
        window.removeEventListener('scroll', reset); delete card.dataset.tilting;
        card.style.removeProperty('--spot-x'); card.style.removeProperty('--spot-y');
      };
    });
    return () => media.revert();
  }, [index]);

  return (
    <div ref={cardRef} className={`project-card ${index % 2 === 1 ? 'project-card-even' : ''}`}>
      <button
        className="project-button"
        type="button"
        onClick={() => onSelectProject(project)}
        aria-label={`${t.projects.viewProject} ${projectTitle}`}
      >
        <div ref={imageWrapperRef} className={`project-image image-${project.id}`}>
          <picture className="project-picture">
            <source
              media="(max-width: 480px)"
              srcSet={
                project.coverImage.includes('-preview.webp')
                  ? project.coverImage
                  : project.coverImage.replace('.webp', '-preview.webp')
              }
            />
            <img
              ref={imgRef}
              src={project.coverImage}
              alt={projectTitle}
              width="1200"
              height="1200"
              loading="lazy"
              className="parallax-inner-img"
            />
          </picture>
          <div className="project-spotlight" aria-hidden="true" />
          <span className="project-open">
            <ArrowUpRight size={22} aria-hidden="true" />
          </span>
        </div>
        <div className="project-info">
          <div>
            <h3>{projectTitle}</h3>
            <p>{projectCategory}</p>
          </div>
        </div>
      </button>
    </div>
  );
};

export const ProjectsGrid = ({ onSelectProject }: { onSelectProject: (project: Project) => void }) => {
  const [category, setCategory] = useState(readCategory);
  const gridRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const sync = () => setCategory(readCategory());
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  const select = (value: string) => {
    setCategory(value);
    const url = new URL(window.location.href);
    if (value === 'Todos') url.searchParams.delete('categoria');
    else url.searchParams.set('categoria', value);
    window.history.pushState(null, '', url);
  };

  const filtered = projects.filter(project => category === 'Todos' || project.category === category);

  // Refresh ScrollTrigger when category changes or grid recalculates
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [category, language]);

  return (
    <section id="trabalhos" className="projects container">
      <div className="section-heading">
        <h2>{t.projects.heading}</h2>
        <p style={{ whiteSpace: 'pre-line' }}>{t.projects.subheading}</p>
      </div>

      <div className="filters" role="group" aria-label="Filtrar projetos por categoria">
        {categories.map(item => (
          <button
            key={item}
            type="button"
            aria-pressed={item === category}
            onClick={() => select(item)}
          >
            {t.projects.categories[item] || item}
          </button>
        ))}
      </div>

      <p className="sr-only" role="status">
        {t.projects.projectsShown(filtered.length)}
      </p>

      <div ref={gridRef} key={category} className="project-grid filter-transition">
        {filtered.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onSelectProject={onSelectProject}
          />
        ))}
      </div>
    </section>
  );
};
