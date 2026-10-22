import { describe, expect, it } from 'vitest';
import { createInMemoryCaptureTokensRepository } from '../testing/in-memory-capture-tokens-repository';
import { authenticateCaptureToken } from './authenticate-capture-token';
import { issueCaptureToken } from './issue-capture-token';
import { listCaptureTokens } from './list-capture-tokens';
import { revokeCaptureToken } from './revoke-capture-token';

const NOW = new Date('2026-10-22T12:00:00Z');

describe('capture tokens', () => {
  it('emite token que autentica o usuário e guarda só o hash', async () => {
    const tokens = createInMemoryCaptureTokensRepository();
    const { token } = await issueCaptureToken(tokens, { userId: 'user-1', label: ' Widget ' });
    expect(tokens.all()[0]).toMatchObject({ label: 'Widget', userId: 'user-1' });
    expect(tokens.all()[0]?.tokenHash).not.toContain(token);
    expect(await authenticateCaptureToken(tokens, token, NOW)).toBe('user-1');
    expect((await listCaptureTokens(tokens, 'user-1'))[0]?.lastUsedAt).toEqual(NOW);
  });

  it('lista sem expor o hash', async () => {
    const tokens = createInMemoryCaptureTokensRepository();
    await issueCaptureToken(tokens, { userId: 'user-1', label: 'Atalho' });
    const [summary] = await listCaptureTokens(tokens, 'user-1');
    expect(summary).not.toHaveProperty('tokenHash');
  });

  it('revoga apenas tokens do próprio usuário', async () => {
    const tokens = createInMemoryCaptureTokensRepository();
    const { token, captureToken } = await issueCaptureToken(tokens, {
      userId: 'user-1',
      label: 'Atalho',
    });
    expect(await revokeCaptureToken(tokens, 'user-2', captureToken.id)).toBe(false);
    expect(await revokeCaptureToken(tokens, 'user-1', captureToken.id)).toBe(true);
    expect(await authenticateCaptureToken(tokens, token)).toBeNull();
  });
});
