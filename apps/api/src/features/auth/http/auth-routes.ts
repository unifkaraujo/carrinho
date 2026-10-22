import { Hono } from 'hono';
import type { AppEnv } from '../../../shared/http/app-env';

export const authRoutes = new Hono<AppEnv>().on(['GET', 'POST'], '/*', (c) =>
  c.var.auth.handler(c.req.raw),
);
