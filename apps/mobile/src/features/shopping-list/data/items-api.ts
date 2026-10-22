import { apiRequest } from '../../../shared/http/api-request';
import type { Item } from '../domain/item';
import type { ItemPatch } from '../domain/item-patch';

export const fetchItems = async (): Promise<Item[]> =>
  (await apiRequest<{ items: Item[] }>('/items')).items;

export const patchItem = async (id: string, patch: ItemPatch): Promise<Item> =>
  (await apiRequest<{ item: Item }>(`/items/${id}`, { method: 'PATCH', body: patch })).item;

export const deleteItem = (id: string): Promise<undefined> =>
  apiRequest<undefined>(`/items/${id}`, { method: 'DELETE' });

export const deleteBoughtItems = (): Promise<undefined> =>
  apiRequest<undefined>('/items/bought', { method: 'DELETE' });
