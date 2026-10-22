import type { CategoriesRepository } from '../domain/categories-repository';
import type { Category } from '../domain/category';

export const listCategories = (
  categories: CategoriesRepository,
  userId: string,
): Promise<Category[]> => categories.listByUser(userId);
