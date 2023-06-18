import { useRouter } from "next/navigation";
import { ReactNode, createContext } from "react";
import { IAuthProviderProps, ILoginData, IRegisterNewData } from "./types";
import { api } from "@/services/api";
import { setCookie } from "nookies";

export const AuthContext = createContext<IAuthProviderProps>({} as IAuthProviderProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const register = async (registerData: IRegisterNewData) => {
    try {
      await api.post("/users", registerData);

      const response = await api.post("/login", {
        email: registerData.email,
        password: registerData.password
      });

      setCookie(undefined, "token_kenzie_cars", response.data.token, {
        maxAge: 60 * 60 * 24
      });

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (loginData: ILoginData) => {
    try {
      const response = await api.post("/login", loginData);

      setCookie(undefined, "token_kenzie_cars", response.data.token, {
        maxAge: 60 * 60 * 24
      });

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  return <AuthContext.Provider value={{ register, login }}>{children}</AuthContext.Provider>;
};
