"use client";

import { api } from "@/services/api";
import { ReactNode, createContext, useEffect, useState } from "react";
import { IAddress, IDecodeProps, IUser, IUserProviderProps } from "./types";
import { parseCookies, destroyCookie } from "nookies";
import jwtDecode from "jwt-decode";

export const UserContext = createContext<IUserProviderProps>({} as IUserProviderProps);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const cookies = parseCookies();

  const [token, setToken] = useState<string | undefined>(cookies.token_kenzie_cars);

  const [user, setUser] = useState<IUser | undefined>();

  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  useEffect(() => {
    if (token) {
      const decoded: IDecodeProps = jwtDecode(token);

      setUser(decoded.user);
    }
  }, []);

  const loggout = () => {
    destroyCookie(undefined, "token_kenzie_cars");
    setToken(undefined);
    setUser(undefined);
  };

  const createAnnouncer = async (data: any) => {
    try {
      await api.post("/cars", data);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const updateAddress = async (data: IAddress) => {
    try {
      const result: { data: IAddress } = await api.patch(`user/${user?.uuid}/address`);

      const newAddressUser = {
        ...user!,
        address: result.data
      };

      setUser(newAddressUser);

      return true;
    } catch (error: any) {
      console.error(error);
      return error.data.message;
    }
  };

  return (
    <UserContext.Provider
      value={{ createAnnouncer, user, loggout, setToken, setUser, updateAddress }}>
      {children}
    </UserContext.Provider>
  );
};
