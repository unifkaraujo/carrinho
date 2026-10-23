import { ApiError } from './api-error';

const NOT_FOUND = 404;

export const ignoreNotFound = async (request: Promise<undefined>): Promise<undefined> => {
  try {
    return await request;
  } catch (error) {
    if (error instanceof ApiError && error.status === NOT_FOUND) return undefined;
    throw error;
  }
};
