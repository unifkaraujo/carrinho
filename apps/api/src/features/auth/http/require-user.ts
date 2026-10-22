import type { Context } from 'hono';
import { createMiddleware } from 'hono/factory';
import type { AppEnv } from '../../../shared/http/app-env';
import { jsonError } from '../../../shared/http/json-error';
import { readBearerToken } from '../../../shared/http/read-bearer-token';
import { createD1CaptureTokensRepository } from '../../capture-tokens/data/d1-capture-tokens-repository';
import { isCaptureToken } from '../../capture-tokens/domain/is-capture-token';
import { authenticateCaptureToken } from '../../capture-tokens/use-cases/authenticate-capture-token';
import { resolveSessionUserId } from '../use-cases/resolve-session-user-id';

const resolveUserId = (c: Context<AppEnv>, token: string): Promise<string | null> =>
  isCaptureToken(token)
    ? authenticateCaptureToken(createD1CaptureTokensRepository(c.var.db), token)
    : resolveSessionUserId(c.var.auth, c.req.raw.headers);

export const requireUser = createMiddleware<AppEnv>(async (c, next) => {
  const token = readBearerToken(c.req.header('Authorization'));
  const userId = token ? await resolveUserId(c, token) : null;
  if (!userId) return jsonError(c, 401, 'unauthorized');
  c.set('userId', userId);
  await next();
});
