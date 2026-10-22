import { z } from 'zod';

const MIN_PASSWORD_LENGTH = 8;

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Informe a senha atual.'),
  newPassword: z
    .string()
    .min(MIN_PASSWORD_LENGTH, `A senha precisa ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`),
});

export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
