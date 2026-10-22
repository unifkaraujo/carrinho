import type { Item, ItemStatus } from '../domain/item';
import type { ItemsRepository } from '../domain/items-repository';

export const createInMemoryItemsRepository = (initial: Item[] = []): ItemsRepository => {
  const items = new Map(initial.map((item) => [item.id, item]));
  const ofUser = (userId: string) => [...items.values()].filter((item) => item.userId === userId);
  const matchesStatus = (status: ItemStatus | null) => (item: Item) =>
    status === null || item.status === status;

  return {
    findById: async (userId, id) => ofUser(userId).find((item) => item.id === id) ?? null,
    findByNormalizedName: async (userId, normalizedName) =>
      ofUser(userId).find((item) => item.normalizedName === normalizedName) ?? null,
    listByUser: async (userId, status) => ofUser(userId).filter(matchesStatus(status)),
    insert: async (item) => {
      items.set(item.id, item);
    },
    update: async (item) => {
      items.set(item.id, item);
    },
    delete: async (userId, id) => ofUser(userId).some((item) => item.id === id) && items.delete(id),
    deleteByStatus: async (userId, status) => {
      const matching = ofUser(userId).filter(matchesStatus(status));
      matching.forEach((item) => items.delete(item.id));
      return matching.length;
    },
  };
};
