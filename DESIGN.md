# Direção visual — Felipe Irala
Portfólio pessoal com foco em projetos reais, cultura visual e contato direto.
- Paleta: papel frio #f7f8fa, branco #ffffff, tinta #202427, texto secundário #62686f, azul #2949d7, linha #dce0e5.
- Tipografia: Plus Jakarta Sans. Títulos grandes; textos confortáveis e linhas curtas.
- Layout: apresentação em duas colunas, composição com peças reais à direita; galeria de duas colunas sem sobreposições; sobre com fotografia autoral; contato azul.
- Movimento: entrada coordenada, revelação das imagens e progresso de leitura. Respeitar movimento reduzido.
- Introdução: contador editorial de 1,2 s e cortina de 0,9 s, uma vez por aba (`sessionStorage`, chave `irala-intro-seen-v1`). Para revisão, renderizar `<App forceIntro />`; movimento reduzido sempre tem prioridade. A cortina dispara a abertura em leque das três peças, em uma camada independente do parallax.
- Interação: cursor contextual e magnetismo apenas em ponteiro fino; cards com tilt máximo de 7°, spotlight e contra-parallax de 2%. Todas as animações de ponteiro usam tweens reutilizáveis e são removidas no touch/movimento reduzido.
- Marquee: texto PT/EN alternando preenchimento e contorno; velocidade e direção respondem ao `getVelocity()` do ScrollTrigger. Ticker apenas enquanto visível, com controle de pausa; versão estática com movimento reduzido.
- Scroll: bloqueios independentes para introdução, menu e modal. Nenhum pin em ponteiros coarse, inclusive landscape/tablet. Traduções em `src/data/translations.ts`; cores herdadas de `--ink` e `--paper` nos dois temas.
- Revisão: reduzir caixas e selos; as cores dos projetos trazem variedade. Preservar trabalhos reais.
Referências: frontend-design, ui-ux-pro-max e Web Interface Guidelines. Busca Python indisponível; aplicadas regras gerais da skill UI/UX e referências locais.
