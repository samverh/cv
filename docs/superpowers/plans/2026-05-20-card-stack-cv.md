# Card-Stack CV Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static HTML/Bootstrap/jQuery CV with a single-screen Vite + React + framer-motion card stack (7 cards: business card, 4 project placeholders, experience, education) deployed to GitHub Pages.

**Architecture:** Single-page Vite + React + TypeScript app. One `CardStack` component owns the topIndex state and renders the top card (draggable via framer-motion) plus two cards behind it (scaled/offset). Card content is data-driven via a discriminated union in `src/data/cards.ts` — adding/reordering cards = one edit there. The hosted `framer.com/m/...` module URL is reference only; we use the `framer-motion` npm library directly.

**Tech Stack:** Vite 5, React 18, TypeScript, framer-motion 11, Vitest, @testing-library/react, jsdom. Static build deployed to GitHub Pages via Actions.

**Spec:** [docs/superpowers/specs/2026-05-20-card-stack-cv-design.md](../specs/2026-05-20-card-stack-cv-design.md)

---

## Notes for the implementer

- The repo currently contains a static site (Bootstrap, jQuery, AOS). We are replacing it. The new entry `index.html` must live at the repo root because Vite expects it there.
- `images/`, `favicon.ico`, and `Sam_Verhezen-CV_2023_EN.pdf` must be moved into `public/` so Vite serves them and the build emits them.
- The legacy `css/`, `js/`, `scripts/`, `README.txt`, `LICENSE-free.txt`, and `cards/` folder are deleted in Task 13.
- All commands assume the repo root `c:\Users\defaultuser0\Desktop\cv` as cwd. Shell is PowerShell.
- The user is on Windows; use PowerShell-compatible syntax. The Bash tool is fine for git operations.
- After every task, the tree should build (`npm run build`) and tests should pass (`npm test`). The exception is Task 1, where there are no tests yet — only `npm run dev` boots.

---

## Task 1: Scaffold Vite + React + TypeScript project

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `index.html` (replacing the old static one)
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/vite-env.d.ts`
- Create: `.gitignore` (add node_modules, dist)
- Delete: old `index.html` (replaced)
- Move: `images/` → `public/images/`
- Move: `favicon.ico` → `public/favicon.ico`
- Move: `Sam_Verhezen-CV_2023_EN.pdf` → `public/Sam_Verhezen-CV_2023_EN.pdf`

- [ ] **Step 1: Delete the legacy entry HTML and move static assets into `public/`**

```powershell
Remove-Item index.html
New-Item -ItemType Directory -Force public | Out-Null
Move-Item images public/images
Move-Item favicon.ico public/favicon.ico
Move-Item Sam_Verhezen-CV_2023_EN.pdf public/Sam_Verhezen-CV_2023_EN.pdf
```

- [ ] **Step 2: Create `.gitignore`**

```
node_modules
dist
.vite
*.log
.DS_Store
```

- [ ] **Step 3: Create `package.json`**

```json
{
  "name": "cv",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "framer-motion": "^11.11.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.5.0",
    "@testing-library/react": "^16.0.1",
    "@testing-library/user-event": "^14.5.2",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.2",
    "jsdom": "^25.0.1",
    "typescript": "^5.6.2",
    "vite": "^5.4.8",
    "vitest": "^2.1.2"
  }
}
```

- [ ] **Step 4: Create `vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/cv/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

- [ ] **Step 5: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 6: Create `tsconfig.node.json`**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 7: Create `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/cv/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sam Verhezen — CV</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 8: Create `src/vite-env.d.ts`**

```ts
/// <reference types="vite/client" />
```

- [ ] **Step 9: Create `src/main.tsx`**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

- [ ] **Step 10: Create `src/App.tsx` (placeholder)**

```tsx
export default function App() {
  return <main>Sam Verhezen</main>;
}
```

- [ ] **Step 11: Install dependencies and verify dev server**

```powershell
npm install
npm run dev
```

Expected: Vite prints `Local: http://localhost:5173/cv/`. Visit it; page shows the text "Sam Verhezen". Stop the dev server (Ctrl+C).

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "Scaffold Vite + React + TypeScript app and migrate assets to public/"
```

---

## Task 2: Set up Vitest + Testing Library

**Files:**
- Create: `src/test/setup.ts`
- Create: `src/App.test.tsx`

- [ ] **Step 1: Create the test setup file**

```ts
// src/test/setup.ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 2: Write a failing smoke test for `App`**

```tsx
// src/App.test.tsx
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the name', () => {
    render(<App />);
    expect(screen.getByText('Sam Verhezen')).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run the test to verify it passes**

```powershell
npm test
```

Expected: 1 test passes. (`App` already renders "Sam Verhezen" from Task 1 — this test exists to prove the test pipeline works.)

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add Vitest + Testing Library setup with App smoke test"
```

---

## Task 3: Define card data types and seed entries

**Files:**
- Create: `src/data/cards.ts`
- Create: `src/data/cards.test.ts`

- [ ] **Step 1: Write failing tests for the seed data**

