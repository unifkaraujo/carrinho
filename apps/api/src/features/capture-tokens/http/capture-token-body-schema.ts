import { z } from 'zod';

export const captureTokenBodySchema = z.object({
  label: z.string().trim().min(1).max(40),
});
