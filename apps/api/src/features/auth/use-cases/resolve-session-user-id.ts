import { stripCookieHeader } from '../../../shared/http/strip-cookies';
import type { Auth } from '../data/create-auth';

export const resolveSessionUserId = async (auth: Auth, headers: Headers): Promise<string | null> =>
  (await auth.api.getSession({ headers: stripCookieHeader(headers) }))?.user.id ?? null;