```ts
// src/data/cards.test.ts
import { cards } from './cards';

describe('cards', () => {
  it('contains 7 entries', () => {
    expect(cards).toHaveLength(7);
  });

  it('starts with the business card', () => {
    expect(cards[0].kind).toBe('business');
  });

  it('has 4 project cards in positions 1-4', () => {
    expect(cards.slice(1, 5).map((c) => c.kind)).toEqual([
      'project', 'project', 'project', 'project',
    ]);
  });

  it('ends with experience then education', () => {
    expect(cards[5].kind).toBe('experience');
    expect(cards[6].kind).toBe('education');
  });

  it('experience card has 4 entries', () => {
    const exp = cards[5];
    if (exp.kind !== 'experience') throw new Error('wrong kind');
    expect(exp.entries).toHaveLength(4);
  });

  it('education card has 3 entries', () => {
    const edu = cards[6];
    if (edu.kind !== 'education') throw new Error('wrong kind');
    expect(edu.entries).toHaveLength(3);
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

```powershell
npm test
```

Expected: FAIL — `cards.ts` does not exist.

- [ ] **Step 3: Create `src/data/cards.ts`**

```ts
export type BusinessCardData = {
  kind: 'business';
  name: string;
  title: string;
  location: string;
  photo: string;
  links: { linkedin: string; github: string };
};

export type ProjectCardData = {
  kind: 'project';
  title: string;
  image: string;
  description: string;
  tech: string[];
  link?: string;
};

export type ExperienceEntry = {
  period: string;
  company: string;
  role: string;
  summary: string;
};

export type ExperienceCardData = {
  kind: 'experience';
  entries: ExperienceEntry[];
};

export type EducationEntry = {
  period: string;
  degree: string;
  school: string;
};

export type EducationCardData = {
  kind: 'education';
  entries: EducationEntry[];
};

export type CardData =
  | BusinessCardData
  | ProjectCardData
  | ExperienceCardData
  | EducationCardData;

export const cards: CardData[] = [
  {
    kind: 'business',
    name: 'Sam Verhezen',
    title: 'Computational Scientist',
    location: 'Maastricht, NL',
    photo: '/cv/images/profiel_3.jpg',
    links: {
      linkedin: 'https://www.linkedin.com/in/samverhezen/',
      github: 'https://github.com/samverh',
    },
  },
  {
    kind: 'project',
    title: 'Project One',
    image: '/cv/images/project-1.png',
    description: 'Placeholder description. Replace with a real project.',
    tech: ['Python', 'PyTorch'],
  },
  {
    kind: 'project',
    title: 'Project Two',
    image: '/cv/images/project-2.jpg',
    description: 'Placeholder description. Replace with a real project.',
    tech: ['TypeScript', 'React'],
  },
  {
    kind: 'project',
    title: 'Project Three',
    image: '/cv/images/project-3.png',
    description: 'Placeholder description. Replace with a real project.',
    tech: ['R', 'tidyverse'],
  },
  {
    kind: 'project',
    title: 'Project Four',
    image: '/cv/images/project-4.jpg',
    description: 'Placeholder description. Replace with a real project.',
    tech: ['PHP', 'MySQL'],
  },
  {
    kind: 'experience',
    entries: [
      {
        period: 'April 2022 – April 2023',
        company: 'AppsForce',
        role: 'Data Scientist',
        summary:
          'Machine learning to correct translation mistakes in medical texts (EN → AR).',
      },
      {
        period: 'December 2021 – April 2022',
        company: 'Accenture',
        role: 'Data Analytics Consultant',
        summary:
          'Built digitalization tooling for large enterprises and helped customers adopt it.',
      },
      {
        period: 'December 2019 – June 2021',
        company: 'Province of North Holland',
        role: 'Intern, Operations Research',
        summary:
          'Optimized response times of road-management vehicles across the province.',
      },
      {
        period: 'December 2019 – June 2021',
        company: 'Donders Institute',
        role: 'Intern, Computational Neuroscience',
        summary: 'Modelled the effect of inhibition on pyramidal neurons.',
      },
    ],
  },
  {
    kind: 'education',
    entries: [
      {
        period: '2019 – 2021',
        degree: 'MSc Computational Science',
        school: 'University of Amsterdam',
      },
      {
        period: '2016 – 2019',
        degree: 'BSc Psychobiology',
        school: 'University of Amsterdam',
      },
      {
        period: '2013 – 2016',
        degree: 'Biological & Pharmaceutical Laboratory Technology',
        school: 'Artesis Plantijn Hogeschool Antwerpen',
      },
    ],
  },
];
```

- [ ] **Step 4: Run the test and confirm it passes**

```powershell
npm test
```

Expected: all `cards` tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add card data types and seed entries"
```

---

## Task 4: Generic Card shell component

**Files:**
- Create: `src/components/Card.tsx`
- Create: `src/components/Card.test.tsx`

- [ ] **Step 1: Write failing tests**

```tsx
// src/components/Card.test.tsx
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(
      <Card>
        <p>hello card</p>
      </Card>,
    );
    expect(screen.getByText('hello card')).toBeInTheDocument();
  });

  it('applies the card class', () => {
    const { container } = render(<Card>x</Card>);
    expect(container.firstChild).toHaveClass('card');
  });
});
```

- [ ] **Step 2: Run test, confirm failure**

```powershell
npm test
```

Expected: FAIL — `Card.tsx` missing.

- [ ] **Step 3: Implement `Card.tsx`**

```tsx
// src/components/Card.tsx
import type { ReactNode } from 'react';
import './Card.css';

export function Card({ children }: { children: ReactNode }) {
  return <div className="card">{children}</div>;
}
```

