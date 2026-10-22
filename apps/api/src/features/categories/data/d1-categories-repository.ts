import { and, asc, eq } from 'drizzle-orm';
import type { Database } from '../../../shared/db/database';
import type { CategoriesRepository } from '../domain/categories-repository';
import { categoriesTable } from './categories-table';

const byUserAndId = (userId: string, id: string) =>
  and(eq(categoriesTable.userId, userId), eq(categoriesTable.id, id));

export const createD1CategoriesRepository = (db: Database): CategoriesRepository => ({
  findById: async (userId, id) =>
    (await db.select().from(categoriesTable).where(byUserAndId(userId, id)).get()) ?? null,
  listByUser: (userId) =>
    db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.userId, userId))
      .orderBy(asc(categoriesTable.createdAt))
      .all(),
  insertMany: async (categories) => {
    if (categories.length > 0) await db.insert(categoriesTable).values(categories).run();
  },
  delete: async (userId, id) =>
    (await db.delete(categoriesTable).where(byUserAndId(userId, id)).run()).meta.changes > 0,
});
