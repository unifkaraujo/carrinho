import type { ItemsRepository } from '../domain/items-repository';

export const removeItem = (
  items: ItemsRepository,
  userId: string,
  itemId: string,
): Promise<boolean> => items.delete(userId, itemId);
