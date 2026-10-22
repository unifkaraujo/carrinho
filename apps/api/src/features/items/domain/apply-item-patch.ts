import { normalizeItemName } from '@meu-mercado/shared';
import type { Item, ItemStatus } from './item';
import type { ItemPatch } from './item-patch';

type NamePatch = Pick<Item, 'name' | 'normalizedName'>;
type StatusPatch = Pick<Item, 'status' | 'boughtAt'>;

const patchName = (name: string | undefined): Partial<NamePatch> =>
  name === undefined ? {} : { name: name.trim(), normalizedName: normalizeItemName(name) };

const patchStatus = (
  item: Item,
  status: ItemStatus | undefined,
  now: Date,
): Partial<StatusPatch> => {
  if (status === undefined || status === item.status) return {};
  return { status, boughtAt: status === 'bought' ? now : null };
};

const definedEntries = (patch: ItemPatch): Partial<Item> =>
  Object.fromEntries(
    Object.entries({
      quantity: patch.quantity,
      unit: patch.unit,
      categoryId: patch.categoryId,
    }).filter(([, value]) => value !== undefined),
  );

export const applyItemPatch = (item: Item, patch: ItemPatch, now: Date): Item => ({
  ...item,
  ...definedEntries(patch),
  ...patchName(patch.name),
  ...patchStatus(item, patch.status, now),
  updatedAt: now,
});
