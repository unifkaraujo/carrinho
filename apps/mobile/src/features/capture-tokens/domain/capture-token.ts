export interface CaptureToken {
  id: string;
  label: string;
  lastUsedAt: string | null;
  createdAt: string;
}

export interface IssuedCaptureToken {
  token: string;
  captureToken: CaptureToken;
}
