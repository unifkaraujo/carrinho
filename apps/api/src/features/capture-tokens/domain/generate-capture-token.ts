import { CAPTURE_TOKEN_PREFIX } from './capture-token-prefix';

const TOKEN_BYTES = 32;

const toBase64Url = (bytes: Uint8Array): string =>
  btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

export const generateCaptureToken = (): string =>
  CAPTURE_TOKEN_PREFIX + toBase64Url(crypto.getRandomValues(new Uint8Array(TOKEN_BYTES)));
