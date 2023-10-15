'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { map, sum } from 'lodash';
import { Users as UsersIcon, CircleDollarSign as CircleDollarSignIcon } from 'lucide-react';
import { Card, CardBody, CardHeader, CardSubtitle, CardTitle } from '@/components/Card';
import { Link } from '@/components/Link';
import { useBarbecueStore } from '@/stores/barbecueStore';
import { formatMoney } from '@/utils/formatMoney';

export default function BarbecuePage() {
  const barbecues = useBarbecueStore((state) => state.barbecues);

  useEffect(() => {
    useBarbecueStore.persist.rehydrate();
  }, []);

  return (
    <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 place-content-center gap-4 flex-col">
      <Link href="/churras/criar">
        <Card className="bg-slate-200 dark:bg-slate-900 text-slate-800 hover:bg-slate-300 hover:dark:bg-slate-700 transition-colors justify-center">
          <CardBody className="flex-col items-center gap-4">
            <Image src="/icon-churras.svg" alt="Churras" width={70} height={70} />
            <span className="font-bold">Adicionar churras</span>
          </CardBody>
        </Card>
      </Link>
      {map(barbecues, (barbecue) => (
        <Link key={barbecue.id} href={`/churras/detalhes/${barbecue.id}`}>
          <Card>
            <CardHeader>
              <CardTitle>{barbecue.dateFormatted}</CardTitle>
              <CardSubtitle>{barbecue.description}</CardSubtitle>
            </CardHeader>
            <CardBody>
              <div className="flex flex-row align-center gap-2">
                <UsersIcon className="text-amber-400" />
                <span>{barbecue.participants?.length ?? 0}</span>
              </div>
              <div className="flex flex-row align-center gap-2">
                <CircleDollarSignIcon className="text-amber-400" />
                <span>{formatMoney(sum(map(barbecue?.participants, 'contribution')))}</span>
              </div>
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  );
}
