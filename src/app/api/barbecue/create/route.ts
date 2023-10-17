import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { AuthKeys } from '@/enums/AuthKeys';
import prisma from '@/lib/prisma';
import { createBarbecueSchema } from '@/schemas/createBarbecueSchema';

export async function POST(request: NextRequest) {
  try {
    const accessToken = request.cookies.get(AuthKeys.ACCESS_TOKEN);

    if (!accessToken) {
      redirect('/');
    }

    const {
      date,
      description,
      priceWithDrink,
      priceWithoutDrink,
      additionalObservations
    } = createBarbecueSchema.parse(await request.json());

    await prisma.barbecues.create({
      data: {
        date: new Date(`${date}T12:00:00`),
        description,
        priceWithDrink,
        priceWithoutDrink,
        additionalObservations,
        userId: accessToken.value
      }
    });

    return Response.json({
      success: true,
      statusCode: 200,
      errors: [{ message: 'Churras criado com sucesso' }],
      result: null
    });
  } catch (err: any) {
    return Response.json({
      success: false,
      statusCode: 400,
      errors: [{ message: err.message || 'Falha ao criar churras' }],
      result: null
    });
  }
}
