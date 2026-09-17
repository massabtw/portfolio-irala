import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useLanguage } from '../context/LanguageContext';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { translations } from '../data/translations';

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const { language, setLanguage } = useLanguage();
  const { stopScroll, startScroll } = useSmoothScroll();
  const t = translations[language];

  useEffect(() => {
    if (open) {
      stopScroll('menu');
    } else {
      startScroll('menu');
    }
    return () => startScroll('menu');
  }, [open, stopScroll, startScroll]);

  return (
    <header
      className="site-header"
      onKeyDown={event => {
        if (event.key === 'Escape') {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className="container nav-inner">
        <a href="#inicio" className="wordmark" aria-label="Felipe Irala — início">
          irala<span aria-hidden="true">.</span>
        </a>

        <button
          ref={toggle}
          className="menu-toggle icon-button"
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <nav
          id="navigation"
          className={open ? 'navigation is-open' : 'navigation'}
          aria-label="Navegação principal"
        >
          <a href="#trabalhos" onClick={() => setOpen(false)}>
            {t.nav.works}
          </a>
          <a href="#sobre" onClick={() => setOpen(false)}>
            {t.nav.about}
          </a>
          <a href="#contato" className="nav-contact" onClick={() => setOpen(false)}>
            {t.nav.contact} <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </nav>

        <div className="nav-actions">
          <div className="lang-switch" role="group" aria-label="Selecionar idioma">
            <button
              type="button"
              className={`lang-btn ${language === 'pt' ? 'is-active' : ''}`}
              onClick={() => setLanguage('pt')}
              aria-pressed={language === 'pt'}
            >
              PT
            </button>
            <span className="lang-divider" aria-hidden="true">/</span>
            <button
              type="button"
              className={`lang-btn ${language === 'en' ? 'is-active' : ''}`}
              onClick={() => setLanguage('en')}
              aria-pressed={language === 'en'}
            >
              EN
            </button>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
