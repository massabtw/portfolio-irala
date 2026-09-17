export interface ProjectTranslation {
  title: string;
  category: string;
  sector: string;
  summary: string;
  description: string;
  tools: string[];
  highlights: string[];
}

export const translations = {
  pt: {
    experience: {
      role: 'DIRETOR DE ARTE & DESIGNER VISUAL',
      introduction: 'Apresentação de Felipe Irala',
      skipIntro: 'Pular apresentação',
      viewProject: 'VER PROJETO',
      marquee: ['DIREÇÃO DE ARTE', 'IDENTIDADE VISUAL', 'DESIGN EDITORIAL', 'BRANDING', 'MOTION & EXPERIÊNCIA'],
      pauseMarquee: 'Pausar faixa animada',
      playMarquee: 'Retomar faixa animada',
      disciplines: 'Disciplinas criativas',
    },
    nav: {
      works: 'Trabalhos',
      about: 'Sobre mim',
      contact: 'Vamos conversar',
      skipLink: 'Pular para o conteúdo',
      toggleLangAria: 'Mudar para inglês',
    },
    hero: {
      intro: 'Felipe Irala · Designer gráfico',
      titleLine1: 'Um olhar.',
      titleLine2: 'Muitas formas.',
      description: 'Entre marcas, música e o cotidiano.\nTransformo ideias em identidades visuais com propósito e personalidade.',
      exploreCta: 'Explore meus trabalhos',
      location: 'Curitiba, Brasil',
      meetCreator: 'Conheça quem cria',
    },
    projects: {
      heading: 'Trabalhos selecionados',
      subheading: 'Ideias que ganharam forma.\nUma seleção entre o comercial e o autoral.',
      categories: {
        'Todos': 'Todos',
        'Identidade Visual': 'Identidade Visual',
        'Social Media': 'Social Media',
        'Concept Art': 'Concept Art',
        'Fotografia': 'Fotografia',
      },
      projectsShown: (count: number) => count === 1 ? 'projeto exibido' : 'projetos exibidos',
      viewProject: 'Ver projeto',
    },
    projectDetails: {
      'ritmo-doce': {
        title: 'Ritmo Doce',
        category: 'Identidade Visual',
        sector: 'Gastronomia & Confeitaria Artesanal',
        summary: 'Identidade visual para marca de doces artesanais, traduzindo agilidade comercial e acolhimento gourmet.',
        description: 'Criei a identidade da Ritmo Doce observando a rotina real da fundadora: a correria das vendas na rua lado a lado com o carinho do preparo artesanal. Para tirar isso do papel, misturei traços que passam essa ideia de movimento com uma paleta em azul marinho e mostarda. A intenção foi provar visualmente que uma marca pode ter um ritmo ágil no dia a dia sem perder o toque gourmet e acolhedor.',
        tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Branding Estratégico', 'Design de Embalagem'],
        highlights: [
          'Paleta cromática autoral em Azul Marinho e Mostarda',
          'Harmonia entre agilidade de venda de rua e requinte gourmet',
          'Aplicações em embalagens, sacolas e materiais de PDV'
        ]
      },
      'konz-capital': {
        title: 'Konz Capital',
        category: 'Social Media',
        sector: 'Mercado Financeiro / High-Ticket',
        summary: 'Estratégia visual e social media para ecossistema financeiro focado em autoridade e liquidez.',
        description: 'O projeto de social media para o ecossistema KONZ foi estruturado para consolidar autoridade no mercado e atrair um público high-ticket. A estratégia uniu design de alto padrão e copywriting direto para traduzir soluções financeiras — como alavancagem cambial e gestão de liquidez — em uma comunicação clara, focada na construção inteligente de patrimônio e eficiência de caixa.',
        tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Copywriting Financeiro', 'Direção de Arte'],
        highlights: [
          'Posicionamento focado em clientes institucionais e alta renda',
          'Tradução de temas complexos (alavancagem cambial, liquidez)',
          'Design sóbrio com tipografia e diagramação de alto impacto'
        ]
      },
      'songs-key-of-life': {
        title: "Songs In The Key Of Life + Mama's Gun",
        category: 'Concept Art',
        sector: 'Cultura Musical & Capas de Álbuns',
        summary: "Sample visual experimental: a fusão entre a estrutura de Mama's Gun e as texturas de Stevie Wonder.",
        description: "A proposta da experimentação foi criar uma espécie de sample visual: peguei a estrutura do álbum Mama's Gun, da Erykah Badu e a reconstruí usando as texturas, cores e a atmosfera de Songs In The Key Of Life, do Stevie Wonder.",
        tools: ['Adobe Photoshop', 'Experimentação Tipográfica', 'Colagem Digital', 'Tratamento de Textura'],
        highlights: [
          "Metodologia conceitual de 'sample' aplicada ao design gráfico",
          'Homenagem estética a Erykah Badu e Stevie Wonder',
          'Riqueza de granulação, tipografia vintage e calor tonal'
        ]
      },
      'fotografia-de-rua': {
        title: 'Fotografia de Rua',
        category: 'Fotografia',
        sector: 'Ensaios Urbanos & Brasilidades',
        summary: 'Estudos de luz, composição e brasilidades do cotidiano servindo como alicerce de repertório visual.',
        description: 'A fotografia funciona como um estudo de luz, composição, movimento, entre muitos outros fatores do design. Gosto de fotografar o dia a dia, eventos que participo e demais brasilidades.',
        tools: ['Fotografia Digital / Analógica', 'Adobe Lightroom', 'Direção de Fotografia'],
        highlights: [
          'Exploração de luz natural dura e sombras marcantes',
          'Documentação espontânea da identidade cultural e urbana',
          'Treinamento de olhar para ritmo e hierarquia na cena real'
        ]
      }
    } as Record<string, ProjectTranslation>,
    modal: {
      close: 'Fechar projeto',
      prev: 'Imagem anterior',
      next: 'Próxima imagem',
      imageOf: (cur: number, total: number) => `imagem ${cur} de ${total}`,
      keyDetails: 'Detalhes que fazem a diferença',
      toolsTitle: 'Ferramentas & disciplinas',
      discussCta: 'Conversar sobre um projeto',
      whatsappMessage: (title: string) => `Olá Felipe! Vi o projeto “${title}” no seu portfólio e gostaria de conversar sobre um projeto semelhante.`,
    },
    story: {
      line1: 'O cotidiano',
      line2: 'vira repertório.',
      subtitle: 'Música, encontros e um olhar sempre em movimento.',
      photoAlt: 'Roda de samba registrada por Felipe Irala',
    },
    about: {
      label: 'Um pouco sobre mim',
      headingLine1: 'Antes de criar,',
      headingLine2: 'eu observo.',
      p1: 'Sou Felipe Irala, designer gráfico em formação pela UTFPR, em Curitiba. Meu trabalho nasce do encontro entre estratégia e sensibilidade visual.',
      p2: 'Da identidade de uma marca à capa de um álbum, busco criar algo que faça sentido e tenha personalidade. Música, fotografia e as brasilidades do dia a dia fazem parte desse olhar.',
      moreCta: 'Mais do meu universo',
      baseLabel: 'Base',
      baseVal: 'Curitiba, PR',
      educationLabel: 'Formação',
      educationVal: 'Design Gráfico · UTFPR',
      caption: 'O cotidiano também é referência. Fotografia por Felipe Irala.',
    },
    toolkit: {
      label: 'Como posso contribuir',
      titleLine1: 'Sua ideia pode',
      titleLine2: 'ganhar muitas formas.',
      services: [
        {
          title: 'Identidade visual',
          description: 'Marcas com personalidade, do logo às embalagens e aos materiais que fazem parte do dia a dia.',
          detail: 'Branding · Logos · Embalagens',
        },
        {
          title: 'Design para comunicar',
          description: 'Uma linguagem visual que conecta a mensagem ao público, nas redes sociais ou em projetos culturais.',
          detail: 'Social media · Capas · Peças gráficas',
        },
        {
          title: 'Fotografia & direção de arte',
          description: 'Um olhar atento à luz, à composição e à atmosfera para construir imagens que contam histórias.',
          detail: 'Fotografia autoral · Composição visual',
        },
      ],
    },
    footer: {
      intro: 'Uma ideia, uma parceria ou um novo começo.',
      titleLine1: 'Vamos criar',
      titleLine2: 'algo juntos?',
      whatsappTitle: 'Converse comigo no WhatsApp',
      emailSubtitle: 'Ou me escreva',
      cvTitle: 'Ver meu currículo (PDF)',
      cvSubtitle: 'Trajetória, formação e habilidades',
      cvPdf: '/cv-felipe-irala-pt.pdf',
      backToTop: 'Voltar ao topo',
      cityText: 'Feito com intenção, em Curitiba.',
    },
  },

  en: {
    experience: {
      role: 'ART DIRECTOR & VISUAL DESIGNER',
      introduction: 'Felipe Irala introduction',
      skipIntro: 'Skip introduction',
      viewProject: 'VIEW PROJECT',
      marquee: ['ART DIRECTION', 'VISUAL IDENTITY', 'EDITORIAL DESIGN', 'BRANDING', 'MOTION & EXPERIENCE'],
      pauseMarquee: 'Pause animated band',
      playMarquee: 'Resume animated band',
      disciplines: 'Creative disciplines',
    },
    nav: {
      works: 'Selected Works',
      about: 'About',
      contact: "Let's talk",
      skipLink: 'Skip to content',
      toggleLangAria: 'Mudar para português',
    },
    hero: {
      intro: 'Felipe Irala · Graphic designer',
      titleLine1: 'One vision.',
      titleLine2: 'Many forms.',
      description: 'Between brands, music, and everyday life.\nTransforming ideas into visual identities with purpose and personality.',
      exploreCta: 'Explore selected works',
      location: 'Curitiba, Brazil',
      meetCreator: 'Meet the creator',
    },
    projects: {
      heading: 'Selected Works',
      subheading: 'Ideas shaped into form.\nA curation between commercial and experimental projects.',
      categories: {
        'Todos': 'All',
        'Identidade Visual': 'Brand Identity',
        'Social Media': 'Social Media',
        'Concept Art': 'Concept Art',
        'Fotografia': 'Photography',
      },
      projectsShown: (count: number) => count === 1 ? 'project displayed' : 'projects displayed',
      viewProject: 'View project',
    },
    projectDetails: {
      'ritmo-doce': {
        title: 'Ritmo Doce',
        category: 'Brand Identity',
        sector: 'Gastronomy & Artisan Confectionery',
        summary: 'Visual identity for an artisan confectionery brand, balancing commercial agility and gourmet warmth.',
        description: 'I designed the visual identity for Ritmo Doce observing the founder\'s real routine: the fast pace of street vending side by side with the care of handcrafted preparation. I merged dynamic lines with a navy blue and mustard palette, visually demonstrating that a brand can maintain daily commercial speed without losing its gourmet, welcoming touch.',
        tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Strategic Branding', 'Packaging Design'],
        highlights: [
          'Signature color palette in Navy Blue and Mustard',
          'Harmony between street vending agility and gourmet refinement',
          'Applications across packaging, shopping bags, and POS materials'
        ]
      },
      'konz-capital': {
        title: 'Konz Capital',
        category: 'Social Media',
        sector: 'Financial Market / High-Ticket',
        summary: 'Visual strategy and social media for a financial ecosystem focused on authority and liquidity.',
        description: 'The social media project for the KONZ ecosystem was structured to consolidate authority in the market and attract high-ticket clients. The strategy united high-end design and direct copywriting to translate financial solutions—such as forex leverage and liquidity management—into clear, sober communication focused on intelligent wealth management and cash efficiency.',
        tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Financial Copywriting', 'Art Direction'],
        highlights: [
          'Positioning tailored to institutional and high-net-worth clients',
          'Translation of complex topics (forex leverage, cash flow liquidity)',
          'Sober design with impactful typography and editorial layout'
        ]
      },
      'songs-key-of-life': {
        title: "Songs In The Key Of Life + Mama's Gun",
        category: 'Concept Art',
        sector: 'Music Culture & Album Cover Art',
        summary: "Experimental visual sample: fusing Mama's Gun structure with Stevie Wonder's warm textures.",
        description: "The goal of this experimentation was to craft a visual sample: I took the album structure of Erykah Badu's Mama's Gun and rebuilt it using the warm colors, textures, and analog atmosphere of Stevie Wonder's Songs In The Key Of Life.",
        tools: ['Adobe Photoshop', 'Typographic Exploration', 'Digital Collage', 'Texture Grading'],
        highlights: [
          'Conceptual \'sample\' methodology applied to graphic design',
          'Aesthetic homage to Erykah Badu and Stevie Wonder',
          'Rich grain, vintage typography, and tonal warmth'
        ]
      },
      'fotografia-de-rua': {
        title: 'Street Photography',
        category: 'Photography',
        sector: 'Urban Essays & Everyday Culture',
        summary: 'Studies of natural light, composition, and daily culture serving as the foundation of visual repertoire.',
        description: 'Photography serves as a foundational study of natural light, composition, motion, and visual hierarchy. I document everyday scenes, cultural gatherings, street sambas, and urban life.',
        tools: ['Digital / Analog Photography', 'Adobe Lightroom', 'Photography Direction'],
        highlights: [
          'Exploration of harsh natural light and striking shadows',
          'Spontaneous documentation of cultural and urban identity',
          'Training the eye for rhythm and hierarchy in real scenes'
        ]
      }
    } as Record<string, ProjectTranslation>,
    modal: {
      close: 'Close project',
      prev: 'Previous image',
      next: 'Next image',
      imageOf: (cur: number, total: number) => `image ${cur} of ${total}`,
      keyDetails: 'Key details that make a difference',
      toolsTitle: 'Tools & disciplines',
      discussCta: 'Discuss a project',
      whatsappMessage: (title: string) => `Hello Felipe! I saw the project "${title}" in your portfolio and would like to discuss a similar project.`,
    },
    story: {
      line1: 'Everyday life',
      line2: 'becomes repertoire.',
      subtitle: 'Music, encounters, and a gaze constantly in motion.',
      photoAlt: 'Street samba gathering captured by Felipe Irala',
    },
    about: {
      label: 'A bit about me',
      headingLine1: 'Before creating,',
      headingLine2: 'I observe.',
      p1: 'I am Felipe Irala, a graphic designer studying at UTFPR in Curitiba, Brazil. My work emerges from the intersection of strategic clarity and visual sensitivity.',
      p2: 'From a brand\'s visual identity to an album cover, I aim to create work that carries both purpose and personality. Music, photography, and everyday culture deeply shape this perspective.',
      moreCta: 'More from my universe',
      baseLabel: 'Location',
      baseVal: 'Curitiba, Brazil',
      educationLabel: 'Education',
      educationVal: 'Graphic Design · UTFPR',
      caption: 'Everyday life is also reference. Photography by Felipe Irala.',
    },
    toolkit: {
      label: 'How I can contribute',
      titleLine1: 'Your idea can',
      titleLine2: 'take many shapes.',
      services: [
        {
          title: 'Brand identity',
          description: 'Distinctive brands, from logo and packaging to everyday collateral with personality.',
          detail: 'Branding · Logos · Packaging',
        },
        {
          title: 'Design to communicate',
          description: 'A visual language connecting the message to its audience, on social media or cultural projects.',
          detail: 'Social media · Covers · Editorial graphics',
        },
        {
          title: 'Photography & art direction',
          description: 'A keen eye for natural light, composition, and atmosphere to craft images that tell stories.',
          detail: 'Documentary photography · Visual composition',
        },
      ],
    },
    footer: {
      intro: 'An idea, a partnership, or a fresh start.',
      titleLine1: "Let's create",
      titleLine2: 'something together?',
      whatsappTitle: 'Chat with me on WhatsApp',
      emailSubtitle: 'Or email me',
      cvTitle: 'View my resume (PDF)',
      cvSubtitle: 'Experience, education & skills',
      cvPdf: '/cv-felipe-irala-en.pdf',
      backToTop: 'Back to top',
      cityText: 'Crafted with intent, in Curitiba, Brazil.',
    },
  },
};
