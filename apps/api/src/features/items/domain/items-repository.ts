import type { Item, ItemStatus } from './item';

export interface ItemsRepository {
  findById(userId: string, id: string): Promise<Item | null>;
  findByNormalizedName(userId: string, normalizedName: string): Promise<Item | null>;
  listByUser(userId: string, status: ItemStatus | null): Promise<Item[]>;
  insert(item: Item): Promise<void>;
  update(item: Item): Promise<void>;
  delete(userId: string, id: string): Promise<boolean>;
  deleteByStatus(userId: string, status: ItemStatus): Promise<number>;
}
