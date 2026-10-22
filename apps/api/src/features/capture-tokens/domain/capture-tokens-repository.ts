export interface CaptureTokensRepository {
  findUserIdByHash(tokenHash: string): Promise<string | null>;
  markUsed(tokenHash: string, now: Date): Promise<void>;
}
