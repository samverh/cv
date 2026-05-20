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
