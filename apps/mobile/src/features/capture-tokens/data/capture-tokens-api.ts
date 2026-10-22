import { apiRequest } from '../../../shared/http/api-request';
import type { CaptureToken, IssuedCaptureToken } from '../domain/capture-token';

export const fetchCaptureTokens = async (): Promise<CaptureToken[]> =>
  (await apiRequest<{ captureTokens: CaptureToken[] }>('/capture-tokens')).captureTokens;

export const issueCaptureToken = (label: string): Promise<IssuedCaptureToken> =>
  apiRequest<IssuedCaptureToken>('/capture-tokens', { method: 'POST', body: { label } });

export const revokeCaptureToken = (id: string): Promise<undefined> =>
  apiRequest<undefined>(`/capture-tokens/${id}`, { method: 'DELETE' });
