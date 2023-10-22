import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

  // Propiedades computadas dentro de un objeto JavaScript.
  //
  // Solución Consideración 2:
  // En vez de tener así la propiedad computada, lo mejor es mandarlo llamar como
  // a cualquier otro método.
  //
  // computed: {
  //   totalBears: number;
  // };

  totalBears: () => number;

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
//
// Se indica como parámetro la función get, para tener acceso al state dentro de mi función.
//
// Incluimos middleware Persist para ver el problema con el getter (la consideración 2)
export const useBearsStore = create<BearState>()(
  persist(
    // Para ver que nuestro custom middleware devuelve en el return el set, get y store
    // añadimos el store aquí, pero no hace falta y en Producción lo podemos quitar.
    //(set, get, store) => ({
    (set, get) => ({
      blackBears: 10,
      polarBears: 5,
      pandaBears: 1,

      bears: [{ id: 1, name: 'Oso #1' }],

      // Para solucionar la Consideración 2 eliminamos todo esto. Ahora es una
      // función normal.
      //
      // NOTA: No hay nada en la documentación de Zustand sobre propiedades computadas.
      //
      // Para computar el número de osos total vamos a hacer uso de la propiedad get
      // de los objetos de JavaScript. Este get NO es la función get del state! Son distintos.
      // computed: {
      // Consideración 2
      // Este getter no se va a llamar de la manera esperada si envolvemos este store con un
      // middleware (al refrescar y luego pulsar botones no actualiza los valores del store)
      // get totalBears(): number {
      //  return get().blackBears + get().polarBears + get().pandaBears + get().bears.length;
      //},
      //},

      totalBears: () => {
        //console.log(store); // Solo por usarlo en algún sitio. No hace falta.
        return get().blackBears + get().polarBears + get().pandaBears + get().bears.length;
      },

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
    }),
    { name: 'bears-store' }
  )
);

// Ventaja de Zustand sobre Redux o cualquier otro gestor de estados basado en React.
// No hay que ir a Root.tsx y envolverlo con un Provider.
// Solo tenemos que definir el store y ya se puede utilizar.
