import { StateCreator, create } from 'zustand';

// Instalado uuid (npm i uuid) y sus tipos (npm i --save-dev @types/uuid)
import { v4 as uuidv4 } from 'uuid';

// De nuevo, indicamos type para que no importe ningún archivo físico
import type { Task, TaskStatus } from '../../interfaces';
import { devtools } from 'zustand/middleware';

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

const storeApi: StateCreator<TaskState> = (set, get) => ({
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

    set((state) => ({
      tasks: {
        // De nuevo tenemos el problema de que se nos puede pasar esto y perderíamos todas las tareas.
        ...state.tasks,
        // Llaves cuadradas porque queremos poner la propiedad computada
        [newTask.id]: newTask,
      },
    }));
  },

  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId });
  },

  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined });
  },

  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    // Aquí se podría añadir la confirmación de que la tarea existe
    const task = get().tasks[taskId];
    task.status = status;

    set((state) => ({
      tasks: {
        // Hago el spread de todas las tareas anteriores y cambio la que quiero.
        // Tengo que acordarme de hacer esto, porque si no pierdo todas las tareas y
        // me quedo solo con la que cambio.
        // Esto se va a hacer mucho más fácil cuando se use Immer.
        ...state.tasks,
        [taskId]: task,
      },
    }));
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
  devtools(storeApi)
);
