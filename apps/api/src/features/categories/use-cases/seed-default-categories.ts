import type { CategoriesRepository } from '../domain/categories-repository';
import { createCategory } from '../domain/create-category';
import { DEFAULT_CATEGORY_NAMES } from '../domain/default-category-names';

const SEED_SPACING_MS = 1;

export const seedDefaultCategories = (
  categories: CategoriesRepository,
  userId: string,
  now = new Date(),
): Promise<void> =>
  categories.insertMany(
    DEFAULT_CATEGORY_NAMES.map((name, index) =>
      createCategory({ userId, name, now: new Date(now.getTime() + index * SEED_SPACING_MS) }),
    ),
  );
