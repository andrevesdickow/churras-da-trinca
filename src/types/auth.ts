import { z } from 'zod';
import { signInSchema } from '@/schemas/signInSchema';
import { signUpSchema } from '@/schemas/signUpSchema';
import type { DefaultReturnData } from '.';

export type SignInData = z.infer<typeof signInSchema>;

export type SignUpData = z.infer<typeof signUpSchema>;

export type SignInResponse = {
  result: {
    id: string;
    name: string;
    email: string;
  }
} & DefaultReturnData;

export type SignUpResponse = {
  result: {
    id: string;
    name: string;
    email: string;
  }
} & DefaultReturnData;

export type MeResponse = {
  result: SignInResponse['result'];
} & DefaultReturnData;
