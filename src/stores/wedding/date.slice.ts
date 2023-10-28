import { StateCreator } from 'zustand';

export interface DateSlice {
  // Se pone tipo de dato Date para que se vean los inconvenientes de trabajarlo así.
  // Para empezar, si se persisten los datos, hay que serializarlo para guardarlo en el local storage.
  // Para este caso es más fácil, por tanto, guardarlo aquí como number o string.
  eventDate: Date;

  eventYYYYMMDD: () => string;
  eventHHMM: () => string;
}

export const createDateSlice: StateCreator<DateSlice, [['zustand/devtools', never]]> = (set, get) => ({
  eventDate: new Date(),

  eventYYYYMMDD: () => {
    // Divido por la T porque toIsoString() me devuelve este tipo de fecha:
    // 2023-10-28T13:15:00.254Z
    return get().eventDate.toISOString().split('T')[0];
  },

  eventHHMM: () => {
    // padStart se usa para colocar 00 al inicio, es decir, si tengo el
    // valor 1 coloca 01 y si tengo 12 coloca 12
    const hours = get().eventDate.getHours().toString().padStart(2, '0');
    const minutes = get().eventDate.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  },
});
