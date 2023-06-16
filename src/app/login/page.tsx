"use client";

import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/Input";
import { NavBar } from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm<{ email: string; password: string }>();

  const { login } = useAuth();

  const submit: SubmitHandler<{ email: string; password: string }> = (data) => {
    login(data);
  };

  return (
    <>
      <NavBar />
      <main className="bg-grey8 flex items-center justify-center px-4 pt-12 pb-16">
        <form
          className="bg-grey10 max-w-[412px] w-full rounded py-11 px-7 sm:px-12 flex flex-col gap-2"
          onSubmit={handleSubmit(submit)}>
          <h1 className="heading-5-500 mb-6 text-grey0">Login</h1>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Input
                register={register("email")}
                inputType="email"
                placeHolder="Digitar email"
                labelChildren="Email"
                labelClass="body-2-500 text-grey1"
                inputClass="input-outline"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Input
                register={register("password")}
                inputType="password"
                placeHolder="Digitar senha"
                labelChildren="Senha"
                labelClass="body-2-500 text-grey1"
                inputClass="input-outline"
              />
            </div>
          </div>
          <Button
            type="button"
            className="body-2-500 text-grey2 mb-3 text-right hover:text-grey0 duration-300">
            Esqueci minha senha
          </Button>

          <div className="flex flex-col items-center justify-center gap-6">
            <Button type="submit" className="btn-brand1-big w-full text-center">
              Entrar
            </Button>

            <p className="body-2-400 text-grey2">Ainda não possui conta?</p>

            <Link href={"/register"} className="btn-outline-2-big w-full text-center">
              Cadastrar
            </Link>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
};
export default Login;
