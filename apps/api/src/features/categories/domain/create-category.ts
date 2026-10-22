import type { Category } from './category';

interface CreateCategoryParams {
  userId: string;
  name: string;
  now: Date;
}

export const createCategory = ({ userId, name, now }: CreateCategoryParams): Category => ({
  id: crypto.randomUUID(),
  userId,
  name: name.trim(),
  createdAt: now,
});
