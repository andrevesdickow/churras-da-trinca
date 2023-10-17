import { redirect } from 'next/navigation';
import { NextResponse, type NextRequest } from 'next/server';
import { format } from 'date-fns';
import { map, toNumber } from 'lodash';
import { AuthKeys } from '@/enums/AuthKeys';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(AuthKeys.ACCESS_TOKEN);

  if (!accessToken) {
    redirect('/');
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    redirect('/churras');
  }

  const barbecue = await prisma.barbecues.findFirst({
    where: {
      id
    },
    select: {
      date: true,
      description: true,
      id: true,
      priceWithDrink: true,
      priceWithoutDrink: true,
      additionalObservations: true,
      participants: {
        select: {
          amount: true,
          name: true,
          id: true,
          paid: true
        }
      }
    }
  });

  const result = barbecue ? {
    ...barbecue,
    dateFormatted: format(barbecue?.date || new Date(), 'dd/MM/yyyy'),
    participants: map(barbecue?.participants, (participant) => ({
      name: participant.name,
      participantId: participant.id,
      contribution: toNumber(participant.amount),
      paid: participant.paid
    }))
  } : null;

  return NextResponse.json({
    success: true,
    statusCode: 200,
    errors: [],
    result
  });
}
