import { Card } from './Card';
import type { IntroCardData } from '../data/cards';
import './IntroCard.css';

export function IntroCard({ data }: { data: IntroCardData }) {
  return (
    <Card>
      <div className="intro-card">
        <span className="intro-card__mark" aria-hidden="true" />
        <h2 className="intro-card__title">{data.title}</h2>
        {data.subtitle ? (
          <p className="intro-card__subtitle">{data.subtitle}</p>
        ) : (
          <span className="intro-card__mark" aria-hidden="true" />
        )}
      </div>
    </Card>
  );
}
