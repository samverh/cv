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