- [ ] **Step 4: Create `src/components/Card.css`**

```css
.card {
  width: 360px;
  height: 500px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

@media (max-width: 480px) {
  .card {
    width: calc(100vw - 32px);
    height: 70vh;
    max-height: 500px;
  }
}
```

- [ ] **Step 5: Run tests, confirm pass**

```powershell
npm test
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add generic Card shell component"
```

---

## Task 5: BusinessCard component

**Files:**
- Create: `src/components/BusinessCard.tsx`
- Create: `src/components/BusinessCard.test.tsx`

- [ ] **Step 1: Write failing tests**

```tsx
// src/components/BusinessCard.test.tsx
import { render, screen } from '@testing-library/react';
import { BusinessCard } from './BusinessCard';
import type { BusinessCardData } from '../data/cards';

const data: BusinessCardData = {
  kind: 'business',
  name: 'Sam Verhezen',
  title: 'Computational Scientist',
  location: 'Maastricht, NL',
  photo: '/cv/images/profiel_3.jpg',
  links: {
    linkedin: 'https://www.linkedin.com/in/samverhezen/',
    github: 'https://github.com/samverh',
  },
};

describe('BusinessCard', () => {
  it('shows name, title, and location', () => {
    render(<BusinessCard data={data} />);
    expect(screen.getByText('Sam Verhezen')).toBeInTheDocument();
    expect(screen.getByText('Computational Scientist')).toBeInTheDocument();
    expect(screen.getByText('Maastricht, NL')).toBeInTheDocument();
  });

  it('renders the profile photo with an alt', () => {
    render(<BusinessCard data={data} />);
    const img = screen.getByAltText('Sam Verhezen') as HTMLImageElement;
    expect(img.src).toContain('/cv/images/profiel_3.jpg');
  });

  it('links to LinkedIn and GitHub', () => {
    render(<BusinessCard data={data} />);
    const linkedin = screen.getByRole('link', { name: /linkedin/i });
    const github = screen.getByRole('link', { name: /github/i });
    expect(linkedin).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/samverhezen/',
    );
    expect(github).toHaveAttribute('href', 'https://github.com/samverh');
  });
});
```

- [ ] **Step 2: Run, confirm fail**

```powershell
npm test
```

Expected: FAIL — `BusinessCard.tsx` missing.

- [ ] **Step 3: Implement `BusinessCard.tsx`**

```tsx
// src/components/BusinessCard.tsx
import { Card } from './Card';
import type { BusinessCardData } from '../data/cards';
import './BusinessCard.css';

export function BusinessCard({ data }: { data: BusinessCardData }) {
  return (
    <Card>
      <div className="business-card">
        <img className="business-card__photo" src={data.photo} alt={data.name} />
        <h1 className="business-card__name">{data.name}</h1>
        <p className="business-card__title">{data.title}</p>
        <p className="business-card__location">{data.location}</p>
        <div className="business-card__links">
          <a href={data.links.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={data.links.github} aria-label="GitHub" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </Card>
  );
}
```

- [ ] **Step 4: Create `src/components/BusinessCard.css`**

```css
.business-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  justify-content: center;
  gap: 8px;
}
.business-card__photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
}
.business-card__name {
  font-size: 1.6rem;
  margin: 0;
}
.business-card__title {
  font-size: 1rem;
  color: #666;
  margin: 0;
}
.business-card__location {
  font-size: 0.9rem;
  color: #888;
  margin: 0;
}
.business-card__links {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}
.business-card__links a {
  color: #2076d2;
  text-decoration: none;
  font-weight: 600;
}
```

- [ ] **Step 5: Run tests, confirm pass**

```powershell
npm test
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add BusinessCard component"
```

---

## Task 6: ProjectCard component

**Files:**
- Create: `src/components/ProjectCard.tsx`
- Create: `src/components/ProjectCard.test.tsx`

- [ ] **Step 1: Write failing tests**

```tsx
// src/components/ProjectCard.test.tsx
import { render, screen } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';
import type { ProjectCardData } from '../data/cards';

const baseData: ProjectCardData = {
  kind: 'project',
  title: 'Project One',
  image: '/cv/images/project-1.png',
  description: 'A placeholder description.',
  tech: ['Python', 'PyTorch'],
};

describe('ProjectCard', () => {
  it('shows title, description, and tech badges', () => {
    render(<ProjectCard data={baseData} />);
    expect(screen.getByText('Project One')).toBeInTheDocument();
    expect(screen.getByText('A placeholder description.')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('PyTorch')).toBeInTheDocument();
  });

  it('renders the project image', () => {
    render(<ProjectCard data={baseData} />);
    const img = screen.getByAltText('Project One') as HTMLImageElement;
    expect(img.src).toContain('/cv/images/project-1.png');
  });

  it('shows a link button when link is provided', () => {
    render(<ProjectCard data={{ ...baseData, link: 'https://example.com' }} />);
    const link = screen.getByRole('link', { name: /view project/i });
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('omits the link button when no link is provided', () => {
    render(<ProjectCard data={baseData} />);
    expect(screen.queryByRole('link', { name: /view project/i })).toBeNull();
  });
});
```

- [ ] **Step 2: Run, confirm fail**

```powershell
npm test
```

Expected: FAIL — `ProjectCard.tsx` missing.

