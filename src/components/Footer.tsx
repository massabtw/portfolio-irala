import { ArrowUp, ArrowUpRight, MessageCircle } from 'lucide-react';
import { designerProfile } from '../data/projects';
import { Reveal } from './Reveal';

export const Footer = () => {
  const { contacts } = designerProfile;
  return (
    <footer id="contato" className="contact">
      <div className="container">
        <Reveal variant="heading">
          <p className="contact-intro">Uma ideia, uma parceria ou um novo começo.</p>
          <a className="contact-title" href={contacts.whatsappUrl} target="_blank" rel="noopener noreferrer">Vamos criar<br />algo juntos?<ArrowUpRight aria-hidden="true" /></a>
        </Reveal>
        <Reveal delay={120}>
          <div className="direct-contact">
            <a className="whatsapp-contact" href={contacts.whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={24} aria-hidden="true" />
              <span><strong>Converse comigo no WhatsApp</strong><span>{contacts.whatsappNumber}</span></span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
            <a className="email-contact" href={`mailto:${contacts.email}`}><span>Ou me escreva</span>{contacts.email}</a>
          </div>
          <div className="contact-links"><div>
            <a href={contacts.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={15} aria-hidden="true" /></a>
            <a href={contacts.behanceUrl} target="_blank" rel="noopener noreferrer">Behance <ArrowUpRight size={15} aria-hidden="true" /></a>
            <a href={contacts.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={15} aria-hidden="true" /></a>
          </div></div>
        </Reveal>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Felipe Irala</span><span>Feito com intenção, em Curitiba.</span><a href="#inicio">Voltar ao topo <ArrowUp size={16} aria-hidden="true" /></a></div>
      </div>
    </footer>
  );
};
