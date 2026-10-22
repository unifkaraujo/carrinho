import { useState } from 'react';
import type { z } from 'zod';
import { toFieldErrors, type FieldErrors } from './to-field-errors';

type FormValues = Record<string, string>;

export const useForm = <TValues extends FormValues, TOutput = TValues>(
  schema: z.ZodType<TOutput, TValues>,
  initialValues: TValues,
) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FieldErrors<TValues>>({});

  const setField = (field: keyof TValues) => (value: string) =>
    setValues((current) => ({ ...current, [field]: value }));

  const validate = (): TOutput | null => {
    const result = schema.safeParse(values);
    setErrors(result.success ? {} : toFieldErrors<TValues>(result.error));
    return result.success ? result.data : null;
  };

  return { values, errors, setField, validate };
};
