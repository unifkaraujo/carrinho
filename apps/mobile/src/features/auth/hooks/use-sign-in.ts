import { useMutation } from '@tanstack/react-query';
import { authClient } from '../data/auth-client';
import { unwrapAuthResult } from '../data/unwrap-auth-result';
import type { SignInCredentials } from '../domain/sign-in-schema';

const signIn = async (credentials: SignInCredentials) =>
  unwrapAuthResult(await authClient.signIn.email(credentials));

export const useSignIn = () => useMutation({ mutationFn: signIn });
