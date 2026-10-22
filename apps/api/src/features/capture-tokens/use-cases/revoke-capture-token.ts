import type { CaptureTokensRepository } from '../domain/capture-tokens-repository';

export const revokeCaptureToken = (
  tokens: CaptureTokensRepository,
  userId: string,
  tokenId: string,
): Promise<boolean> => tokens.delete(userId, tokenId);
