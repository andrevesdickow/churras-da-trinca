import { find, map } from 'lodash';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type BarbecueParticipant = {
  participantId: string;
  name: string;
  contribution: number;
  paid: boolean;
}

type Barbecue = {
  id: string;
  date: string;
  dateFormatted: string;
  description: string;
  additionalObservations?: string;
  priceWithDrink: number;
  priceWithoutDrink: number;
  participants?: BarbecueParticipant[];
}

type BarbecueStoreProps = {
  barbecues: Barbecue[];
  getBarbecueById: (barbecueId: string) => Barbecue | undefined;
  insertBarbecue: (item: Omit<Barbecue, 'id'>) => void;
  insertParticipantInBarbecue: (barbecueId: string, participant: BarbecueParticipant) => void;
  updateParticipantInBarbecue: (barbecueId: string, participant: BarbecueParticipant) => void;
}

export const useBarbecueStore = create(
  persist<BarbecueStoreProps>(
    (set, get) => ({
      barbecues: [],
      getBarbecueById(barbecueId) {
        return find(get().barbecues, ((barbecue) => barbecue.id === barbecueId));
      },
      insertBarbecue: (item: Omit<Barbecue, 'id'>) => {
        const id = crypto.randomUUID();

        set((state) => ({
          barbecues: [...state.barbecues, { ...item, id }]
        }));
      },
      insertParticipantInBarbecue(barbecueId, participant) {
        const existsBarbecue = get().getBarbecueById(barbecueId);

        if (existsBarbecue) {
          set((state) => ({
            barbecues: map(state.barbecues, (barbecue) => {
              if (barbecue.id === barbecueId) {
                return {
                  ...barbecue,
                  participants: [...(barbecue.participants || []), participant]
                };
              }
              return barbecue;
            })
          }));
        }
      },
      updateParticipantInBarbecue(barbecueId, participant) {
        const existsBarbecue = get().getBarbecueById(barbecueId);

        if (existsBarbecue) {
          set((state) => ({
            barbecues: map(state.barbecues, (barbecue) => {
              if (barbecue.id === barbecueId) {
                return {
                  ...barbecue,
                  participants: map(barbecue.participants, (barbecueParticipant) => {
                    if (barbecueParticipant.participantId === participant.participantId) {
                      return participant;
                    }
                    return barbecueParticipant;
                  })
                };
              }
              return barbecue;
            })
          }));
        }
      }
    }),
    {
      name: 'trinca-barbecues',
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true
    }
  )
);
