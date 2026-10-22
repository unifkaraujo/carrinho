import { describe, expect, it } from 'vitest';
import { resolveAuthStatus } from './resolve-auth-status';

const signals = {
  hasSession: false,
  sessionPending: false,
  sessionFailed: false,
  hasStoredToken: false,
};

describe('resolveAuthStatus', () => {
  it('considera logado com sessão válida', () => {
    expect(resolveAuthStatus({ ...signals, hasSession: true })).toBe('signed-in');
  });

  it('aguarda enquanto a sessão ou o token estão carregando', () => {
    expect(resolveAuthStatus({ ...signals, sessionPending: true })).toBe('loading');
    expect(resolveAuthStatus({ ...signals, hasStoredToken: null })).toBe('loading');
  });

  it('mantém logado offline quando há token salvo e a sessão falhou', () => {
    expect(resolveAuthStatus({ ...signals, sessionFailed: true, hasStoredToken: true })).toBe(
      'signed-in',
    );
  });

  it('desloga quando o servidor diz que não há sessão', () => {
    expect(resolveAuthStatus({ ...signals, hasStoredToken: true })).toBe('signed-out');
  });

  it('desloga quando falhou e não há token', () => {
    expect(resolveAuthStatus({ ...signals, sessionFailed: true })).toBe('signed-out');
  });
});
