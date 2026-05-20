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
