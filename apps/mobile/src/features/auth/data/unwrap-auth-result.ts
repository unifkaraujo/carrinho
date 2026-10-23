import { AuthError } from '../domain/auth-error';

interface AuthResult<T> {
  data: T | null;
  error: { code?: string | undefined; status?: number | undefined } | null;
}

const SERVER_ERROR_STATUS = 500;

const resolveErrorCode = (error: AuthResult<unknown>['error']): string | undefined =>
  error?.code ?? ((error?.status ?? 0) >= SERVER_ERROR_STATUS ? 'SERVER_ERROR' : undefined);

export const unwrapAuthResult = <T>({ data, error }: AuthResult<T>): T => {
  if (error || data === null) throw new AuthError(resolveErrorCode(error));
  return data;
};
