import { describe, expect, it } from 'vitest';
import { formatItemAmount, hasRelevantAmount } from './format-item-amount';

describe('formatItemAmount', () => {
  it.each([
    [{ quantity: 2, unit: null }, '2'],
    [{ quantity: 1, unit: 'dúzia' }, '1 dúzia'],
    [{ quantity: 2, unit: 'dúzia' }, '2 dúzias'],
    [{ quantity: 0.5, unit: 'dúzia' }, '0,5 dúzia'],
    [{ quantity: 1.5, unit: 'kg' }, '1,5 kg'],
    [{ quantity: 3, unit: 'l' }, '3 l'],
    [{ quantity: 1 / 3, unit: null }, '0,333'],
  ])('formata %o como "%s"', (amount, expected) => {
    expect(formatItemAmount(amount)).toBe(expected);
  });
});

describe('hasRelevantAmount', () => {
  it('ignora quantidade 1 sem unidade', () => {
    expect(hasRelevantAmount({ quantity: 1, unit: null })).toBe(false);
  });

  it('considera quantidade diferente de 1 ou com unidade', () => {
    expect(hasRelevantAmount({ quantity: 2, unit: null })).toBe(true);
    expect(hasRelevantAmount({ quantity: 1, unit: 'kg' })).toBe(true);
  });
});
