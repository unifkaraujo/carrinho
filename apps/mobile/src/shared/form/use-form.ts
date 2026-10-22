import { useState } from 'react';
import type { z } from 'zod';
import { toFieldErrors, type FieldErrors } from './to-field-errors';

type FormValues = Record<string, string>;

export const useForm = <T extends FormValues>(schema: z.ZodType<T>, initialValues: T) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FieldErrors<T>>({});

  const setField = (field: keyof T) => (value: string) =>
    setValues((current) => ({ ...current, [field]: value }));

  const validate = (): T | null => {
    const result = schema.safeParse(values);
    setErrors(result.success ? {} : toFieldErrors(result.error));
    return result.success ? result.data : null;
  };

  return { values, errors, setField, validate };
};
