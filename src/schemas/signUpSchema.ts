import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string()
    .min(1, { message: 'Nome é obrigatório' })
    .max(255, { message: 'Nome não deve possuir mais de 255 caracteres' }),
  email: z.string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido')
    .max(255, { message: 'E-mail não deve possuir mais de 255 caracteres' }),
  password: z.string()
    .min(8, { message: 'Senha deve possuir no mínimo 8 caracteres' })
    .max(255, { message: 'Senha não deve possuir mais de 255 caracteres' }),
  confirmPassword: z.string()
    .min(8, { message: 'Confirmar senha deve possuir no mínimo 8 caracteres' })
    .max(255, { message: 'Confirmar senha não deve possuir mais de 255 caracteres' }),
  confirmAndAgree: z.boolean()
    .default(false)
    .refine((checked) => checked, 'Você precisa aceitar os termos')
}).superRefine(({ password, confirmPassword }, ctx) => {
  const passwordRegex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

  if (!passwordRegex.test(password)) {
    ctx.addIssue({
      code: 'custom',
      message: 'Senha não é forte',
      path: ['password']
    });
  }

  if (confirmPassword !== password) {
    ctx.addIssue({
      code: 'custom',
      message: 'As senhas não coincidem',
      path: ['confirmPassword']
    });
  }
});
