import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { AuthStatus, User } from '../../interfaces';
import { AuthService } from '../../services/auth.service';

// Como luce el state del store.
// Como en un determinado punto en el tiempo no tendré el token ni el usuario, ambos son opcionales.
export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  // No recibimos el parámetro Rememberme porque no lo vamos a usar.
  loginUser: (email: string, password: string) => Promise<void>;
}

// Se indica el paréntesis antes que la llave porque es un return implícito de un objeto.
const storeApi: StateCreator<AuthState> = (set) => ({
  status: 'unauthorized',

  // Como son optativas, no haría falta definirlas, pero indicando undefined es más
  // fácil de leer.
  token: undefined,
  user: undefined,

  // Aquí conectamos el servicio
  loginUser: async (email: string, password: string) => {
    try {
      const { token, ...user } = await AuthService.login(email, password);
      set({ status: 'authorized', token, user });
    } catch (error) {
      set({ status: 'unauthorized', token: undefined, user: undefined }); // Igual a un logout
    }
  },
});

export const useAuthStore = create<AuthState>()(devtools(persist(storeApi, { name: 'auth-storage' })));