- [ ] **Step 3: Implement `ProjectCard.tsx`**

```tsx
// src/components/ProjectCard.tsx
import { Card } from './Card';
import type { ProjectCardData } from '../data/cards';
import './ProjectCard.css';

export function ProjectCard({ data }: { data: ProjectCardData }) {
  return (
    <Card>
      <div className="project-card">
        <img className="project-card__image" src={data.image} alt={data.title} />
        <h2 className="project-card__title">{data.title}</h2>
        <p className="project-card__description">{data.description}</p>
        <ul className="project-card__tech">
          {data.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {data.link && (
          <a
            className="project-card__link"
            href={data.link}
            target="_blank"
            rel="noreferrer"
          >
            View project
          </a>
        )}
      </div>
    </Card>
  );
}
```

- [ ] **Step 4: Create `src/components/ProjectCard.css`**

```css
.project-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 8px;
}
.project-card__image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 8px;
}
.project-card__title {
  font-size: 1.3rem;
  margin: 0;
}
.project-card__description {
  color: #555;
  margin: 0;
  font-size: 0.95rem;
  flex-grow: 1;
}
.project-card__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  list-style: none;
  padding: 0;
  margin: 0;
}
.project-card__tech li {
  background: #eef3fb;
  color: #2076d2;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
}
.project-card__link {
  align-self: flex-start;
  color: #2076d2;
  font-weight: 600;
  text-decoration: none;
}
```

- [ ] **Step 5: Run tests, confirm pass**

```powershell
npm test
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add ProjectCard component"
```

---

## Task 7: ExperienceCard component

**Files:**
- Create: `src/components/ExperienceCard.tsx`
- Create: `src/components/ExperienceCard.test.tsx`

- [ ] **Step 1: Write failing tests**

```tsx
// src/components/ExperienceCard.test.tsx
import { render, screen } from '@testing-library/react';
import { ExperienceCard } from './ExperienceCard';
import type { ExperienceCardData } from '../data/cards';

const data: ExperienceCardData = {
  kind: 'experience',
  entries: [
    {
      period: '2022 – 2023',
      company: 'AppsForce',
      role: 'Data Scientist',
      summary: 'ML for translation correction.',
    },
    {
      period: '2021 – 2022',
      company: 'Accenture',
      role: 'Consultant',
      summary: 'Digitalization tooling.',
    },
  ],
};

describe('ExperienceCard', () => {
  it('renders the section heading', () => {
    render(<ExperienceCard data={data} />);
    expect(screen.getByRole('heading', { name: /experience/i })).toBeInTheDocument();
  });

  it('lists every entry with period, company, and role', () => {
    render(<ExperienceCard data={data} />);
    expect(screen.getByText('AppsForce')).toBeInTheDocument();
    expect(screen.getByText('Data Scientist')).toBeInTheDocument();
    expect(screen.getByText('2022 – 2023')).toBeInTheDocument();
    expect(screen.getByText('Accenture')).toBeInTheDocument();
    expect(screen.getByText('Consultant')).toBeInTheDocument();
    expect(screen.getByText('2021 – 2022')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run, confirm fail**

```powershell
npm test
```

Expected: FAIL.

- [ ] **Step 3: Implement `ExperienceCard.tsx`**

```tsx
// src/components/ExperienceCard.tsx
import { Card } from './Card';
import type { ExperienceCardData } from '../data/cards';
import './ListCard.css';

