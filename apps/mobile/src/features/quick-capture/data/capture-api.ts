import { apiRequest } from '../../../shared/http/api-request';
import type { CaptureResult } from '../domain/capture-result';

export const postCapture = (text: string): Promise<CaptureResult> =>
  apiRequest<CaptureResult>('/capture', { method: 'POST', body: { text } });
