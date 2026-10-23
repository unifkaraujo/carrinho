import {
  fetchCaptureTokens,
  issueCaptureToken,
  revokeCaptureToken,
} from '../../capture-tokens/data/capture-tokens-api';
import type { CaptureToken } from '../../capture-tokens/domain/capture-token';
import { findStaleLockScreenTokens } from '../domain/find-stale-lock-screen-tokens';
import { LOCK_SCREEN_TOKEN_LABEL } from '../domain/lock-screen-token-label';
import {
  isLockScreenCaptureAvailable,
  readStoredTokenId,
  storeLockScreenCredentials,
} from './lock-screen-credentials';

const ensureCurrentToken = async (tokens: readonly CaptureToken[]): Promise<string> => {
  const storedId = readStoredTokenId();
  if (storedId && tokens.some(({ id }) => id === storedId)) return storedId;
  const issued = await issueCaptureToken(LOCK_SCREEN_TOKEN_LABEL);
  storeLockScreenCredentials(issued);
  return issued.captureToken.id;
};

export const provisionLockScreenCapture = async (): Promise<void> => {
  if (!isLockScreenCaptureAvailable()) return;
  const tokens = await fetchCaptureTokens();
  const currentId = await ensureCurrentToken(tokens);
  await Promise.all(
    findStaleLockScreenTokens(tokens, currentId).map(({ id }) => revokeCaptureToken(id)),
  );
};
