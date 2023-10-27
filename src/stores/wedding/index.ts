import { create } from 'zustand';
import { type PersonSlice, createPersonSlice } from './person.slice';
import { devtools } from 'zustand/middleware';

type ShareState = PersonSlice;

// El store es la combinación de todos los slices
export const useWeddingBoundStore = create<ShareState>()(
  devtools(
    // Une set, get y storeApi (...a) en un solo arreglo usando el operador rest
    // para poderlo esparcir fácilmente usando el operador spread
    (...a) => ({
      ...createPersonSlice(...a),
    })
  )
);