export type AuthStatus = 'loading' | 'signed-in' | 'signed-out';

interface AuthSignals {
  hasSession: boolean;
  sessionPending: boolean;
  sessionFailed: boolean;
  hasStoredToken: boolean | null;
}

export const resolveAuthStatus = ({
  hasSession,
  sessionPending,
  sessionFailed,
  hasStoredToken,
}: AuthSignals): AuthStatus => {
  if (hasSession) return 'signed-in';
  if (sessionPending || hasStoredToken === null) return 'loading';
  return sessionFailed && hasStoredToken ? 'signed-in' : 'signed-out';
};
