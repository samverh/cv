import { Card } from './Card';
import type { ExperienceCardData } from '../data/cards';
import './ListCard.css';

export function ExperienceCard({ data }: { data: ExperienceCardData }) {
  return (
    <Card>
      <div className="list-card">
        <h2 className="list-card__title">Experience</h2>
        <ul className="list-card__entries">
          {data.entries.map((e) => (
            <li key={`${e.company}-${e.period}`} className="list-card__entry">
              <div className="list-card__period">{e.period}</div>
              <div className="list-card__primary">{e.company}</div>
              <div className="list-card__secondary">{e.role}</div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
