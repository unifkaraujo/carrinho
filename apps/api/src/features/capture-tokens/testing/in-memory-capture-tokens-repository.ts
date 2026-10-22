import type { CaptureToken } from '../domain/capture-token';
import type { CaptureTokensRepository } from '../domain/capture-tokens-repository';

const toSummary = ({ id, label, lastUsedAt, createdAt }: CaptureToken) => ({
  id,
  label,
  lastUsedAt,
  createdAt,
});

export const createInMemoryCaptureTokensRepository = (): CaptureTokensRepository & {
  all: () => CaptureToken[];
} => {
  const tokens = new Map<string, CaptureToken>();
  const ofUser = (userId: string) => [...tokens.values()].filter((t) => t.userId === userId);
  const byHash = (tokenHash: string) => [...tokens.values()].find((t) => t.tokenHash === tokenHash);

  return {
    all: () => [...tokens.values()],
    findUserIdByHash: async (tokenHash) => byHash(tokenHash)?.userId ?? null,
    markUsed: async (tokenHash, now) => {
      const token = byHash(tokenHash);
      if (token) tokens.set(token.id, { ...token, lastUsedAt: now });
    },
    listByUser: async (userId) => ofUser(userId).map(toSummary),
    insert: async (token) => {
      tokens.set(token.id, token);
    },
    delete: async (userId, id) => ofUser(userId).some((t) => t.id === id) && tokens.delete(id),
  };
};
