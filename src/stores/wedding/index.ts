import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { type PersonSlice, createPersonSlice } from './person.slice';
import { type GuestSlice, createGuestSlice } from './guest.slice';
import { type DateSlice, createDateSlice } from './date.slice';

type ShareState = PersonSlice & GuestSlice & DateSlice;

// El store es la combinación de todos los slices
export const useWeddingBoundStore = create<ShareState>()(
  devtools(
    // Une set, get y storeApi (...a) en un solo arreglo usando el operador rest
    // para poderlo esparcir fácilmente usando el operador spread
    (...a) => ({
      ...createPersonSlice(...a),
      ...createGuestSlice(...a),
      ...createDateSlice(...a),
    })
  )
);
