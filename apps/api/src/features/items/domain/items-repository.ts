import type { Item, ItemStatus } from './item';

export interface ItemsRepository {
  findByNormalizedName(userId: string, normalizedName: string): Promise<Item | null>;
  listByUser(userId: string, status: ItemStatus | null): Promise<Item[]>;
  insert(item: Item): Promise<void>;
  update(item: Item): Promise<void>;
}
