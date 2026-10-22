import type { CategoriesRepository } from '../../categories/domain/categories-repository';
import { applyItemPatch } from '../domain/apply-item-patch';
import type { Item } from '../domain/item';
import type { ItemPatch } from '../domain/item-patch';
import type { ItemUpdateError } from '../domain/item-update-error';
import type { ItemsRepository } from '../domain/items-repository';

export interface UpdateItemDeps {
  items: ItemsRepository;
  categories: CategoriesRepository;
}

export interface UpdateItemInput {
  userId: string;
  itemId: string;
  patch: ItemPatch;
}

export type UpdateItemResult = { item: Item } | { error: ItemUpdateError };

const hasNameConflict = async (items: ItemsRepository, updated: Item): Promise<boolean> => {
  const sameName = await items.findByNormalizedName(updated.userId, updated.normalizedName);
  return sameName !== null && sameName.id !== updated.id;
};

const isUnknownCategory = async (
  categories: CategoriesRepository,
  userId: string,
  categoryId: string | null | undefined,
): Promise<boolean> => {
  if (!categoryId) return false;
  return (await categories.findById(userId, categoryId)) === null;
};

export const updateItem = async (
  deps: UpdateItemDeps,
  { userId, itemId, patch }: UpdateItemInput,
  now = new Date(),
): Promise<UpdateItemResult> => {
  const existing = await deps.items.findById(userId, itemId);
  if (!existing) return { error: 'item_not_found' };
  if (await isUnknownCategory(deps.categories, userId, patch.categoryId)) {
    return { error: 'category_not_found' };
  }
  const updated = applyItemPatch(existing, patch, now);
  if (await hasNameConflict(deps.items, updated)) return { error: 'name_conflict' };
  await deps.items.update(updated);
  return { item: updated };
};
