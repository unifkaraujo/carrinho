import type { Category } from './category';

export interface CategoriesRepository {
  findById(userId: string, id: string): Promise<Category | null>;
  listByUser(userId: string): Promise<Category[]>;
  insertMany(categories: Category[]): Promise<void>;
  delete(userId: string, id: string): Promise<boolean>;
}
