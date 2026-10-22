import { eq } from 'drizzle-orm';
import type { Database } from '../../../shared/db/database';
import type { CaptureTokensRepository } from '../domain/capture-tokens-repository';
import { captureTokensTable } from './capture-tokens-table';

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
});
