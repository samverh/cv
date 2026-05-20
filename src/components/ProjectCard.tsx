import { Card } from './Card';
import type { ProjectCardData } from '../data/cards';
import './ProjectCard.css';

export function ProjectCard({ data }: { data: ProjectCardData }) {
  return (
    <Card>
      <div className="project-card">
        <img className="project-card__image" src={data.image} alt={data.title} />
        <h2 className="project-card__title">{data.title}</h2>
        <p className="project-card__description">{data.description}</p>
        <ul className="project-card__tech">
          {data.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {data.link && (
          <a
            className="project-card__link"
            href={data.link}
            target="_blank"
            rel="noreferrer"
          >
            View project
          </a>
        )}
      </div>
    </Card>
  );
}
