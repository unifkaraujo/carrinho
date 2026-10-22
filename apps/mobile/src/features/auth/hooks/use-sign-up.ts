import { useMutation } from '@tanstack/react-query';
import { authClient } from '../data/auth-client';
import { unwrapAuthResult } from '../data/unwrap-auth-result';
import type { SignUpData } from '../domain/sign-up-schema';

const signUp = async (data: SignUpData) => unwrapAuthResult(await authClient.signUp.email(data));

export const useSignUp = () => useMutation({ mutationFn: signUp });
