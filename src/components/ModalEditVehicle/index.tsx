import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Select,
  useDisclosure,
  Stack,
  Skeleton
} from "@chakra-ui/react";
import { Button } from "../Button";
import { Input } from "../Input";
import { ICars } from "../ProductCard";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { IListCars, IListModelCars } from "./types";
import { FiUploadCloud } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { TCreateAnnoucement, createAnnoucementSchema } from "./validators";
import { NumericFormat } from "react-number-format";
import { useUser } from "@/hooks/useUser";
import { api } from "@/services/api";
import { useParams } from "next/navigation";
import { ImgListCard } from "../ImgListCard";
import { ModalButtonDeleteAd } from "../ModalDeleteVehicle";
import axios from "axios";
import clsx from "clsx";

interface IModalVehicleProps {
  setCar: Dispatch<SetStateAction<ICars[] | undefined>>;
  carToEdit: ICars;
}

export const ModalEditVehicle = ({ setCar, carToEdit }: IModalVehicleProps) => {
  const params = useParams();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { updateAnnouncer, deleteAd } = useUser();

  const [allCars, setAllCars] = useState<IListCars>();
  const [models, setModels] = useState<IListModelCars[]>();
  const [carSelected, setCarSelected] = useState<IListModelCars>();
  const [imgs, setImgs] = useState<{ name: string; img_url: string; file: File }[]>([]);
  const [carValue, setCarValue] = useState(carToEdit.value.slice(0, -2));
  const [color, setColor] = useState(carToEdit.color);
  const [imgCape, setImgCape] = useState<
    | string
    | {
        name: string;
        img_url: string;
        file: File;
      }
  >("");
  const [gallery, setGallery] = useState<{ uuid: string; imageUrl: string }[]>([]);
  const [buttonDisable, setButtonDisable] = useState(true);

  useEffect(() => {
    if (isOpen) {
      (() => {
        fetch("https://kenzie-kars.herokuapp.com/cars")
          .then((response) => response.json())
          .then((data) => {
            setAllCars(data);
          });

        fetch(
          `https://kenzie-kars.herokuapp.com/cars/unique?brand=${carToEdit.brand}&name=${carToEdit.model}&year=${carToEdit.year}&fuel=${carToEdit.fuel_type}`
        )
          .then((response) => response.json())
          .then((data) => {
            setCarSelected(data);
          });

        fetch(`https://kenzie-kars.herokuapp.com/cars?brand=${carToEdit.brand}`)
          .then((response) => response.json())
          .then((data) => {
            setModels(data);
          });
      })();

      setValue("brand", carToEdit.brand);
      setValue("model", carToEdit.model);
      setImgCape(carToEdit.img_default);
      setGallery(carToEdit.gallery);
      clearErrors();
    }
  }, [isOpen]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles === null || acceptedFiles.length === 0) return;

      clearErrors("img");

      const reader = new FileReader();

      reader.readAsDataURL(acceptedFiles[0]);

      reader.onload = () => {
        if (acceptedFiles === null || acceptedFiles.length === 0) return;

        if (acceptedFiles[0].size > 10485760) {
          setError("img", { type: "required", message: "Esta imagem ultrapassa os 10mb" });

          setTimeout(() => {
            clearErrors("img");
          }, 3000);
          return;
        }

        const nameFile = acceptedFiles[0].name;

        if (!imgs.some((obj) => obj.name === nameFile)) {
          if (typeof reader.result === "string") {
            const obj = {
              name: nameFile,
              img_url: reader.result,
              file: acceptedFiles[0]
            };

            setButtonDisable(false);

            if (imgCape) {
              setImgs([...imgs, obj]);
            } else {
              setImgCape(obj);
            }
          }
        }
      };
    },
    [imgs, imgCape, gallery]
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
    if (nameImg === "removeCape") {
      setImgCape("");
    } else {
      const newListImg = imgs.filter((obj) => obj.name !== nameImg);

      setImgs(newListImg);
      if (!newListImg.length) {
        setButtonDisable(true);
      }
    }
  };

  const imgHasRemoved = (uuidImg: string) => {
    const newGallery = gallery.filter((img) => img.uuid !== uuidImg);

    setGallery(newGallery);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    clearErrors
  } = useForm({
    resolver: zodResolver(createAnnoucementSchema),
    mode: "onChange"
  });

  const submit: SubmitErrorHandler<TCreateAnnoucement> = async (data) => {
    if (buttonDisable) {
      return;
    }
    setButtonDisable(true);

    const valueTreated = carValue.replace(/\D/g, "");

    if (!valueTreated) {
      setError("value", { type: "required", message: "Digite um valor para o carro" });
    } else if (valueTreated.length > 10) {
      setError("value", { type: "required", message: "Digite um valor de até R$ 10.000.000,00" });
    } else if (!imgCape) {
      setError("img", { type: "required", message: "Envie ao menos 1 imagem" });
    } else {
      const linkImagesUploaded: string[] = [];

      if (imgs.length > 0) {
        const requestImgs = async (img: File): Promise<any> => {
          return new Promise((resolve, reject) => {
            const gallery = new FormData();
            gallery.append("file", img);
            gallery.append("upload_preset", "hil8tskt");

            try {
              axios
                .post(`https://api.cloudinary.com/v1_1/da3v0st5x/image/upload`, gallery)
                .then((response) => {
                  resolve(response.data);
                  reject(response);
                });
            } catch (error: any) {
              console.error(error);
            }
          });
        };

        const imgsGallery = imgs.map(async (img) => {
          return await requestImgs(img.file);
        });

        const results = await Promise.all(imgsGallery);
        results.filter(
          (obj: undefined | { secure_url: string }) =>
            obj && linkImagesUploaded.push(obj.secure_url)
        );
      }

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
        img_default: imgCape,
        gallery: linkImagesUploaded,
        value: parseInt(valueTreated)
      };

      if (typeof imgCape === "object") {
        const imgDefault = new FormData();
        imgDefault.append("file", imgCape.file);
        imgDefault.append("upload_preset", "hil8tskt");

        const resultImgDefault = await axios.post(
          `https://api.cloudinary.com/v1_1/da3v0st5x/image/upload`,
          imgDefault
        );

        newData.img_default = resultImgDefault.data.secure_url;
      }

      const result = await updateAnnouncer(newData, carToEdit.uuid);

      if (result) {
        setTimeout(async () => {
          await api
            .get(`/users/cars/${params.id}`)
            .then((response) => setCar(response.data.data.cars));

          setButtonDisable(true);
          setImgs([]);

          onClose();
        }, 1000);
      }
    }
    setButtonDisable(false);
  };

  const deleteVehicle = async (uuid: string) => {
    const result = await deleteAd(uuid);

    if (result) {
      setTimeout(async () => {
        await api
          .get(`/users/cars/${params.id}${window.location.search}`)
          .then((response) => setCar(response.data.data.cars));

        onClose();
      }, 1000);
    }
  };

  const checkHaveChanges = (valueDefault: string | number, valueChanged: string | number) => {
    if (valueDefault !== valueChanged) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  };

  const checkCharacters = (value: string) => {
    setColor(value.replace(/[^A-Za-z ]+/g, ""));
  };

  return (
    <>
      <Button onClick={onOpen} className="btn-outline-1-medium">
        Editar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="w-11/12 p-6 flex flex-col gap-8 max-w-[520px]">
          <ModalHeader className="p-0 heading-7-500 text-grey1">Editar anúncio</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="p-0">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(submit)}>
              <h3 className="body-2-500 text-grey0">Informações do veículo</h3>

              <div className="flex flex-col gap-2">
                <label className="body-2-500 text-grey0">Marca</label>
                {allCars ? (
                  <Select
                    defaultValue={carToEdit.brand}
                    className="input-outline"
                    variant={"unstyled"}
                    required={true}
                    {...register("brand")}
                    onChange={(e) => {
                      checkHaveChanges(carToEdit.brand, e.target.value);
                      getModels(e.target.value);
                    }}
                    placeholder="Selecione uma marca">
                    {allCars &&
                      Object.keys(allCars).map((brand, index) => (
                        <option key={index} value={brand}>
                          {brand}
                        </option>
                      ))}
                  </Select>
                ) : (
                  <Stack>
                    <Skeleton height={12} className="rounded" />
                  </Stack>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="body-2-500 text-grey0">Modelo</label>
                {models ? (
                  <Select
                    defaultValue={carToEdit.model}
                    className="input-outline"
                    variant={"unstyled"}
                    {...register("model")}
                    disabled={models ? false : true}
                    required={true}
                    onChange={(e) => {
                      checkHaveChanges(carToEdit.model, e.target.value);
                      setSelectedCar(e.target.value);
                    }}
                    placeholder="Selecione um modelo">
                    {models &&
                      models.map((model, index) => (
                        <option key={index} value={model.name}>
                          {model.name}
                        </option>
                      ))}
                  </Select>
                ) : (
                  <Stack>
                    <Skeleton height={12} className="rounded" />
                  </Stack>
                )}
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
                    inputDefaultValue={carSelected ? carSelected.year : carToEdit.year}
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
                        : carToEdit.fuel_type === "1"
                        ? "Gasolina / Etanol"
                        : carToEdit.fuel_type === "2"
                        ? "Híbrido"
                        : carToEdit.fuel_type === "3"
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
                    labelChildren="Quilometragem"
                    labelClass="body-2-500 text-grey0"
                    inputDefaultValue={carToEdit.mileage}
                    onChange={(e) => {
                      checkHaveChanges(String(carToEdit.mileage), e.target.value);
                    }}
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
                    labelChildren="Cor"
                    labelClass="body-2-500 text-grey0"
                    inputDefaultValue={
                      carToEdit.color[0].toUpperCase() + carToEdit.color.substring(1)
                    }
                    onChange={(e) => {
                      checkCharacters(e.target.value);
                      checkHaveChanges(carToEdit.color.toLowerCase(), e.target.value.toLowerCase());
                    }}
                    value={color}
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
                    maxLength={13}
                    className={clsx(
                      "input-outline",
                      errors.value ? "border-feedbackAlert1" : "border-grey7"
                    )}
                    placeholder="R$: 50.000,00"
                    defaultValue={`${carToEdit.value.slice(0, -2)},00`}
                    onChange={(e) => {
                      checkHaveChanges(
                        carToEdit.value.slice(0, -3),
                        e.target.value.replace(/\D/g, "")
                      );
                      setCarValue(e.target.value);
                    }}
                  />
                </div>
              </fieldset>

              <div className="flex flex-col gap-2">
                <label className="body-2-500 text-grey0">Descrição</label>
                <textarea
                  {...register("description")}
                  className="input-outline resize-none h-20 body-1-400 text-grey2"
                  placeholder="Descrição do veículo"
                  defaultValue={carToEdit.description}
                  onChange={(e) => {
                    checkHaveChanges(carToEdit.description, e.target.value);
                  }}
                />
              </div>

              <fieldset className="flex gap-x-3 fieldset-radios">
                <legend className="body-2-500 text-grey0">Publicado</legend>

                <Input
                  inputType="radio"
                  inputName="is_active"
                  inputId="active"
                  value="true"
                  inputClass="absolute w-0 h-0"
                  labelClass="hidden"
                  inputDefaultChecked={carToEdit?.is_active}
                  register={register("is_active")}
                  onChange={(e) => {
                    checkHaveChanges(String(carToEdit.is_active), e.target.value);
                  }}
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
                  inputDefaultChecked={!carToEdit?.is_active}
                  register={register("is_active")}
                  onChange={(e) => {
                    checkHaveChanges(String(carToEdit.is_active), e.target.value);
                  }}
                />
                <label
                  htmlFor="inative"
                  className="relative w-full button-big border-2 border-grey4 rounded text-center cursor-pointer">
                  Não
                </label>
              </fieldset>

              <div
                {...getRootProps()}
                className={clsx(
                  "border-2 border-dashed rounded flex flex-col py-7 justify-center items-center cursor-pointer",
                  isDragActive ? "bg-grey5" : "bg-grey7",
                  errors.img ? "border-feedbackAlert1" : "border-brand2"
                )}>
                <input {...getInputProps()} />
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
                  {!imgCape ? (
                    <p className="text-grey3 text-xs text-center">
                      Adicione a imagem que vai ser utilizada como capa
                    </p>
                  ) : (
                    <p className="text-grey3 text-xs text-center">
                      Adicione imagens para a galeria
                    </p>
                  )}

                  {errors.img && (
                    <p className="text-feedbackAlert1 text-base pt-2 text-center">
                      {String(errors.img.message)}
                    </p>
                  )}
                </div>
              </div>

              <ul className="flex gap-3 pb-2 flex-nowrap overflow-x-auto">
                {imgCape && (
                  <ImgListCard
                    imgAlt={carToEdit.model}
                    imgUrl={typeof imgCape === "string" ? imgCape : imgCape.img_url}
                    objName="Imagem da capa"
                    onClick={() => removeImg("removeCape")}
                  />
                )}
                {gallery.map((car, index) => (
                  <ImgListCard
                    key={index}
                    imgAlt={carToEdit.model}
                    imgUrl={car.imageUrl}
                    objName="Imagem da galeria"
                    deleteImg={true}
                    imgUuid={car.uuid}
                    callImgRemove={imgHasRemoved}
                  />
                ))}
                {imgs &&
                  imgs.map((obj, index) => (
                    <ImgListCard
                      key={index}
                      imgAlt={obj.name}
                      imgUrl={obj.img_url}
                      objName={obj.name}
                      onClick={() => removeImg(obj.name)}
                    />
                  ))}
              </ul>

              <div className="flex gap-3">
                <ModalButtonDeleteAd
                  uuid={carToEdit.uuid}
                  onClick={() => deleteVehicle(carToEdit.uuid)}
                />
                <Button
                  type="submit"
                  className={clsx("w-full", buttonDisable ? "btn-disable-big" : "btn-brand1-big")}
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
