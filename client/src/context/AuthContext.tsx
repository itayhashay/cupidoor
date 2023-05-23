import {
  createContext,
  useContext,
  useState,
  FunctionComponent,
  Dispatch,
} from "react";
import { User } from "../types/user";
import { signIn, signUp } from "../utils/api";
import { AxiosError, AxiosResponse } from "axios";
import { CupidAxiosError } from "../types/cupidAxiosError";

type Props = { children: React.ReactNode };

export type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signInUser: (email: string, password: string) => void;
  signUpUser: (user: User) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  setAccessToken: () => {},
  setUser: () => {},
  signInUser: () => {},
  signUpUser: () => {},
});

export default AuthContext;

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContextProvider: FunctionComponent<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const signInUser = async (email: string, password: string) => {
    const response: AxiosResponse = await signIn(email, password);
    if (response.status == 200) {
      const user: User = response.data;
      setUser(user);
      return { success: true };
    }
    return { success: false, error: response.data };
  };

  const signUpUser = async (user: User) => {
    const response: AxiosResponse | AxiosError = await signUp(user);
    if (response.status == 200) {
      setUser(user);
      return { success: true };
    }
    const error: AxiosError = response as AxiosError;
    const cupidError: CupidAxiosError = error.response?.data as CupidAxiosError;
    return cupidError;
  };

  // const refreshUserToken = async ()=>{
  //   const response:AxiosResponse | AxiosError = await refreshToken()
  // };

  const contextData: AuthContextType = {
    user,
    accessToken: accessToken,
    setAccessToken: setAccessToken,
    setUser: setUser,
    signInUser: signInUser,
    signUpUser: signUpUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
