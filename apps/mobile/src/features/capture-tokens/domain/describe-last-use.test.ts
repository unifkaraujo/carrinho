import { describe, expect, it } from 'vitest';
import { describeLastUse } from './describe-last-use';

describe('describeLastUse', () => {
  it('indica token nunca usado', () => {
    expect(describeLastUse(null)).toBe('Nunca usado');
  });

  it('formata a data do último uso', () => {
    expect(describeLastUse(new Date(2026, 9, 5, 12).toISOString())).toBe(
      'Último uso em 05/10/2026',
    );
  });
});
