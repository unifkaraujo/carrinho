import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import type { AppEnv } from '../../../shared/http/app-env';
import { jsonError } from '../../../shared/http/json-error';
import { requireUser } from '../../auth/http/require-user';
import { createD1CategoriesRepository } from '../data/d1-categories-repository';
import { addCategory } from '../use-cases/add-category';
import { listCategories } from '../use-cases/list-categories';
import { removeCategory } from '../use-cases/remove-category';
import { categoryBodySchema } from './category-body-schema';

export const categoriesRoutes = new Hono<AppEnv>()
  .use(requireUser)
  .get('/', async (c) => {
    const categories = await listCategories(createD1CategoriesRepository(c.var.db), c.var.userId);
    return c.json({ categories });
  })
  .post('/', zValidator('json', categoryBodySchema), async (c) => {
    const { name } = c.req.valid('json');
    const repository = createD1CategoriesRepository(c.var.db);
    const category = await addCategory(repository, { userId: c.var.userId, name });
    return c.json({ category }, 201);
  })
  .delete('/:id', async (c) => {
    const repository = createD1CategoriesRepository(c.var.db);
    const removed = await removeCategory(repository, c.var.userId, c.req.param('id'));
    return removed ? c.body(null, 204) : jsonError(c, 404, 'category_not_found');
  });
