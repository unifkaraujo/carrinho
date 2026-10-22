import { normalizeItemName } from '@meu-mercado/shared';
import type { Item } from './item';
import type { ItemPatch } from './item-patch';

const patchName = (name: string | undefined) =>
  name === undefined ? {} : { name: name.trim(), normalizedName: normalizeItemName(name) };

const patchStatus = (item: Item, patch: ItemPatch, now: string) =>
  patch.status === undefined || patch.status === item.status
    ? {}
    : { status: patch.status, boughtAt: patch.status === 'bought' ? now : null };

export const applyItemPatch = (item: Item, patch: ItemPatch, now: string): Item => ({
  ...item,
  ...patch,
  ...patchName(patch.name),
  ...patchStatus(item, patch, now),
  updatedAt: now,
});
