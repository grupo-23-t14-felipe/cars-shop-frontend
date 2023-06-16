import { useRouter } from "next/navigation";
import { ReactNode, createContext } from "react";
import { IAuthProviderProps, ILoginData, IRegisterNewData } from "./types";
import { api } from "@/services/api";

export const AuthContext = createContext<IAuthProviderProps>({} as IAuthProviderProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const register = async (registerData: IRegisterNewData) => {
    try {
      const response = await api.post("/users", registerData);

      console.log(response);

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (loginData: ILoginData) => {
    try {
      const response = await api.post("/login", loginData);

      console.log(response);

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  return <AuthContext.Provider value={{ register, login }}>{children}</AuthContext.Provider>;
};
