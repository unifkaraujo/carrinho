import type { ItemsRepository } from '../domain/items-repository';

export const clearBoughtItems = (items: ItemsRepository, userId: string): Promise<number> =>
  items.deleteByStatus(userId, 'bought');
