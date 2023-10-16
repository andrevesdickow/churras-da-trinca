'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { format as formatDate } from 'date-fns';
import { join, map } from 'lodash';
import { Button } from '@/components/Button';
import { CurrencyInput } from '@/components/CurrencyInput';
import { Link } from '@/components/Link';
import { TextArea } from '@/components/TextArea';
import { TextField } from '@/components/TextField';
import { queryClient } from '@/lib/queryClient';
import { createBarbecueSchema } from '@/schemas/createBarbecueSchema';
import { createBarbecue } from '@/services/barbecue';
import { useToastStore } from '@/stores/toastStore';
import { CreateBarbecueData } from '@/types/barbecue';
import { zodResolver } from '@hookform/resolvers/zod';

const date = new Date();
date.setDate(date.getDate() - 1);

const defaultValues: CreateBarbecueData = {
  date: formatDate(new Date(), 'yyyy-MM-dd'),
  additionalObservations: '',
  description: '',
  priceWithDrink: 0,
  priceWithoutDrink: 0
};

export default function BarbecueCreatePage() {
  const openToast = useToastStore((state) => state.openToast);

  const { control, handleSubmit, formState: { isSubmitting } } = useForm<CreateBarbecueData>({
    resolver: zodResolver(createBarbecueSchema),
    defaultValues
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<CreateBarbecueData> = async (formData) => {
    const { success, errors } = await createBarbecue(formData);

    if (success) {
      openToast({
        message: 'Churras adicionado com sucesso',
        title: '😃',
        variant: 'success'
      });

      queryClient.invalidateQueries(['trinca-barbecues']);

      router.replace('/churras');
    } else {
      openToast({
        message: join(map(errors, (error) => error.message), ', '),
        title: 'Falha no cadastro',
        variant: 'error'
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 p-8 rounded-3xl z-[1px] min-w-[400px] w-full h-max bg-slate-50 dark:bg-slate-800 shadow-xl"
    >
      <h3 className="text-center font-bold text-amber-900 dark:text-slate-50">Churras da TRINCA</h3>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <TextField
          type="date"
          name="date"
          label="Data"
          min={formatDate(new Date(), 'yyyy-MM-dd')}
          control={control}
        />
        <TextField
          type="text"
          name="description"
          label="Descrição"
          control={control}
        />
        <CurrencyInput
          name="priceWithoutDrink"
          label="Valor de contribuição (sem bebida)"
          control={control}
        />
        <CurrencyInput
          name="priceWithDrink"
          label="Valor de contribuição (com bebida)"
          control={control}
        />
      </div>

      <TextArea
        name="additionalObservations"
        label="Observações adicionais"
        rows={4}
        control={control}
      />

      <Button
        type="submit"
        isLoading={isSubmitting}
      >
        Criar churras
      </Button>
      <Link
        href="/churras"
        className="text-center text-sm"
      >
        Voltar
      </Link>
    </form>
  );
}
