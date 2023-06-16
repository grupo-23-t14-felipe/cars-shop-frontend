import { NavBar } from "@/components/Navbar";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/authContext";
import { Input } from "../Input";
import loginSchema, { LoginData } from "./validator";

const LoginForm = () => {
  const {register, handleSubmit } = useForm<LoginData>({
    resolver: zodResolver(loginSchema)
  });
  const { login: loginUser } = useAuth();
  const onFormSubmit = (formData: LoginData) => {
    loginUser(formData);
  };

  return (
    <>
      <NavBar />
      
        <h2>Login</h2>
        <form className="" onSubmit={handleSubmit(onFormSubmit)}>
          <div>
            <label htmlFor="email" className="user-form-label">
              E-mail
            </label>
            <div className="">
              <Input inputType="text" placeHolder="samuel@kenzie.com" inputClass="" {...register} />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="">
              Senha
            </label>
            <div className="">
              <Input inputType="password" placeHolder="Ex:" inputClass="" {...register} />
            </div>
          </div>
          </form>
          <div>
            <button type="submit" className="user-form-button">
              Entrar
            </button>
          </div>

          <Link href={"/register"} className="user-form-link">
            Ir para o cadastro
          </Link>
    </>
  );
};

export default LoginForm;