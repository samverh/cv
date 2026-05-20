// src/components/CardStack.tsx
import { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from 'framer-motion';
import type { CardData } from '../data/cards';
import { CardView } from './CardView';
import { shouldDismiss } from './swipeThreshold';
import './CardStack.css';

function DraggableTop({
  card,
  onDismiss,
}: {
  card: CardData;
  onDismiss: () => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const direction = shouldDismiss({
      offsetX: info.offset.x,
      velocityX: info.velocity.x,
    });
    if (direction !== null) onDismiss();
  };

  return (
    <motion.div
      className="card-stack__layer"
      style={{ x, rotate, zIndex: 10 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
    >
      <CardView card={card} />
    </motion.div>
  );
}

export function CardStack({ cards }: { cards: CardData[] }) {
  const [topIndex, setTopIndex] = useState(0);
  const [hintVisible, setHintVisible] = useState(true);

  const advance = () => {
    setHintVisible(false);
    setTopIndex((i) => (i + 1) % cards.length);
  };
  const retreat = () => {
    setHintVisible(false);
    setTopIndex((i) => (i - 1 + cards.length) % cards.length);
  };

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
        {visible.map(({ depth, card }) =>
          depth === 0 ? (
            <DraggableTop
              key={`top-${topIndex}`}
              card={card}
              onDismiss={advance}
            />
          ) : (
            <div
              key={`back-${topIndex}-${depth}`}
              className="card-stack__layer"
              style={{
                transform: `translateY(${depth * 10}px) scale(${1 - depth * 0.05})`,
                opacity: 1 - depth * 0.25,
                zIndex: 10 - depth,
                pointerEvents: 'none',
              }}
            >
              <CardView card={card} />
            </div>
          ),
        )}
        {hintVisible && (
          <div className="card-stack__hint" aria-hidden="true">
            drag me →
          </div>
        )}
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
