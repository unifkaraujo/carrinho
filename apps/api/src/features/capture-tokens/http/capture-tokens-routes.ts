import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import type { AppEnv } from '../../../shared/http/app-env';
import { jsonError } from '../../../shared/http/json-error';
import { requireSession } from '../../auth/http/require-session';
import { createD1CaptureTokensRepository } from '../data/d1-capture-tokens-repository';
import { issueCaptureToken } from '../use-cases/issue-capture-token';
import { listCaptureTokens } from '../use-cases/list-capture-tokens';
import { revokeCaptureToken } from '../use-cases/revoke-capture-token';
import { captureTokenBodySchema } from './capture-token-body-schema';

export const captureTokensRoutes = new Hono<AppEnv>()
  .use(requireSession)
  .get('/', async (c) => {
    const repository = createD1CaptureTokensRepository(c.var.db);
    return c.json({ captureTokens: await listCaptureTokens(repository, c.var.userId) });
  })
  .post('/', zValidator('json', captureTokenBodySchema), async (c) => {
    const repository = createD1CaptureTokensRepository(c.var.db);
    const { label } = c.req.valid('json');
    return c.json(await issueCaptureToken(repository, { userId: c.var.userId, label }), 201);
  })
  .delete('/:id', async (c) => {
    const repository = createD1CaptureTokensRepository(c.var.db);
    const revoked = await revokeCaptureToken(repository, c.var.userId, c.req.param('id'));
    return revoked ? c.body(null, 204) : jsonError(c, 404, 'capture_token_not_found');
  });
