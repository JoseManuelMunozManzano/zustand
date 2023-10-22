import { StateStorage, createJSONStorage } from 'zustand/middleware';

// Este es nuestro objeto custom storage reutilizable.
const storageApi: StateStorage = {
  // El name es el nombre del storage
  getItem: function (name: string): string | Promise<string | null> | null {
    const data = sessionStorage.getItem(name);
    return data; // Si no hay valor regresa null (que es permitido en nuestra firma de posibles return)
  },
  setItem: function (name: string, value: string): void | Promise<void> {
    sessionStorage.setItem(name, value);
  },
  removeItem: function (name: string): void | Promise<void> {
    console.log('removeItem', name);
  },
};

// Nos hemos traido aquí el createJSONStorage para ya exportarlo convertido.
export const customSessionStorage = createJSONStorage(() => storageApi);
