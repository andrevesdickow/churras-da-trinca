import { create } from 'zustand';
import type { SignInResponse } from '@/types/auth';

type AuthStoreProps = {
  user?: SignInResponse['result'];
  setUser: (user: SignInResponse['result']) => void;
}

export const useAuthStore = create<AuthStoreProps>((set) => ({
  user: undefined,
  setUser: (user: SignInResponse['result']) => set({ user })
}));
