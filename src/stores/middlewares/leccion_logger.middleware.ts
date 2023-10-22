// Vamos a crear un middleware personalizado.
// https://docs.pmnd.rs/zustand/guides/typescript#common-recipes
//
// Esto es una lección sencilla.
// Ver el fuente logger.middleware.ts para algo mejor.

// Esta es la estructura mínima de un middleware.
// Con esto podemos codificar y grabar en Firebase según nuestras necesidades, pasando de
// la implementación persist, por ejemplo.
const leccionLoggerImpl: any = (f: any, name: any) => (set: any, get: any, store: any) => {
  // type T = ReturnType<typeof f>;

  const loggedSet: typeof set = (...a: any[]) => {
    set(...a);
    console.log(get());
    // console.log(...(name ? [`${name}:`] : []), get());
  };
  store.setState = loggedSet;

  // Devolvemos el set, get y store, tal y como hemos visto al hacer el create en nuestros stores.
  return f(loggedSet, get, store);
};

// Para poder usar nuestro custom middleware tenemos que exportarlo así.
export const leccionLogger = leccionLoggerImpl as unknown as any;
