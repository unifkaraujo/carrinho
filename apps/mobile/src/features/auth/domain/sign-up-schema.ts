import { z } from 'zod';

const MIN_PASSWORD_LENGTH = 8;

export const signUpSchema = z.object({
  name: z.string().trim().min(1, 'Informe seu nome.'),
  email: z.string().trim().toLowerCase().email('Informe um e-mail válido.'),
  password: z
    .string()
    .min(MIN_PASSWORD_LENGTH, `A senha precisa ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`),
});

export type SignUpData = z.infer<typeof signUpSchema>;
