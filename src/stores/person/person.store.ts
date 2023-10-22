import { create } from 'zustand';

// El state puede separse en piezas del state (propiedades y objetos) y métodos.
// Lo hacemos aquí, pero esto tiene mucho más sentido con los Zustand Slices
// que se verán más adelante.
interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

export const usePersonStore = create<PersonState & Actions>()((set) => ({
  firstName: '',
  lastName: '',

  // Como no estamos usando el state esto prodría quedar:
  // setFirstName: (value: string) => set({ firstName: value }),

  // Pero para explicar más fácilmente una cosa de los middlewares lo vamos a dejar así.
  setFirstName: (value: string) => set((state) => ({ firstName: value })),
  setLastName: (value: string) => set((state) => ({ lastName: value })),
}));
