'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { forEach, join, map, sum } from 'lodash';
import { Users as UsersIcon, CircleDollarSign as CircleDollarSignIcon } from 'lucide-react';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { Link } from '@/components/Link';
import { Skeleton } from '@/components/Skeleton';
import { TextField } from '@/components/TextField';
import { queryClient } from '@/lib/queryClient';
import { participantsSchema } from '@/schemas/participantsSchema';
import { createParticipantInBarbecue, getBarbecueById, markParticipantAsPaid } from '@/services/barbecue';
import { useToastStore } from '@/stores/toastStore';
import { ParticipantsFormData } from '@/types/barbecue';
import { formatMoney } from '@/utils/formatMoney';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';

const participantsDefaultValues: ParticipantsFormData = {
  name: '',
  withDrink: false,
  participantOptions: []
};

type Participant = ParticipantsFormData['participantOptions'][0];

export default function BarbecueDetailsPage({ params }: { params: { id: string } }) {
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

  const { data, isFetching } = useQuery({
    queryKey: ['trinca-barbecue', params.id],
    queryFn: () => getBarbecueById(params.id),
    onSuccess(data) {
      const { result } = data;
      forEach(result.participants, (participant) => append(participant));
    },
    staleTime: Infinity
  });

  const openToast = useToastStore((state) => state.openToast);

  const barbecue = data?.result;

  const handleAppendNewParticipant = async (formData: ParticipantsFormData) => {
    const { result, success, errors } = await createParticipantInBarbecue({
      barbecueId: params.id,
      name: formData.name,
      withDrink: formData.withDrink
    });

    if (success) {
      const newParticipant = {
        participantId: result.id,
        paid: false,
        name: formData.name,
        contribution: result.amount
      };

      append(newParticipant);

      resetField('name', { defaultValue: participantsDefaultValues.name });
      resetField('withDrink', { defaultValue: participantsDefaultValues.withDrink });

      openToast({
        message: 'Participante adicionado com sucesso',
        title: '😃',
        variant: 'success'
      });
    } else {
      openToast({
        message: join(map(errors, (error) => error.message), ', '),
        title: 'Falha no cadastro',
        variant: 'error'
      });
    }
  };

  const handleChangeParticipantPaidStatus = async (
    participant: Participant,
    index: number,
    paid: boolean
  ) => {
    const { success, errors } = await markParticipantAsPaid({
      participantId: participant.participantId,
      paid
    });

    if (success) {
      const fieldUpdated = {
        ...participant,
        paid
      };

      update(index, fieldUpdated);

      queryClient.invalidateQueries(['trinca-barbecues']);
    } else {
      openToast({
        message: join(map(errors, (error) => error.message), ', '),
        title: 'Falha ao marcar como pago',
        variant: 'error'
      });
    }
  };

  if (isFetching) {
    return <Skeleton className="w-full h-[450px] px-10" />;
  }

  return (
    <div className="flex flex-col gap-3 p-8 rounded-3xl z-[1px] min-w-[400px] w-full h-max bg-slate-50 dark:bg-slate-800 shadow-xl">
      <div className="flex justify-between">
        <h5 className="text-lg font-semibold">{barbecue?.dateFormatted}</h5>
        <div className="flex flex-row align-center gap-2">
          <UsersIcon className="text-amber-400" />
          <span>{fields?.length ?? 0}</span>
        </div>
      </div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">{barbecue?.description}</h2>
        <div className="flex flex-row align-center gap-2">
          <CircleDollarSignIcon className="text-amber-400" />
          <span>{formatMoney(sum(map(fields, 'contribution')))}</span>
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
                    onCheckedChange={(checked: boolean) => handleChangeParticipantPaidStatus(field, index, checked)}
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
        href="/churras"
        className="text-center text-sm"
      >
        Voltar
      </Link>
    </div>
  );
}
