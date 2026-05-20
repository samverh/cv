// src/data/cards.test.ts
import { cards } from './cards';

describe('cards', () => {
  it('contains 8 entries', () => {
    expect(cards).toHaveLength(8);
  });

  it('starts with the business card', () => {
    expect(cards[0].kind).toBe('business');
  });

  it('has a CV intro card before the experience cards', () => {
    const intro = cards[1];
    if (intro.kind !== 'intro') throw new Error('wrong kind');
    expect(intro.title).toBe('CV');
  });

  it('has experience then education in positions 2-3', () => {
    expect(cards[2].kind).toBe('experience');
    expect(cards[3].kind).toBe('education');
  });

  it('has a Side Projects intro card before the project cards', () => {
    const intro = cards[4];
    if (intro.kind !== 'intro') throw new Error('wrong kind');
    expect(intro.title).toBe('Side Projects');
  });

  it('ends with 3 project cards in positions 5-7', () => {
    expect(cards.slice(5, 8).map((c) => c.kind)).toEqual([
      'project', 'project', 'project',
    ]);
  });

  it('experience card has 5 entries', () => {
    const exp = cards[2];
    if (exp.kind !== 'experience') throw new Error('wrong kind');
    expect(exp.entries).toHaveLength(5);
  });

  it('education card has 3 entries', () => {
    const edu = cards[3];
    if (edu.kind !== 'education') throw new Error('wrong kind');
    expect(edu.entries).toHaveLength(3);
  });
});
