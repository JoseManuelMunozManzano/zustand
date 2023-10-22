// Se indica type para que cuando se construya la aplicación no importe nada, ya que
// solo lo vamos a usar como una interface para TypeScript.
import { type StateCreator, create } from 'zustand';
import { persist } from 'zustand/middleware';

//import { customSessionStorage } from '../storages/session-storage.storage';
import { firebaseStorage } from '../storages/firebase.storage';

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

// Hemos sacado el state del interior de los middlewares para que sea más legible y mantenible.
const storeApi: StateCreator<PersonState & Actions> = (set) => ({
  firstName: '',
  lastName: '',

  // Como no estamos usando el state esto podría quedar:
  // setFirstName: (value: string) => set({ firstName: value }),

  // Pero para explicar más fácilmente una cosa de los middlewares lo vamos a dejar así.
  setFirstName: (value: string) => set((state) => ({ firstName: value })),
  setLastName: (value: string) => set((state) => ({ lastName: value })),
});

// Esta parte queda ahora solo para puros middlewares.
// Para usar un middleware envolveremos el (set) y nuestra configuración del store con la función
// middleware que queramos usar.
//
// Persist Middleware: La idea es que cuando se pulse refrescar en el navegador no se pierda
// la información. Se indica el nombre de la función persist y hay que añadir un objeto adicional con el
// name, que será el nombre del storage que le quiero dar por defecto en el Local Storage.
//
// Usando nuestro Persist Middleware vamos crear un custom Storage para guardar nuestra información
// en el Session Storage en vez del Local Storage.
// Para ello asignaremos en la propiedad storage el objeto customSessionStorage.
export const usePersonStore = create<PersonState & Actions>()(
  persist(storeApi, {
    name: 'person-storage',
    storage: firebaseStorage,
    //storage: customSessionStorage
  })
);
