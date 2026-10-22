import { normalizeItemName } from '@meu-mercado/shared';
import type { Category } from './category';

export const findCategoryByName = (categories: Category[], name: string): Category | null =>
  categories.find((category) => normalizeItemName(category.name) === normalizeItemName(name)) ??
  null;
