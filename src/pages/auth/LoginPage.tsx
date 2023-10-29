import { FormEvent } from 'react';
import { useAuthStore } from '../../stores';

export const LoginPage = () => {
  const loginUser = useAuthStore((state) => state.loginUser);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Esta es la forma sencilla, pero todo queda como tipo any
    // const { email, password, remember } = event.target as HTMLFormElement;

    // Esta forma es más compleja, pero cada campo tiene su tipo
    const { email, password, remember } = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
      remember: { checked: boolean };
    };
    console.log(email.value, password.value, remember.checked);

    loginUser(email.value, password.value);

    // Comentado para no perder la información del login, para evitar tener que estar
    // informándolo una y otra vez.
    // email.value = '';
    // password.value = '';
    // remember.checked = false;
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Login</h1>

      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600">Email</label>
          <input type="text" name="email" autoComplete="off" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Password</label>
          <input type="password" name="password" autoComplete="off" />
        </div>

        <div className="mb-4 flex items-center">
          <input type="checkbox" name="remember" className="text-blue-500" />
          <label className="text-gray-600 ml-2">Remember Me</label>
        </div>

        <div className="mb-6 text-blue-500">
          <a href="#" className="hover:underline">
            Forgot Password?
          </a>
        </div>

        <button type="submit" className="bg-indigo-600">
          Login
        </button>
      </form>
      <div className="mt-6 text-blue-500 text-center">
        <a href="#" className="hover:underline">
          Sign up Here
        </a>
      </div>
    </>
  );
};
