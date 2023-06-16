import { LoginData } from "@/components/loginForm/validator";
import { RegisterData } from "@/components/registerForm/validators";


// import api from "@/services/api";
import { useRouter } from "next/router";
// import { setCookie } from "nookies";
import { ReactNode, createContext, useContext } from "react";

interface Props {
  children: ReactNode;
}

interface authProviderData {
  register: (registerData: RegisterData) => void;
  login: (loginData: LoginData) => void;
}

const AuthContext = createContext<authProviderData>({} as authProviderData);

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter();

  const register = (registerData: RegisterData) => {
    // api
    //   .post("/users", registerData)
    //   .then(() => {
    //     // Toast({ message: "usuário cadastrado com sucesso!", isSucess: true });
    //     // router.push("/login");
    //   })
    // //   .catch((err) => {
    // //     console.log(err);
    // //     Toast({ message: "Erro ao criar usuário, tente utilizar outro e-mail!" });
    // //   });
  };

  const login = (loginData: LoginData) => {
    // api
    //   .post("/login", loginData)
    // //   .then((response) => {
    // //     setCookie(null, "kenziefy.token", response.data.token, {
    // //       maxAge: 60 * 30,
    // //       path: "/"
    // //     });
    // //   })
    // //   .then(() => {
    // //     Toast({ message: "login realizado com sucesso!", isSucess: true });
    // //     router.push("/");
    // //   })
    // //   .catch((err) => {
    // //     console.log(err);
    // //     Toast({ message: "Erro ao logar, verifique e o e-mail e a senha estão corretos !" });
    // //   });
  };
  return <AuthContext.Provider value={{ register, login }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);