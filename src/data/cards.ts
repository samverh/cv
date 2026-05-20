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
    image: '/cv/images/project-1.jpg',
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
    image: '/cv/images/project-3.jpg',
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
