import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects, Project } from '../data/projects';
import { Reveal } from './Reveal';

const categories = ['Todos', 'Identidade Visual', 'Social Media', 'Concept Art', 'Fotografia'];
const readCategory = () => {
  const value = new URLSearchParams(window.location.search).get('categoria');
  return value && categories.includes(value) ? value : 'Todos';
};

export const ProjectsGrid = ({ onSelectProject }: { onSelectProject: (project: Project) => void }) => {
  const [category, setCategory] = useState(readCategory);
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
      <Reveal variant="heading" className="section-heading"><h2>Trabalhos selecionados</h2><p>Ideias que ganharam forma.<br />Uma seleção entre o comercial e o autoral.</p></Reveal>
      <div className="filters" role="group" aria-label="Filtrar projetos por categoria">{categories.map(item => <button key={item} type="button" aria-pressed={item === category} onClick={() => select(item)}>{item}</button>)}</div>
      <p className="sr-only" role="status">{filtered.length} {filtered.length === 1 ? 'projeto exibido' : 'projetos exibidos'}</p>
      <div key={category} className="project-grid filter-transition">{filtered.map((project, index) => (
        <Reveal key={project.id} className="project-card" delay={(index % 2) * 120}>
          <button className="project-button" type="button" onClick={() => onSelectProject(project)} aria-label={`Ver projeto ${project.title}`}>
            <div className={`project-image image-${project.id}`}><picture><source media="(max-width: 480px)" srcSet={project.coverImage.replace('.webp', '-preview.webp')} /><img src={project.coverImage} alt={`Capa do projeto ${project.title}`} width="1200" height="1200" loading="lazy" /></picture><span className="project-open"><ArrowUpRight size={22} aria-hidden="true" /></span></div>
            <div className="project-info"><div><h3>{project.title}</h3><p>{project.category}</p></div></div>
          </button>
        </Reveal>
      ))}</div>
    </section>
  );
};
