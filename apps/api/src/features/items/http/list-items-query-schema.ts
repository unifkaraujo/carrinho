import { z } from 'zod';
import { ITEM_STATUSES } from '../domain/item';

export const listItemsQuerySchema = z.object({
  status: z.enum(ITEM_STATUSES).optional(),
});
