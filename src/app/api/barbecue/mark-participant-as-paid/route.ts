import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { AuthKeys } from '@/enums/AuthKeys';
import prisma from '@/lib/prisma';
import { markParticipantAsPaidSchema } from '@/schemas/participantsSchema';

export async function PUT(request: NextRequest) {
  try {
    const accessToken = request.cookies.get(AuthKeys.ACCESS_TOKEN);

    if (!accessToken) {
      redirect('/');
    }

    const { participantId, paid } = markParticipantAsPaidSchema.parse(await request.json());

    await prisma.barbecueParticipants.update({
      where: {
        id: participantId
      },
      data: {
        paid
      }
    });

    return Response.json({
      success: true,
      statusCode: 200,
      errors: [{ message: 'Participante marcado como pago' }],
      result: null
    });
  } catch (err: any) {
    return Response.json({
      success: false,
      statusCode: 400,
      errors: [{ message: err.message || 'Falha ao marcar como pago' }],
      result: null
    });
  }
}
