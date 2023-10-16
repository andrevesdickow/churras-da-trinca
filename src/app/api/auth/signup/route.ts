import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { signUpSchema } from '@/schemas/signUpSchema';

export async function POST(request: NextRequest) {
  try {
    const { email, name, password } = signUpSchema.parse(await request.json());

    const existsEmail = await prisma.users.findUnique({
      where: {
        email
      },
      select: {
        email: true
      }
    });

    if (existsEmail) {
      return Response.json({
        success: false,
        statusCode: 400,
        errors: [{ message: 'E-mail já cadastrado no sistema' }],
        result: null
      });
    }

    const user = await prisma.users.create({
      data: {
        email,
        name,
        password,
        created: new Date(),
        deleted: false
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
        errors: [{ message: 'Ocorreu um erro ao cadastrar usuário' }],
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
      errors: [{ message: err.message || 'Ocorreu um erro ao cadastrar usuário' }],
      result: null
    });
  }
}
