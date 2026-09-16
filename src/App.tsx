import { useCallback, useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ParallaxStory } from './components/ParallaxStory';
import { ProjectsGrid } from './components/ProjectsGrid';
import { ProjectModal } from './components/ProjectModal';
import { About } from './components/About';
import { Toolkit } from './components/Toolkit';
import { Footer } from './components/Footer';
import { projects, Project } from './data/projects';

const readProject = () => projects.find(project => project.id === new URLSearchParams(window.location.search).get('projeto')) ?? null;

export const App = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(readProject);
  useEffect(() => {
    const sync = () => setSelectedProject(readProject());
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);
  const selectProject = useCallback((project: Project | null) => {
    setSelectedProject(project);
    const url = new URL(window.location.href);
    if (project) url.searchParams.set('projeto', project.id);
    else url.searchParams.delete('projeto');
    window.history.pushState(null, '', url);
  }, []);
  const closeProject = useCallback(() => selectProject(null), [selectProject]);
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="scroll-progress" aria-hidden="true" />
      <Navbar />
      <main id="conteudo">
        <Hero />
        <ProjectsGrid onSelectProject={selectProject} />
        <ParallaxStory />
        <About />
        <Toolkit />
      </main>
      <Footer />
      <ProjectModal project={selectedProject} onClose={closeProject} />
    </>
  );
};

export default App;
