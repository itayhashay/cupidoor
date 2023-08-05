import { createContext, useContext, useState, FunctionComponent, useEffect } from 'react';
import { User } from '../types/user';

type Props = { children: React.ReactNode };

export type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  isAuthLoading: boolean;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  getAccessToken: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  isAuthLoading: true,
  setAccessToken: () => {},
  setUser: () => {},

  getAccessToken: () => {},
});

export default AuthContext;

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContextProvider: FunctionComponent<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const getAccessToken = () => {
    return accessToken || localStorage.getItem('accessToken');
  };

  // Games yet not finished - storing the user in local storage, adv will be the cookie
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsAuthLoading(false);
  }, []);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', String(accessToken));
    }
  }, [accessToken]);

  const contextData: AuthContextType = {
    user,
    accessToken: accessToken,
    isAuthLoading: isAuthLoading,
    setAccessToken: setAccessToken,
    setUser: setUser,
    getAccessToken,
  };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};
