// Aquí está nuestra instancia de Axios.
//
// La parte localhost:3000/api es constante en todas las peticiones.
// Vamos a instalar axios para trabajar con nuestras peticiones.
// Permite interceptores y es fácil cancelar peticiones.
// npm i axios
import axios from 'axios';
import { useAuthStore } from '../stores';

const tesloApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Interceptors de Axios
// Leer el storage de Zustand
//
// Podemos usar Zustand fuera del contexto de React, usándolo como si fuera
// Vanilla JavaScript.
//
// Indicar que el token lo tengo en el store de Zustand y en el localStorage.
// Se puede obtener de ambos sitios, pero como se ha dicho, vamos a usar Zustand,
// es decir, nuestro store, fuera de React.
tesloApi.interceptors.request.use((config) => {
  // Usamos el método .getState() porque no podemos usar hooks (no estamos en React)
  // Esto no valdría: const token = useAuthStore(state => state.token)
  const token = useAuthStore.getState().token;
  // console.log({ token });

  // Si tenemos token modificamos el header de nuestra petición
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

export { tesloApi };
