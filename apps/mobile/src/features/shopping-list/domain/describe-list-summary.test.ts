import { describe, expect, it } from 'vitest';
import { describeListSummary } from './describe-list-summary';

describe('describeListSummary', () => {
  it('describes pending items and bought progress', () => {
    expect(describeListSummary(3, 1)).toEqual({
      title: '3 itens para comprar',
      subtitle: '1 de 4 no carrinho',
      progress: 0.25,
    });
  });

  it('uses the singular for one pending item', () => {
    expect(describeListSummary(1, 0).title).toBe('1 item para comprar');
  });

  it('celebrates when everything was bought', () => {
    expect(describeListSummary(0, 2)).toEqual({
      title: 'Tudo comprado',
      subtitle: '2 de 2 no carrinho',
      progress: 1,
    });
  });

  it('handles an empty list', () => {
    expect(describeListSummary(0, 0)).toEqual({
      title: 'Tudo comprado',
      subtitle: 'Sua lista está vazia',
      progress: 0,
    });
  });
});
