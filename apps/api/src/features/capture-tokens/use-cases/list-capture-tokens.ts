import type { CaptureTokenSummary } from '../domain/capture-token';
import type { CaptureTokensRepository } from '../domain/capture-tokens-repository';

export const listCaptureTokens = (
  tokens: CaptureTokensRepository,
  userId: string,
): Promise<CaptureTokenSummary[]> => tokens.listByUser(userId);
