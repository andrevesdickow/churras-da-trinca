import { z } from 'zod';

export const participantsSchema = z.object({
  participantOptions: z.array(
    z.object({
      participantId: z.string(),
      name: z.string(),
      paid: z.boolean(),
      contribution: z.number()
    })
  ),
  name: z.string().min(1, 'Nome é obrigatário'),
  withDrink: z.boolean().optional()
});

export const createParticipantInBarbecueSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatário'),
  withDrink: z.boolean().optional(),
  barbecueId: z.string().cuid()
});

export const markParticipantAsPaidSchema = z.object({
  participantId: z.string().cuid(),
  paid: z.boolean()
});
