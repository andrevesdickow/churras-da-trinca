'use client';

import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { forEach, map, sum } from 'lodash';
import { Users as UsersIcon, CircleDollarSign as CircleDollarSignIcon } from 'lucide-react';
import { z } from 'zod';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { Link } from '@/components/Link';
import { TextField } from '@/components/TextField';
import { useBarbecueStore } from '@/stores/barbecueStore';
import { useToastStore } from '@/stores/toastStore';
import { formatMoney } from '@/utils/formatMoney';
import { zodResolver } from '@hookform/resolvers/zod';

const participantsSchema = z.object({
  participantOptions: z.array(
    z.object({
      participantId: z.string(),
      name: z.string(),
      paid: z.boolean(),
      contribution: z.number()
    })
  ),
  name: z.string().min(1, 'Nome é obrigatário'),
  withDrink: z.boolean().optional()
});

type ParticipantsFormData = z.infer<typeof participantsSchema>;

const participantsDefaultValues: ParticipantsFormData = {
  name: '',
  withDrink: false,
  participantOptions: []
};

export default function BarbecueDetailsPage({ params }: { params: { id: string } }) {
  const barbecue = useBarbecueStore((state) => state.getBarbecueById(params.id));
  const insertParticipantInBarbecue = useBarbecueStore((state) => state.insertParticipantInBarbecue);
  const updateParticipantInBarbecue = useBarbecueStore((state) => state.updateParticipantInBarbecue);

  const openToast = useToastStore((state) => state.openToast);

  const {
    control,
    register,
    resetField,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<ParticipantsFormData>({
    resolver: zodResolver(participantsSchema),
    defaultValues: participantsDefaultValues
  });

  const { fields, append, update } = useFieldArray({
    name: 'participantOptions',
    control
  });

  useEffect(() => {
    forEach(barbecue?.participants, (participant) => append(participant));
  }, []);

  const handleAppendNewParticipant = (formData: ParticipantsFormData) => {
    const participantId = crypto.randomUUID();
    const participantContribution = (formData.withDrink ? barbecue?.priceWithDrink : barbecue?.priceWithoutDrink) || 0;

    const newParticipant = {
      participantId,
      paid: false,
      name: formData.name,
      contribution: participantContribution
    };

    append(newParticipant);

    insertParticipantInBarbecue(params.id, newParticipant);

    resetField('name', { defaultValue: participantsDefaultValues.name });
    resetField('withDrink', { defaultValue: participantsDefaultValues.withDrink });

    openToast({
      message: 'Participante adicionado com sucesso',
      title: '😃',
      variant: 'success'
    });
  };

  return (
    <div className="flex flex-col gap-3 p-8 rounded-3xl z-[1px] min-w-[400px] w-full h-max bg-slate-50 dark:bg-slate-800 shadow-xl">
      <div className="flex justify-between">
        <h5 className="text-lg font-semibold">{barbecue?.dateFormatted}</h5>
        <div className="flex flex-row align-center gap-2">
          <UsersIcon className="text-amber-400" />
          <span>{barbecue?.participants?.length ?? 0}</span>
        </div>
      </div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">{barbecue?.description}</h2>
        <div className="flex flex-row align-center gap-2">
          <CircleDollarSignIcon className="text-amber-400" />
          <span>{formatMoney(sum(map(barbecue?.participants, 'contribution')))}</span>
        </div>
      </div>
      {barbecue?.additionalObservations && (
        <p className="text-slate-600 dark:text-slate-300">{barbecue?.additionalObservations}</p>
      )}

      <h3 className="font-bold text-amber-900 dark:text-slate-50 text-center mt-6">Participantes</h3>

      {fields.length > 0
        ? (
          <div className="flex flex-col justify-between mt-4">
            <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-x-8">
              {map(fields, (field, index) => (
                <div key={field.id} className="flex justify-between">
                  <Checkbox
                    {...register(`participantOptions.${index}.paid`)}
                    control={control}
                    label={field.name}
                    onCheckedChange={(checked: boolean) => {
                      const fieldUpdated = {
                        ...field,
                        paid: checked
                      };

                      updateParticipantInBarbecue(params.id, fieldUpdated);

                      update(index, fieldUpdated);
                    }}
                  />
                  {field.paid ? (
                    <del className="text-slate-600 dark:text-slate-300">{formatMoney(field.contribution)}</del>
                  ) : (
                    <span className="text-slate-600 dark:text-slate-300">{formatMoney(field.contribution)}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
        : (
          <p className="text-slate-600 dark:text-slate-300 text-center">Não há participantes para este churras 🫤</p>
        )}

      <form
        onSubmit={handleSubmit(handleAppendNewParticipant)}
        className="flex flex-col justify-between mt-4"
      >
        <div className="flex items-center gap-4">
          <TextField
            name="name"
            label="Nome"
            className="flex-1"
            control={control}
          />

          <Checkbox
            name="withDrink"
            label="Com bebida?"
            control={control}
          />
        </div>

        <Button
          type="submit"
          isLoading={isSubmitting}
        >
          Adicionar participante
        </Button>
      </form>

      <Link
        href="/"
        className="text-center text-sm"
      >
        Voltar
      </Link>
    </div>
  );
}
