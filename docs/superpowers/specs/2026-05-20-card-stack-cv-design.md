# Card-Stack CV — Design

## Goal

Replace the entire current CV site (static HTML + Bootstrap + jQuery + AOS) with a single-screen, draggable card-stack experience inspired by the Framer Motion CardStack component at `https://framer.com/m/CardStack-OuhS.js@1RaielqCLjljis9tIHVX`.

The card stack IS the whole CV. No long-scroll sections below it.

## Approach

Rebuild the site as a small **Vite + React + TypeScript** app using the **`framer-motion`** npm library directly. The hosted Framer module URL is treated as visual reference only — we do not load it at runtime. Re-implementing the drag-flick stack in framer-motion is small (~100 LOC) and keeps the design under our control with no third-party runtime dependency on Framer's CDN.

Output is a static bundle, deployed to GitHub Pages from the existing `samverh/cv` repo.

## Cards

Seven cards total, in this order:

1. **Business card** — name, title (Computational Scientist), profile photo, location (Maastricht, NL), LinkedIn + GitHub icon links. A "drag me →" hint shows on first load and disappears after the first drag interaction.
2. **Project card** — placeholder #1
3. **Project card** — placeholder #2
4. **Project card** — placeholder #3
5. **Project card** — placeholder #4
6. **Experience card** — compact timeline: AppsForce (2022–23, Data Scientist), Accenture (2021–22, Analytics Consultant), Province of North Holland (2019–21, Operations Research), Donders Institute (2019–21, Computational Neuroscience).
7. **Education card** — MSc Computational Science UvA (2019–21), BSc Psychobiology UvA (2016–19), Biological & Pharmaceutical Lab Tech AP Hogeschool (2013–16).

Project cards ship with placeholders; user fills in real content later by editing `src/data/cards.ts`.

## Interaction

- Top card is draggable on the X axis (`motion.div drag="x"`).
- During drag, card rotates slightly (`rotate = x * 0.05`) for natural flick feel.
- On drag end: if `|x| > 100` OR `|velocity| > 500` → animate the card off-screen in the swipe direction and advance the index. Otherwise snap back to 0.
- Stack cycles infinitely: after the last card, the first comes back to the top.
- Two cards behind the top one are visible: `scale` 0.95 / 0.9, `y` offset 10px / 20px, reduced opacity. They are not interactive.
- Prev/Next arrow buttons below the stack call the same advance/retreat handlers (keyboard ←/→ also bound).
- A `3 / 7` counter sits between the buttons.

## Layout

- Single full-viewport screen, centered card stack.
- Background: existing `images/background_1.jpg` (preserves visual identity).
- Footer: name + year, minimal.
- No nav menu — everything is on the cards.
- Card size: ~360×500 on desktop, full-width minus padding on mobile. Same size for every card so the stack stays visually coherent.

## File structure

```
cv/
├── index.html              Vite entry
├── package.json
├── vite.config.ts          base path for GH Pages
├── tsconfig.json
├── public/
│   ├── images/             existing photos moved here
│   └── favicon.ico
├── src/
│   ├── main.tsx            React root
│   ├── App.tsx             background + footer + <CardStack/>
│   ├── data/
│   │   └── cards.ts        all card content
│   ├── components/
│   │   ├── CardStack.tsx   drag logic, stack rendering, counter, buttons
│   │   ├── Card.tsx        generic card shell (border, shadow, padding)
│   │   ├── BusinessCard.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ExperienceCard.tsx
│   │   └── EducationCard.tsx
│   └── styles/
│       └── globals.css     reset, font, background, footer
```

## Data shape

```ts
// src/data/cards.ts
type CardData =
  | { kind: 'business'; name: string; title: string; location: string;
      photo: string; links: { linkedin: string; github: string } }
  | { kind: 'project'; title: string; image: string; description: string;
      tech: string[]; link?: string }
  | { kind: 'experience'; entries: { period: string; company: string;
      role: string; summary: string }[] }
  | { kind: 'education'; entries: { period: string; degree: string;
      school: string }[] };

export const cards: CardData[] = [ /* 7 entries in display order */ ];
```

`CardStack` switches on `card.kind` and renders the matching component. Adding/removing/reordering a card = one edit in this array.

## Component responsibilities

- **`App.tsx`** — renders background image, mounts `<CardStack cards={cards} />`, renders footer. No state.
- **`CardStack.tsx`** — owns `topIndex` state. Renders top card (draggable) plus two behind it. Wires drag-end handler, prev/next buttons, keyboard nav, counter.
- **`Card.tsx`** — visual shell (rounded corners, white background, shadow, fixed size). Receives `children`. No motion logic — that lives in `CardStack`.
- **`BusinessCard.tsx` / `ProjectCard.tsx` / `ExperienceCard.tsx` / `EducationCard.tsx`** — pure presentational. Take their slice of `CardData` as props. Render layout for that card type.

## Hosting / deploy

- GitHub Pages on the `samverh/cv` repo.
- Vite config: `base: '/cv/'` (no CNAME currently — recent commit deleted it).
- Deploy via GitHub Actions on push to `main`: build with `npm run build`, publish `dist/` to `gh-pages` branch.
- If a custom domain is added later, change `base` to `'/'`.

## Cleanup

Removed from the repo as part of this work:

- `css/`, `js/`, `scripts/` (old Bootstrap/jQuery/AOS assets)
- `LICENSE-free.txt`, `README.txt` (template files)
- `cards/` (stub folder with only the Framer URL reference)
- old `index.html` (replaced by Vite's)

Kept:

- `images/` (moved to `public/images/`)
- `favicon.ico` (moved to `public/`)
- `Sam_Verhezen-CV_2023_EN.pdf` (moved to `public/`, still downloadable if linked)

## Out of scope

- Contact form (page text remains "contact me via LinkedIn")
- Analytics, dark/light toggle, i18n
- Server-side rendering, routing, SEO beyond the default
- Real project content (placeholders only)
- Re-adding a custom domain (separate task if desired later)

## Success criteria

- `npm run dev` serves the site locally; drag, buttons, and keyboard nav all advance/retreat the stack.
- `npm run build` produces a static bundle that runs from `/cv/` on GitHub Pages.
- All 7 cards render with correct content from `cards.ts`.
- Adding an 8th card requires editing only `cards.ts` (no component changes for an existing `kind`).
- No references to Bootstrap, jQuery, AOS, or the hosted Framer module URL remain.
