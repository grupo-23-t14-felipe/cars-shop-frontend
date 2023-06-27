import { Dispatch, SetStateAction } from "react";
import { FieldError } from "react-hook-form";

export interface IUserProviderProps {
  user: IUser | undefined;
  createAnnouncer: (data: IAnnouncer) => Promise<boolean>;
  updateAnnouncer: (data: IAnnouncer, uuid: string) => Promise<boolean>;
  loggout: () => void;
  setToken: Dispatch<SetStateAction<string | undefined>>;
  setUser: Dispatch<SetStateAction<IUser | undefined>>;
  updateAddress: (data: IAddress) => Promise<boolean | string>;
  updateUser: (data: IUserUpdate) => Promise<boolean | string>;
  deleteUser: () => Promise<boolean | string>;
  deleteImgOfAd: (uuid: string) => Promise<boolean>;
  deleteAd: (uuid: string) => Promise<boolean>;
  createComment: (data: { comment: string }, uuidCar: string) => Promise<boolean>;
}

export interface IAnnouncer {
  brand?: string | FieldError;
  color?: string | FieldError;
  description?: string | FieldError;
  fipe_price?: number;
  fuel_type?: string;
  gallery?: any[];
  img_default?:
    | string
    | {
        name: string;
        img_url: string;
        file: File;
      };
  is_active?: boolean | FieldError;
  mileage?: number | FieldError;
  model?: string | FieldError;
  value?: number;
  year?: number;
}
export interface IDecodeProps {
  email: string;
  exp: number;
  iat: number;
  sub: string;
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
