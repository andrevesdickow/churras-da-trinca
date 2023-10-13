import find from 'lodash/find';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type BarbecueParticipant = {
  name: string;
  contribution: number;
}

type Barbecue = {
  id: string;
  date: Date;
  description: string;
  additionalObservations?: string;
  participants?: BarbecueParticipant[];
}

type BarbecueStoreProps = {
  barbecues: Barbecue[];
  insertBarbecue: (item: Omit<Barbecue, 'id'>) => void;
  getBarbecueById: (barbecueId: string) => Barbecue | undefined;
}

export const useBarbecueStore = create(
  persist<BarbecueStoreProps>(
    (set, get) => ({
      barbecues: [],
      insertBarbecue: (item: Omit<Barbecue, 'id'>) => {
        const id = crypto.randomUUID();

        set((state) => ({
          barbecues: [...state.barbecues, { ...item, id }]
        }));
      },
      getBarbecueById(barbecueId) {
        return find(get().barbecues, ((barbecue) => barbecue.id === barbecueId));
      }
    }),
    {
      name: 'trinca-barbecues',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
