import { Card } from './Card';
import type { EducationCardData } from '../data/cards';
import './ListCard.css';

export function EducationCard({ data }: { data: EducationCardData }) {
  return (
    <Card>
      <div className="list-card">
        <h2 className="list-card__title">Education</h2>
        <ul className="list-card__entries">
          {data.entries.map((e) => (
            <li key={`${e.degree}-${e.period}`} className="list-card__entry">
              <div className="list-card__period">{e.period}</div>
              <div className="list-card__primary">{e.degree}</div>
              <div className="list-card__secondary">{e.school}</div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
