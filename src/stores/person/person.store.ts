import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

// Para usar un middleware envolveremos el (set) y nuestra configuración del store con la función
// middleware que queramos usar.
//
// Persist Middleware: La idea es que cuando se pulse refrescar en el navegador no se pierda
// la información. Se indica el nombre de la función persist y hay que añadir un objeto adicional con el
// name, que será el nombre del storage que le quiero dar por defecto en el Local Storage.
export const usePersonStore = create<PersonState & Actions>()(
  persist(
    (set) => ({
      firstName: '',
      lastName: '',

      // Como no estamos usando el state esto prodría quedar:
      // setFirstName: (value: string) => set({ firstName: value }),

      // Pero para explicar más fácilmente una cosa de los middlewares lo vamos a dejar así.
      setFirstName: (value: string) => set((state) => ({ firstName: value })),
      setLastName: (value: string) => set((state) => ({ lastName: value })),
    }),
    { name: 'person-storage' }
  )
);
