import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Instalado uuid (npm i uuid) y sus tipos (npm i --save-dev @types/uuid)
import { v4 as uuidv4 } from 'uuid';

// De nuevo, indicamos type para que no importe ningún archivo físico
import type { Task, TaskStatus } from '../../interfaces';

// Para usar la función produce de immer, hay que instalarla.
// npm i immer
// produce proporciona una forma de mutar el estado generando uno nuevo, no
// haciendo falta el operador spread (donde se use spread podremos usar product)
// Es más lioso que el middleware de immer, para el que incluso no hace
// falta instalar nada.
//
// import { produce } from 'immer';

import { immer } from 'zustand/middleware/immer';

// Vamos a juntar propiedades y métodos
interface TaskState {
  draggingTaskId?: string;
  tasks: Record<string, Task>; // Igual a {[key: string]: Task},

  getTaskByStatus: (status: TaskStatus) => Task[];
  addTask: (title: string, status: TaskStatus) => void;

  // Cuando estudiemos slices veremos como separar las tareas del drag & drop
  setDraggingTaskId: (taskId: string) => void;
  removeDraggingTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;

  // Este método sirve para que no queden los puntos azules una vez se haya hecho el drop.
  // Ahora mismo no funciona el drop y quedan dichos puntos en el diseño.
  onTaskDrop: (status: TaskStatus) => void;
}

const storeApi: StateCreator<
  TaskState,
  [['zustand/devtools', never], ['zustand/persist', unknown], ['zustand/immer', never]],
  []
> = (set, get) => ({
  draggingTaskId: undefined,

  tasks: {
    'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'open' },
    'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'in-progress' },
    'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'open' },
    'ABC-4': { id: 'ABC-4', title: 'Task 4', status: 'open' },
  },

  getTaskByStatus: (status: TaskStatus) => {
    const tasks = get().tasks;
    return Object.values(tasks).filter((task) => task.status === status);
  },

  addTask: (title: string, status: TaskStatus) => {
    const newTask = { id: uuidv4(), title, status };

    //? Con el middleware de Immer
    // Es lo mejor cuando el objeto tiene mucho anidamiento interno.
    // Ocurre un error de tipado porque el store lo tenemos por fuera de immer.
    // Para corregirlo
    set(
      (state) => {
        state.tasks[newTask.id] = newTask;
      },
      false,
      'addTask'
    );

    //? Con operador spread. Forma nativa de Zustand
    // set((state) => ({
    //   tasks: {
    //     // De nuevo tenemos el problema de que se nos puede pasar esto y perderíamos todas las tareas.
    //     ...state.tasks,
    //     // Llaves cuadradas porque queremos poner la propiedad computada
    //     [newTask.id]: newTask,
    //   },
    // }));

    //? Con produce se muta el state generando uno nuevo. Requiere instalar un paquete
    // set(
    //   produce((state: TaskState) => {
    //     state.tasks[newTask.id] = newTask;
    //   })
    // );
  },

  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId }, false, 'setDragging');
  },

  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined }, false, 'removeDragging');
  },

  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    // Aquí se podría añadir la confirmación de que la tarea existe
    // Con la solución immer, esto ni se usa
    //
    // SOLUCION 1
    // Y esto es un objeto inmutable, lo que da problemas.
    // const task = get().tasks[taskId];
    // task.status = status;

    // SOLUCION 2
    const task = { ...get().tasks[taskId] };
    task.status = status;

    //? Con el middleware de Immer
    set(
      (state) => {
        // Esto da error porque estamos modificando un objeto anidado de un objeto anidado.
        //state.tasks[taskId] = task;

        // SOLUCION 1
        // state.tasks[taskId] = {
        //   ...state.tasks[taskId],
        //   status,
        // };

        // SOLUCION 2
        state.tasks[taskId] = {
          ...task,
        };
      },
      false,
      'changeTaskStatus'
    );

    //? Con operador spread. Forma nativa de Zustand
    // set((state) => ({
    //   tasks: {
    //     // Hago el spread de todas las tareas anteriores y cambio la que quiero.
    //     // Tengo que acordarme de hacer esto, porque si no pierdo todas las tareas y
    //     // me quedo solo con la que cambio.
    //     // Esto se va a hacer mucho más fácil cuando se use Immer.
    //     ...state.tasks,
    //     [taskId]: task,
    //   },
    // }));
  },

  onTaskDrop: (status: TaskStatus) => {
    // Ejemplo de método que es la combinación de otros (combinar métodos de store)
    // La idea es combinar changeTaskStatus y removeDraggingTaskId
    const taskId = get().draggingTaskId;

    // Porque puede ser null
    if (!taskId) return;

    get().changeTaskStatus(taskId, status);
    get().removeDraggingTaskId();
  },
});

export const useTaskStore = create<TaskState>()(
  // Que me ayuden las devtools a saber el valor de mi state
  devtools(
    persist(
      //? Usando el middleware de Immer. No requiere instalaciones
      immer(storeApi),
      { name: 'task-store' }
    )
  )
);
