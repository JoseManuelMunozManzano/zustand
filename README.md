# React + TypeScript + Vite + Zustand + TailwindCSS + ReactRouterDom

Este es un cascarón de proyecto, siéntete libre de usarlo para tus proyectos.

<img src="https://github.com/Klerith/zustand-mini-curso/blob/main/public/screenshot.png?raw=true" alt="Dashboard Screenshot">

## Instalar

1. Clonar proyecto
2. Instalar dependencias `npm install`
3. Correr en desarrollo `npm run dev`

NOTA: En el navegador, en la pestaña de React Developer Tools, seleccionar el engranage y hacer check en Highlight updates when components render.

### Secciones

#### Bases de Zustand

`https://docs.pmnd.rs/zustand/getting-started/introduction`

- Instalaciones

  `npm install zustand`

- Configuraciones
- Propiedades computadas
- Objetos anidados
- Actualizaciones de estado
- Configuraciones con TypeScript
- useShallow

#### Middlewares de Zustand

`https://docs.pmnd.rs/zustand/guides/typescript#using-middlewares`

En esta sección vamos a trabajar con middlewares o funciones adicionales que expanden el comportamiento por defecto de Zustand. Puntualmente veremos:

- Persist Middlewares
- createJSONStore
- Guardar automáticamente en session storage
- Guardar automáticamente en Firebase
  - `https://firebase.google.com/`
- Crear un storage personalizado
- Diferentes interfaces de Zustand
- Custom Middleware
  - `https://docs.pmnd.rs/zustand/guides/typescript#common-recipes`
- Redux DevTools y acciones

#### Tareas - Drag & Drop - Inmutabilidad con Immer

`https://www.npmjs.com/package/classnames`

`https://docs.pmnd.rs/zustand/guides/updating-state#with-immer`

En esta sección aprenderemos a trabajar con objetos anidados dentro de nuestro store, con el objetivo de apreciar claramente el beneficio de utilizar la función produce() o, mejor aún, el middleware immer, para poder mutar el estado y generar uno nuevo basado en esa mutación.
Puntualmente veremos:

- Drag & Drop (sin dependencias)
- Uso de Store con objetos anidados
- Middlewares
- Funciones adicionales
- UUID
- Mutaciones vs Clonaciones
- Tipado en TypeScript

#### Zustand Slices

`https://docs.pmnd.rs/zustand/guides/slices-pattern`

`https://docs.pmnd.rs/zustand/guides/typescript#slices-pattern`

Esta sección tiene por objetivo que aprendamos el patrón "Slices" de Zustand para poder cortar un Store en pequeñas partes fácilmente mantenibles.

El ejercicio consiste en crear pequeños tajadas (slices) para que realicen una tarea en especifico y así poder separar las responsabilidades.

Luego uniremos los slices en un único boundStore que permite aplicar los middlewares.

#### Peticiones HTTP - Zustand fuera de React

El objetivo principal de la sección es poder utilizar Zustand para manejar el estado de nuestra autenticación basada en JWTs.

También aprenderemos a utilizar Zustand fuera del contexto de React, que a mi parecer es uno de los puntos fuertes que tiene sobre otros gestores de estado para React.

- El backend lo cargamos con Docker. Ya tiene rutas preestablecidas y trabaja con JWT: `https://hub.docker.com/r/klerith/teslo-shop-cors`

  De ese repositorio cogemos el fichero .env y docker-compose.yml

  Hay dos usuarios como SEED:

  ```
  {
    "email": "test1@google.com",
    "password": "Abc123"
  }

  {
    "email": "test2@google.com",
    "password": "Abc123"
  }
  ```

  Pero se puede cargar la BD con más datos con este API Endpoint usando Postman: `http://localhost:3000/api/seed`

  Y en el navegador, podemos acceder a la documentación de los endpoints: `http://localhost:3000/api`

  Para echar a andar el backend en Docker, ir a la carpeta de nuestro proyecto zustand-dashboard, y ejecutar: `docker compose up -d`
