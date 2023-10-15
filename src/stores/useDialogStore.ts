import filter from 'lodash/filter';
import { create } from 'zustand';

type DialogAction = {
  label: string;
  onClick: (parentId: string) => void;
}

type DialogProps = {
  dialogId: string;
  isOpen: boolean;
  title: string;
  content: string | React.ReactNode | React.FC;
  description?: string;
  escape?: boolean;
  withFooter?: boolean;
  action?: DialogAction;
  onClose?: () => void;
}

export type DialogType = Omit<DialogProps, 'isOpen' | 'dialogId'>;

type DialogStoreProps = {
  items: DialogProps[];
  closeDialog: (dialogId: string) => void;
  openDialog: (item: DialogType) => void;
  closeAllDialogs: () => void;
}

export const useDialogStore = create<DialogStoreProps>((set) => ({
  items: [],
  closeDialog: (dialogId) => set((oldState) => ({ items: filter(oldState.items, (item) => item.dialogId !== dialogId) })),
  closeAllDialogs: () => set(() => ({ items: [] })),
  openDialog(item) {
    const dialog = {
      dialogId: crypto.randomUUID(),
      isOpen: true,
      ...item
    } as DialogProps;

    set((oldState) => ({ items: [...oldState.items, dialog] }));
  }
}));
