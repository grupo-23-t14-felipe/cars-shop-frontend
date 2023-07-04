"use client";

import { api } from "@/services/api";
import { ReactNode, createContext, useEffect, useState } from "react";
import {
  IAddress,
  IAnnouncer,
  IDecodeProps,
  IUser,
  IUserProviderProps,
  IUserUpdate
} from "./types";
import { parseCookies, destroyCookie } from "nookies";
import jwtDecode from "jwt-decode";
import { useSearchParams } from "next/navigation";

export const UserContext = createContext<IUserProviderProps>({} as IUserProviderProps);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  const cookies = parseCookies();

  const [token, setToken] = useState<string | undefined>(cookies.token_kenzie_cars);
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  useEffect(() => {
    (async () => {
      const cookies = parseCookies();

      setToken(cookies.token_kenzie_cars);

      if (!cookies.token_kenzie_cars) {
        setLoading(false);
      }

      if (cookies.token_kenzie_cars) {
        api.defaults.headers.common.Authorization = `Bearer ${cookies.token_kenzie_cars}`;

        const decoded: IDecodeProps = jwtDecode(cookies.token_kenzie_cars);

        await getUser(decoded.sub);
      }
    })();
  }, [searchParams]);

  const getUser = async (uuid: string) => {
    const response = await api.get(`/users/${uuid}`);

    setUser(response.data);
  };

  const loggout = () => {
    destroyCookie(undefined, "token_kenzie_cars");
    setToken(undefined);
    setUser(undefined);
  };

  const createAnnouncer = async (data: IAnnouncer) => {
    try {
      await api.post("/cars", data);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const updateAnnouncer = async (data: IAnnouncer, uuid: string) => {
    try {
      await api.patch(`/cars/${uuid}`, data);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const deleteAd = async (uuid: string) => {
    try {
      await api.delete(`/cars/${uuid}`);

      return true;
    } catch (error: any) {
      console.error(error);
      return error.data.message;
    }
  };

  const deleteImgOfAd = async (uuid: string) => {
    try {
      await api.delete(`/cars/gallery/${uuid}`);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const updateAddress = async (data: IAddress) => {
    try {
      const result: { data: IAddress } = await api.patch(`users/address/${user?.uuid}`, data);

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

  const updateUser = async (data: IUserUpdate) => {
    try {
      const result: { data: IUser } = await api.patch(`users/${user?.uuid}`, data);

      const updatedUser = {
        ...user!,
        ...result.data
      };

      setUser(updatedUser);

      return true;
    } catch (error: any) {
      console.error(error);
      return error.data.message;
    }
  };

  const deleteUser = async () => {
    try {
      await api.delete(`/users/${user?.uuid}`);

      setToken(undefined);
      setUser(undefined);

      return true;
    } catch (error: any) {
      console.error(error);
      return error.data.message;
    }
  };

  const createComment = async (data: { description: string }, uuidCar: string) => {
    try {
      await api.post(`/cars/comments/${uuidCar}`, data);

      return true;
    } catch (error: any) {
      console.error(error);
      return error.data.message;
    }
  };

  const updateComment = async (data: { description: string }, uuidComment: string) => {
    try {
      const response = await api.patch(`/cars/comments/${uuidComment}`, data);

      return response;
    } catch (error: any) {
      console.error(error);
      return error.data.message;
    }
  };

  const deleteComment = async (uuidComment: string) => {
    try {
      await api.delete(`/cars/comments/${uuidComment}`);

      return true;
    } catch (error: any) {
      console.error(error);
      return error.data.message;
    }
  };

  return (
    <UserContext.Provider
      value={{
        createAnnouncer,
        user,
        loggout,
        setToken,
        setUser,
        updateAddress,
        deleteUser,
        updateUser,
        updateAnnouncer,
        deleteImgOfAd,
        deleteAd,
        createComment,
        deleteComment,
        getUser,
        updateComment,
        loading
      }}>
      {children}
    </UserContext.Provider>
  );
};
