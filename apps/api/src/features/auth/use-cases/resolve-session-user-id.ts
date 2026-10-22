import type { Auth } from '../data/create-auth';

export const resolveSessionUserId = async (auth: Auth, headers: Headers): Promise<string | null> =>
  (await auth.api.getSession({ headers }))?.user.id ?? null;
