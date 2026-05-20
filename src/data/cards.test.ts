// src/data/cards.test.ts
import { cards } from './cards';

describe('cards', () => {
  it('contains 6 entries', () => {
    expect(cards).toHaveLength(6);
  });

  it('starts with the business card', () => {
    expect(cards[0].kind).toBe('business');
  });

  it('has 3 project cards in positions 1-3', () => {
    expect(cards.slice(1, 4).map((c) => c.kind)).toEqual([
      'project', 'project', 'project',
    ]);
  });

  it('ends with experience then education', () => {
    expect(cards[4].kind).toBe('experience');
    expect(cards[5].kind).toBe('education');
  });

  it('experience card has 4 entries', () => {
    const exp = cards[4];
    if (exp.kind !== 'experience') throw new Error('wrong kind');
    expect(exp.entries).toHaveLength(4);
  });

  it('education card has 3 entries', () => {
    const edu = cards[5];
    if (edu.kind !== 'education') throw new Error('wrong kind');
    expect(edu.entries).toHaveLength(3);
  });
});
