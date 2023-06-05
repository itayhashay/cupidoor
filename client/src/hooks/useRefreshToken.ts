import { AxiosResponse } from "axios";
import { useAuth } from "../context/AuthContext";
import axios from "../utils/axiosPrivate";
import { User } from "../types/user";

const useRefreshToken = () => {
  const { setUser, setAccessToken, signOutUser } = useAuth();

  const refresh = async () => {
    try {
      const response: AxiosResponse = await axios.get("/refresh", {
        withCredentials: true,
      });
      const user: User = response.data.user as User;
      setUser((prev): User => {
        return { ...user };
      });
      setAccessToken(response.data.accessToken);
      return response.data.accessToken;
    } catch (ex) {
      signOutUser();
      return null;
    }
  };
  return refresh;
};

export default useRefreshToken;
