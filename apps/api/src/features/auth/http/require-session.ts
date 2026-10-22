import { createMiddleware } from 'hono/factory';
import type { AppEnv } from '../../../shared/http/app-env';
import { jsonError } from '../../../shared/http/json-error';
import { readBearerToken } from '../../../shared/http/read-bearer-token';
import { isCaptureToken } from '../../capture-tokens/domain/is-capture-token';
import { resolveSessionUserId } from '../use-cases/resolve-session-user-id';

export const requireSession = createMiddleware<AppEnv>(async (c, next) => {
  const token = readBearerToken(c.req.header('Authorization'));
  const isSessionToken = token !== null && !isCaptureToken(token);
  const userId = isSessionToken ? await resolveSessionUserId(c.var.auth, c.req.raw.headers) : null;
  if (!userId) return jsonError(c, 401, 'unauthorized');
  c.set('userId', userId);
  await next();
});
