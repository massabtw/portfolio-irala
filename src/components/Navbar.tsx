import { useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return (
    <header className="site-header" onKeyDown={event => { if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); } }}>
      <div className="container nav-inner">
        <a href="#inicio" className="wordmark" aria-label="Felipe Irala — início">irala<span aria-hidden="true">.</span></a>
        <button ref={toggle} className="menu-toggle icon-button" type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
        <nav id="navigation" className={open ? 'navigation is-open' : 'navigation'} aria-label="Navegação principal">
          <a href="#trabalhos" onClick={() => setOpen(false)}>Trabalhos</a>
          <a href="#sobre" onClick={() => setOpen(false)}>Sobre mim</a>
          <a href="#contato" className="nav-contact" onClick={() => setOpen(false)}>Vamos conversar <ArrowUpRight size={17} aria-hidden="true" /></a>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
};
