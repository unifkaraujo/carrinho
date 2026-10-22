import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import type { AppEnv } from '../../../shared/http/app-env';
import { requireUser } from '../../auth/http/require-user';
import { createD1ItemsRepository } from '../data/d1-items-repository';
import { listItems } from '../use-cases/list-items';
import { listItemsQuerySchema } from './list-items-query-schema';

export const itemsRoutes = new Hono<AppEnv>()
  .use(requireUser)
  .get('/', zValidator('query', listItemsQuerySchema), async (c) => {
    const { status } = c.req.valid('query');
    const items = await listItems(createD1ItemsRepository(c.var.db), c.var.userId, status ?? null);
    return c.json({ items });
  });
