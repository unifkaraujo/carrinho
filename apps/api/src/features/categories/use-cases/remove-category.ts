import type { CategoriesRepository } from '../domain/categories-repository';

export const removeCategory = (
  categories: CategoriesRepository,
  userId: string,
  categoryId: string,
): Promise<boolean> => categories.delete(userId, categoryId);
