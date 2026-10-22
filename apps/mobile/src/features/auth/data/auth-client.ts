import { createAuthClient } from 'better-auth/react';
import { API_URL } from '../../../shared/config/api-url';
import { readSessionToken, saveSessionToken } from './session-token-storage';

const ISSUED_TOKEN_HEADER = 'set-auth-token';

const readTokenForRequest = async (): Promise<string | undefined> =>
  (await readSessionToken()) ?? undefined;

const storeIssuedToken = async ({ response }: { response: Response }): Promise<void> => {
  const token = response.headers.get(ISSUED_TOKEN_HEADER);
  if (token) await saveSessionToken(token);
};

export const authClient = createAuthClient({
  baseURL: API_URL,
  fetchOptions: {
    auth: { type: 'Bearer', token: readTokenForRequest },
    onSuccess: storeIssuedToken,
  },
});
