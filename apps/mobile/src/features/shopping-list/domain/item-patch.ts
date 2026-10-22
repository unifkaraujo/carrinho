import type { ItemStatus } from './item';

export interface ItemPatch {
  name?: string;
  quantity?: number;
  unit?: string | null;
  categoryId?: string | null;
  status?: ItemStatus;
}
