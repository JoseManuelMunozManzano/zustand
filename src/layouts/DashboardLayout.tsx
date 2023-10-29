import { SideMenu } from '../components';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores';

export const DashboardLayout = () => {
  // Como todas mis rutas pasan por el Dashboard, puedo verificar si el status es autorizado o no.
  const authStatus = useAuthStore((state) => state.status);
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  // Si estoy pending no sé si puedo mostrar el dashboard o las rutas.
  // Mostraría un componente bonito (aquí para el curso solo muestro un texto)
  if (authStatus === 'pending') {
    // Cuando se ejecute checkAuthStatus() se notificará el cambio de estado y se volverá
    // a ejecutar DashboardLayout. En ese momento el estado será autorizado o no autorizado.
    checkAuthStatus();
    return <>Loading...</>;
  }

  if (authStatus === 'unauthorized') {
    return <Navigate to="/auth/login" />;
  }

  // Solo se mostrará si authStatus = 'authorized'
  return (
    <div className="bg-slate-200 overflow-y-scroll w-screen h-screen antialiased text-slate-900 selection:bg-blue-900 selection:text-white">
      <div className="flex flex-row relative w-screen">
        <SideMenu />

        <div className="w-full p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
