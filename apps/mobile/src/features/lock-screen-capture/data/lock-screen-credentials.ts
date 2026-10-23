import { QuickSettingsCapture } from '../../../../modules/quick-settings-capture';
import type { IssuedCaptureToken } from '../../capture-tokens/domain/capture-token';
import { API_URL } from '../../../shared/config/api-url';

export const isLockScreenCaptureAvailable = (): boolean => QuickSettingsCapture !== null;

export const readStoredTokenId = (): string | null => QuickSettingsCapture?.readTokenId() ?? null;

export const storeLockScreenCredentials = ({ token, captureToken }: IssuedCaptureToken) =>
  QuickSettingsCapture?.saveCredentials(API_URL, captureToken.id, token);

export const clearLockScreenCredentials = () => QuickSettingsCapture?.clearCredentials();