export function ExperienceCard({ data }: { data: ExperienceCardData }) {
  return (
    <Card>
      <div className="list-card">
        <h2 className="list-card__title">Experience</h2>
        <ul className="list-card__entries">
          {data.entries.map((e) => (
            <li key={`${e.company}-${e.period}`} className="list-card__entry">
              <div className="list-card__period">{e.period}</div>
              <div className="list-card__primary">{e.company}</div>
              <div className="list-card__secondary">{e.role}</div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
```

- [ ] **Step 4: Create `src/components/ListCard.css` (shared with EducationCard)**

```css
.list-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.list-card__title {
  font-size: 1.3rem;
  margin: 0 0 16px 0;
}
.list-card__entries {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow-y: auto;
}
.list-card__entry {
  border-left: 3px solid #2076d2;
  padding-left: 10px;
}
.list-card__period {
  font-size: 0.78rem;
  color: #888;
}
.list-card__primary {
  font-weight: 600;
  font-size: 0.98rem;
}
.list-card__secondary {
  font-size: 0.88rem;
  color: #555;
}
```

- [ ] **Step 5: Run tests, confirm pass**

```powershell
npm test
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add ExperienceCard component"
```

---

## Task 8: EducationCard component

**Files:**
- Create: `src/components/EducationCard.tsx`
- Create: `src/components/EducationCard.test.tsx`

- [ ] **Step 1: Write failing tests**

```tsx
// src/components/EducationCard.test.tsx
import { render, screen } from '@testing-library/react';
import { EducationCard } from './EducationCard';
import type { EducationCardData } from '../data/cards';

const data: EducationCardData = {
  kind: 'education',
  entries: [
    {
      period: '2019 – 2021',
      degree: 'MSc Computational Science',
      school: 'University of Amsterdam',
    },
    {
      period: '2016 – 2019',
      degree: 'BSc Psychobiology',
      school: 'University of Amsterdam',
    },
  ],
};

describe('EducationCard', () => {
  it('renders the section heading', () => {
    render(<EducationCard data={data} />);
    expect(screen.getByRole('heading', { name: /education/i })).toBeInTheDocument();
  });

  it('lists every entry with period, degree, and school', () => {
    render(<EducationCard data={data} />);
    expect(screen.getByText('MSc Computational Science')).toBeInTheDocument();
    expect(screen.getByText('BSc Psychobiology')).toBeInTheDocument();
    expect(screen.getAllByText('University of Amsterdam')).toHaveLength(2);
    expect(screen.getByText('2019 – 2021')).toBeInTheDocument();
    expect(screen.getByText('2016 – 2019')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run, confirm fail**

```powershell
npm test
```

Expected: FAIL.

- [ ] **Step 3: Implement `EducationCard.tsx`**

```tsx
// src/components/EducationCard.tsx
import { Card } from './Card';
import type { EducationCardData } from '../data/cards';
import './ListCard.css';

export function EducationCard({ data }: { data: EducationCardData }) {
  return (
    <Card>
      <div className="list-card">
        <h2 className="list-card__title">Education</h2>
        <ul className="list-card__entries">
          {data.entries.map((e) => (
            <li key={`${e.degree}-${e.period}`} className="list-card__entry">
              <div className="list-card__period">{e.period}</div>
              <div className="list-card__primary">{e.degree}</div>
              <div className="list-card__secondary">{e.school}</div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
```

- [ ] **Step 4: Run tests, confirm pass**

```powershell
npm test
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add EducationCard component"
```

---

## Task 9: Card index/selector helper

**Files:**
- Create: `src/components/CardView.tsx`
- Create: `src/components/CardView.test.tsx`

A small helper that takes a `CardData` and returns the right component. Keeps `CardStack` clean.

- [ ] **Step 1: Write failing tests**

```tsx
// src/components/CardView.test.tsx
import { render, screen } from '@testing-library/react';
import { CardView } from './CardView';
import type { CardData } from '../data/cards';

describe('CardView', () => {
  it('renders a BusinessCard for kind=business', () => {
    const card: CardData = {
      kind: 'business',
      name: 'Sam',
      title: 'Sci',
      location: 'NL',
      photo: '/p.jpg',
      links: { linkedin: 'L', github: 'G' },
    };
    render(<CardView card={card} />);
    expect(screen.getByText('Sam')).toBeInTheDocument();
  });

  it('renders a ProjectCard for kind=project', () => {
    const card: CardData = {
      kind: 'project',
      title: 'Proj',
      image: '/i.jpg',
      description: 'd',
      tech: ['x'],
    };
    render(<CardView card={card} />);
    expect(screen.getByText('Proj')).toBeInTheDocument();
  });

  it('renders an ExperienceCard for kind=experience', () => {
    const card: CardData = { kind: 'experience', entries: [] };
    render(<CardView card={card} />);
    expect(screen.getByRole('heading', { name: /experience/i })).toBeInTheDocument();
  });

  it('renders an EducationCard for kind=education', () => {
    const card: CardData = { kind: 'education', entries: [] };
    render(<CardView card={card} />);
    expect(screen.getByRole('heading', { name: /education/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run, confirm fail**

```powershell
npm test
```

Expected: FAIL.

- [ ] **Step 3: Implement `CardView.tsx`**

```tsx
// src/components/CardView.tsx
import type { CardData } from '../data/cards';
import { BusinessCard } from './BusinessCard';
import { ProjectCard } from './ProjectCard';
import { ExperienceCard } from './ExperienceCard';
import { EducationCard } from './EducationCard';

export function CardView({ card }: { card: CardData }) {
  switch (card.kind) {
    case 'business':
      return <BusinessCard data={card} />;
    case 'project':
      return <ProjectCard data={card} />;
    case 'experience':
      return <ExperienceCard data={card} />;
    case 'education':
      return <EducationCard data={card} />;
  }
}
```

- [ ] **Step 4: Run tests, confirm pass**

```powershell
npm test
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add CardView selector that dispatches on card kind"
```

---

## Task 10: Swipe-threshold helper (pure function)

**Files:**
- Create: `src/components/swipeThreshold.ts`
- Create: `src/components/swipeThreshold.test.ts`

Extracting the swipe-decision logic to a pure function makes it unit-testable without simulating drag events.

- [ ] **Step 1: Write failing tests**

```ts
// src/components/swipeThreshold.test.ts
import { shouldDismiss } from './swipeThreshold';

describe('shouldDismiss', () => {
  it('returns null when below distance and velocity thresholds', () => {
    expect(shouldDismiss({ offsetX: 40, velocityX: 100 })).toBeNull();
    expect(shouldDismiss({ offsetX: -40, velocityX: -100 })).toBeNull();
  });

  it('returns "right" when offset exceeds 100 to the right', () => {
    expect(shouldDismiss({ offsetX: 120, velocityX: 0 })).toBe('right');
  });

  it('returns "left" when offset exceeds 100 to the left', () => {
    expect(shouldDismiss({ offsetX: -120, velocityX: 0 })).toBe('left');
  });

  it('returns "right" when velocity exceeds 500 to the right', () => {
    expect(shouldDismiss({ offsetX: 10, velocityX: 600 })).toBe('right');
  });

  it('returns "left" when velocity exceeds 500 to the left', () => {
    expect(shouldDismiss({ offsetX: -10, velocityX: -600 })).toBe('left');
  });
});
```

- [ ] **Step 2: Run, confirm fail**

```powershell
npm test
```

Expected: FAIL.

- [ ] **Step 3: Implement `swipeThreshold.ts`**

```ts
// src/components/swipeThreshold.ts
export type SwipeDirection = 'left' | 'right';

const DISTANCE_THRESHOLD = 100;
const VELOCITY_THRESHOLD = 500;

export function shouldDismiss({
  offsetX,
  velocityX,
}: {
  offsetX: number;
  velocityX: number;
}): SwipeDirection | null {
  if (offsetX > DISTANCE_THRESHOLD || velocityX > VELOCITY_THRESHOLD) {
    return 'right';
  }
  if (offsetX < -DISTANCE_THRESHOLD || velocityX < -VELOCITY_THRESHOLD) {
    return 'left';
  }
  return null;
}
```

- [ ] **Step 4: Run tests, confirm pass**

```powershell
npm test
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add pure swipe-threshold helper"
```

---

## Task 11: CardStack — navigation logic (buttons, keyboard, counter)

**Files:**
- Create: `src/components/CardStack.tsx`
- Create: `src/components/CardStack.test.tsx`
- Create: `src/components/CardStack.css`

Build navigation first without drag. Drag is added in Task 12.

- [ ] **Step 1: Write failing tests**

```tsx
// src/components/CardStack.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { CardStack } from './CardStack';
import type { CardData } from '../data/cards';

const sample: CardData[] = [
  {
    kind: 'business',
    name: 'Sam',
    title: 'Sci',
    location: 'NL',
    photo: '/p.jpg',
    links: { linkedin: 'L', github: 'G' },
  },
  {
    kind: 'project',
    title: 'P1',
    image: '/i1.jpg',
    description: 'd1',
    tech: ['x'],
  },
  {
    kind: 'project',
    title: 'P2',
    image: '/i2.jpg',
    description: 'd2',
    tech: ['y'],
  },
];

describe('CardStack navigation', () => {
  it('shows the first card on mount', () => {
    render(<CardStack cards={sample} />);
    expect(screen.getByText('Sam')).toBeInTheDocument();
  });

  it('shows the counter at position 1', () => {
    render(<CardStack cards={sample} />);
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('next button advances to the next card', () => {
    render(<CardStack cards={sample} />);
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByText('P1')).toBeInTheDocument();
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
  });

  it('previous button goes back, cycling from first to last', () => {
    render(<CardStack cards={sample} />);
    fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    expect(screen.getByText('P2')).toBeInTheDocument();
    expect(screen.getByText('3 / 3')).toBeInTheDocument();
  });

  it('cycles from last back to first when advancing past the end', () => {
    render(<CardStack cards={sample} />);
    const next = screen.getByRole('button', { name: /next/i });
    fireEvent.click(next);
    fireEvent.click(next);
    fireEvent.click(next);
    expect(screen.getByText('Sam')).toBeInTheDocument();
  });

  it('arrow keys advance and retreat', () => {
    render(<CardStack cards={sample} />);
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByText('P1')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getByText('Sam')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run, confirm fail**

```powershell
npm test
```

Expected: FAIL — `CardStack` missing.

- [ ] **Step 3: Implement `CardStack.tsx` (navigation only)**

```tsx
// src/components/CardStack.tsx
import { useEffect, useState } from 'react';
import type { CardData } from '../data/cards';
import { CardView } from './CardView';
import './CardStack.css';

export function CardStack({ cards }: { cards: CardData[] }) {
  const [topIndex, setTopIndex] = useState(0);

  const advance = () => setTopIndex((i) => (i + 1) % cards.length);
  const retreat = () =>
    setTopIndex((i) => (i - 1 + cards.length) % cards.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') advance();
      if (e.key === 'ArrowLeft') retreat();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const visible = [0, 1, 2]
    .map((depth) => ({
      depth,
      card: cards[(topIndex + depth) % cards.length],
    }))
    .reverse();

  return (
    <div className="card-stack">
      <div className="card-stack__deck">
        {visible.map(({ depth, card }) => (
          <div
            key={`${topIndex}-${depth}`}
            className="card-stack__layer"
            style={{
              transform: `translateY(${depth * 10}px) scale(${1 - depth * 0.05})`,
              opacity: 1 - depth * 0.25,
              zIndex: 10 - depth,
            }}
          >
            <CardView card={card} />
          </div>
        ))}
      </div>
      <div className="card-stack__controls">
        <button aria-label="Previous card" onClick={retreat}>
          ‹
        </button>
        <span className="card-stack__counter">
          {topIndex + 1} / {cards.length}
        </span>
        <button aria-label="Next card" onClick={advance}>
          ›
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create `src/components/CardStack.css`**

```css
.card-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}
.card-stack__deck {
  position: relative;
  width: 360px;
  height: 500px;
}
@media (max-width: 480px) {
  .card-stack__deck {
    width: calc(100vw - 32px);
    height: 70vh;
    max-height: 500px;
  }
}
.card-stack__layer {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
}
.card-stack__controls {
  display: flex;
  align-items: center;
  gap: 24px;
}
.card-stack__controls button {
  background: rgba(255, 255, 255, 0.85);
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 1.6rem;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}
.card-stack__counter {
  color: #fff;
  font-weight: 600;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  min-width: 56px;
  text-align: center;
}
```

- [ ] **Step 5: Run tests, confirm pass**

```powershell
npm test
```

Expected: PASS — all 6 `CardStack navigation` tests.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add CardStack with button, keyboard, and counter navigation"
```

---

## Task 12: CardStack — drag-to-swipe via framer-motion

**Files:**
- Modify: `src/components/CardStack.tsx`

Wire the top card to framer-motion's `motion.div` with `drag="x"`. Use the `shouldDismiss` helper from Task 10 in the drag-end handler.

- [ ] **Step 1: Replace the top layer's rendering with a draggable `motion.div`**

In `src/components/CardStack.tsx`, change the imports and the layer-rendering block. Full new file:

```tsx
// src/components/CardStack.tsx
import { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from 'framer-motion';
import type { CardData } from '../data/cards';
import { CardView } from './CardView';
import { shouldDismiss } from './swipeThreshold';
import './CardStack.css';

function DraggableTop({
  card,
  onDismiss,
}: {
  card: CardData;
  onDismiss: () => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const direction = shouldDismiss({
      offsetX: info.offset.x,
      velocityX: info.velocity.x,
    });
    if (direction !== null) onDismiss();
  };

  return (
    <motion.div
      className="card-stack__layer"
      style={{ x, rotate, zIndex: 10 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
    >
      <CardView card={card} />
    </motion.div>
  );
}

export function CardStack({ cards }: { cards: CardData[] }) {
  const [topIndex, setTopIndex] = useState(0);

  const advance = () => setTopIndex((i) => (i + 1) % cards.length);
  const retreat = () =>
    setTopIndex((i) => (i - 1 + cards.length) % cards.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') advance();
      if (e.key === 'ArrowLeft') retreat();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const visible = [0, 1, 2]
    .map((depth) => ({
      depth,
      card: cards[(topIndex + depth) % cards.length],
    }))
    .reverse();

  return (
    <div className="card-stack">
      <div className="card-stack__deck">
        {visible.map(({ depth, card }) =>
          depth === 0 ? (
            <DraggableTop
              key={`top-${topIndex}`}
              card={card}
              onDismiss={advance}
            />
          ) : (
            <div
              key={`back-${topIndex}-${depth}`}
              className="card-stack__layer"
              style={{
                transform: `translateY(${depth * 10}px) scale(${1 - depth * 0.05})`,
                opacity: 1 - depth * 0.25,
                zIndex: 10 - depth,
                pointerEvents: 'none',
              }}
            >
              <CardView card={card} />
            </div>
          ),
        )}
      </div>
      <div className="card-stack__controls">
        <button aria-label="Previous card" onClick={retreat}>
          ‹
        </button>
        <span className="card-stack__counter">
          {topIndex + 1} / {cards.length}
        </span>
        <button aria-label="Next card" onClick={advance}>
          ›
        </button>
      </div>
    </div>
  );
}
```

The `DraggableTop` subcomponent owns its own motion values so they reset cleanly when `topIndex` changes (because the key changes, React remounts it at `x = 0`). `useTransform` maps the drag offset to a small rotation, matching the spec's "rotate during drag" feel. Both left and right swipes advance the index — like flicking through a physical deck. `retreat` stays as a button/keyboard-only action.

- [ ] **Step 2: Run existing tests, confirm still pass**

```powershell
npm test
```

Expected: all Task 11 navigation tests still pass (framer-motion is permissive in jsdom — buttons and keyboard still work).

- [ ] **Step 3: Manually verify drag in the browser**

```powershell
npm run dev
```

Visit `http://localhost:5173/cv/`. Drag the top card to the left or right; past about 100px or with a flick it should advance to the next card. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add drag-to-swipe to the top card of CardStack"
```

---

## Task 13: "Drag me" hint that dismisses after first interaction

**Files:**
- Modify: `src/components/CardStack.tsx`
- Modify: `src/components/CardStack.css`
- Modify: `src/components/CardStack.test.tsx`

- [ ] **Step 1: Add a failing test**

Append this test inside the existing `describe('CardStack navigation', ...)` block in `src/components/CardStack.test.tsx`:

```tsx
  it('shows a drag hint initially and hides it after first advance', () => {
    render(<CardStack cards={sample} />);
    expect(screen.getByText(/drag me/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.queryByText(/drag me/i)).toBeNull();
  });
```

- [ ] **Step 2: Run, confirm fail**

```powershell
npm test
```

Expected: FAIL — hint not yet rendered.

- [ ] **Step 3: Add hint state to `CardStack`**

In `src/components/CardStack.tsx`, add a `hintVisible` piece of state and dismiss it on the first `advance`/`retreat` call. Replace the existing `advance` and `retreat` declarations and add `hintVisible`:

```tsx
  const [topIndex, setTopIndex] = useState(0);
  const [hintVisible, setHintVisible] = useState(true);

  const advance = () => {
    setHintVisible(false);
    setTopIndex((i) => (i + 1) % cards.length);
  };
  const retreat = () => {
    setHintVisible(false);
    setTopIndex((i) => (i - 1 + cards.length) % cards.length);
  };
```

Then, inside the JSX, just before the closing `</div>` of `card-stack__deck`, render the hint:

```tsx
        {hintVisible && (
          <div className="card-stack__hint" aria-hidden="true">
            drag me →
          </div>
        )}
```

- [ ] **Step 4: Add hint styling to `src/components/CardStack.css`**

Append:

```css
.card-stack__hint {
  position: absolute;
  bottom: -36px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 0.9rem;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  pointer-events: none;
}
```

- [ ] **Step 5: Run tests, confirm pass**

```powershell
npm test
```

Expected: PASS — including the new hint test.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add 'drag me' hint that dismisses after first interaction"
```

---

## Task 14: Wire `App` with background, footer, and CardStack

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`
- Create: `src/App.css`
- Create: `src/styles/globals.css`
- Modify: `src/main.tsx`

- [ ] **Step 1: Update the `App` test**

Replace `src/App.test.tsx` with:

```tsx
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the card stack starting at the business card', () => {
    render(<App />);
    expect(screen.getByText('Sam Verhezen')).toBeInTheDocument();
  });

  it('renders the footer with the name', () => {
    render(<App />);
    expect(screen.getByRole('contentinfo')).toHaveTextContent('Sam Verhezen');
  });
});
```

- [ ] **Step 2: Run, confirm fail**

```powershell
npm test
```

Expected: FAIL — App still says only "Sam Verhezen" in a `<main>`, no `<footer>`, no card stack.

- [ ] **Step 3: Update `src/App.tsx`**

```tsx
import { CardStack } from './components/CardStack';
import { cards } from './data/cards';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <div
        className="app__background"
        style={{ backgroundImage: 'url(/cv/images/background_1.jpg)' }}
      />
      <main className="app__main">
        <CardStack cards={cards} />
      </main>
      <footer className="app__footer">
        <p>Sam Verhezen · © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
```

- [ ] **Step 4: Create `src/App.css`**

```css
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}
.app__background {
  position: fixed;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: brightness(0.7);
  z-index: -1;
}
.app__main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 16px 40px;
}
.app__footer {
  text-align: center;
  color: rgba(255, 255, 255, 0.85);
  padding: 16px;
  font-size: 0.85rem;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
}
```

- [ ] **Step 5: Create `src/styles/globals.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap');

* {
  box-sizing: border-box;
}
html,
body {
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', system-ui, sans-serif;
  color: #222;
  background: #111;
  -webkit-font-smoothing: antialiased;
}
#root {
  min-height: 100vh;
}
```

- [ ] **Step 6: Import the global stylesheet from `src/main.tsx`**

Replace `src/main.tsx` with:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

- [ ] **Step 7: Run tests, confirm pass**

```powershell
npm test
```

Expected: all tests pass, including the updated `App` tests.

- [ ] **Step 8: Manually verify the full app in the browser**

```powershell
npm run dev
```

Visit `http://localhost:5173/cv/`. Verify:
- Background image fills the viewport
- Business card is on top
- Two cards visible behind it (scaled, offset)
- "drag me →" hint shows
- Dragging or clicking ›/‹ advances; counter updates
- Arrow keys also work
- Footer shows "Sam Verhezen · © 2026"
- Stop the dev server

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "Wire App with background, footer, CardStack, and global styles"
```

---

## Task 15: Remove legacy site files

**Files:**
- Delete: `css/`
- Delete: `js/`
- Delete: `scripts/`
- Delete: `cards/`
- Delete: `README.txt`
- Delete: `LICENSE-free.txt`

- [ ] **Step 1: Delete legacy directories and files**

```powershell
Remove-Item -Recurse -Force css
Remove-Item -Recurse -Force js
Remove-Item -Recurse -Force scripts
Remove-Item -Recurse -Force cards
Remove-Item README.txt
Remove-Item LICENSE-free.txt
```

- [ ] **Step 2: Verify the build still works**

```powershell
npm run build
```

Expected: `vite build` completes; `dist/` exists with `index.html`, `assets/`, and the `images/` from `public/`.

- [ ] **Step 3: Verify tests still pass**

```powershell
npm test
```

Expected: all tests pass.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Remove legacy Bootstrap/jQuery site files"
```

---

## Task 16: GitHub Actions workflow for GitHub Pages deploy

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create the workflow**

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Verify a local production build one more time**

```powershell
npm run build
npm run preview
```

Visit the URL Vite prints (typically `http://localhost:4173/cv/`). Confirm the site loads and the card stack works. Stop the preview server.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "Add GitHub Actions workflow to deploy to GitHub Pages"
```

- [ ] **Step 4: Manual follow-up after pushing**

After pushing `main`, in the GitHub repo: **Settings → Pages → Build and deployment → Source** must be set to **GitHub Actions** (not "Deploy from a branch"). Once that's set, the next push to `main` deploys automatically to `https://samverh.github.io/cv/`.

---

## Final verification checklist

After the last commit:

- [ ] `npm test` passes with no skipped tests
- [ ] `npm run build` succeeds and produces `dist/`
- [ ] `npm run preview` shows a working site at `http://localhost:4173/cv/`
- [ ] All 7 cards render correctly when cycled
- [ ] Drag, buttons, and arrow keys all advance the stack
- [ ] No references to `bootstrap`, `jquery`, `aos`, or the hosted Framer module URL remain (`Grep` for them and confirm zero matches)
- [ ] `git status` is clean
