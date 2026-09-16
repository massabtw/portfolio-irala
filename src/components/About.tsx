import { ArrowUpRight } from 'lucide-react';
import { designerProfile } from '../data/projects';
import { Reveal } from './Reveal';

export const About = () => (
  <section id="sobre" className="about-section">
    <div className="container about-grid">
      <Reveal className="about-photo"><figure><div className="about-photo-frame"><img src="/projects/fotografias/3-rua.webp" alt="Registro autoral de fotografia de rua por Felipe Irala" width="1200" height="1500" loading="lazy" /></div><figcaption>O cotidiano também é referência. Fotografia por Felipe Irala.</figcaption></figure></Reveal>
      <Reveal className="about-copy" delay={140}><p className="section-label">Um pouco sobre mim</p><h2>Antes de criar,<br />eu observo.</h2><p>Sou Felipe Irala, designer gráfico em formação pela UTFPR, em Curitiba. Meu trabalho nasce do encontro entre estratégia e sensibilidade visual.</p><p>Da identidade de uma marca à capa de um álbum, busco criar algo que faça sentido e tenha personalidade. Música, fotografia e as brasilidades do dia a dia fazem parte desse olhar.</p><a className="text-link" href={designerProfile.contacts.instagramUrl} target="_blank" rel="noopener noreferrer">Mais do meu universo <ArrowUpRight size={18} aria-hidden="true" /></a><dl className="about-facts"><div><dt>Base</dt><dd>Curitiba, PR</dd></div><div><dt>Formação</dt><dd>Design Gráfico · UTFPR</dd></div></dl></Reveal>
    </div>
  </section>
);
