import { describe, expect, it } from 'vitest';
import { parseQuantity } from './parse-quantity';

describe('parseQuantity', () => {
  it.each([
    ['3', 3],
    ['1.5', 1.5],
    ['1,5', 1.5],
    ['dois', 2],
    ['Duas', 2],
    ['três', 3],
    ['meia', 0.5],
  ])('lê "%s" como %d', (input, expected) => {
    expect(parseQuantity(input)).toBe(expected);
  });

  it.each(['0', 'ovos', '-1', '2x'])('retorna null para "%s"', (input) => {
    expect(parseQuantity(input)).toBeNull();
  });
});
