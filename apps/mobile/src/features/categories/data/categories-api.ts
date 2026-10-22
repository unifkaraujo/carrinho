import { apiRequest } from '../../../shared/http/api-request';
import type { Category } from '../domain/category';

export const fetchCategories = async (): Promise<Category[]> =>
  (await apiRequest<{ categories: Category[] }>('/categories')).categories;

export const createCategory = async (name: string): Promise<Category> =>
  (await apiRequest<{ category: Category }>('/categories', { method: 'POST', body: { name } }))
    .category;
