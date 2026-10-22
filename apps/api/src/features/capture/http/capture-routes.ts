import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import type { AppEnv } from '../../../shared/http/app-env';
import { jsonError } from '../../../shared/http/json-error';
import { requireUser } from '../../auth/http/require-user';
import { createD1ItemsRepository } from '../../items/data/d1-items-repository';
import { captureItem } from '../use-cases/capture-item';
import { captureBodySchema } from './capture-body-schema';
import { buildCaptureMessage } from './build-capture-message';

export const captureRoutes = new Hono<AppEnv>()
  .use(requireUser)
  .post('/', zValidator('json', captureBodySchema), async (c) => {
    const { text } = c.req.valid('json');
    const result = await captureItem(createD1ItemsRepository(c.var.db), {
      userId: c.var.userId,
      text,
    });
    if (!result) return jsonError(c, 422, 'unrecognized_item');
    const status = result.outcome === 'created' ? 201 : 200;
    return c.json({ ...result, message: buildCaptureMessage(result) }, status);
  });
