"use client";

import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/Navbar";
import { ICars } from "@/components/ProductCard";
import { useUser } from "@/hooks/useUser";
import { api } from "@/services/api";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure
} from "@chakra-ui/react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getRandomColor } from "@/utils/getRandomColor";
import Image from "next/image";
import { CommentCard } from "@/components/CommentCard";
import { LoadingAnimate } from "./components/loading";

interface IVehicleDetailProps {
  params: {
    id: string;
  };
}

const VehicleDetail = ({ params }: IVehicleDetailProps) => {
  const router = useRouter();

  const { user, createComment } = useUser();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [carSelected, setCarSelected] = useState<ICars>();
  const [message, setMessage] = useState("");
  const [imgDefault, setImgDefault] = useState<string | undefined>("");

  useEffect(() => {
    (() => {
      getCarByParams(params.id);
    })();
  }, []);

  const getCarByParams = async (id: string) => {
    const response = await api.get(`/cars/${id}`);

    const result: ICars = response.data;

    if (!carSelected) {
      result.comments.map((comment) => {
        if (!comment.user.randomColor) {
          comment.user.randomColor = getRandomColor();
        }
      });
    } else {
      result.comments.map((comment, index) => {
        if (carSelected.comments[index] === undefined) {
          comment.user.randomColor = getRandomColor();
        } else {
          comment.user.randomColor = carSelected.comments[index].user.randomColor;
        }
      });
    }

    setCarSelected(result);
  };

  const { handleSubmit, register } = useForm<{ description: string }>();

  const submit: SubmitHandler<{ description: string }> = async (data) => {
    if (!user) {
      router.push("/login");
    } else {
      const result = await createComment(data, params.id);

      if (result) {
        getCarByParams(params.id);
        setMessage("");
      }
    }
  };

  const imageStyle = {
    width: "auto",
    maxHeight: "355px"
  };

  return (
    <>
      <NavBar />
      {carSelected ? (
        <main className="background-detail-page min-h-screen">
          <div className="max-w-[78rem] w-full px-3 py-10 mx-auto relative">
            <section className="flex flex-col lg:flex-row lg:gap-11 lg:max-w-[61.5%]">
              <div className="mb-7 lg:mb-4 flex flex-col gap-4 w-full">
                <section>
                  <figure
                    className="h-[355px] bg-grey10 rounded flex justify-center items-center overflow-hidden cursor-pointer"
                    onClick={() => {
                      setImgDefault(carSelected.img_default);
                      onOpen();
                    }}>
                    <Image
                      src={carSelected.img_default}
                      alt={carSelected.model}
                      width={1920}
                      height={1080}
                      style={imageStyle}
                      priority={true}
                    />
                  </figure>
                </section>

                <section className="p-7 sm:px-11 bg-grey10 rounded flex flex-col gap-8">
                  <h1 className="text-grey1 heading-6-600">
                    {carSelected.brand} - {carSelected.model}
                  </h1>

                  <div className="flex flex-col gap-9 sm:justify-between sm:flex-row">
                    <div className="flex gap-3">
                      <p className="body-2-500 text-brand1 rounded py-1 px-2 bg-brand4">
                        {carSelected.mileage} KM
                      </p>
                      <p className="body-2-500 text-brand1 rounded py-1 px-2 bg-brand4">
                        {carSelected.year}
                      </p>
                    </div>

                    <p className="heading-7-600 text-grey1">
                      {carSelected &&
                        parseInt(carSelected.value).toLocaleString(undefined, {
                          style: "currency",
                          currency: "BRL"
                        })}
                    </p>
                  </div>

                  <Link
                    href={`https://wa.me/${carSelected.user.celphone}`}
                    target="_blank"
                    className="btn-brand1-big w-fit">
                    Comprar
                  </Link>
                </section>

                <section className="py-9 px-7 sm:px-11 lg:mt-6 bg-grey10 rounded flex flex-col gap-8">
                  <h2 className="text-grey1 heading-6-600">Descrição</h2>
                  {carSelected.description ? (
                    <p className="text-grey2 body-1-400">{carSelected.description}</p>
                  ) : (
                    <p className="text-grey2 body-1-400">Não possuí descrição</p>
                  )}
                </section>
              </div>

              <div className="lg:max-w-[440px] lg:w-[35.5%] flex flex-col gap-8 mb-16 lg:absolute lg:right-0">
                <section className="bg-grey10 rounded p-9 flex flex-col">
                  <h2 className="heading-6-600 mb-9">Fotos</h2>
                  <ul className="flex flex-wrap justify-evenly gap-x-1.5 gap-y-12 w-full ">
                    {carSelected.gallery.length ? (
                      carSelected.gallery.map((gallery, index) => (
                        <figure
                          key={index}
                          className="bg-grey7 rounded max-w-[108px] max-h-[108px] w-full h-full flex justify-center items-center overflow-hidden"
                          onClick={() => {
                            setImgDefault(gallery.imageUrl);
                            onOpen();
                          }}>
                          <Image
                            src={gallery.imageUrl}
                            alt={carSelected.model}
                            width={108}
                            height={108}
                            style={{ width: "auto", maxHeight: "108px" }}
                          />
                        </figure>
                      ))
                    ) : (
                      <p className="text-grey2 body-1-400 w-full">Carro não possui outras fotos</p>
                    )}
                  </ul>
                </section>

                <section className="flex flex-col bg-grey10 rounded py-10 px-7 gap-7 items-center max-h-[905px]">
                  <div className="flex flex-col gap-7 items-center justify-center">
                    <div className="w-[77px] h-[77px] rounded-full bg-brand2 flex justify-center items-center">
                      <p className="text-whiteFixed font-medium text-2xl">
                        {carSelected &&
                          carSelected.user.name[0].toUpperCase() +
                            carSelected.user.name[
                              carSelected.user.name.lastIndexOf(" ") + 1
                            ].toUpperCase()}
                      </p>
                    </div>
                    <p className="text-grey2 heading-6-600">{carSelected!.user.name}</p>
                  </div>

                  <p className="body-1-400 text-grey2 text-center max-h-[600px] overflow-y-auto">
                    {carSelected.user.description}
                  </p>

                  <Link
                    href={`/user/${carSelected.user.uuid}`}
                    className="rounded max-w-[206px] w-full h-12 btn-gray1-big p-0 text-grey10 flex justify-center items-center">
                    Ver todos anuncios
                  </Link>
                </section>
              </div>
            </section>

            <section className="flex flex-col gap-8 lg:max-w-[61.5%] overflow-hidden">
              <section className="bg-grey10 max-h-[600px] overflow-y-auto mt-4 lg:mt-0 relative">
                <div className="bg-grey10 w-full px-7 pt-9 pb-6 sm:px-11 sticky right-0 left-0 -top-1 z-10 flex items-center">
                  <h2 className="text-grey1 text-center heading-6-600">Comentários</h2>
                </div>

                <ul className="flex flex-col gap-11 px-7 pb-9 sm:px-11">
                  {carSelected.comments.length ? (
                    carSelected.comments.map((comment, index) => (
                      <CommentCard
                        key={index}
                        comment={comment}
                        getCarByParams={getCarByParams}
                        paramId={params.id}
                        carState={setCarSelected}
                      />
                    ))
                  ) : (
                    <p className="text-grey2 body-2-400">Seja o primeiro a comentar!</p>
                  )}
                </ul>
              </section>
              <section className="py-9 px-7 sm:px-11 flex flex-col bg-grey10 rounded">
                {user ? (
                  <div className="flex gap-2 items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex justify-center items-center bg-brand1`}>
                      <p className="text-whiteFixed font-medium text-sm">
                        {user.name[0].toUpperCase() +
                          user.name[user.name.lastIndexOf(" ") + 1].toUpperCase()}
                      </p>
                    </div>
                    <p className="text-grey1 body-2-500">{user.name}</p>
                  </div>
                ) : null}
                <form
                  onSubmit={handleSubmit(submit)}
                  className="mt-4 flex flex-col items-start gap-6 md:border-2 md:border-grey7 md:rounded md:items-end md:p-3">
                  <textarea
                    {...register("description")}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    placeholder="Digitar comentário"
                    className="input-placeholder text-grey2 p-3 resize-none border-2 border-grey7 rounded placeholder:text-grey3 w-full max-h-[150px] min-h-[128px] focus:outline-none md:border-none"
                  />
                  <Button
                    type="submit"
                    className={clsx(
                      "relative",
                      user
                        ? "btn-brand1-big"
                        : "btn-disable-big cursor-default after:absolute after:content-[''] after:top-0 after:right-0 after:opacity-0 after:text-[12px] after:text-grey2 after:w-max hover:after:content-['Precisa_estar_logado_para_comentar!'] hover:after:-top-6 hover:after:opacity-100 after:duration-300"
                    )}>
                    Comentar
                  </Button>
                </form>

                <div className="flex flex-wrap gap-x-2 gap-y-6 mt-4">
                  <Button
                    type="button"
                    onClick={() => setMessage("Gostei muito!")}
                    className="bg-grey7 text-grey3 body-2-500 text-xs rounded-full px-3 py-1 hover:bg-grey5 hover:text-grey2 duration-300">
                    Gostei muito!
                  </Button>

                  <Button
                    type="button"
                    onClick={() => setMessage("Incrível")}
                    className="bg-grey7 text-grey3 body-2-500 text-xs rounded-full px-3 py-1 hover:bg-grey5 hover:text-grey2 duration-300">
                    Incrível
                  </Button>

                  <Button
                    type="button"
                    onClick={() => setMessage("Recomendarei para meus amigos!")}
                    className="bg-grey7 text-grey3 body-2-500 text-xs rounded-full px-3 py-1 hover:bg-grey5 hover:text-grey2 duration-300">
                    Recomendarei para meus amigos!
                  </Button>
                </div>
              </section>
            </section>
          </div>
        </main>
      ) : (
        <LoadingAnimate />
      )}
      <Footer />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="w-11/12 p-6 flex flex-col gap-8 max-w-[520px]">
          <ModalHeader className="p-0 heading-7-500 text-grey1">Imagem do veículo</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="p-0">
            <figure className="h-[355px] bg-grey7 rounded flex justify-center items-center overflow-hidden">
              {carSelected?.model && (
                <Image
                  src={imgDefault!}
                  alt={carSelected!.model}
                  width={520}
                  height={355}
                  style={{ width: "auto", maxHeight: "355px" }}
                />
              )}
            </figure>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VehicleDetail;
