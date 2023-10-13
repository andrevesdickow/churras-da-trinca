'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Button } from '@/components/Button';
import { Link } from '@/components/Link';
import { TextField } from '@/components/TextField';
// import { useAuthStore } from '@/stores/authStore';
import { useToastStore } from '@/stores/toastStore';
import { zodResolver } from '@hookform/resolvers/zod';

const signInSchema = z.object({
  email: z.string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido'),
  password: z.string()
    .min(8, 'A senha deve possuir pelo menos 8 caracteres')
});

type SignInData = z.infer<typeof signInSchema>;

export default function HomePage() {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<SignInData>({
    resolver: zodResolver(signInSchema)
  });

  const handleOpenToast = useToastStore((state) => state.openToast);
  // const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const onSubmit: SubmitHandler<SignInData> = async (formData) => {
    try {
      const success = true;
      // const { result, success, errors } = await signIn(formData);

      if (success) {
        // setUser(result.user);

        // setCookie(AuthKeys.ACCESS_TOKEN, result.accessKeys.accessToken, {
        //   httpOnly: process.env.NODE_ENV === 'production',
        //   maxAge: 60 * 60 * 24 * 30 // 1 month
        // });

        // setCookie(AuthKeys.REFRESH_TOKEN, result.accessKeys.refreshToken, {
        //   httpOnly: process.env.NODE_ENV === 'production',
        //   maxAge: 60 * 60 * 24 * 30 // 1 month
        // });

        router.push('/panel');
      } else {
        // handleOpenToast({
        //   message: join(map(errors, (error) => error.message), ', '),
        //   title: 'Falha no login',
        //   variant: 'error'
        // });
      }
    } catch (err) {
      const error = err as Error;
      const message = error.message;

      handleOpenToast({
        message,
        title: 'Falha no login',
        variant: 'error'
      });
    }
  };

  return (
    <main className="grid place-content-center min-h-screen flex-col p-24">
      <div className="w-full h-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 p-8 rounded-3xl z-[1px] min-w-[400px] max-w-[440px] h-max bg-slate-50/90 dark:bg-slate-800/90"
        >
          <h3 className="text-center font-bold text-amber-900 dark:text-slate-50">Churras da TRINCA</h3>

          <div>
            <TextField
              type="email"
              name="email"
              label="E-mail"
              control={control}
            />
            <TextField
              type="password"
              name="password"
              label="Senha"
              control={control}
            />
          </div>

          <Button
            type="submit"
            isLoading={isSubmitting}
          >
            Entrar
          </Button>
          <Link
            href="/signup"
            className="text-center text-sm"
          >
            Inscreva-se
          </Link>
        </form>
      </div>
    </main>
  );
}
