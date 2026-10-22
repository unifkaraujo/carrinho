import { describe, expect, it } from 'vitest';
import { itemFormSchema } from './item-form-schema';

describe('itemFormSchema', () => {
  it('converte quantidade com vírgula e unidade vazia', () => {
    expect(itemFormSchema.parse({ name: ' Ovos ', quantity: '1,5', unit: ' ' })).toEqual({
      name: 'Ovos',
      quantity: 1.5,
      unit: null,
    });
  });

  it.each(['0', '-1', 'abc', ''])('rejeita quantidade "%s"', (quantity) => {
    expect(itemFormSchema.safeParse({ name: 'Ovos', quantity, unit: '' }).success).toBe(false);
  });

  it('exige nome', () => {
    expect(itemFormSchema.safeParse({ name: ' ', quantity: '1', unit: '' }).success).toBe(false);
  });
});
