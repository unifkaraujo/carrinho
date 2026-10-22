import type { ItemStatus } from './item';

export interface ItemPatch {
  name?: string | undefined;
  quantity?: number | undefined;
  unit?: string | null | undefined;
  categoryId?: string | null | undefined;
  status?: ItemStatus | undefined;
}
