import type { ErrorHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';
import type { AppEnv } from './app-env';
import { jsonError } from './json-error';

export const handleError: ErrorHandler<AppEnv> = (error, c) => {
  if (error instanceof HTTPException) return error.getResponse();
  console.error(error);
  return jsonError(c, 500, 'internal_error');
};
