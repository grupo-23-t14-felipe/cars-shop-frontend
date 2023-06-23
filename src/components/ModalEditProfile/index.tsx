import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody
} from "@chakra-ui/react";
import { Button } from "../Button";
import { Input } from "../Input";
import { PatternFormat } from "react-number-format";
import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TEditProfile, editProfileSchema } from "./validators";
import { useState } from "react";
import { ButtonDelete } from "../ModalDelete";
import { useUser } from "@/hooks/useUser";
import { IUserUpdate } from "@/context/UserContext/types";

export const ModalEditProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, updateUser } = useUser();
  const [buttonDisable, setButtonDisable] = useState(true);
  const [cellphone, setCellphone] = useState(user!.celphone);
  const [cpf, setCpf] = useState(user!.cpf);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUserUpdate>({
    resolver: zodResolver(editProfileSchema),
    mode: "onChange"
  });

  const submit: SubmitHandler<IUserUpdate> = (data: IUserUpdate) => {
    const regex = /\D/g;
    const newData: IUserUpdate = {
      ...data!,
      cpf: cpf.replace(regex, ""),
      celphone: cellphone.replace(regex, "")
    };
    updateUser(newData);
  };

  const checkHaveChanges = (value: string) => {
    const find: string | undefined = Object.values(user!).find((val) => val === value);

    if (find) {
      setButtonDisable(true);
    } else {
      setButtonDisable(false);
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        className="body-1-400 text-grey2 hover:text-grey0 duration-300 text-left">
        Editar Perfil
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="w-11/12 p-6 flex flex-col gap-8 max-w-[520px]">
          <ModalHeader className="p-0 heading-7-500 text-grey1">Editar Perfil</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="p-0">
            <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-6">
              <h2 className="body-2-500 text-grey0">Infomações pessoais</h2>

              <div className="flex flex-col gap-2">
                <Input
                  inputType="text"
                  placeHolder="Ex: Samuel Leão"
                  inputClass={clsx("input-outline", errors.name && "border-feedbackAlert1")}
                  labelClass="body-2-500 text-grey1"
                  labelChildren="Nome"
                  inputDefaultValue={user?.name}
                  onChange={(e) => checkHaveChanges(e.target.value)}
                  register={register("name")}
                />
                {errors.name && (
                  <p className="body-2-500 text-sm text-feedbackAlert1">{errors.name.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Input
                  inputType="text"
                  placeHolder="samuel@kenzie.com"
                  inputClass={clsx("input-outline", errors.email && "border-feedbackAlert1")}
                  labelClass="body-2-500 text-grey1"
                  labelChildren="E-mail"
                  inputDefaultValue={user?.email}
                  onChange={(e) => checkHaveChanges(e.target.value)}
                  register={register("email")}
                />
                {errors.email && (
                  <p className="body-2-500 text-sm text-feedbackAlert1">{errors.email.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="body-2-500 text-grey1">CPF</label>
                <PatternFormat
                  format="###.###.###-##"
                  className={clsx("input-outline", errors.cpf && "border-feedbackAlert1")}
                  placeholder="000.000.000-00"
                  onChange={(e) => {
                    setCpf(e.target.value);
                    checkHaveChanges(e.target.value);
                  }}
                  value={user?.cpf}
                />
                {errors.cpf && (
                  <p className="body-2-500 text-sm text-feedbackAlert1">{errors.cpf.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="body-2-500 text-grey1">Celular</label>
                <PatternFormat
                  format="(##) #####-####"
                  className={clsx("input-outline", errors.celphone && "border-feedbackAlert1")}
                  placeholder="(01) 91234-5678"
                  onChange={(e) => {
                    setCellphone(e.target.value);
                    checkHaveChanges(e.target.value);
                  }}
                  value={user?.celphone}
                />
                {errors.celphone && (
                  <p className="body-2-500 text-sm text-feedbackAlert1">
                    {errors.celphone.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Input
                  inputType="date"
                  placeHolder="00/00/0000"
                  labelChildren="Data de Nascimento"
                  inputClass={clsx("input-outline", errors.birthday && "border-feedbackAlert1")}
                  labelClass="body-2-500 text-grey1"
                  inputDefaultValue={user?.birthday}
                  onChange={(e) => checkHaveChanges(e.target.value)}
                  register={register("birthday")}
                />
                {errors.birthday && (
                  <p className="body-2-500 text-sm text-feedbackAlert1">
                    {errors.birthday.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="body-2-500 text-grey1">Descrição</label>
                <textarea
                  className="input-outline resize-none h-[80px]"
                  placeholder="Digitar descrição"
                  defaultValue={user?.description}
                  {...register("description")}
                  onChange={(e) => {
                    checkHaveChanges(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-wrap justify-center sm:flex-nowrap gap-3 w-full">
                <Button
                  type="button"
                  className="btn-negative-big w-[47%] sm:w-2/6 px-0"
                  onClick={onClose}>
                  Cancelar
                </Button>

                <ButtonDelete />

                <Button
                  type="submit"
                  className={clsx(
                    " w-4/5 sm:w-2/6 sm:px-0",
                    buttonDisable ? "btn-brand-disable-big cursor-not-allowed" : "btn-brand1-big"
                  )}
                  disable={buttonDisable}>
                  Salvar alterações
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
