import { isValid } from 'date-fns';
import { isEmpty } from 'lodash';
import { z } from 'zod';

export const createBarbecueSchema = z.object({
  date: z.string()
    .superRefine((val, ctx) => {
      if (isEmpty(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Data é obrigatório.'
        });
      }

      if (!isValid(new Date(val))) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_date,
          message: 'Data inválida'
        });
      }
    }),
  description: z.string()
    .min(1, 'Descrição é obrigatório'),
  additionalObservations: z.string().optional(),
  priceWithDrink: z.number(),
  priceWithoutDrink: z.number()
});
