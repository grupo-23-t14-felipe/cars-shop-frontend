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

  
  export const ModalEditProfile = () => {
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<TEditProfile>({
      resolver: zodResolver(editProfileSchema),
      mode: "onChange"
    });
  
    const submit: SubmitHandler<TEditProfile> = (data) => {
  
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [buttonDisable, setButtonDisable] = useState(true);
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
                  <label className="body-2-500 text-grey1">Nome</label>
  
                  <Input
                inputType="text"
                placeHolder="Ex: Samuel Leão"
                inputClass={clsx("input-outline", errors.name && "border-feedbackAlert1")}
                labelClass="body-2-500 text-grey1"
                labelChildren="Nome"
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
             
              />
              {errors.cpf && (
                <p className="body-2-500 text-sm text-feedbackAlert1">{errors.cpf.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="body-2-500 text-grey1">Celular</label>
              <PatternFormat
                format="(##) #####-####"
                className={clsx("input-outline", errors.cellphone && "border-feedbackAlert1")}
                placeholder="(01) 91234-5678"
                
              />
              {errors.cellphone && (
                <p className="body-2-500 text-sm text-feedbackAlert1">{errors.cellphone.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Input
                inputType="date"
                placeHolder="00/00/0000"
                labelChildren="Data de Nascimento"
                inputClass={clsx("input-outline", errors.birthday && "border-feedbackAlert1")}
                labelClass="body-2-500 text-grey1"
                register={register("birthday")}
              />
              {errors.birthday && (
                <p className="body-2-500 text-sm text-feedbackAlert1">{errors.birthday.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="body-2-500 text-grey1">Descrição</label>
              <textarea
                className="input-outline resize-none h-[80px]"
                placeholder="Digitar descrição"
                {...register("description")}
              />
            </div>
  
                <div className="flex justify-end gap-3 w-full">
                  <Button type="button" className="btn-negative-big" onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className={clsx(
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
}