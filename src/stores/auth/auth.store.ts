import { StateCreator } from 'zustand';
import type { AuthStatus, User } from '../../interfaces';

// Como luce el state del store.
// Como en un determinado punto en el tiempo no tendré el token ni el usuario, ambos son opcionales.
export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
}

// Se indica el paréntesis antes que la llave porque es un return implícito de un objeto.
export const storeApi: StateCreator<AuthState> = (set) => ({
  status: 'unauthorized',

  // Como son optativas, no haría falta definirlas, pero indicando undefined es más
  // fácil de leer.
  token: undefined,
  user: undefined,
});
