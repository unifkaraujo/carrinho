import type { Item } from './item';
import type { ItemDraft } from './item-draft';
import type { ItemMergeOutcome } from './item-upsert-outcome';

const hasNewAmount = (existing: Item, draft: ItemDraft): boolean =>
  draft.quantity !== null && (draft.quantity !== existing.quantity || draft.unit !== existing.unit);

export const decideItemMerge = (existing: Item, draft: ItemDraft): ItemMergeOutcome => {
  if (existing.status === 'bought') return 'reactivated';
  return hasNewAmount(existing, draft) ? 'updated' : 'unchanged';
};
