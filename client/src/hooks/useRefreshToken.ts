import { AxiosResponse } from 'axios';
import { useAuth } from '../context/AuthContext';
import axios from '../utils/axiosPrivate';
import { User } from '../types/user';
import { useSnackbar } from '../context/SnackbarContext';
import UseAuthApi from './useAuthAPI';

const useRefreshToken = () => {
  const { setUser, setAccessToken } = useAuth();
  const { signOut } = UseAuthApi();
  const { setSnackBarState } = useSnackbar();
  const refresh = async () => {
    try {
      const response: AxiosResponse = await axios.get('/refresh', {
        withCredentials: true,
      });
      const user: User = response.data.user as User;
      setUser((prev): User => {
        return { ...user };
      });
      setAccessToken(response.data.accessToken);
      return response.data.accessToken;
    } catch (ex) {
      signOut();
      setSnackBarState({
        message: 'Session Expired',
        severity: 'error',
        show: true,
      });
      return null;
    }
  };
  return refresh;
};

export default useRefreshToken;
