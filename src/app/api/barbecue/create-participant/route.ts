import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { toNumber } from 'lodash';
import { AuthKeys } from '@/enums/AuthKeys';
import prisma from '@/lib/prisma';
import { createParticipantInBarbecueSchema } from '@/schemas/participantsSchema';

export async function POST(request: NextRequest) {
  try {
    const accessToken = request.cookies.get(AuthKeys.ACCESS_TOKEN);

    if (!accessToken) {
      redirect('/');
    }

    const {
      barbecueId,
      name,
      withDrink
    } = createParticipantInBarbecueSchema.parse(await request.json());

    const barbecue = await prisma.barbecues.findFirst({
      where: {
        id: barbecueId
      },
      select: {
        priceWithDrink: true,
        priceWithoutDrink: true
      }
    });

    if (!barbecue) {
      return Response.json({
        success: false,
        statusCode: 404,
        errors: [{ message: 'Churras não encontrado' }],
        result: null
      });
    }

    const participant = await prisma.barbecueParticipants.create({
      data: {
        name,
        amount: withDrink ? barbecue.priceWithDrink : barbecue.priceWithoutDrink,
        barbecueId,
        paid: false
      },
      select: {
        id: true,
        amount: true
      }
    });

    return Response.json({
      success: true,
      statusCode: 200,
      errors: [{ message: 'Participante adicionado com sucesso' }],
      result: { ...participant, amount: toNumber(participant.amount) }
    });
  } catch (err: any) {
    return Response.json({
      success: false,
      statusCode: 400,
      errors: [{ message: err.message || 'Falha ao inserir participante' }],
      result: null
    });
  }
}
