import { applyItemPatch } from './apply-item-patch';
import type { Item } from './item';
import type { ItemPatch } from './item-patch';

interface ItemChange {
  id: string;
  patch: ItemPatch;
}

export const updateItemInList = (items: Item[], { id, patch }: ItemChange, now: string) =>
  items.map((item) => (item.id === id ? applyItemPatch(item, patch, now) : item));

export const removeItemFromList = (items: Item[], id: string) =>
  items.filter((item) => item.id !== id);

export const removeBoughtFromList = (items: Item[]) =>
  items.filter((item) => item.status !== 'bought');
