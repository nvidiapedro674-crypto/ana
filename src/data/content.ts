/**
 * =============================================================================
 *  CONTEÚDO DO SITE — edite tudo por aqui.
 * =============================================================================
 *
 *  COMO ADICIONAR AS FOTOS:
 *  Em cada campo "...Url" abaixo, cole o link (URL) de uma imagem da internet,
 *  por exemplo: "https://site.com/foto.jpg".
 *  Enquanto o campo estiver vazio (""), aparece um placeholder elegante no lugar.
 *
 *  Observação: as imagens são exibidas em PRETO E BRANCO automaticamente.
 *
 *  Aviso: este é um tributo de fã, sem fins comerciais. Use apenas imagens que
 *  você tenha o direito de usar — os direitos pertencem aos respectivos donos.
 * =============================================================================
 */

export const content = {
  // --- Navegação (âncoras para as seções) ---
  nav: {
    brand: "XXX",
    links: [
      { label: "História", href: "#historia" },
      { label: "Discografia", href: "#discografia" },
      { label: "Músicas", href: "#musicas" },
      { label: "Legado", href: "#legado" },
      { label: "Galeria", href: "#galeria" },
    ],
  },

  // --- Topo (Hero) ---
  hero: {
    name: "XXXTENTACION",
    realName: "Jahseh Dwayne Ricardo Onfroy",
    years: "1998 — 2018",
    tagline: "Pioneiro do emo rap. Voz de uma geração.",
    // Cole aqui a URL da foto de fundo do topo:
    backgroundUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/ee/Xxxtentacion_%28cropped%29.jpg",
  },

  // --- Frase de impacto ---
  quote: {
    text:
      "“Quero deixar um impacto positivo no mundo antes de partir.”",
    author: "— XXXTentacion",
  },

  // --- História / Biografia ---
  bio: {
    sectionTitle: "A História",
    // Foto que acompanha a biografia:
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/2c/Selfie_with_XXXTentacion_%2840268597064%29.jpg",
    paragraphs: [
      "Jahseh Dwayne Ricardo Onfroy nasceu em 23 de janeiro de 1998, em Plantation, na Flórida, e cresceu em Lauderhill. Filho de pais de origem jamaicana, recebeu o nome “Jahseh” inspirado na música “So Jah Seh”, de Bob Marley.",
      "Foi uma infância marcada por dificuldades e pela ausência dos pais. A música apareceu como refúgio: depois de passar por um centro de detenção juvenil, começou a escrever e a gravar, publicando suas primeiras faixas no SoundCloud já em 2013, entre elas “News/Flock”.",
      "Sua voz crua e a fusão de gêneros — emo, trap, trap metal, nu metal, lo-fi, R&B e punk — o transformaram em um dos nomes centrais do chamado “SoundCloud rap” e em um dos pioneiros do emo rap, conquistando milhões de fãs no mundo inteiro.",
      "Em 18 de junho de 2018, em Deerfield Beach, na Flórida, Jahseh foi morto a tiros durante um assalto, aos 20 anos. Sua obra, porém, seguiu crescendo e tocando gerações que se reconheceram em suas palavras.",
    ],
  },

  // --- Discografia ---
  discography: {
    sectionTitle: "Discografia",
    albums: [
      {
        title: "17",
        year: "2017",
        note: "Álbum de estreia. Intimista e cru, sobre dor, perda e solidão.",
        coverUrl:
          "https://upload.wikimedia.org/wikipedia/en/4/41/17_XXXTENTACION_Cover.png",
      },
      {
        title: "?",
        year: "2018",
        note: "Estreou em nº 1 nos EUA. Trouxe o hit “SAD!”.",
        coverUrl:
          "https://upload.wikimedia.org/wikipedia/en/2/21/%3F_XXXTENTACION_Cover.png",
      },
      {
        title: "SKINS",
        year: "2018",
        note: "Primeiro álbum póstumo, lançado em dezembro de 2018.",
        coverUrl:
          "https://upload.wikimedia.org/wikipedia/en/f/f3/Skins_XXXTentacion_Original.png",
      },
      {
        title: "Bad Vibes Forever",
        year: "2019",
        note: "Segundo álbum póstumo, reunindo seu lado mais experimental.",
        coverUrl:
          "https://static.wikia.nocookie.net/xxxtentacion/images/c/c4/Bad_Vibes_Forever_Cover.jpg/revision/latest",
      },
    ],
  },

  // --- Músicas marcantes ---
  songs: {
    sectionTitle: "Músicas que Marcaram",
    list: [
      {
        title: "SAD!",
        note:
          "Seu maior sucesso: chegou ao nº 1 da Billboard Hot 100 — o primeiro nº 1 póstumo de um artista solo principal desde Notorious B.I.G., em 1997.",
      },
      {
        title: "Jocelyn Flores",
        note:
          "Homenagem a uma amiga. Uma das faixas mais pessoais e dolorosas; ultrapassou 1 bilhão de streams.",
      },
      {
        title: "Moonlight",
        note: "Melodia hipnótica que se tornou um de seus maiores hinos.",
      },
      {
        title: "Look at Me!",
        note: "A faixa explosiva que o lançou para o mainstream.",
      },
      {
        title: "changes",
        note: "Balada delicada sobre o fim de um amor.",
      },
      {
        title: "Hope",
        note: "Dedicada às vítimas da tragédia de Parkland, na Flórida.",
      },
    ],
  },

  // --- Legado / Números ---
  legacy: {
    sectionTitle: "Legado",
    text:
      "Mais do que números, XXXTentacion deixou um elo com quem se sentia à margem. Falou abertamente sobre depressão, ansiedade e saúde mental, virando símbolo para outsiders e para uma geração que se viu em sua honestidade.",
    stats: [
      { value: "~68 mi", label: "discos certificados (EUA + Reino Unido)" },
      { value: "Nº 1", label: "“SAD!” na Billboard Hot 100" },
      { value: "9", label: "músicas simultâneas na Hot 100" },
      { value: "20", label: "anos de uma vida que marcou o mundo" },
    ],
  },

  // --- Galeria ---
  gallery: {
    sectionTitle: "Galeria",
    // Cole as URLs das fotos aqui (pode adicionar ou remover itens da lista):
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/e/ee/Xxxtentacion_%28cropped%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/2/2c/Selfie_with_XXXTentacion_%2840268597064%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/3/31/XXXTentacion.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/a/a1/XXXTentacion_Memorial_1.png",
      "https://upload.wikimedia.org/wikipedia/commons/d/d4/XXXTentacion_Memorial_2.png",
      "https://static.wikia.nocookie.net/xxxtentacion/images/9/98/Skins_album_cover.jpeg/revision/latest",
    ],
  },

  // --- Créditos (final da página) ---
  credits: {
    label: "Feito por",
    names: ["Ana Onfroy", "Desconhecido"],
  },

  // --- Rodapé ---
  footer: {
    line: "Long Live Jahseh",
    years: "1998 — 2018",
    disclaimer: "",
  },
};

export type SiteContent = typeof content;
