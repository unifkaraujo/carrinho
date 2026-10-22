import { describe, expect, it } from 'vitest';
import type { Category } from '../../categories/domain/category';
import { buildListSections } from './build-list-sections';
import type { Item } from './item';

const item = (overrides: Partial<Item>): Item => ({
  id: overrides.name ?? 'id',
  name: 'Item',
  normalizedName: 'item',
  quantity: 1,
  unit: null,
  categoryId: null,
  status: 'pending',
  boughtAt: null,
  createdAt: '2026-10-22T10:00:00.000Z',
  updatedAt: '2026-10-22T10:00:00.000Z',
  ...overrides,
});

const categories: Category[] = [
  { id: 'horti', name: 'Hortifrúti', createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'padaria', name: 'Padaria', createdAt: '2026-01-01T00:00:00.001Z' },
];

describe('buildListSections', () => {
  it('agrupa pendentes por categoria, sem categoria primeiro, e comprados por último', () => {
    const sections = buildListSections(
      [
        item({ name: 'Pão', categoryId: 'padaria' }),
        item({ name: 'Ovos' }),
        item({ name: 'Banana', categoryId: 'horti' }),
        item({ name: 'Leite', status: 'bought', boughtAt: '2026-10-22T11:00:00.000Z' }),
      ],
      categories,
    );
    expect(sections.map((section) => [section.title, section.data.map((i) => i.name)])).toEqual([
      ['Sem categoria', ['Ovos']],
      ['Hortifrúti', ['Banana']],
      ['Padaria', ['Pão']],
      ['Comprados', ['Leite']],
    ]);
  });

  it('ordena pendentes por nome e comprados pelo mais recente', () => {
    const sections = buildListSections(
      [
        item({ name: 'Uva' }),
        item({ name: 'abacate' }),
        item({ name: 'A', status: 'bought', boughtAt: '2026-10-22T09:00:00.000Z' }),
        item({ name: 'B', status: 'bought', boughtAt: '2026-10-22T12:00:00.000Z' }),
      ],
      [],
    );
    expect(sections.map((section) => section.data.map((i) => i.name))).toEqual([
      ['abacate', 'Uva'],
      ['B', 'A'],
    ]);
  });

  it('trata categoria removida como sem categoria e omite seções vazias', () => {
    const sections = buildListSections(
      [item({ name: 'Sabão', categoryId: 'apagada' })],
      categories,
    );
    expect(sections).toHaveLength(1);
    expect(sections[0]?.title).toBe('Sem categoria');
  });
});
