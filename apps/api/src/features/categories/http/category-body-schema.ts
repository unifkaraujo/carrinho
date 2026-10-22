import { z } from 'zod';

export const categoryBodySchema = z.object({
  name: z.string().trim().min(1).max(40),
});
