import type { Item, ItemStatus } from '../domain/item';
import type { ItemsRepository } from '../domain/items-repository';

export const listItems = (
  items: ItemsRepository,
  userId: string,
  status: ItemStatus | null,
): Promise<Item[]> => items.listByUser(userId, status);
