import { NavBar } from "@/components/Navbar";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import registerSchema, { RegisterData } from "./validators";
import { useAuth } from "@/context/authContext";
import { Input } from "../Input";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema)
  });
  const { register: registerUser } = useAuth();
  const onFormSubmit = (formData: RegisterData) => {
    registerUser(formData);
  };

  return (
    <>
      <NavBar />
      <div className="">
        <h2>Cadastro</h2>
        <p className="">Informações Pessoais</p>
        <form className="" onSubmit={handleSubmit(onFormSubmit)}>
          <div>
            <label htmlFor="name" className="">
              Nome
            </label>
            <div className="">
              <Input inputType="text" placeHolder="Ex: Samuel Leão" inputClass="" {...register} />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="user-form-label">
              E-mail
            </label>
            <div className="">
              <Input inputType="text" placeHolder="samuel@kenzie.com" inputClass="" {...register} />
            </div>
          </div>
          <div>
            <label htmlFor="cpf" className="user-form-label">
              CPF
            </label>
            <div className="">
              <Input inputType="number" placeHolder="000.000.000-00" inputClass="" {...register} />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="user-form-label">
              Celular
            </label>
            <div className="">
              <Input inputType="number" placeHolder="(DDD)90000-0000" inputClass="" {...register} />
            </div>
          </div>
          <div>
            <label htmlFor="birthday" className="user-form-label">
              Data de Nascimento
            </label>
            <div className="">
              <Input inputType="number" placeHolder="00/00/0000" inputClass="" {...register} />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="user-form-label">
              Descrição
            </label>
            <div className="text">
              <Input inputType="" placeHolder="Digitar descrição" inputClass="" {...register} />
            </div>
          </div>
          <p>Informações de Endereço</p>
          <div>
            <label htmlFor="CEP" className="user-form-label">
              CEP
            </label>
            <div className="">
              <Input inputType="number" placeHolder="00000-000" inputClass="" {...register} />
            </div>
          </div>
          <div>
            <label htmlFor="state" className="user-form-label">
              Estado
            </label>
            <div className="">
              <Input inputType="text" placeHolder="Digitar Estado" inputClass="" {...register} />
            </div>
          </div>
          <div>
            <label htmlFor="city" className="user-form-label">
              Cidade
            </label>
            <div className="">
              <Input inputType="text" placeHolder="Digitar cidade" inputClass="" {...register} />
            </div>
          </div>
          <div>
            <label htmlFor="street" className="user-form-label">
              Rua
            </label>
            <div className="">
              <Input inputType="text" placeHolder="Digitar rua" inputClass="" {...register} />
            </div>
          </div>
          <div>
            <label htmlFor="number" className="user-form-label">
              Número
            </label>
            <div className="">
              <Input inputType="number" placeHolder="Digitar número" inputClass="" {...register} />
            </div>
          </div>
          <div>
            <label htmlFor="complement" className="user-form-label">
              Complemento
            </label>
            <div className="">
              <Input inputType="text" placeHolder="Ex: Apto 307" inputClass="" {...register} />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="user-form-label">
              Senha
            </label>
            <div className="">
              <Input
                inputType="password"
                placeHolder="Digite sua senha"
                inputClass=""
                {...register}
              />
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="user-form-label">
              Confirmar senha
            </label>
            <div className="">
              <Input inputType="text" placeHolder="Digite sua senha" inputClass="" {...register} />
            </div>
          </div>
          <div>
            <button type="submit" className="user-form-button">
              Cadastrar
            </button>
          </div>

          <Link href={"/login"} className="user-form-link">
            Ir para o login
          </Link>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
