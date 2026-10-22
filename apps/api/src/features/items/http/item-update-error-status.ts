import type { ContentfulStatusCode } from 'hono/utils/http-status';
import type { ItemUpdateError } from '../domain/item-update-error';

export const ITEM_UPDATE_ERROR_STATUS: Record<ItemUpdateError, ContentfulStatusCode> = {
  item_not_found: 404,
  name_conflict: 409,
  category_not_found: 422,
};
