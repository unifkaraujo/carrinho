import type { Item } from './item';
import type { ItemDraft } from './item-draft';

type ItemAmount = Pick<Item, 'quantity' | 'unit'>;

const resolveAmount = (existing: Item, draft: ItemDraft): ItemAmount =>
  draft.quantity === null
    ? { quantity: existing.quantity, unit: existing.unit }
    : { quantity: draft.quantity, unit: draft.unit };

export const mergeItemDraft = (existing: Item, draft: ItemDraft, now: Date): Item => ({
  ...existing,
  ...resolveAmount(existing, draft),
  status: 'pending',
  boughtAt: null,
  updatedAt: now,
});
