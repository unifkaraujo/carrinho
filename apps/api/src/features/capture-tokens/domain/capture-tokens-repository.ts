import type { CaptureToken, CaptureTokenSummary } from './capture-token';

export interface CaptureTokensRepository {
  findUserIdByHash(tokenHash: string): Promise<string | null>;
  markUsed(tokenHash: string, now: Date): Promise<void>;
  listByUser(userId: string): Promise<CaptureTokenSummary[]>;
  insert(token: CaptureToken): Promise<void>;
  delete(userId: string, id: string): Promise<boolean>;
}
