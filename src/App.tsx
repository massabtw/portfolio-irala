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
import { SmoothScrollProvider, useSmoothScroll } from './context/SmoothScrollContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { translations } from './data/translations';

const readProject = () =>
  projects.find(project => project.id === new URLSearchParams(window.location.search).get('projeto')) ?? null;

const PortfolioContent = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(readProject);
  const { stopScroll, startScroll } = useSmoothScroll();
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const sync = () => setSelectedProject(readProject());
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  const selectProject = useCallback((project: Project | null) => {
    setSelectedProject(project);
    const url = new URL(window.location.href);
    if (project) {
      url.searchParams.set('projeto', project.id);
      stopScroll();
    } else {
      url.searchParams.delete('projeto');
      startScroll();
    }
    window.history.pushState(null, '', url);
  }, [stopScroll, startScroll]);

  const closeProject = useCallback(() => {
    selectProject(null);
  }, [selectProject]);

  return (
    <>
      <a className="skip-link" href="#conteudo">{t.nav.skipLink}</a>
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

export const App = () => {
  return (
    <LanguageProvider>
      <SmoothScrollProvider>
        <PortfolioContent />
      </SmoothScrollProvider>
    </LanguageProvider>
  );
};

export default App;
