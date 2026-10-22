export interface CaptureToken {
  id: string;
  userId: string;
  tokenHash: string;
  label: string;
  lastUsedAt: Date | null;
  createdAt: Date;
}

export type CaptureTokenSummary = Omit<CaptureToken, 'userId' | 'tokenHash'>;
