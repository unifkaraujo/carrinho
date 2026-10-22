import { AuthError } from '../domain/auth-error';

interface AuthResult<T> {
  data: T | null;
  error: { code?: string | undefined } | null;
}

export const unwrapAuthResult = <T>({ data, error }: AuthResult<T>): T => {
  if (error || data === null) throw new AuthError(error?.code);
  return data;
};
