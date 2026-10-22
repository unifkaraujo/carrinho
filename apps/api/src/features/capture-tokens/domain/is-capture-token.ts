import { CAPTURE_TOKEN_PREFIX } from './capture-token-prefix';

export const isCaptureToken = (token: string): boolean => token.startsWith(CAPTURE_TOKEN_PREFIX);
