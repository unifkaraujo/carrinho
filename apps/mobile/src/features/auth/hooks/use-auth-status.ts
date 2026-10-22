import { useEffect, useState } from 'react';
import { readSessionToken } from '../../../shared/storage/session-token-storage';
import { resolveAuthStatus, type AuthStatus } from '../domain/resolve-auth-status';
import { useSession } from './use-session';

const useHasStoredToken = (refreshKey: unknown): boolean | null => {
  const [hasToken, setHasToken] = useState<boolean | null>(null);
  useEffect(() => {
    readSessionToken().then((token) => setHasToken(Boolean(token)));
  }, [refreshKey]);
  return hasToken;
};

export const useAuthStatus = (): AuthStatus => {
  const session = useSession();
  const hasStoredToken = useHasStoredToken(session.data ?? session.error);
  return resolveAuthStatus({
    hasSession: Boolean(session.data),
    sessionPending: session.isPending,
    sessionFailed: Boolean(session.error),
    hasStoredToken,
  });
};
