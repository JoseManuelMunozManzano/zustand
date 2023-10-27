import { DragEvent, useState } from 'react';
import Swal from 'sweetalert2';
import { useTaskStore } from '../stores';
import { TaskStatus } from '../interfaces';

// Cuando son hooks es mejor poner como nombre Options o Properties en vez de Props
interface Options {
  status: TaskStatus;
}

export const useTasks = ({ status }: Options) => {
  // Para convertir un valor no booleano a booleano se usa !!
  const isDragging = useTaskStore((state) => !!state.draggingTaskId);

  // const changeTaskStatus = useTaskStore((state) => state.changeTaskStatus);
  // const draggingTaskId = useTaskStore((state) => state.draggingTaskId);
  //
  // Ya solo me hace falta el método onTaskDrop
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const addTask = useTaskStore((state) => state.addTask);

  const [onDragOver, setOnDragOver] = useState(false);

  const handleAddTask = async () => {
    //const resp = await Swal.fire({
    const { isConfirmed, value } = await Swal.fire({
      title: 'Nueva tarea',
      input: 'text',
      inputLabel: 'Nombre de la tarea',
      inputPlaceholder: 'Ingrese el nombre de la tarea',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ingresar un nombre para la tarea';
        }
      },
    });

    //console.log(resp);

    if (!isConfirmed) return;

    addTask(value, status);
  };

  const handleDragOver = (ev: DragEvent<HTMLDivElement>) => {
    // Se indica preventDefault para que se pueda ejecutar el evento onDrop
    ev.preventDefault();
    setOnDragOver(true);
  };

  const handleDragLeave = (ev: DragEvent<HTMLDivElement>) => {
    // Se indica preventDefault para que se pueda ejecutar el evento onDrop
    ev.preventDefault();
    setOnDragOver(false);
  };

  const handleDrop = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setOnDragOver(false);
    //changeTaskStatus(draggingTaskId!, value);
    onTaskDrop(status);
  };

  return {
    // Properties
    isDragging,

    // Métodos
    onDragOver,
    handleAddTask,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};
