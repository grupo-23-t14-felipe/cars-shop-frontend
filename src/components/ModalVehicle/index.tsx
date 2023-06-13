import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Select
} from "@chakra-ui/react";
import { Button } from "../Button";
import { Input } from "../Input";
import { ICars } from "../ProductCard";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { IListCars, IListModelCars } from "./types";
import axios from "axios";
import clsx from "clsx";

interface IModalVehicleProps {
  isOpen: boolean;
  onClose: () => void;
  edit: boolean;
  car?: ICars;
}

export const ModalVehicle = ({ isOpen, onClose, edit, car }: IModalVehicleProps) => {
  const [allCars, setAllCars] = useState<IListCars>();
  const [models, setModels] = useState<IListModelCars[]>();
  const [carSelected, setCarSelected] = useState<IListModelCars>();

  useEffect(() => {
    (() => {
      fetch("https://kenzie-kars.herokuapp.com/cars")
        .then((response) => response.json())
        .then((data) => {
          setAllCars(data);
        });
    })();
  }, []);

  const getModels = async (brand: string) => {
    const result = await axios.get(`https://kenzie-kars.herokuapp.com/cars?brand=${brand}`);

    setModels(result.data);
  };

  const setSelectedCar = (name: string) => {
    const car = models?.find((car) => car.name === name);
    setCarSelected(car);
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({});

  const submit: SubmitErrorHandler<any> = (data) => {
    console.log(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="w-full p-6 flex flex-col gap-8 max-w-[520px]">
        <ModalHeader className="p-0 heading-7-500 text-grey1">
          {edit ? "Editar anúncio" : "Criar anúncio"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="p-0">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(submit)}>
            <h3 className="body-2-500 text-grey0">Informações do veículo</h3>

            <div className="flex flex-col gap-2">
              <label className="body-2-500 text-grey0">Marca</label>
              <Select
                className="input-outline"
                variant={"unstyled"}
                placeholder={"Selecione uma marca"}
                {...register("brand")}
                onChange={(e) => {
                  getModels(e.target.value);
                }}>
                {allCars &&
                  Object.keys(allCars).map((model, index) => (
                    <option value={model} key={index}>
                      {model}
                    </option>
                  ))}
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="body-2-500 text-grey0">Modelo</label>
              <Select
                placeholder="Selecione um modelo"
                className="input-outline"
                variant={"unstyled"}
                disabled={models ? false : true}
                defaultValue={car?.brand}
                onChange={(e) => {
                  setSelectedCar(e.target.value);
                }}>
                {models &&
                  models.map((model, index) => (
                    <option key={index} value={model.name}>
                      {model.name}
                    </option>
                  ))}
              </Select>
            </div>
            <fieldset className="grid grid-cols-2 gap-x-3 gap-y-6">
              <div className="flex flex-col gap-2">
                <Input
                  inputType="number"
                  inputName="year"
                  register={register("year")}
                  inputClass={clsx(
                    "input-outline",
                    carSelected ? "" : "opacity-50 cursor-not-allowed"
                  )}
                  labelChildren="Ano"
                  inputDefaultValue={carSelected?.year}
                  disable={true}
                  labelClass="body-2-500 text-grey0"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Input
                  inputType="text"
                  inputName="fuel_type"
                  register={register("fuel_type")}
                  inputClass={clsx(
                    "input-outline",
                    carSelected ? "" : "opacity-50 cursor-not-allowed"
                  )}
                  labelChildren="Combustível"
                  disable={true}
                  inputDefaultValue={
                    carSelected && carSelected.fuel === 1
                      ? "Gasolina / Etanol"
                      : carSelected && carSelected.fuel === 2
                      ? "Híbrido"
                      : carSelected && carSelected.fuel === 2
                      ? "Elétrico"
                      : ""
                  }
                  labelClass="body-2-500 text-grey0"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Input
                  inputType="number"
                  inputName="mileage"
                  register={register("mileage")}
                  inputClass="input-outline"
                  placeHolder="30.000"
                  inputDefaultValue={car?.mileage}
                  labelChildren="Quilometragem"
                  labelClass="body-2-500 text-grey0"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Input
                  inputType="text"
                  inputName="color"
                  register={register("color")}
                  inputClass="input-outline"
                  placeHolder="Branco"
                  inputDefaultValue={car?.color}
                  labelChildren="Cor"
                  labelClass="body-2-500 text-grey0"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Input
                  inputType="text"
                  inputName="fipe_price"
                  register={register("fipe_price")}
                  inputClass={clsx(
                    "input-outline",
                    carSelected ? "" : "opacity-50 cursor-not-allowed"
                  )}
                  disable={true}
                  inputDefaultValue={
                    carSelected &&
                    carSelected.value.toLocaleString(undefined, {
                      style: "currency",
                      currency: "BRL"
                    })
                  }
                  labelChildren="Preço tabela FIPE"
                  labelClass="body-2-500 text-grey0"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Input
                  inputType="number"
                  inputName="value"
                  register={register("value")}
                  inputClass="input-outline"
                  placeHolder="R$: 50.000,00"
                  inputDefaultValue={car?.value}
                  labelChildren="Preço"
                  labelClass="body-2-500 text-grey0"
                />
              </div>
            </fieldset>

            <div className="flex flex-col gap-2">
              <label className="body-2-500 text-grey0">Descrição</label>
              <textarea
                {...register("description")}
                className="input-outline resize-none h-20 body-1-400 text-grey2"
                placeholder="Descrição do veículo"
                defaultValue={car?.description}
              />
            </div>

            {edit && (
              <fieldset className="flex gap-x-3 fieldset-radios">
                <legend className="body-2-500 text-grey0">Publicado</legend>

                <Input
                  inputType="radio"
                  inputName="is_published"
                  register={register("is_published", { required: true })}
                  inputId="active"
                  value="true"
                  inputClass="absolute w-0 h-0"
                  labelClass="hidden"
                  inputChecked={car?.is_published}
                />
                <label
                  htmlFor="active"
                  className="relative w-full button-big border-2 border-grey4 rounded text-center cursor-pointer">
                  Sim
                </label>

                <Input
                  inputType="radio"
                  inputName="is_published"
                  register={register("is_published", { required: true })}
                  inputId="inative"
                  value="false"
                  inputClass="absolute w-0 h-0"
                  labelClass="hidden"
                  inputChecked={car?.is_published}
                />
                <label
                  htmlFor="inative"
                  className="relative w-full button-big border-2 border-grey4 rounded text-center cursor-pointer">
                  Não
                </label>
              </fieldset>
            )}

            <div className="flex flex-col gap-2">
              <Input
                inputType="text"
                inputName="img_cape"
                register={register("img_cape")}
                inputClass="input-outline"
                placeHolder="https://image.com"
                labelChildren="Imagem da capa"
                labelClass="body-2-500 text-grey0"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Input
                inputType="text"
                inputName="img1"
                register={register("img1")}
                inputClass="input-outline"
                placeHolder="https://image.com"
                labelChildren="1° Imagem da galeria"
                labelClass="body-2-500 text-grey0"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Input
                inputType="text"
                inputName="img2"
                register={register("img2")}
                inputClass="input-outline"
                placeHolder="https://image.com"
                labelChildren="2° Imagem da galeria"
                labelClass="body-2-500 text-grey0"
              />
            </div>

            <div>
              <Input
                inputType="file"
                inputName="photos"
                register={register("photos")}
                labelChildren=""
              />
            </div>

            {edit ? (
              <div className="flex gap-3">
                <Button type="button" className="btn-negative-big w-full">
                  Excluir anúncio
                </Button>
                <Button type="submit" className="btn-brand1-big w-full">
                  Salvar alterações
                </Button>
              </div>
            ) : (
              <div className="flex gap-3 justify-end">
                <Button type="button" className="btn-negative-big" onClick={() => onClose()}>
                  Cancelar
                </Button>
                <Button type="submit" className="btn-brand1-big">
                  Criar anúncio
                </Button>
              </div>
            )}
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
