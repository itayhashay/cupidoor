import { useAuth } from '../context/AuthContext';
import { axiosPrivate } from '../utils/axiosPrivate';
import config from '../config.json';
import { User } from '../types/user';
import { AxiosError, AxiosResponse } from 'axios';
import { CupidAxiosError } from '../types/cupidAxiosError';
const UseAuthApi = () => {
  const { setUser, setAccessToken } = useAuth();
  const signIn = async (email: string, password: string) => {
    try {
      const response = await axiosPrivate(config.api.routes.signIn, {
        data: { email, password },
        method: 'POST',
        withCredentials: true,
      });
      const { user, accessToken }: User = response.data;
      setUser(user);
      setAccessToken(accessToken);
      return { success: true };
    } catch (ex: any) {
      return { success: false, error: ex.response.data.error };
    }
  };

  const signUp = async (user: User) => {
    try {
      const response: AxiosResponse = await axiosPrivate.post(config.api.routes.signUp, user);
      await signIn(user.email, user.password);
      return { success: true };
    } catch (ex) {
      const error: AxiosError = ex as AxiosError;
      const cupidError: CupidAxiosError = error.response?.data as CupidAxiosError;
      return cupidError;
    }
  };
  const signOut = async () => {
    try {
      await axiosPrivate.get('/signOut');
      localStorage.clear();
      setUser(null);
      setAccessToken(null);
    } catch (ex) {}
  };

  return {
    signIn,
    signUp,
    signOut,
  };
};

export default UseAuthApi;
