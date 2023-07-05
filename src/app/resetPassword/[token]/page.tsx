"use client";

import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/Input";
import { NavBar } from "@/components/Navbar";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { TResetPassword, resetPasswordSchema } from "./validators";
import clsx from "clsx";
import { useAuth } from "@/hooks/useAuth";
import { useParams } from "next/navigation";

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const params = useParams();

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<TResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange"
  });

  const submit: SubmitHandler<TResetPassword> = (data) => {
    resetPassword(data, params.token);
  };

  return (
    <>
      <NavBar />
      <main className="bg-grey8 flex items-center justify-center px-4 pt-12 pb-16 flex-1">
        <form
          className="bg-grey10 max-w-[412px] w-full rounded py-11 px-7 sm:px-12 flex flex-col gap-5"
          onSubmit={handleSubmit(submit)}>
          <h1 className="heading-5-500 text-grey0">Redefinir senha</h1>
          <div className="flex flex-col gap-2">
            <Input
              inputType="password"
              labelChildren="Senha"
              labelClass="body-2-500 text-grey1"
              inputClass={clsx("input-outline", errors.password && "border-feedbackAlert1")}
              placeHolder="Digite sua nova senha"
              register={register("password")}
            />
            {errors.password && (
              <p className="body-2-500 text-sm text-feedbackAlert1">{errors.password.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Input
              inputType="password"
              labelChildren="Cofirme a senha"
              labelClass="body-2-500 text-grey1"
              inputClass={clsx("input-outline", errors.confirm && "border-feedbackAlert1")}
              placeHolder="Confirme a nova senha"
              register={register("confirm")}
            />
            {errors.confirm && (
              <p className="body-2-500 text-sm text-feedbackAlert1">{errors.confirm.message}</p>
            )}
          </div>

          <Button className="btn-brand1-big w-full">Redefinir senha</Button>
        </form>
      </main>
      <Footer />
    </>
  );
};
export default ResetPassword;
