'use client';

import Image from 'next/image';
import map from 'lodash/map';
import { Users as UsersIcon, CircleDollarSign as CircleDollarSignIcon } from 'lucide-react';
import { Card, CardBody, CardHeader, CardSubtitle, CardTitle } from '@/components/Card';
import { Link } from '@/components/Link';
import { Skeleton } from '@/components/Skeleton';
import { getBarbecues } from '@/services/barbecue';
import { formatMoney } from '@/utils/formatMoney';
import { useQuery } from '@tanstack/react-query';

export default function HomePage() {
  const { data, isFetching } = useQuery({
    queryKey: ['trinca-barbecues'],
    queryFn: getBarbecues,
    staleTime: Infinity
  });

  return (
    <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 place-content-center gap-4 flex-col">
      <Link href="/churras/criar" aria-label="Adicionar churras">
        <Card className="bg-slate-200 dark:bg-slate-900 text-slate-800 hover:bg-slate-300 hover:dark:bg-slate-700 transition-colors justify-center">
          <CardBody className="flex-col items-center gap-4">
            <Image src="/icon-churras.svg" alt="Churras" width={70} height={70} />
            <span className="font-bold">Adicionar churras</span>
          </CardBody>
        </Card>
      </Link>
      {isFetching ? (
        <>
          <Skeleton className="w-full h-[160px] px-10" />
          <Skeleton className="w-full h-[160px] px-10" />
          <Skeleton className="w-full h-[160px] px-10" />
          <Skeleton className="w-full h-[160px] px-10" />
          <Skeleton className="w-full h-[160px] px-10" />
        </>
      ) : (
        map(data?.result, (barbecue) => (
          <Link key={barbecue.id} href={`/churras/detalhes/${barbecue.id}`}>
            <Card>
              <CardHeader>
                <CardTitle>{barbecue.dateFormatted}</CardTitle>
                <CardSubtitle>{barbecue.description}</CardSubtitle>
              </CardHeader>
              <CardBody>
                <div className="flex flex-row align-center gap-2">
                  <UsersIcon className="text-amber-400" />
                  <span>{barbecue.totalPeople}</span>
                </div>
                <div className="flex flex-row align-center gap-2">
                  <CircleDollarSignIcon className="text-amber-400" />
                  <span>{formatMoney(barbecue.totalAmount)}</span>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))
      )}
    </div>
  );
}
