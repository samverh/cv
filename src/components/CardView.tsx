import type { CardData } from '../data/cards';
import { BusinessCard } from './BusinessCard';
import { IntroCard } from './IntroCard';
import { ProjectCard } from './ProjectCard';
import { ExperienceCard } from './ExperienceCard';
import { EducationCard } from './EducationCard';

export function CardView({ card }: { card: CardData }) {
  switch (card.kind) {
    case 'business':
      return <BusinessCard data={card} />;
    case 'intro':
      return <IntroCard data={card} />;
    case 'project':
      return <ProjectCard data={card} />;
    case 'experience':
      return <ExperienceCard data={card} />;
    case 'education':
      return <EducationCard data={card} />;
  }
}
