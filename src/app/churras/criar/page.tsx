'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { format as formatDate, isValid } from 'date-fns';
import { isEmpty } from 'lodash';
import { z } from 'zod';
import { Button } from '@/components/Button';
import { CurrencyInput } from '@/components/CurrencyInput';
import { Link } from '@/components/Link';
import { TextArea } from '@/components/TextArea';
import { TextField } from '@/components/TextField';
import { fakeRequest } from '@/lib/utils';
import { useBarbecueStore } from '@/stores/barbecueStore';
import { zodResolver } from '@hookform/resolvers/zod';

const date = new Date();
date.setDate(date.getDate() - 1);

const createBarbecueSchema = z.object({
  date: z.string()
    .superRefine((val, ctx) => {
      if (isEmpty(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Data é obrigatório.'
        });
      }

      if (!isValid(new Date(val))) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_date,
          message: 'Data inválida'
        });
      }
    }),
  description: z.string()
    .min(1, 'Descrição é obrigatório'),
  additionalObservations: z.string().optional(),
  priceWithDrink: z.number(),
  priceWithoutDrink: z.number()
});

type CreateBarbecueData = z.infer<typeof createBarbecueSchema>;

const defaultValues = {
  date: formatDate(new Date(), 'yyyy-MM-dd'),
  additionalObservations: '',
  description: '',
  priceWithDrink: 0,
  priceWithoutDrink: 0
};

export default function BarbecueCreatePage() {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<CreateBarbecueData>({
    resolver: zodResolver(createBarbecueSchema),
    defaultValues
  });

  const insertBarbecue = useBarbecueStore((state) => state.insertBarbecue);
  const router = useRouter();

  const onSubmit: SubmitHandler<CreateBarbecueData> = async (formData) => {
    await fakeRequest(1500, formData);
    insertBarbecue({
      ...formData,
      dateFormatted: formatDate(new Date(`${formData.date}T12:00:00`), 'dd/MM')
    });
    router.replace('/');
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
        href="/"
        className="text-center text-sm"
      >
        Voltar
      </Link>
    </form>
  );
}
