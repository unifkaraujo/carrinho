import type { Item } from '../../shopping-list/domain/item';

export const countPendingItems = (items: Item[]): number =>
  items.filter((item) => item.status === 'pending').length;
