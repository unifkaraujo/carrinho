import { z } from 'zod';
import { ITEM_STATUSES } from '../domain/item';

export const updateItemBodySchema = z
  .object({
    name: z.string().trim().min(1).max(100).optional(),
    quantity: z.number().positive().max(10_000).optional(),
    unit: z.string().trim().min(1).max(30).nullable().optional(),
    categoryId: z.string().min(1).nullable().optional(),
    status: z.enum(ITEM_STATUSES).optional(),
  })
  .refine((patch) => Object.keys(patch).length > 0, { message: 'Nada para atualizar' });
