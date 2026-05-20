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
