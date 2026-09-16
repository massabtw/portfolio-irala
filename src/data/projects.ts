export interface Project {
  id: string;
  title: string;
  category: 'Identidade Visual' | 'Social Media' | 'Concept Art' | 'Fotografia';
  sector: string;
  year: string;
  summary: string;
  description: string;
  coverImage: string;
  gallery: string[];
  tools: string[];
  highlights: string[];
}

export const projects: Project[] = [
  {
    id: 'ritmo-doce',
    title: 'Ritmo Doce',
    category: 'Identidade Visual',
    sector: 'Gastronomia & Confeitaria Artesanal',
    year: '2024',
    summary: 'Identidade visual para marca de doces artesanais, traduzindo agilidade comercial e acolhimento gourmet.',
    description: 'Criei a identidade da Ritmo Doce observando a rotina real da fundadora: a correria das vendas na rua lado a lado com o carinho do preparo artesanal. Para tirar isso do papel, misturei traços que passam essa ideia de movimento com uma paleta em azul marinho e mostarda. A intenção foi provar visualmente que uma marca pode ter um ritmo ágil no dia a dia sem perder o toque gourmet e acolhedor.',
    coverImage: '/projects/ritmo-doce/1-cover.webp',
    gallery: [
      '/projects/ritmo-doce/1-cover.webp',
      '/projects/ritmo-doce/2-logo.webp',
      '/projects/ritmo-doce/3-packaging.webp',
      '/projects/ritmo-doce/4-stationery.webp',
    ],
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Branding Estratégico', 'Design de Embalagem'],
    highlights: [
      'Paleta cromática autoral em Azul Marinho e Mostarda',
      'Harmonia entre agilidade de venda de rua e requinte gourmet',
      'Aplicações em embalagens, sacolas e materiais de PDV'
    ]
  },
  {
    id: 'konz-capital',
    title: 'Konz Capital',
    category: 'Social Media',
    sector: 'Mercado Financeiro / High-Ticket',
    year: '2024',
    summary: 'Estratégia visual e social media para ecossistema financeiro focado em autoridade e liquidez.',
    description: 'O projeto de social media para o ecossistema KONZ foi estruturado para consolidar autoridade no mercado e atrair um público high-ticket. A estratégia uniu design de alto padrão e copywriting direto para traduzir soluções financeiras — como alavancagem cambial e gestão de liquidez — em uma comunicação clara, focada na construção inteligente de patrimônio e eficiência de caixa.',
    coverImage: '/projects/konz-capital/1-cover.webp',
    gallery: [
      '/projects/konz-capital/1-cover.webp',
      '/projects/konz-capital/2-liquidez.webp',
      '/projects/konz-capital/3-patrimonio.webp',
      '/projects/konz-capital/4-cambio.webp',
      '/projects/konz-capital/5-performance.webp',
      '/projects/konz-capital/6-institucional.webp',
    ],
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Copywriting Financeiro', 'Direção de Arte'],
    highlights: [
      'Posicionamento focado em clientes institucionais e alta renda',
      'Tradução de temas complexos (alavancagem cambial, liquidez)',
      'Design sóbrio com tipografia e diagramação de alto impacto'
    ]
  },
  {
    id: 'songs-key-of-life',
    title: "Songs In The Key Of Life + Mama's Gun",
    category: 'Concept Art',
    sector: 'Cultura Musical & Capas de Álbuns',
    year: '2024',
    summary: "Sample visual experimental: a fusão entre a estrutura de Mama's Gun e as texturas de Stevie Wonder.",
    description: "A proposta da experimentação foi criar uma espécie de sample visual: peguei a estrutura do álbum Mama's Gun, da Erykah Badu e a reconstruí usando as texturas, cores e a atmosfera de Songs In The Key Of Life, do Stevie Wonder.",
    coverImage: '/projects/songs-key-of-life/1-cover.webp',
    gallery: [
      '/projects/songs-key-of-life/1-cover.webp',
      '/projects/songs-key-of-life/2-detail.webp',
    ],
    tools: ['Adobe Photoshop', 'Experimentação Tipográfica', 'Colagem Digital', 'Tratamento de Textura'],
    highlights: [
      "Metodologia conceitual de 'sample' aplicada ao design gráfico",
      'Homenagem estética a Erykah Badu e Stevie Wonder',
      'Riqueza de granulação, tipografia vintage e calor tonal'
    ]
  },
  {
    id: 'fotografia-de-rua',
    title: 'Fotografia de Rua',
    category: 'Fotografia',
    sector: 'Ensaios Urbanos & Brasilidades',
    year: '2023 — 2024',
    summary: 'Estudos de luz, composição e brasilidades do cotidiano servindo como alicerce de repertório visual.',
    description: 'A fotografia funciona como um estudo de luz, composição, movimento, entre muitos outros fatores do design. Gosto de fotografar o dia a dia, eventos que participo e demais brasilidades.',
    coverImage: '/projects/fotografias/1-cover.webp',
    gallery: [
      '/projects/fotografias/1-cover.webp',
      '/projects/fotografias/2-luz.webp',
      '/projects/fotografias/3-rua.webp',
      '/projects/fotografias/4-brasilidades.webp',
      '/projects/fotografias/5-movimento.webp',
    ],
    tools: ['Fotografia Digital / Analógica', 'Adobe Lightroom', 'Direção de Fotografia'],
    highlights: [
      'Exploração de luz natural dura e sombras marcantes',
      'Documentação espontânea da identidade cultural e urbana',
      'Treinamento de olhar para ritmo e hierarquia na cena real'
    ]
  }
];

