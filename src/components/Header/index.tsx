'use client';

import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import { LogOut as LogOutIcon } from 'lucide-react';
import { AuthKeys } from '@/enums/AuthKeys';
import { Button } from '../Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../Tooltip';

export const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie(AuthKeys.ACCESS_TOKEN);
    router.replace('/');
  };

  return (
    <header className="w-full h-[250px] fixed bg-gradient-to-b from-amber-400 via-70% via-amber-100 to-white dark:via-black/5 dark:to-black-900">
      <div className="bg-barbecue w-full h-full absolute" />
      <div className="absolute top-1 right-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              onClick={handleLogout}
              variant="default"
              size="icon"
              aria-label="Sair"
            >
              <LogOutIcon className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            Sair
          </TooltipContent>
        </Tooltip>
      </div>
      <h1 className="relative font-semibold text-center text-4xl mt-10 px-5 text-white dark:text-black">
        Churras da <span className="font-bold uppercase">Trinca</span>
      </h1>
    </header>
  );
};
