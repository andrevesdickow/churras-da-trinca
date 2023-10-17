import { redirect } from 'next/navigation';
import { NextResponse, type NextRequest } from 'next/server';
import { format } from 'date-fns';
import { map, sum, toNumber } from 'lodash';
import { AuthKeys } from '@/enums/AuthKeys';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(AuthKeys.ACCESS_TOKEN);

  if (!accessToken) {
    redirect('/');
  }

  const barbecues = await prisma.barbecues.findMany({
    where: {
      date: {
        gte: new Date()
      }
    },
    select: {
      date: true,
      description: true,
      id: true,
      participants: {
        select: {
          amount: true,
          name: true,
          id: true
        }
      }
    },
    orderBy: {
      date: 'asc'
    }
  });

  const result = map(barbecues, (barbecue) => ({
    date: barbecue.date,
    dateFormatted: format(barbecue.date, 'dd/MM'),
    description: barbecue.description,
    id: barbecue.id,
    totalPeople: barbecue.participants?.length || 0,
    totalAmount: sum(map(barbecue?.participants, (participant) => toNumber(participant.amount))) || 0
  }));

  return NextResponse.json({
    success: true,
    statusCode: 200,
    errors: [],
    result
  });
}
