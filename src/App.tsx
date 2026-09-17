import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ParallaxStory } from './components/ParallaxStory';
import { ProjectsGrid } from './components/ProjectsGrid';
import { ProjectModal } from './components/ProjectModal';
import { About } from './components/About';
import { Toolkit } from './components/Toolkit';
import { Footer } from './components/Footer';
import { projects, Project } from './data/projects';
import { SmoothScrollProvider } from './context/SmoothScrollContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { translations } from './data/translations';
import { Preloader, shouldShowPreloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { KineticMarquee } from './components/KineticMarquee';

const readProject = () =>
  projects.find(project => project.id === new URLSearchParams(window.location.search).get('projeto')) ?? null;

const PortfolioContent = ({ forceIntro = false }: { forceIntro?: boolean }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(readProject);
  const [introActive, setIntroActive] = useState(() => shouldShowPreloader(forceIntro));
  const [heroReady, setHeroReady] = useState(!introActive);
  const shell = useRef<HTMLDivElement>(null);
  const revealHero = useCallback(() => setHeroReady(true), []);
  const completeIntro = useCallback(() => setIntroActive(false), []);
  useLayoutEffect(() => { if (shell.current) shell.current.inert = introActive; }, [introActive]);
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
    } else {
      url.searchParams.delete('projeto');
    }
    window.history.pushState(null, '', url);
  }, []);

  const closeProject = useCallback(() => {
    selectProject(null);
  }, [selectProject]);

  return (
    <>
      {introActive && <Preloader onReveal={revealHero} onComplete={completeIntro} />}
      <CustomCursor disabled={introActive || !!selectedProject} />
      <div ref={shell} className="portfolio-shell" data-intro-active={introActive}>
      <a className="skip-link" href="#conteudo">{t.nav.skipLink}</a>
      <div className="scroll-progress" aria-hidden="true" />
      <Navbar />
      <main id="conteudo">
        <Hero introReady={heroReady} />
        <ProjectsGrid onSelectProject={selectProject} />
        <KineticMarquee />
        <ParallaxStory />
        <About />
        <Toolkit />
      </main>
      <Footer />
      {!introActive && <ProjectModal project={selectedProject} onClose={closeProject} />}
      </div>
    </>
  );
};

export const App = ({ forceIntro = false }: { forceIntro?: boolean }) => {
  return (
    <LanguageProvider>
      <SmoothScrollProvider>
        <PortfolioContent forceIntro={forceIntro} />
      </SmoothScrollProvider>
    </LanguageProvider>
  );
};

export default App;
