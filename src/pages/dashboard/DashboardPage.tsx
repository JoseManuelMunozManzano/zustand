import {
  IoAccessibilityOutline,
  IoHeartOutline,
  IoInformationOutline,
  IoListOutline,
  IoLockClosedOutline,
  IoPawOutline,
} from 'react-icons/io5';
import { RequestInfo, WhiteCard } from '../../components';
import { useAuthStore, useBearsStore, usePersonStore, useTaskStore } from '../../stores';

export const Dashboard = () => {
  // Yo no quiero computar aquí el número de osos. Lo quiero hacer en mi store,
  // porque es posible que el día de mañana se tenga que usar en otro sitio.
  // Para ello creamos propiedades computadas en el store y aquí las usamos.
  //
  //const totalBears = useBearsStore((state) => state.computed.totalBears);
  //
  // Ahora totalBears es una función normal que regresa un number
  const totalBears = useBearsStore((state) => state.totalBears);
  const firstName = usePersonStore((state) => state.firstName);
  const tasks = useTaskStore((state) => state.tasks);
  const username = useAuthStore((state) => state.user?.fullName || 'No user');

  const taskCount = Object.keys(tasks).length;

  return (
    <>
      <h1>Dashboard</h1>
      <p>Información colectiva de varios stores de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <WhiteCard centered>
          <IoPawOutline size={50} className="text-indigo-600" />
          <h2>Osos</h2>
          {/* <p>{totalBears}</p> */}
          <p>{totalBears()}</p>
        </WhiteCard>

        <WhiteCard centered>
          <IoAccessibilityOutline size={50} className="text-indigo-600" />
          <h2>Persona</h2>
          <p>{firstName}</p>
        </WhiteCard>

        <WhiteCard centered>
          <IoListOutline size={50} className="text-indigo-600" />
          <h2>Tareas</h2>
          <p>{taskCount}</p>
        </WhiteCard>

        <WhiteCard centered>
          <IoHeartOutline size={50} className="text-indigo-600" />
          <h2>Boda</h2>
          <p>Información</p>
        </WhiteCard>

        <WhiteCard centered>
          <IoLockClosedOutline size={50} className="text-indigo-600" />
          <h2>Auth</h2>
          <p>{username}</p>
        </WhiteCard>

        <WhiteCard centered className="col-span-3">
          <IoInformationOutline size={50} className="text-indigo-600" />
          <RequestInfo />
        </WhiteCard>
      </div>
    </>
  );
};
