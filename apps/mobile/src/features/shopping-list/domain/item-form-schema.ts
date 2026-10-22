import { z } from 'zod';

const MAX_QUANTITY = 10_000;

const toNumber = (text: string): number => Number(text.trim().replace(',', '.'));

export const itemFormSchema = z.object({
  name: z.string().trim().min(1, 'Informe o nome do item.'),
  quantity: z
    .string()
    .transform(toNumber)
    .pipe(
      z
        .number('Informe um número.')
        .positive('A quantidade precisa ser maior que zero.')
        .max(MAX_QUANTITY, 'Quantidade muito alta.'),
    ),
  unit: z
    .string()
    .trim()
    .transform((unit) => (unit === '' ? null : unit)),
});

export type ItemFormValues = z.input<typeof itemFormSchema>;
export type ItemFormData = z.output<typeof itemFormSchema>;
