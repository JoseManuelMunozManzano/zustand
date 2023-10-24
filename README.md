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

En esta sección aprenderemos a trabajar con objetos anidados dentro de nuestro store, con el objetivo de apreciar claramente el beneficio de utilizar la función produce() o, mejor aún, el middleware immer, para poder mutar el estado y generar uno nuevo basado en esa mutación.
Puntualmente veremos:

- Drag & Drop (sin dependencias)
- Uso de Store con objetos anidados
- Middlewares
- Funciones adicionales
- UUID
- Mutaciones vs Clonaciones
- Tipado en TypeScript
