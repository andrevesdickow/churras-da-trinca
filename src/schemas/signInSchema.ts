import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string()
    .min(1, 'E-mail é obrigatório')
    .max(255, { message: 'E-mail não deve possuir mais de 255 caracteres' })
    .email('E-mail inválido'),
  password: z.string()
    .min(8, 'A senha deve possuir pelo menos 8 caracteres')
    .max(255, { message: 'Senha não deve possuir mais de 255 caracteres' })
});
