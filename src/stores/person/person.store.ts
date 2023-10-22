// Se indica type para que cuando se construya la aplicación no importe nada, ya que
// solo lo vamos a usar como una interface para TypeScript.
import { type StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

//import { logger } from '../middlewares/logger.middleware';

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
const storeApi: StateCreator<PersonState & Actions, [['zustand/devtools', never]]> = (set) => ({
  firstName: '',
  lastName: '',

  // Como no estamos usando el state esto podría quedar:
  // setFirstName: (value: string) => set({ firstName: value }),

  // Pero para explicar más fácilmente una cosa de los middlewares lo vamos a dejar así.
  //
  // Dejamos el state porque en las Redux DevTools aparece anonymous.
  // Zustand no sabe el nombre de la acción que cambia el state, así que tenemos que indicarlo nosotros.
  // Indicamos el replace (segundo argumento), que dice a Zustand que reemplace el estado anterior con
  // el valor false.
  // Ese valor es el por defecto, pero tenemos que indicarlo para poder acceder al tercer argumento, que
  // es el nombre de mi acción.
  // Para que no de un error, se ha añadido al genérico el tipado [['zustand/devtools', never]]
  // Una vez añadido todo esto, ya quitamos el state porque no lo estamos usando.
  setFirstName: (value: string) => set({ firstName: value }, false, 'setFirstName'),
  setLastName: (value: string) => set({ lastName: value }, false, 'setLastName'),
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
//
// Esto es completamente opcional.
// Aplicamos ahora el middleware de Redux DevTools. Se pueden usar porque Zustand trabaja muy
// parecido a como lo hace Redux.
// NOTA: Se pueden apilar 3 o 4 middlewares sin problemas. Más de eso, es mejor sacarlas fuera.
// Una vez añadido este middleware, en el navegador Chrome podemos ir a la pestaña Redux y ver
// nuestro state.
export const usePersonStore = create<PersonState & Actions>()(
  // Usando nuestro custom middleware. La información pasará a los siguientes middlewares
  // y al final llega a nuestro store.
  // Lo quitamos para que no moleste.
  // logger(
  devtools(
    persist(storeApi, {
      name: 'person-storage',
      storage: firebaseStorage,
      //storage: customSessionStorage
    })
  )
  // )
);
