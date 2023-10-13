'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
// import { useRouter } from 'next/navigation';
import { format as formatDate } from 'date-fns';
import { z } from 'zod';
import { Button } from '@/components/Button';
import { Link } from '@/components/Link';
import { TextField } from '@/components/TextField';
// import { useBarbecueStore } from '@/stores/barbecueStore';
import { zodResolver } from '@hookform/resolvers/zod';

const date = new Date();
date.setDate(date.getDate() - 1);

const createBarbecueSchema = z.object({
  date: z.coerce.date()
    .min(date, 'A data mínima é o dia de hoje'),
  description: z.string()
    .min(1, 'Descrição é obrigatório'),
  additionalObservations: z.string().optional()
});

type CreateBarbecueData = z.infer<typeof createBarbecueSchema>;

export default function BarbecueCreatePage() {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<CreateBarbecueData>({
    resolver: zodResolver(createBarbecueSchema)
  });

  // const insertBarbecue = useBarbecueStore((state) => state.insertBarbecue);
  // const router = useRouter();

  const onSubmit: SubmitHandler<CreateBarbecueData> = async (formData) => {
    // insertBarbecue(formData);
    // router.replace('/churras');
    console.warn(formData);
  };

  return (
    <main className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 place-content-center gap-4 min-h-screen flex-col p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 p-8 rounded-3xl z-[1px] min-w-[400px] max-w-[440px] h-max bg-slate-50/90 dark:bg-slate-800/90"
      >
        <h3 className="text-center font-bold text-amber-900 dark:text-slate-50">Churras da TRINCA</h3>

        <div>
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
        </div>

        <Button
          type="submit"
          isLoading={isSubmitting}
        >
          Criar
        </Button>
        <Link
          href="/churras"
          className="text-center text-sm"
        >
          Voltar
        </Link>
      </form>
    </main>
  );
}
