import type { CaptureTokensRepository } from '../domain/capture-tokens-repository';
import { hashCaptureToken } from '../domain/hash-capture-token';

export const authenticateCaptureToken = async (
  tokens: CaptureTokensRepository,
  token: string,
  now = new Date(),
): Promise<string | null> => {
  const tokenHash = await hashCaptureToken(token);
  const userId = await tokens.findUserIdByHash(tokenHash);
  if (userId) await tokens.markUsed(tokenHash, now);
  return userId;
};
