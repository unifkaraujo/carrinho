import { describe, expect, it } from 'vitest';
import type { CaptureToken } from '../../capture-tokens/domain/capture-token';
import { findStaleLockScreenTokens } from './find-stale-lock-screen-tokens';
import { LOCK_SCREEN_TOKEN_LABEL } from './lock-screen-token-label';

const token = (id: string, label: string): CaptureToken => ({
  id,
  label,
  lastUsedAt: null,
  createdAt: '2026-10-23T00:00:00.000Z',
});

describe('findStaleLockScreenTokens', () => {
  it('returns lock screen tokens other than the current one', () => {
    const tokens = [
      token('current', LOCK_SCREEN_TOKEN_LABEL),
      token('old', LOCK_SCREEN_TOKEN_LABEL),
      token('shortcut', 'HTTP Shortcuts'),
    ];

    expect(findStaleLockScreenTokens(tokens, 'current').map(({ id }) => id)).toEqual(['old']);
  });

  it('keeps tokens created for other purposes', () => {
    expect(findStaleLockScreenTokens([token('shortcut', 'Celular')], 'current')).toEqual([]);
  });
});
