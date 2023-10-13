'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import { join, map } from 'lodash';
import { LogOut as LogOutIcon, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/Button';
import { Link } from '@/components/Link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { AuthKeys } from '@/contants/AuthKeys';
import { logout } from '@/services/auth';
import { useAuthStore } from '@/stores/authStore';
import { useToastStore } from '@/stores/toastStore';

export const Header = () => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const handleOpenToast = useToastStore((state) => state.openToast);

  async function handleLogout() {
    const { success, errors } = await logout();

    if (success) {
      deleteCookie(AuthKeys.ACCESS_TOKEN);
      deleteCookie(AuthKeys.REFRESH_TOKEN);
      router.replace('/sign/in');
    } else {
      handleOpenToast({
        message: join(map(errors, (error) => error.message), ', '),
        title: 'Falha no logout',
        variant: 'error'
      });
    }
  }

  return (
    <header className="flex items-center bg-amber-900 border-b-[1px] border-amber-700 w-full h-20">
      <div className="w-[255px] min-w-[255px] h-full flex items-center justify-center">
        <Link href="/panel" className="hover:drop-shadow-logo transition-all">
          <img src="/logo.png" loading="lazy" alt="We Ludic" />
        </Link>
      </div>
      <div className="w-full h-full flex items-center justify-between px-7">
        <div className="inline-flex items-center gap-10">
          <Link href="/panel/favorites" className="font-bold text-slate-50">Favoritos</Link>
          <Link href="/panel/category" className="font-bold text-slate-50">Categoria</Link>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 pl-2 hover:bg-amber-500 rounded-3xl transition-colors">
              {user ? <span className="font-bold text-slate-50">{user?.name}</span> : <Skeleton className="w-[120px] h-4" />}
              <Image src="/icons/avatar.png" width={50} height={50} loading="lazy" alt="Avatar" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-center">Minha conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/panel/profile" className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4" /> Editar perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  variant="link"
                  onClick={handleLogout}
                  className="capitalize w-full h-5 justify-start pl-0"
                >
                  <LogOutIcon className="w-4 h-4" /> Sair
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
