import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import useService from '../hooks/useService';
import UsersService from '../services/UsersService';
import { IUser } from '../interfaces/IUser';

interface IProps {
  children: ReactNode;
}

export interface IUserContext {
  user: IUser | null;
  token: string;
  login: (email: string) => Promise<void>;
  register: (email: string) => Promise<void>;
  logout: () => void;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  token: '',
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: IProps) => {
  const service = useService(UsersService) as UsersService;

  console.log(service);

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const getProfile = useCallback(async () => {
    const profile = await service.getProfile();
    setUser(profile);
  }, [service]);

  const login = useCallback(
    async (email: string) => {
      const response = await service.login(email);
      localStorage.setItem('token', response.token as string);
      setToken(response.token);
      getProfile();
    },
    [service, getProfile]
  );

  const register = useCallback(
    async (email: string) => {
      await service.register(email);
      await login(email);
    },
    [login, service]
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      register,
      logout,
    }),
    [user, token, login, register, logout]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
