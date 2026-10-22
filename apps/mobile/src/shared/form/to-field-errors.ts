import { z } from 'zod';

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export const toFieldErrors = <T>(error: z.ZodError): FieldErrors<T> => {
  const fieldErrors: Record<string, string[] | undefined> = z.flattenError(error).fieldErrors;
  return Object.fromEntries(
    Object.entries(fieldErrors).map(([field, messages]) => [field, messages?.[0]]),
  ) as FieldErrors<T>;
};
