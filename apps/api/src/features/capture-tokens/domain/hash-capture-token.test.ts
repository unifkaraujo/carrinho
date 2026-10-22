import { describe, expect, it } from 'vitest';
import { generateCaptureToken } from './generate-capture-token';
import { hashCaptureToken } from './hash-capture-token';

describe('capture token', () => {
  it('gera tokens únicos com prefixo e sem caracteres especiais de URL', () => {
    const token = generateCaptureToken();
    expect(token).toMatch(/^mm_[A-Za-z0-9_-]{43}$/);
    expect(generateCaptureToken()).not.toBe(token);
  });

  it('gera hash SHA-256 determinístico em hexadecimal', async () => {
    const hash = await hashCaptureToken('mm_abc');
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
    expect(await hashCaptureToken('mm_abc')).toBe(hash);
  });
});
