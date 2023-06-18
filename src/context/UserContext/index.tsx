"use client";

import { api } from "@/services/api";
import { ReactNode, createContext, useEffect, useState } from "react";
import { IDecodeProps, IUser, IUserProviderProps } from "./types";
import { parseCookies, destroyCookie } from "nookies";
import jwtDecode from "jwt-decode";

export const UserContext = createContext<IUserProviderProps>({} as IUserProviderProps);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser>();

  const cookies = parseCookies();

  const [token, setToken] = useState<string | undefined>(cookies.token_kenzie_cars);

  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  useEffect(() => {
    (async () => {
      if (token) {
        const decoded: IDecodeProps = jwtDecode(token);

        setUser(decoded.user);
      }
    })();
  }, []);

  const loggout = () => {
    destroyCookie(undefined, "token_kenzie_cars");
    setUser(undefined);
  };

  const createAnnouncer = async (data: any) => {
    try {
      const response = await api.post("/cars", data);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider value={{ createAnnouncer, user, loggout }}>
      {children}
    </UserContext.Provider>
  );
};
