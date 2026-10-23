import { Hono } from 'hono';
import type { AppEnv } from '../../../shared/http/app-env';
import { stripCookies } from '../../../shared/http/strip-cookies';

export const authRoutes = new Hono<AppEnv>().on(['GET', 'POST'], '/*', (c) =>
  c.var.auth.handler(stripCookies(c.req.raw)),
);
