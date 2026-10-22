import { normalizeItemName } from '@meu-mercado/shared';
import type { Item } from './item';
import type { ItemDraft } from './item-draft';

const DEFAULT_QUANTITY = 1;

interface CreateItemParams {
  id: string;
  draft: ItemDraft;
  now: Date;
}

export const createItem = ({ id, draft, now }: CreateItemParams): Item => ({
  id,
  userId: draft.userId,
  name: draft.name.trim(),
  normalizedName: normalizeItemName(draft.name),
  quantity: draft.quantity ?? DEFAULT_QUANTITY,
  unit: draft.quantity === null ? null : draft.unit,
  categoryId: null,
  status: 'pending',
  boughtAt: null,
  createdAt: now,
  updatedAt: now,
});
