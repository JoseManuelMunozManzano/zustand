// Como quiero que luzca el usuario en la aplicación
export interface User {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
}
