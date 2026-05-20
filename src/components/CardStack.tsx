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
