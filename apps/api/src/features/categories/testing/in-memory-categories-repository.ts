import type { CategoriesRepository } from '../domain/categories-repository';
import type { Category } from '../domain/category';

export const createInMemoryCategoriesRepository = (
  initial: Category[] = [],
): CategoriesRepository => {
  const categories = new Map(initial.map((category) => [category.id, category]));
  const ofUser = (userId: string) =>
    [...categories.values()].filter((category) => category.userId === userId);

  return {
    findById: async (userId, id) => ofUser(userId).find((category) => category.id === id) ?? null,
    listByUser: async (userId) => ofUser(userId),
    insertMany: async (created) => {
      created.forEach((category) => categories.set(category.id, category));
    },
    delete: async (userId, id) =>
      ofUser(userId).some((category) => category.id === id) && categories.delete(id),
  };
};
