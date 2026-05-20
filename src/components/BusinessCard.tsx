import { Card } from './Card';
import type { BusinessCardData } from '../data/cards';
import './BusinessCard.css';

export function BusinessCard({ data }: { data: BusinessCardData }) {
  return (
    <Card>
      <div className="business-card">
        <img className="business-card__photo" src={data.photo} alt={data.name} />
        <h1 className="business-card__name">{data.name}</h1>
        <p className="business-card__title">{data.title}</p>
        <p className="business-card__location">{data.location}</p>
        <div className="business-card__links">
          <a href={data.links.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={data.links.github} aria-label="GitHub" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </Card>
  );
}
