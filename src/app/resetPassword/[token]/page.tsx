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
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { checkPassword } from "@/utils/checkPasswordIsValid";

const ResetPassword = () => {
  const { resetPassword } = useAuth();

  const params = useParams();
  const router = useRouter();

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationPass, setValidationPass] = useState({
    length: false,
    capital: false,
    tiny: false,
    special: false
  });

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<TResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange"
  });

  const submit: SubmitHandler<TResetPassword> = async (data) => {
    setLoading(true);
    const result = await resetPassword(data, params.token);

    if (result) {
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        router.push("/login");
      }, 2000);
    }
    setLoading(false);
  };

  return (
    <>
      <NavBar />
      <main className="bg-grey8 flex items-center justify-center px-4 pt-12 pb-16 flex-1">
        <form
          className="bg-grey10 max-w-[412px] w-full rounded py-11 px-7 sm:px-12 flex flex-col gap-5"
          onSubmit={handleSubmit(submit)}>
          <h1 className="heading-5-500 text-grey0">Redefinir senha</h1>
          <div className="flex flex-col gap-2 relative">
            <Input
              inputType="password"
              labelChildren="Senha"
              labelClass="body-2-500 text-grey1"
              inputClass={clsx("input-outline", errors.password && "border-feedbackAlert1")}
              placeHolder="Digite sua nova senha"
              register={register("password")}
              onChange={(e) => checkPassword(e.target.value, setValidationPass)}
              viewPass
            />
            <div className="flex flex-col">
              <p
                className={clsx(
                  "body-2-500 text-xs",
                  validationPass.length ? "text-feedbackSucess1" : "text-feedbackAlert1"
                )}>
                Deve ter no mínimo 8 caracteres
              </p>
              <p
                className={clsx(
                  "body-2-500 text-xs",
                  validationPass.capital ? "text-feedbackSucess1" : "text-feedbackAlert1"
                )}>
                Deve conter ao menos uma letra maiúscula
              </p>
              <p
                className={clsx(
                  "body-2-500 text-xs",
                  validationPass.tiny ? "text-feedbackSucess1" : "text-feedbackAlert1"
                )}>
                Deve conter ao menos uma letra minúscula
              </p>
              <p
                className={clsx(
                  "body-2-500 text-xs",
                  validationPass.special ? "text-feedbackSucess1" : "text-feedbackAlert1"
                )}>
                Deve conter ao menos um caractere especial
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 relative">
            <Input
              inputType="password"
              labelChildren="Cofirme a senha"
              labelClass="body-2-500 text-grey1"
              inputClass={clsx("input-outline", errors.confirm && "border-feedbackAlert1")}
              placeHolder="Confirme a nova senha"
              register={register("confirm")}
              viewPass
            />
            {errors.confirm && (
              <p className="body-2-500 text-sm text-feedbackAlert1">{errors.confirm.message}</p>
            )}
          </div>

          {success && (
            <p className="body-2-500 text-sm text-feedbackSucess1">Senha trocada com sucesso!</p>
          )}

          <Button className="btn-brand1-big w-full" disable={loading}>
            {loading ? "Redefinindo..." : "Redefinir senha"}
          </Button>
        </form>
      </main>
      <Footer />
    </>
  );
};
export default ResetPassword;
