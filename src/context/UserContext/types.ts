export interface IUserProviderProps {
  user: IUser | undefined;
  createAnnouncer: (data: any) => Promise<boolean>;
  loggout: () => void;
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

export interface IAddress {
  uuid: string;
  cep: string;
  state: string;
  street: string;
  city: string;
  number: string;
  complement: string;
}