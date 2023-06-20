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
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { IListCars, IListModelCars } from "./types";
import { MdOutlineClose } from "react-icons/md";
import { FiUploadCloud } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { TCreateAnnoucement, createAnnoucementSchema } from "./validators";
import { NumericFormat } from "react-number-format";
import axios from "axios";
import clsx from "clsx";
import { useUser } from "@/hooks/useUser";
import { api } from "@/services/api";
import { useParams } from "next/navigation";

interface IModalVehicleProps {
  isOpen: boolean;
  onClose: () => void;
  edit: boolean;
  car?: ICars;
  setCar: Dispatch<SetStateAction<ICars[] | undefined>>;
}

export const ModalVehicle = ({ isOpen, onClose, edit, car, setCar }: IModalVehicleProps) => {
  const [allCars, setAllCars] = useState<IListCars>();
  const [models, setModels] = useState<IListModelCars[]>();
  const [carSelected, setCarSelected] = useState<IListModelCars>();
  const [imgs, setImgs] = useState<{ name: string; img_url: string; file: File }[]>([]);
  const [value, setValue] = useState("");
  const [success, setSuccess] = useState(false);
  const params = useParams();
  const { createAnnouncer } = useUser();

  useEffect(() => {
    (() => {
      fetch("https://kenzie-kars.herokuapp.com/cars")
        .then((response) => response.json())
        .then((data) => {
          setAllCars(data);
        });
    })();
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles === null || acceptedFiles.length === 0) return;

      clearErrors("img");

      const reader = new FileReader();

      reader.readAsDataURL(acceptedFiles[0]);

      reader.onload = () => {
        if (acceptedFiles === null || acceptedFiles.length === 0) return;

        const nameFile = acceptedFiles[0].name;

        if (!imgs.some((obj) => obj.name === nameFile)) {
          if (typeof reader.result === "string") {
            const obj = {
              name: nameFile,
              img_url: reader.result,
              file: acceptedFiles[0]
            };

            setImgs([...imgs, obj]);
          }
        }
      };
    },
    [imgs]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": []
    }
  });

  const getModels = async (brand: string) => {
    if (!brand) {
      setModels(undefined);
      return;
    }

    const result = await axios.get(`https://kenzie-kars.herokuapp.com/cars?brand=${brand}`);

    setModels(result.data);
  };

  const setSelectedCar = (name: string) => {
    const car = models?.find((car) => car.name === name);

    setCarSelected(car);
  };

  const removeImg = (nameImg: string) => {
    const newListImg = imgs.filter((obj) => obj.name !== nameImg);

    setImgs(newListImg);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors
  } = useForm({
    resolver: zodResolver(createAnnoucementSchema),
    mode: "onChange"
  });

  const submit: SubmitErrorHandler<TCreateAnnoucement> = async (data) => {
    const valueTreated = value.replace(/\D/g, "");
    if (!valueTreated) {
      setError("value", { type: "required", message: "Digite um valor para o carro" });
    } else if (valueTreated.length > 10) {
      setError("value", { type: "required", message: "Digite um valor de até R$ 10.000.000,00" });
    } else if (imgs.length === 0) {
      setError("img", { type: "required", message: "Envie ao menos 1 imagem" });
    } else {
      const newObjCarSelect = {
        fipe_price: carSelected?.value,
        ...carSelected,
        year: parseInt(carSelected!.year),
        fuel_type: String(carSelected?.fuel)
      };
      delete newObjCarSelect.fuel;
      delete newObjCarSelect.id;
      delete newObjCarSelect.name;

      const newData = {
        ...newObjCarSelect,
        ...data,
        img_default: imgs[0],
        gallery: new Array(),
        value: parseInt(valueTreated),
        is_active: true
      };

      if (imgs.length > 1) {
        const requestImgs = async (img: File): Promise<any> => {
          return new Promise(async (resolve, reject) => {
            const gallery = new FormData();
            gallery.append("file", img);
            gallery.append("upload_preset", "jgbdewxg");

            const response = await axios.post(
              "https://api.cloudinary.com/v1_1/dv4egxu7a/image/upload",
              gallery
            );

            resolve(response.data);
            reject(response);
          });
        };

        const imgsGallery = imgs.map(async (img) => {
          if (img === imgs[0]) {
            return undefined;
          }
          return await requestImgs(img.file);
        });

        const results = await Promise.all(imgsGallery);
        results.filter(
          (obj: undefined | { secure_url: string }) => obj && newData.gallery.push(obj.secure_url)
        );
      }

      const imgDefault = new FormData();
      imgDefault.append("file", newData.img_default.file);
      imgDefault.append("upload_preset", "jgbdewxg");

      const resultImgDefault = await axios.post(
        "https://api.cloudinary.com/v1_1/dv4egxu7a/image/upload",
        imgDefault
      );

      newData.img_default = resultImgDefault.data.secure_url;

      const result = await createAnnouncer(newData);
      if (result) {
        setSuccess(true);
        setTimeout(async () => {
          await api.get(`/users/${params.id}`).then((response) => setCar(response.data));

          onClose();
          setSuccess(false);
        }, 3000);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="w-11/12 p-6 flex flex-col gap-8 max-w-[520px]">
        <ModalHeader className="p-0 heading-7-500 text-grey1">
          {edit ? "Editar anúncio" : success === true ? "Sucesso!" : "Criar anúncio"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="p-0">
          {success === false ? (
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(submit)}>
              <h3 className="body-2-500 text-grey0">Informações do veículo</h3>

              <div className="flex flex-col gap-2">
                <label className="body-2-500 text-grey0">Marca</label>
                <Select
                  className="input-outline"
                  variant={"unstyled"}
                  placeholder={"Selecione uma marca"}
                  required={true}
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
                  {...register("model")}
                  disabled={models ? false : true}
                  defaultValue={car?.brand}
                  required={true}
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
                        : carSelected && carSelected.fuel === 3
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
                    inputClass={clsx(
                      "input-outline",
                      errors.mileage ? "border-feedbackAlert1" : "border-grey7"
                    )}
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
                    inputClass={clsx(
                      "input-outline",
                      errors.color ? "border-feedbackAlert1" : "border-grey7"
                    )}
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
                  <label className="body-2-500 text-grey0">Preço</label>
                  <NumericFormat
                    name="value"
                    prefix="R$ "
                    thousandSeparator="."
                    decimalScale={2}
                    decimalSeparator=","
                    maxLength={16}
                    className={clsx(
                      "input-outline",
                      errors.value ? "border-feedbackAlert1" : "border-grey7"
                    )}
                    placeholder="R$: 50.000,00"
                    onChange={(e) => setValue(e.target.value)}
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
                    inputName="is_active"
                    inputId="active"
                    value="true"
                    inputClass="absolute w-0 h-0"
                    labelClass="hidden"
                    inputChecked={car?.is_active}
                  />
                  <label
                    htmlFor="active"
                    className="relative w-full button-big border-2 border-grey4 rounded text-center cursor-pointer">
                    Sim
                  </label>

                  <Input
                    inputType="radio"
                    inputName="is_active"
                    inputId="inative"
                    value="false"
                    inputClass="absolute w-0 h-0"
                    labelClass="hidden"
                    inputChecked={car?.is_active}
                  />
                  <label
                    htmlFor="inative"
                    className="relative w-full button-big border-2 border-grey4 rounded text-center cursor-pointer">
                    Não
                  </label>
                </fieldset>
              )}

              <div
                {...getRootProps()}
                className={clsx(
                  "border-2 border-dashed rounded flex flex-col py-7 justify-center items-center cursor-pointer",
                  isDragActive ? "bg-grey5" : "bg-grey7",
                  errors.img ? "border-feedbackAlert1" : "border-brand2"
                )}>
                <input {...getInputProps()} {...register("img", { required: true })} />
                <div>
                  <FiUploadCloud
                    size={42}
                    className={clsx(
                      "mx-auto mb-2",
                      errors.img ? "text-feedbackAlert1" : "text-brand1"
                    )}
                  />
                  <p className="text-grey2 py-2 body-2-400 text-center">
                    <span className="text-grey0 body-1-600">Escolha uma imagem</span> ou{" "}
                    <span className="text-grey0 body-1-600">arraste-o aqui</span>
                  </p>
                  <p className="text-grey3 text-xs text-center">
                    Obs: A primeira imagem vai ser utilizada como capa
                  </p>

                  {errors.img && (
                    <p className="text-feedbackAlert1 text-base pt-2 text-center">
                      Envie ao menos 1 imagem
                    </p>
                  )}
                </div>
              </div>

              {imgs && (
                <ul className="flex gap-3 pb-2 flex-nowrap overflow-x-auto">
                  {imgs.map((obj, index) => (
                    <li
                      key={index}
                      className="w-28 relative group/item cursor-pointer"
                      onClick={() => removeImg(obj.name)}>
                      <figure className="w-28 h-28 flex justify-center items-center rounded bg-grey7 group-hover/item:bg-grey5 duration-300 overflow-hidden">
                        <img src={obj.img_url} alt={obj.img_url} className="object-contain" />
                      </figure>
                      <p className="truncate body-2-400 text-xs text-grey2">{obj.name}</p>
                      <Button
                        type="button"
                        className="absolute p-1 top-0 right-0 bg-grey5 rounded-full group/edit opacity-0 group-hover/item:opacity-100 duration-300">
                        <MdOutlineClose size={16} color="red" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}

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
          ) : (
            <div className="flex flex-col gap-5">
              <h2 className="text-grey1 heading-7-600">Seu anúncio foi criado com sucesso!</h2>
              <p className="text-grey2 body-1-400 mb-4">
                Agora você poderá ver seus negócios crescendo em grande escala
              </p>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
