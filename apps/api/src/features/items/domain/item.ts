export const ITEM_STATUSES = ['pending', 'bought'] as const;

export type ItemStatus = (typeof ITEM_STATUSES)[number];

export interface Item {
  id: string;
  userId: string;
  name: string;
  normalizedName: string;
  quantity: number;
  unit: string | null;
  categoryId: string | null;
  status: ItemStatus;
  boughtAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
