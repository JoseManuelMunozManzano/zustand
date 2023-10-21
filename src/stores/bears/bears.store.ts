import { create } from 'zustand';

interface BearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  increaseBlackBears: (by: number) => void;
}

// Definición de Store
//
// Código cogido de https://docs.pmnd.rs/zustand/getting-started/introduction
// Como estamos en TypeScript en vez de create((set) => {...}) hacemos create()((set) => {...})
// para invocar (con los primeros parénteresis) el create. Esto regresa una función que invocamos
// (con los segundos paréntesis que contiene el set y lo demás)
export const userBearsStore = create<BearState>()((set) => ({
  blackBears: 10,
  polarBears: 5,
  pandaBears: 1,

  increaseBlackBears: (by: number) => set((state) => ({ blackBears: state.blackBears + by })),
}));

// Ventaja de Zustand sobre Redux o cualquier otro gestor de estados basado en React.
// No hay que ir a Root.tsx y envolverlo con un Provider.
// Solo tenemos que definir el store y ya se puede utilizar.
