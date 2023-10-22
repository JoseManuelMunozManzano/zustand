import { StateStorage, createJSONStorage } from 'zustand/middleware';

const firebaseUrl = 'https://zustand-storage-b957b-default-rtdb.europe-west1.firebasedatabase.app/zustand';

// Este es nuestro objeto custom storage reutilizable para usar con Firebase.
const storageApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    // Primero vamos a hacerlo con fetch y luego con axios
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then((res) => res.json());
      console.log(data);

      // A Zustand le debe de llegar un string, no un objeto.
      // O lo grabamos como un String, o lo grabamos como un objeto y hacemos el stringify.
      //
      // Hemos tomado esta segunda decisión, es decir, en setItem se graba un objeto y aquí
      // lo convertimos en string. Esto es mejor porque en Firebase tendremos un objeto,
      // cosa que es más controlable que tener texto plano.
      return JSON.stringify(data); // o return data si se grabó un string en Firebase
    } catch (error) {
      return null;
      //throw error;
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    const data = await fetch(`${firebaseUrl}/${name}.json`, {
      method: 'PUT',
      body: value, // O body: JSON.stringify(value) para grabar un string en Firebase
    }).then((res) => res.json());

    console.log(data);
  },

  removeItem: function (name: string): void | Promise<void> {
    console.log('removeItem', name);
  },
};

// Nos hemos traido aquí el createJSONStorage para ya exportarlo convertido.
export const firebaseStorage = createJSONStorage(() => storageApi);
