export type ItemStatus = 'pending' | 'bought';

export interface Item {
  id: string;
  name: string;
  normalizedName: string;
  quantity: number;
  unit: string | null;
  categoryId: string | null;
  status: ItemStatus;
  boughtAt: string | null;
  createdAt: string;
  updatedAt: string;
}
