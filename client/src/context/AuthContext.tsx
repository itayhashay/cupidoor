import { createContext, useContext, useState, FunctionComponent, useEffect } from 'react';
import { User } from '../types/user';
import { AxiosError, AxiosResponse } from 'axios';
import { CupidAxiosError } from '../types/cupidAxiosError';
import useAPI from '../hooks/useAPI';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

type Props = { children: React.ReactNode };

export type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  isAuthLoading: boolean;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signInUser: (email: string, password: string) => void;
  signUpUser: (user: User) => void;
  signOutUser: () => void;
  fetchUser: () => void;
  updateUser: (newUserData: User) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  isAuthLoading: true,
  setAccessToken: () => {},
  setUser: () => {},
  signInUser: () => {},
  signUpUser: () => {},
  signOutUser: () => {},
  fetchUser: () => {},
  updateUser: () => {},
});

export default AuthContext;

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContextProvider: FunctionComponent<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const { signIn, signUp } = useAPI();
  const axiosPrivate = useAxiosPrivate();
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

  const signInUser = async (email: string, password: string) => {
    try {
      const response: AxiosResponse = await signIn(email, password);
      const { user, accessToken }: User = response.data;
      setUser(user);
      setAccessToken(accessToken);
      return { success: true };
    } catch (ex: any) {
      return { success: false, error: ex.response.data.error };
    }
  };

  const signUpUser = async (user: User) => {
    const response: AxiosResponse | AxiosError = await signUp(user);
    if (response.status == 200) {
      await signInUser(user.email, user.password);
      return { success: true };
    }
    const error: AxiosError = response as AxiosError;
    const cupidError: CupidAxiosError = error.response?.data as CupidAxiosError;
    return cupidError;
  };

  const signOutUser = async () => {
    try {
      await axiosPrivate.get('/signOut');
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      setUser(null);
      setAccessToken(null);
    } catch (ex) {}
  };

  const updateUser = async (newUserData: User) => {
    try {
      const response: AxiosResponse = await axiosPrivate.put(`/user/${user?._id}`, {
        ...user,
        ...newUserData,
      });
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (ex) {
      throw ex;
    }
  };

  const fetchUser = async () => {
    const response = await axiosPrivate.get('/user');
    const userData: User = response.data;
    setUser((prevState) => {
      return { ...prevState, ...userData };
    });
  };

  const contextData: AuthContextType = {
    user,
    accessToken: accessToken,
    isAuthLoading: isAuthLoading,
    setAccessToken: setAccessToken,
    setUser: setUser,
    signInUser: signInUser,
    signUpUser: signUpUser,
    signOutUser: signOutUser,
    fetchUser: fetchUser,
    updateUser: updateUser,
  };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};
