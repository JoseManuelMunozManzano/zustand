// Aquí está nuestra instancia de Axios.
//
// La parte localhost:3000/api es constante en todas las peticiones.
// Vamos a instalar axios para trabajar con nuestras peticiones.
// Permite interceptores y es fácil cancelar peticiones.
// npm i axios
import axios from 'axios';

const tesloApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Todo: interceptors
// Leer el storage de Zustand

export { tesloApi };
