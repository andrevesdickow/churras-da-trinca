import { z } from 'zod';
import { createBarbecueSchema } from '@/schemas/createBarbecueSchema';
import { createParticipantInBarbecueSchema, markParticipantAsPaidSchema, participantsSchema } from '@/schemas/participantsSchema';
import { DefaultReturnData } from '.';

export type CreateBarbecueData = z.infer<typeof createBarbecueSchema>;

export type CreateParticipantInBarbecueData = z.infer<typeof createParticipantInBarbecueSchema>;

export type ParticipantsFormData = z.infer<typeof participantsSchema>;

export type MarkParticipantAsPaidData = z.infer<typeof markParticipantAsPaidSchema>;

export type BarbecueListResponse = {
  result: {
    date: Date;
    dateFormatted: string;
    description: string;
    id: string;
    totalPeople: number;
    totalAmount: number;
  }[];
} & DefaultReturnData;

export type BarbecueByIdResponse = {
  result: {
    date: Date;
    dateFormatted: string;
    description: string;
    id: string;
    priceWithDrink: number;
    priceWithoutDrink: number;
    additionalObservations?: string;
    participants: {
      name: string;
      participantId: string;
      contribution: number;
      paid: boolean;
    }[]
  };
} & DefaultReturnData;

export type BarbecueCreateResponse = {
  result: any;
} & DefaultReturnData;

export type CreateParticipantInBarbecueResponse = {
  result: {
    id: string;
    amount: number;
  };
} & DefaultReturnData;

export type MarkParticipantAsPaidResponse = {
  result: any;
} & DefaultReturnData;
