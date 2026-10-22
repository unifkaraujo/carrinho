import { and, asc, eq } from 'drizzle-orm';
import type { Database } from '../../../shared/db/database';
import type { ItemStatus } from '../domain/item';
import type { ItemsRepository } from '../domain/items-repository';
import { itemsTable } from './items-table';

const byUserAndId = (userId: string, id: string) =>
  and(eq(itemsTable.userId, userId), eq(itemsTable.id, id));

const byUserAndStatus = (userId: string, status: ItemStatus | null) =>
  and(eq(itemsTable.userId, userId), status ? eq(itemsTable.status, status) : undefined);

const byUserAndNormalizedName = (userId: string, normalizedName: string) =>
  and(eq(itemsTable.userId, userId), eq(itemsTable.normalizedName, normalizedName));

export const createD1ItemsRepository = (db: Database): ItemsRepository => ({
  findById: async (userId, id) =>
    (await db.select().from(itemsTable).where(byUserAndId(userId, id)).get()) ?? null,
  findByNormalizedName: async (userId, normalizedName) =>
    (await db
      .select()
      .from(itemsTable)
      .where(byUserAndNormalizedName(userId, normalizedName))
      .get()) ?? null,
  listByUser: (userId, status) =>
    db
      .select()
      .from(itemsTable)
      .where(byUserAndStatus(userId, status))
      .orderBy(asc(itemsTable.createdAt))
      .all(),
  insert: async (item) => {
    await db.insert(itemsTable).values(item).run();
  },
  update: async (item) => {
    await db.update(itemsTable).set(item).where(byUserAndId(item.userId, item.id)).run();
  },
  delete: async (userId, id) =>
    (await db.delete(itemsTable).where(byUserAndId(userId, id)).run()).meta.changes > 0,
  deleteByStatus: async (userId, status) =>
    (await db.delete(itemsTable).where(byUserAndStatus(userId, status)).run()).meta.changes,
});
