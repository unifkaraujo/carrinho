import type { ItemPatch } from '../domain/item-patch';

export interface UpdateItemVariables {
  id: string;
  patch: ItemPatch;
}
