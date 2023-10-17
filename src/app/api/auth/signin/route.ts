import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { signInSchema } from '@/schemas/signInSchema';
import { encrypt } from '@/utils/cryptography';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = signInSchema.parse(await request.json());

    const encryptedPassword = encrypt(password, process.env.CRYPTOGRAPHY_KEY as string);

    const user = await prisma.users.findFirst({
      where: {
        email,
        password: encryptedPassword
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
        statusCode: 400,
        errors: [{ message: 'E-mail ou senha inválida' }],
        result: user
      });
    }

    return Response.json({
      success: true,
      statusCode: 200,
      errors: [],
      result: user
    });
  } catch (err: any) {
    return Response.json({
      success: false,
      statusCode: 400,
      errors: [{ message: err.message || 'Falha no login' }],
      result: null
    });
  }
}
