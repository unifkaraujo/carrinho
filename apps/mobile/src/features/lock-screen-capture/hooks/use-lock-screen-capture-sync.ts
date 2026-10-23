import { useEffect } from 'react';
import type { AuthStatus } from '../../auth/domain/resolve-auth-status';
import { clearLockScreenCredentials } from '../data/lock-screen-credentials';
import { provisionLockScreenCapture } from '../data/provision-lock-screen-capture';

export const useLockScreenCaptureSync = (status: AuthStatus) => {
  useEffect(() => {
    if (status === 'signed-in') provisionLockScreenCapture().catch(() => undefined);
    if (status === 'signed-out') clearLockScreenCredentials();
  }, [status]);
};
