import { createMiddleware } from 'hono/factory';
import type { AppEnv } from '../../../shared/http/app-env';
import { createAuth } from '../data/create-auth';

export const injectAuth = createMiddleware<AppEnv>(async (c, next) => {
  c.set('auth', createAuth(c.env, c.var.db));
  await next();
});
