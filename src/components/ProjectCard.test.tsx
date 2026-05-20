import { render, screen } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';
import type { ProjectCardData } from '../data/cards';

const baseData: ProjectCardData = {
  kind: 'project',
  title: 'Project One',
  image: '/cv/images/project-1.jpg',
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
    expect(img.src).toContain('/cv/images/project-1.jpg');
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
