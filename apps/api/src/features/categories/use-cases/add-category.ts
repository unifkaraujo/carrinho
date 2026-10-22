import type { CategoriesRepository } from '../domain/categories-repository';
import type { Category } from '../domain/category';
import { createCategory } from '../domain/create-category';
import { findCategoryByName } from '../domain/find-category-by-name';

interface AddCategoryInput {
  userId: string;
  name: string;
}

export const addCategory = async (
  categories: CategoriesRepository,
  { userId, name }: AddCategoryInput,
  now = new Date(),
): Promise<Category> => {
  const existing = findCategoryByName(await categories.listByUser(userId), name);
  if (existing) return existing;
  const category = createCategory({ userId, name, now });
  await categories.insertMany([category]);
  return category;
};
