import { useMutation } from '@tanstack/react-query';
import { authClient } from '../data/auth-client';
import { unwrapAuthResult } from '../data/unwrap-auth-result';
import type { ChangePasswordData } from '../domain/change-password-schema';

const changePassword = async (data: ChangePasswordData) =>
  unwrapAuthResult(await authClient.changePassword({ ...data, revokeOtherSessions: false }));

export const useChangePassword = () => useMutation({ mutationFn: changePassword });