export const designerProfile = {
  name: 'Felipe Irala',
  title: 'Designer Gráfico',
  location: 'Curitiba, PR',
  education: 'Designer Gráfico em formação pela UTFPR',
  age: '19 anos',
  languages: 'Inglês Avançado',
  bioShort: 'Sou de Curitiba, tenho 19 anos e sou designer gráfico em formação pela UTFPR. Apaixonado pela cultura visual, busco desenvolver projetos que equilibrem propósito comercial, estética e autenticidade. Já desenvolvi materiais para segmentos variados (como advocacia, saúde, setor bancário e gastronomia) e realizo projetos autorais e experimentais com capas de álbuns, concept art e fotografia. Em cada projeto, busco aliar a eficiência funcional do design à sensibilidade da arte visual.',
  quote: 'Em cada projeto, busco aliar a eficiência funcional do design à sensibilidade da arte visual.',
  skills: [
    { name: 'Adobe Photoshop', level: 'Avançado', category: 'Software' },
    { name: 'Adobe Illustrator', level: 'Avançado', category: 'Software' },
    { name: 'Adobe Premiere', level: 'Intermediário/Avançado', category: 'Motion/Vídeo' },
    { name: 'IA Integrada ao Workflow', level: 'Prática Contínua', category: 'Inovação' },
    { name: 'Fotografia & Direção de Arte', level: 'Autoral & Comercial', category: 'Visual' },
    { name: 'Inglês Avançado', level: 'Fluente', category: 'Comunicação' },
  ],
  commercialSectors: [
    'Setor Bancário & Financeiro',
    'Gastronomia & Confeitaria',
    'Advocacia & Jurídico',
    'Saúde & Clínicas',
    'Música & Produção Cultural',
  ],
  contacts: {
    whatsappNumber: '+55 41 9194-1108',
    whatsappUrl: 'https://wa.me/554191941108?text=Ol%C3%A1%20Felipe,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto!',
    instagramHandle: '@iralavisions',
    instagramUrl: 'https://instagram.com/iralavisions',
    linkedinUrl: 'https://www.linkedin.com/in/felipeirala/',
    behanceUrl: 'https://www.behance.net/felipeirala',
    email: 'felipeirala.design@gmail.com'
  }
};

