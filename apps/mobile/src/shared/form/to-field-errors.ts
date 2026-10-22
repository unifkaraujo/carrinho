import { z } from 'zod';

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export const toFieldErrors = <T>(error: z.ZodError<T>): FieldErrors<T> => {
  const fieldErrors: Partial<Record<keyof T, string[]>> = z.flattenError(error).fieldErrors;
  return Object.fromEntries(
    Object.entries(fieldErrors).map(([field, messages]) => [field, (messages as string[])[0]]),
  ) as FieldErrors<T>;
};
