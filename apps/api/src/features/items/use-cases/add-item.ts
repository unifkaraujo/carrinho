import { normalizeItemName } from '@meu-mercado/shared';
import { createItem } from '../domain/create-item';
import { decideItemMerge } from '../domain/decide-item-merge';
import type { Item } from '../domain/item';
import type { ItemDraft } from '../domain/item-draft';
import type { ItemUpsertOutcome } from '../domain/item-upsert-outcome';
import type { ItemsRepository } from '../domain/items-repository';
import { mergeItemDraft } from '../domain/merge-item-draft';

export interface AddItemResult {
  item: Item;
  outcome: ItemUpsertOutcome;
}

const insertNewItem = async (items: ItemsRepository, draft: ItemDraft, now: Date) => {
  const item = createItem({ id: crypto.randomUUID(), draft, now });
  await items.insert(item);
  return item;
};

const updateMergedItem = async (items: ItemsRepository, merged: Item) => {
  await items.update(merged);
  return merged;
};

export const addItem = async (
  items: ItemsRepository,
  draft: ItemDraft,
  now = new Date(),
): Promise<AddItemResult> => {
  const existing = await items.findByNormalizedName(draft.userId, normalizeItemName(draft.name));
  if (!existing) return { item: await insertNewItem(items, draft, now), outcome: 'created' };
  const outcome = decideItemMerge(existing, draft);
  if (outcome === 'unchanged') return { item: existing, outcome };
  return { item: await updateMergedItem(items, mergeItemDraft(existing, draft, now)), outcome };
};
