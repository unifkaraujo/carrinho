import type { Item } from '../domain/item';

const EPOCH = new Date('2026-01-01T00:00:00Z');

export const buildItem = (overrides: Partial<Item> = {}): Item => ({
  id: 'item-1',
  userId: 'user-1',
  name: 'Ovos',
  normalizedName: 'ovo',
  quantity: 1,
  unit: null,
  categoryId: null,
  status: 'pending',
  boughtAt: null,
  createdAt: EPOCH,
  updatedAt: EPOCH,
  ...overrides,
});
