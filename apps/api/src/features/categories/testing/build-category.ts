import type { Category } from '../domain/category';

export const buildCategory = (overrides: Partial<Category> = {}): Category => ({
  id: 'category-1',
  userId: 'user-1',
  name: 'Hortifrúti',
  createdAt: new Date('2026-01-01T00:00:00Z'),
  ...overrides,
});
