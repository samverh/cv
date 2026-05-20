// src/components/CardStack.tsx
import { useEffect, useState, type CSSProperties } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from 'framer-motion';
import type { CardData } from '../data/cards';
import { CardView } from './CardView';
import { shouldDismiss } from './swipeThreshold';
import './CardStack.css';

const accents = [
  '#fc7b11',
  '#12b78b',
  '#f0c419',
  '#ec4899',
  '#06b6d4',
  '#4a9eff',
  '#e94f6d',
  '#936dea',
];

const accentFor = (index: number) =>
  ({ ['--accent' as string]: accents[index % accents.length] }) as CSSProperties;

function DraggableTop({
  card,
  accentStyle,
  enterFromAbove,
  onSwipeUp,
  onSwipeDown,
}: {
  card: CardData;
  accentStyle: CSSProperties;
  enterFromAbove: boolean;
  onSwipeUp: () => void;
  onSwipeDown: () => void;
}) {
  const y = useMotionValue(enterFromAbove ? -500 : 0);
  const rotate = useTransform(y, [-300, 0, 300], [-15, 0, 15]);

  useEffect(() => {
    if (!enterFromAbove) return;
    const controls = animate(y, 0, {
      type: 'spring',
      stiffness: 600,
      damping: 38,
      mass: 0.6,
    });
    return () => controls.stop();
  }, [enterFromAbove, y]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const direction = shouldDismiss({
      offsetY: info.offset.y,
      velocityY: info.velocity.y,
    });
    if (direction === 'up') onSwipeUp();
    else if (direction === 'down') onSwipeDown();
  };

  return (
    <motion.div
      className="card-stack__layer"
      style={{ ...accentStyle, y, rotate, zIndex: 10 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
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
  const [enterFromAbove, setEnterFromAbove] = useState(false);

  const advance = () => {
    setHintVisible(false);
    setEnterFromAbove(false);
    setTopIndex((i) => (i + 1) % cards.length);
  };
  const retreat = () => {
    setHintVisible(false);
    setEnterFromAbove(true);
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
    .map((depth) => {
      const cardIndex = (topIndex + depth) % cards.length;
      return { depth, cardIndex, card: cards[cardIndex] };
    })
    .reverse();

  return (
    <div className="card-stack">
      <div className="card-stack__deck">
        {visible.map(({ depth, cardIndex, card }) =>
          depth === 0 ? (
            <DraggableTop
              key={`top-${topIndex}`}
              card={card}
              accentStyle={accentFor(cardIndex)}
              enterFromAbove={enterFromAbove}
              onSwipeUp={advance}
              onSwipeDown={retreat}
            />
          ) : (
            <div
              key={`back-${topIndex}-${depth}`}
              className="card-stack__layer"
              style={{
                ...accentFor(cardIndex),
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
            drag me ↑
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
