'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { join, map } from 'lodash';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { Link } from '@/components/Link';
import { TextField } from '@/components/TextField';
import { AuthKeys } from '@/enums/AuthKeys';
import { signUpSchema } from '@/schemas/signUpSchema';
import { signUp } from '@/services/auth';
import { useAuthStore } from '@/stores/authStore';
import { useToastStore } from '@/stores/toastStore';
import { SignUpData } from '@/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';

export default function SignUpPage() {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema)
  });

  const handleOpenToast = useToastStore((state) => state.openToast);
  const setUser = useAuthStore((state) => state.setUser);

  const router = useRouter();

  const handleUserSignUp: SubmitHandler<SignUpData> = async (formData) => {
    try {
      const { result, success, errors } = await signUp(formData);

      if (success) {
        setUser(result);

        setCookie(AuthKeys.ACCESS_TOKEN, result.id, {
          httpOnly: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 30 // 1 month
        });

        router.push('/churras');
      } else {
        handleOpenToast({
          message: join(map(errors, (error) => error.message), ', '),
          title: 'Falha no login',
          variant: 'error'
        });
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
    <div className="w-full h-screen overflow-hidden flex justify-center items-center bg-amber-400 bg-barbecue">
      <form
        onSubmit={handleSubmit(handleUserSignUp)}
        className="flex flex-col gap-3 p-8 rounded-3xl z-[1px] min-w-[400px] max-w-[440px] h-max bg-slate-50 dark:bg-slate-800 shadow-xl"
      >
        <h3 className="text-center font-semibold text-primary-900 dark:text-slate-50">Faça seu cadastro para acompanhar os churras da <span className="font-bold uppercase">Trinca</span></h3>

        <div>
          <TextField
            type="text"
            name="name"
            label="Nome completo"
            control={control}
          />
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
            helperText="A senha deve possuir no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial"
            withPasswordStrength
          />
          <TextField
            type="password"
            name="confirmPassword"
            label="Confirmar senha"
            control={control}
          />
          <Checkbox
            name="confirmAndAgree"
            label="Confirmar e aceitar os termos de uso"
            control={control}
          />
        </div>

        <Button
          type="submit"
          isLoading={isSubmitting}
        >
          Cadastrar
        </Button>
        <Link
          href="/"
          className="text-center text-sm"
        >
          Voltar para login
        </Link>
      </form>
    </div>
  );
}
