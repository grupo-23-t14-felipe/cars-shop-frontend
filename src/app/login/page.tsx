"use client";

import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/Input";
import { ModalForgetPassword } from "@/components/ModalForgetPassword";
import { NavBar } from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import { useDisclosure } from "@chakra-ui/react";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm<{ email: string; password: string }>();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const { login } = useAuth();
  const { loading } = useUser();

  const submit: SubmitHandler<{ email: string; password: string }> = async (data) => {
    setLoadingButton(true);

    const result = await login(data);

    if (result) {
      setInvalidCredentials(true);

      setTimeout(() => {
        setInvalidCredentials(false);
      }, 3000);
    }

    setTimeout(() => {
      setLoadingButton(false);
    }, 500);
  };

  return (
    !loading && (
      <>
        <NavBar />
        <main className="bg-grey8 flex items-center justify-center px-4 pt-12 pb-16 flex-1">
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
                {invalidCredentials && (
                  <p className="body-2-500 text-sm text-feedbackAlert1">
                    Usuário e/ou senha inválidos
                  </p>
                )}
              </div>
            </div>
            <Button
              type="button"
              className="body-2-500 text-grey2 mb-3 text-right hover:text-grey0 duration-300"
              onClick={onOpen}>
              Esqueci minha senha
            </Button>

            <div className="flex flex-col items-center justify-center gap-6">
              <Button
                type="submit"
                className={clsx(
                  "w-full text-center",
                  loadingButton ? "btn-disable-big animate-pulse" : "btn-brand1-big"
                )}
                disable={loadingButton}>
                {loadingButton ? "Entrando..." : "Entrar"}
              </Button>

              <p className="body-2-400 text-grey2">Ainda não possui conta?</p>

              <Link href={"/register"} className="btn-outline-2-big w-full text-center">
                Cadastrar
              </Link>
            </div>
          </form>
        </main>
        <Footer />
        <ModalForgetPassword onClose={onClose} isOpen={isOpen} />
      </>
    )
  );
};
export default Login;
