import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody
} from "@chakra-ui/react";
import { Input } from "../Input";
import { Button } from "../Button";
import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TModalForget, modalForgetPassSchema } from "./validators";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

interface IModalForgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalForgetPassword = ({ isOpen, onClose }: IModalForgetProps) => {
  const { sendEmail } = useAuth();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors
  } = useForm<TModalForget>({
    resolver: zodResolver(modalForgetPassSchema)
  });

  const submit: SubmitHandler<TModalForget> = async (data) => {
    const result = await sendEmail(data);

    if (result === true) {
      setSuccess(true);
      clearErrors("email");
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 5000);
    } else if (typeof result === "string") {
      setError("email", {
        message: result,
        type: "required"
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="w-11/12 p-6 flex flex-col gap-8 max-w-[520px]">
        <ModalHeader className="p-0 heading-7-500 text-grey1">Esqueceu a senha ?</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="p-0">
          <form onSubmit={handleSubmit(submit)} className="flex flex-col items-center gap-10">
            <div className="w-full flex flex-col gap-4">
              <Input
                inputType="email"
                labelChildren="Email"
                placeHolder="Digitar email"
                labelClass="body-2-500 text-grey1"
                inputClass={clsx(
                  "input-outline",
                  errors.email && "border-feedbackAlert1",
                  success && "border-feedbackSucess1"
                )}
                register={register("email")}
              />
              {errors.email && (
                <p className="body-2-500 text-sm text-feedbackAlert1">{errors.email.message}</p>
              )}
              {success && (
                <p className="body-2-500 text-sm text-feedbackSucess1">
                  Um link para a redefinição de senha sera enviada para este email.
                </p>
              )}
            </div>

            <div className="flex gap-4 w-full">
              <Button type="button" className="btn-negative-big w-full" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="btn-brand1-big w-full">
                Enviar
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
