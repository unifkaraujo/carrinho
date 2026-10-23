import { describe, expect, it } from 'vitest';
import { displayItemName } from './display-item-name';

describe('displayItemName', () => {
  it('capitalizes the first letter', () => {
    expect(displayItemName('papel toalha')).toBe('Papel toalha');
  });

  it('handles accented first letters', () => {
    expect(displayItemName('óleo')).toBe('Óleo');
  });

  it('keeps empty names empty', () => {
    expect(displayItemName('')).toBe('');
  });
});
