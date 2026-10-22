import { Hono } from 'hono';
import { authRoutes } from './features/auth/http/auth-routes';
import { injectAuth } from './features/auth/http/inject-auth';
import { categoriesRoutes } from './features/categories/http/categories-routes';
import { captureTokensRoutes } from './features/capture-tokens/http/capture-tokens-routes';
import { captureRoutes } from './features/capture/http/capture-routes';
import { itemsRoutes } from './features/items/http/items-routes';
import type { AppEnv } from './shared/http/app-env';
import { handleError } from './shared/http/handle-error';
import { injectDatabase } from './shared/http/inject-database';

const app = new Hono<AppEnv>()
  .use(injectDatabase)
  .use(injectAuth)
  .get('/health', (c) => c.json({ status: 'ok' }))
  .route('/api/auth', authRoutes)
  .route('/capture', captureRoutes)
  .route('/items', itemsRoutes)
  .route('/categories', categoriesRoutes)
  .route('/capture-tokens', captureTokensRoutes)
  .onError(handleError);

export default app;
