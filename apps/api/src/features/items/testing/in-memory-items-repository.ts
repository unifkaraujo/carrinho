import type { Item } from '../domain/item';
import type { ItemsRepository } from '../domain/items-repository';

export const createInMemoryItemsRepository = (initial: Item[] = []): ItemsRepository => {
  const items = new Map(initial.map((item) => [item.id, item]));
  return {
    findByNormalizedName: async (userId, normalizedName) =>
      [...items.values()].find(
        (item) => item.userId === userId && item.normalizedName === normalizedName,
      ) ?? null,
    listByUser: async (userId, status) =>
      [...items.values()].filter(
        (item) => item.userId === userId && (status === null || item.status === status),
      ),
    insert: async (item) => {
      items.set(item.id, item);
    },
    update: async (item) => {
      items.set(item.id, item);
    },
  };
};
