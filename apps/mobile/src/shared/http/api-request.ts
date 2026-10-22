import { API_URL } from '../config/api-url';
import { readSessionToken } from '../storage/session-token-storage';
import { ApiError } from './api-error';

const NO_CONTENT = 204;

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
}

const buildHeaders = async (hasBody: boolean): Promise<Record<string, string>> => {
  const token = await readSessionToken();
  return {
    ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const readErrorCode = async (response: Response): Promise<string> => {
  const body: { error?: string } = await response.json().catch(() => ({}));
  return body.error ?? 'unknown_error';
};

export const apiRequest = async <T>(path: string, options: ApiRequestOptions = {}): Promise<T> => {
  const hasBody = options.body !== undefined;
  const response = await fetch(`${API_URL}${path}`, {
    method: options.method ?? 'GET',
    headers: await buildHeaders(hasBody),
    ...(hasBody ? { body: JSON.stringify(options.body) } : {}),
  });
  if (!response.ok) throw new ApiError(response.status, await readErrorCode(response));
  return (response.status === NO_CONTENT ? undefined : await response.json()) as T;
};
