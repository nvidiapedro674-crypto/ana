# XXXTENTACION — Homenagem (1998–2018)

Landing page de homenagem ao rapper **XXXTentacion** (Jahseh Dwayne Ricardo Onfroy).
Site estático, em **preto e branco**, moderno e clean. Sem banco de dados.

Feito com **Next.js (App Router) + TypeScript + Tailwind CSS**.

---

## Como rodar

Pré-requisito: ter o [Node.js](https://nodejs.org) instalado (versão 18.18+).

```bash
npm install      # instala as dependências (só na primeira vez)
npm run dev      # inicia o site em modo desenvolvimento
```

Depois abra **http://localhost:3000** no navegador.

Para gerar a versão de produção:

```bash
npm run build
npm run start
```

---

## Como adicionar as fotos reais

Todo o conteúdo (textos e fotos) fica em **um único arquivo**:

```
src/data/content.ts
```

Para colocar uma foto, basta colar o **link (URL)** da imagem nos campos que terminam
em `Url` (ou na lista da galeria). Exemplo:

```ts
hero: {
  // ...
  backgroundUrl: "https://exemplo.com/foto-do-x.jpg",
},
```

- Enquanto o campo estiver vazio (`""`), aparece um **placeholder elegante** no lugar.
- Se um link quebrar, o site também cai automaticamente no placeholder (nada quebra na tela).
- As imagens são exibidas em **preto e branco** automaticamente.

Campos de imagem disponíveis: `hero.backgroundUrl`, `bio.photoUrl`,
cada `discography.albums[].coverUrl` e a lista `gallery.photos[]`.

---

## Estrutura

```
src/
  app/         layout, página e estilos globais
  data/        content.ts  ← edite o conteúdo aqui
  components/  seções (Hero, Bio, Discografia, Músicas, Legado, Galeria...)
```

---

## Deploy

Pronto para publicar de graça na [Vercel](https://vercel.com): basta subir o projeto
para o GitHub e importar, ou rodar `vercel` na pasta.

---

## Aviso

Este é um **tributo de fã, sem fins comerciais**. Todas as imagens, nomes e marcas
pertencem aos seus respectivos donos. Use apenas imagens que você tenha direito de usar.

_Long Live Jahseh._
