import { create } from 'zustand';

interface Bear {
  id: number;
  name: string;
}

interface BearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  // Trabajando con objetos anidados
  bears: Bear[];

  increaseBlackBears: (by: number) => void;
  increasePolarBears: (by: number) => void;
  increasePandaBears: (by: number) => void;

  // No va a hacer realmente nada, pero va a ser un cambio en el estado.
  doNothing: () => void;

  // Métodos con objetos anidados
  addBear: () => void;
  clearBears: () => void;
}

// Definición de Store
//
// Código cogido de https://docs.pmnd.rs/zustand/getting-started/introduction
// Como estamos en TypeScript en vez de create((set) => {...}) hacemos create()((set) => {...})
// para invocar (con los primeros parénteresis) el create. Esto regresa una función que invocamos
// (con los segundos paréntesis que contiene el set y lo demás)
export const useBearsStore = create<BearState>()((set) => ({
  blackBears: 10,
  polarBears: 5,
  pandaBears: 1,

  bears: [{ id: 1, name: 'Oso #1' }],

  increaseBlackBears: (by: number) => set((state) => ({ blackBears: state.blackBears + by })),
  increasePolarBears: (by: number) => set((state) => ({ polarBears: state.polarBears + by })),
  increasePandaBears: (by: number) => set((state) => ({ pandaBears: state.pandaBears + by })),

  // Crea un nuevo arreglo en memoria con los mismos valores que hay actualmente.
  // Al final, esto es un nuevo estado, pero que es igual al anterior.
  doNothing: () => set((state) => ({ bears: [...state.bears] })),

  addBear: () =>
    set((state) => ({
      bears: [...state.bears, { id: state.bears.length + 1, name: `Oso #${state.bears.length + 1}` }],
    })),
  clearBears: () => set({ bears: [] }),
}));

// Ventaja de Zustand sobre Redux o cualquier otro gestor de estados basado en React.
// No hay que ir a Root.tsx y envolverlo con un Provider.
// Solo tenemos que definir el store y ya se puede utilizar.
