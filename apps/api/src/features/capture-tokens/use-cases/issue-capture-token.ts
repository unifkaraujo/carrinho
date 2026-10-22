import type { CaptureTokenSummary } from '../domain/capture-token';
import type { CaptureTokensRepository } from '../domain/capture-tokens-repository';
import { generateCaptureToken } from '../domain/generate-capture-token';
import { hashCaptureToken } from '../domain/hash-capture-token';

interface IssueCaptureTokenInput {
  userId: string;
  label: string;
}

export interface IssuedCaptureToken {
  token: string;
  captureToken: CaptureTokenSummary;
}

export const issueCaptureToken = async (
  tokens: CaptureTokensRepository,
  { userId, label }: IssueCaptureTokenInput,
  now = new Date(),
): Promise<IssuedCaptureToken> => {
  const token = generateCaptureToken();
  const captureToken = {
    id: crypto.randomUUID(),
    label: label.trim(),
    lastUsedAt: null,
    createdAt: now,
  };
  await tokens.insert({ ...captureToken, userId, tokenHash: await hashCaptureToken(token) });
  return { token, captureToken };
};
