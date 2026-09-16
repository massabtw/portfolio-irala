import { Reveal } from './Reveal';

const services = [
  { title: 'Identidade visual', description: 'Marcas com personalidade, do logo às embalagens e aos materiais que fazem parte do dia a dia.', detail: 'Branding · Logos · Embalagens' },
  { title: 'Design para comunicar', description: 'Uma linguagem visual que conecta a mensagem ao público, nas redes sociais ou em projetos culturais.', detail: 'Social media · Capas · Peças gráficas' },
  { title: 'Fotografia & direção de arte', description: 'Um olhar atento à luz, à composição e à atmosfera para construir imagens que contam histórias.', detail: 'Fotografia autoral · Composição visual' },
];

export const Toolkit = () => (
  <section id="habilidades" className="container services" aria-labelledby="services-title">
    <Reveal variant="heading"><div className="services-heading"><p className="section-label">Como posso contribuir</p><h2 id="services-title">Sua ideia pode<br />ganhar muitas formas.</h2></div></Reveal>
    <div className="services-grid">{services.map((service, index) => (
      <Reveal key={service.title} delay={index * 100} className="service">
        <h3>{service.title}</h3><p>{service.description}</p><span>{service.detail}</span>
      </Reveal>
    ))}</div>
  </section>
);
