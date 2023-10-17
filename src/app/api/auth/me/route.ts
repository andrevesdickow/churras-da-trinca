import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';
import { AuthKeys } from '@/enums/AuthKeys';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(AuthKeys.ACCESS_TOKEN);

  if (!accessToken) {
    redirect('/');
  }

  const user = await prisma.users.findUnique({
    where: {
      id: accessToken.value
    },
    select: {
      id: true,
      email: true,
      name: true
    }
  });

  if (!user) {
    return Response.json({
      success: false,
      statusCode: 404,
      errors: [{ message: 'E-mail ou senha inválida' }],
      result: user
    }, { status: 404 });
  }

  return Response.json({
    success: true,
    statusCode: 200,
    errors: [],
    result: user
  });
}
