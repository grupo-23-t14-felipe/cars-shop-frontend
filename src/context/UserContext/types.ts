import { Dispatch, SetStateAction } from "react";

export interface IUserProviderProps {
  user: IUser | undefined;
  createAnnouncer: (data: any) => Promise<boolean>;
  loggout: () => void;
  setToken: Dispatch<SetStateAction<string | undefined>>;
  setUser: Dispatch<SetStateAction<IUser | undefined>>;
  updateAddress: (data: IAddress) => Promise<boolean | string>;
  updateUser: (data: IUserUpdate) => Promise<boolean | string>;
  deleteUser: () => Promise<boolean | string>;
}

export interface IDecodeProps {
  user: IUser;
}

export interface IUser {
  uuid: string;
  name: string;
  email: string;
  cpf: string;
  celphone: string;
  birthday: string;
  description: string;
  imageUrl: string;
  is_seller: boolean;
  address: IAddress;
}

export interface IUserUpdate {
  name: string;
  email: string;
  cpf: string;
  celphone: string;
  birthday: string;
  description: string;
}

export interface IAddress {
  uuid: string;
  cep: string;
  state: string;
  street: string;
  city: string;
  number: string;
  complement: string;
}
