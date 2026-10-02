import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { projects, Project } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

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
  const { language } = useLanguage();
  const t = translations[language];
  const details = t.projectDetails[project.id];
  const projectTitle = details?.title || project.title;
  const projectCategory = details?.category || project.category;

  return (
    <div className={`project-card ${index % 2 === 1 ? 'project-card-even' : ''}`}>
      <button
        className="project-button"
        type="button"
        onClick={() => onSelectProject(project)}
        aria-label={`${t.projects.viewProject} ${projectTitle}`}
      >
        <div className="project-image">
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
              src={project.coverImage}
              alt={`Capa do projeto ${projectTitle}`}
              width="1200"
              height="1200"
              loading="lazy"
              className="project-cover-img"
            />
          </picture>
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

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const media = gsap.matchMedia();

    media.add({
      desktop: '(min-width: 769px)',
      mobile: '(max-width: 768px)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    }, context => {
      const { mobile, reduceMotion } = context.conditions!;
      if (reduceMotion) return;

      grid.querySelectorAll<HTMLElement>('.project-card').forEach((card, index) => {
        const button = card.querySelector<HTMLButtonElement>('.project-button');
        const picture = card.querySelector<HTMLElement>('.project-picture');
        if (!button || !picture) return;
        const rightColumn = index % 2 === 1;

        // Keep the grid cell still for stable measurements. Scroll moves the
        // whole button; CSS hover moves only the poster inside that button.
        gsap.fromTo(button, {
          y: mobile ? (rightColumn ? 28 : 20) : (rightColumn ? 96 : 56),
        }, {
          y: mobile ? (rightColumn ? -16 : -8) : (rightColumn ? -48 : -24),
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: mobile ? 0.5 : 0.8,
          },
        });

        // Reveal the artwork without enlarging or translating its pixels.
        gsap.fromTo(picture, {
          clipPath: `inset(0% 0% ${mobile ? 12 : 22}% 0% round 8px)`,
        }, {
          clipPath: 'inset(0% 0% 0% 0% round 8px)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 95%',
            end: 'top 55%',
            scrub: mobile ? 0.4 : 0.6,
          },
        });
      });
    }, grid);

    const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(refreshFrame);
      media.revert();
    };
  }, [category, language]);

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
