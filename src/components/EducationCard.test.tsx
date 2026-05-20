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
