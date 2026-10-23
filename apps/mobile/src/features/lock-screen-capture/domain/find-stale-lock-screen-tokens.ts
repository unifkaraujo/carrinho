import type { CaptureToken } from '../../capture-tokens/domain/capture-token';
import { LOCK_SCREEN_TOKEN_LABEL } from './lock-screen-token-label';

export const findStaleLockScreenTokens = (
  tokens: readonly CaptureToken[],
  currentId: string,
): CaptureToken[] =>
  tokens.filter((token) => token.label === LOCK_SCREEN_TOKEN_LABEL && token.id !== currentId);
