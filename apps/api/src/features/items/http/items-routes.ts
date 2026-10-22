import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import type { AppEnv } from '../../../shared/http/app-env';
import { jsonError } from '../../../shared/http/json-error';
import { requireUser } from '../../auth/http/require-user';
import { createD1CategoriesRepository } from '../../categories/data/d1-categories-repository';
import { createD1ItemsRepository } from '../data/d1-items-repository';
import { clearBoughtItems } from '../use-cases/clear-bought-items';
import { listItems } from '../use-cases/list-items';
import { removeItem } from '../use-cases/remove-item';
import { updateItem } from '../use-cases/update-item';
import { ITEM_UPDATE_ERROR_STATUS } from './item-update-error-status';
import { listItemsQuerySchema } from './list-items-query-schema';
import { updateItemBodySchema } from './update-item-body-schema';

export const itemsRoutes = new Hono<AppEnv>()
  .use(requireUser)
  .get('/', zValidator('query', listItemsQuerySchema), async (c) => {
    const { status } = c.req.valid('query');
    const items = await listItems(createD1ItemsRepository(c.var.db), c.var.userId, status ?? null);
    return c.json({ items });
  })
  .delete('/bought', async (c) => {
    const removed = await clearBoughtItems(createD1ItemsRepository(c.var.db), c.var.userId);
    return c.json({ removed });
  })
  .patch('/:id', zValidator('json', updateItemBodySchema), async (c) => {
    const deps = {
      items: createD1ItemsRepository(c.var.db),
      categories: createD1CategoriesRepository(c.var.db),
    };
    const input = { userId: c.var.userId, itemId: c.req.param('id'), patch: c.req.valid('json') };
    const result = await updateItem(deps, input);
    return 'error' in result
      ? jsonError(c, ITEM_UPDATE_ERROR_STATUS[result.error], result.error)
      : c.json({ item: result.item });
  })
  .delete('/:id', async (c) => {
    const removed = await removeItem(
      createD1ItemsRepository(c.var.db),
      c.var.userId,
      c.req.param('id'),
    );
    return removed ? c.body(null, 204) : jsonError(c, 404, 'item_not_found');
  });
