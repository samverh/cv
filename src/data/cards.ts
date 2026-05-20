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

export type IntroCardData = {
  kind: 'intro';
  title: string;
  subtitle?: string;
};

export type CardData =
  | BusinessCardData
  | IntroCardData
  | ProjectCardData
  | ExperienceCardData
  | EducationCardData;

export const cards: CardData[] = [
  {
    kind: 'business',
    name: 'Sam Verhezen',
    title: 'Computational Scientist',
    location: 'Utrecht, NL',
    photo: '/cv/images/profiel_2.jpg',
    links: {
      linkedin: 'https://www.linkedin.com/in/samverhezen/',
      github: 'https://github.com/samverh',
    },
  },
  {
    kind: 'intro',
    title: 'CV',
    subtitle: 'Experience & education',
  },
  {
    kind: 'experience',
    entries: [
      {
        period: 'October 2022 – Present',
        company: 'In2Intel',
        role: 'Data Scientist',
        summary:
          'Designing and delivering data science and AI solutions for clients across industries.',
      },
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
  {
    kind: 'intro',
    title: 'Side Projects',
  },
  {
    kind: 'project',
    title: 'Billies',
    image: '/cv/images/project-1.png',
    description:
      'Invoicing web app for freelancers and small businesses, built with Django.',
    tech: ['Python', 'Django'],
  },
  {
    kind: 'project',
    title: 'Gallery Marie',
    image: '/cv/images/project-2.png',
    description:
      'A free, static web app to showcase Marie’s artwork in a clean online gallery.',
    tech: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    kind: 'project',
    title: 'Memoiry',
    image: '/cv/images/project-3.png',
    description:
      'A web app for storing and revisiting your life timeline — memories, milestones, and moments.',
    tech: ['TypeScript', 'React', 'Next.js'],
  },
];
