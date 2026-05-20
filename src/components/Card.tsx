// src/components/Card.tsx
import type { ReactNode } from 'react';
import './Card.css';

export function Card({ children }: { children: ReactNode }) {
  return <div className="card">{children}</div>;
}
