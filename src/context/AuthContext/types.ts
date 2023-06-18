export interface IAuthProviderProps {
  register: (registerData: IRegisterNewData) => void;
  login: (loginData: ILoginData) => void;
}

export interface ILoginData {
  email: string;
  password: string;
}
export interface IRegisterNewData {
  name: string;
  email: string;
  password: string;
  cpf: string;
  celphone: string;
  birthday: string;
  description: string | undefined;
  imageUrl: string;
  is_seller: boolean;
  address: {
    cep: string | undefined;
    street: string | undefined;
    state: string | undefined;
    city: string | undefined;
    number: string;
    complement: string | undefined;
  };
}
