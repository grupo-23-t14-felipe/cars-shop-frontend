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
import { TEditAddress, editAddressSchema } from "./validators";
import { useState } from "react";
import { IResponseCepApi } from "@/app/register/types";
import axios from "axios";
import { useUser } from "@/hooks/useUser";

export const ModalEditAddress = () => {
  const [resultCep, setResultCep] = useState<IResponseCepApi>();
  const [buttonDisable, setButtonDisable] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, updateAddress } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    getValues,
    setValue
  } = useForm<TEditAddress>({
    resolver: zodResolver(editAddressSchema),
    mode: "onChange"
  });

  const submit: SubmitHandler<TEditAddress> = (data) => {
    const regex = /\D/g;

    const newData = {
      uuid: user!.address.uuid,
      cep: resultCep?.cep.replace(regex, "") || user!.address.cep,
      street: resultCep?.logradouro || user!.address.street,
      state: resultCep?.uf || user!.address.state,
      city: resultCep?.localidade || user!.address.city,
      number: data.number,
      complement: data.complement || user!.address.complement
    };

    console.log(newData);
    // updateAddress(newData);
  };

  const consultCep = async (cep: string) => {
    const regex = /\D/g;
    clearErrors("cep");
    setValue("cep", cep.replace(regex, ""));

    if (cep.replace(regex, "").length < 8) {
      return setError("cep", { type: "required", message: "Digite seu CEP" });
    }
    if (resultCep?.cep === cep) {
      return;
    } else if (cep.replace(regex, "").length === 8) {
      const response = await axios.get(`https://viacep.com.br/ws/${cep.replace(regex, "")}/json/`);

      if (response.data.erro) {
        return setError("cep", { type: "required", message: "Digite um CEP válido" });
      }

      setResultCep(response.data);
    }
  };

  const checkHaveChanges = (value: string) => {
    const find: string | undefined = Object.values(user!.address).find((val) => val === value);

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
        Editar Endereço
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="w-11/12 p-6 flex flex-col gap-8 max-w-[520px]">
          <ModalHeader className="p-0 heading-7-500 text-grey1">Editar endereço</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="p-0">
            <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-6">
              <h2 className="body-2-500 text-grey0">Infomações de endereço</h2>

              <div className="flex flex-col gap-2">
                <label className="body-2-500 text-grey1">CEP</label>

                <PatternFormat
                  format="#####-###"
                  className={clsx("input-outline", errors.cep && "border-feedbackAlert1")}
                  placeholder="00000-000"
                  onChange={(e) => consultCep(e.target.value)}
                  value={user?.address.cep}
                />

                {errors.cep && (
                  <p className="body-2-500 text-sm text-feedbackAlert1">{errors.cep.message}</p>
                )}
              </div>

              <fieldset className="grid grid-cols-2 gap-x-3">
                <div className="flex flex-col gap-2">
                  <Input
                    inputType="text"
                    labelChildren="Estado"
                    inputClass="input-outline cursor-not-allowed"
                    inputDefaultValue={resultCep ? resultCep.uf : user?.address.state}
                    disable={true}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Input
                    inputType="text"
                    labelChildren="Cidade"
                    inputClass="input-outline cursor-not-allowed"
                    inputDefaultValue={resultCep ? resultCep.localidade : user?.address.city}
                    disable={true}
                  />
                </div>
              </fieldset>

              <div className="flex flex-col gap-2">
                <Input
                  inputType="text"
                  labelChildren="Rua"
                  inputClass="input-outline cursor-not-allowed"
                  inputDefaultValue={resultCep ? resultCep.logradouro : user?.address.street}
                  disable={true}
                />
              </div>

              <fieldset className="grid grid-cols-2 gap-x-3">
                <div className="flex flex-col gap-2">
                  <Input
                    inputType="text"
                    labelChildren="Número"
                    inputClass={clsx("input-outline", errors.number && "border-feedbackAlert1")}
                    inputDefaultValue={user?.address.number}
                    maxLength={8}
                    register={register("number")}
                    onChange={(e) => checkHaveChanges(e.target.value)}
                  />
                  {errors.number && (
                    <p className="body-2-500 text-sm text-feedbackAlert1">
                      {errors.number.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Input
                    inputType="text"
                    labelChildren="Complemento"
                    inputClass={clsx("input-outline", errors.complement && "border-feedbackAlert1")}
                    inputDefaultValue={user?.address.complement}
                    register={register("complement")}
                    onChange={(e) => checkHaveChanges(e.target.value)}
                  />
                </div>
              </fieldset>

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
