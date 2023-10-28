import { StateCreator } from 'zustand';

export interface ConfirmationSlice {
  isConfirmed: boolean;

  setIsConfirmed: (value: boolean) => void;
}

export const createConfirmationSlice: StateCreator<ConfirmationSlice, [['zustand/devtools', never]]> = (set) => ({
  isConfirmed: false,

  setIsConfirmed: (value: boolean) => set({ isConfirmed: value }, false, 'setIsConfirmed'),
});
