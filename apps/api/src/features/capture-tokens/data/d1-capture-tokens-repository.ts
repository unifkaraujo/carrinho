import { and, desc, eq } from 'drizzle-orm';
import type { Database } from '../../../shared/db/database';
import type { CaptureTokensRepository } from '../domain/capture-tokens-repository';
import { captureTokensTable } from './capture-tokens-table';

const SUMMARY_COLUMNS = {
  id: captureTokensTable.id,
  label: captureTokensTable.label,
  lastUsedAt: captureTokensTable.lastUsedAt,
  createdAt: captureTokensTable.createdAt,
};

const byUserAndId = (userId: string, id: string) =>
  and(eq(captureTokensTable.userId, userId), eq(captureTokensTable.id, id));

export const createD1CaptureTokensRepository = (db: Database): CaptureTokensRepository => ({
  findUserIdByHash: async (tokenHash) => {
    const row = await db
      .select({ userId: captureTokensTable.userId })
      .from(captureTokensTable)
      .where(eq(captureTokensTable.tokenHash, tokenHash))
      .get();
    return row?.userId ?? null;
  },
  markUsed: async (tokenHash, now) => {
    await db
      .update(captureTokensTable)
      .set({ lastUsedAt: now })
      .where(eq(captureTokensTable.tokenHash, tokenHash))
      .run();
  },
  listByUser: (userId) =>
    db
      .select(SUMMARY_COLUMNS)
      .from(captureTokensTable)
      .where(eq(captureTokensTable.userId, userId))
      .orderBy(desc(captureTokensTable.createdAt))
      .all(),
  insert: async (token) => {
    await db.insert(captureTokensTable).values(token).run();
  },
  delete: async (userId, id) =>
    (await db.delete(captureTokensTable).where(byUserAndId(userId, id)).run()).meta.changes > 0,
});
