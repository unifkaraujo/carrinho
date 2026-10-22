import { createMiddleware } from 'hono/factory';
import { createDatabase } from '../db/database';
import type { AppEnv } from './app-env';

export const injectDatabase = createMiddleware<AppEnv>(async (c, next) => {
  c.set('db', createDatabase(c.env.DB));
  await next();
});
