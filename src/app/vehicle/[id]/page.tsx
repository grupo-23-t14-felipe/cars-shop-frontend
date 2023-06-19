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

interface IVehicleDetailProps {
  params: {
    id: string;
  };
}

const calcDatePost = (date: string) => {
  let dateComment = new Date(date).getTime();
  let dateNow = new Date().getTime();
  let diff = dateNow - dateComment;
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days > 730) {
    return `há ${Math.floor(days / 365)} anos`;
  } else if (days > 365) {
    return "há 1 ano";
  } else if (days > 60) {
    return `há ${Math.floor(days / 30)} meses`;
  } else if (days > 30) {
    return "há 1 mês";
  }
};

export const VehicleDetail = ({ params }: IVehicleDetailProps) => {
  const router = useRouter();

  const [carSelected, setCarSelected] = useState<ICars>();

  useEffect(() => {
    (() => {
      api.get(`/cars/${params.id}`).then((response) => setCarSelected(response.data));
    })();
  }, []);

  console.log(carSelected);

  const { user } = useUser();

  const [message, setMessage] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [imgDefault, setImgDefault] = useState<string | undefined>("");

  const { handleSubmit, register } = useForm<{ comment: string }>();

  const submit: SubmitHandler<{ comment: string }> = (data) => {
    if (!user) {
      router.push("/login");
    }

    console.log(data);
  };

  return (
    <>
      <NavBar />
      {carSelected ? (
        <main className="background-detail-page">
          <div className="max-w-[78rem] w-full px-3 py-10 mx-auto relative">
            <section className="flex flex-col lg:flex-row lg:gap-11 lg:max-w-[61.5%]">
              <div className="mb-7 lg:mb-4 flex flex-col gap-4 w-full">
                <section>
                  <figure
                    className="h-[355px] bg-grey10 rounded flex justify-center items-center overflow-hidden cursor-pointer"
                    onClick={() => {
                      setImgDefault(carSelected && carSelected?.img_default);
                      onOpen();
                    }}>
                    <img
                      src={carSelected && carSelected?.img_default}
                      alt={carSelected && carSelected?.model}
                      className="h-[355px] object-contain"
                    />
                  </figure>
                </section>

                <section className="p-7 sm:px-11 bg-grey10 rounded flex flex-col gap-8">
                  <h1 className="text-grey1 heading-6-600">
                    {carSelected && carSelected?.brand} - {carSelected && carSelected?.model}
                  </h1>

                  <div className="flex flex-col gap-9 sm:justify-between sm:flex-row">
                    <div className="flex gap-3">
                      <p className="body-2-500 text-brand1 rounded py-1 px-2 bg-brand4">
                        {carSelected && carSelected?.mileage} KM
                      </p>
                      <p className="body-2-500 text-brand1 rounded py-1 px-2 bg-brand4">
                        {carSelected && carSelected?.year}
                      </p>
                    </div>

                    <p className="heading-7-600 text-grey1">
                      {carSelected &&
                        carSelected?.value.toLocaleString(undefined, {
                          style: "currency",
                          currency: "BRL"
                        })}
                    </p>
                  </div>

                  <Button className="btn-brand1-big w-fit">Comprar</Button>
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

              <div className="lg:max-w-[440px] lg:w-[35.5%] flex flex-col gap-8 lg:absolute lg:right-0">
                <section className="bg-grey10 rounded p-9 flex flex-col">
                  <h2 className="heading-6-600 mb-9">Fotos</h2>
                  <ul className="flex flex-wrap justify-evenly gap-x-1.5 gap-y-12 w-full ">
                    {carSelected &&
                      carSelected?.gallery.map((gallery, index) => (
                        <figure
                          key={index}
                          className="bg-grey7 rounded max-w-[108px] max-h-[108px] w-full h-full flex justify-center items-center overflow-hidden"
                          onClick={() => {
                            setImgDefault(gallery.imageUrl);
                            onOpen();
                          }}>
                          <img
                            src={gallery.imageUrl}
                            alt={carSelected && carSelected.model}
                            className="object-contain h-[108px] w-full cursor-pointer"
                          />
                        </figure>
                      ))}
                  </ul>
                </section>

                <section className="flex flex-col bg-grey10 rounded py-10 px-7 gap-7 items-center">
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
                    <p className="text-grey2 heading-6-600">
                      {carSelected && carSelected!.user.name}
                    </p>
                  </div>

                  <p className="body-1-400 text-grey2 text-center">
                    {carSelected && carSelected?.user.description}
                  </p>

                  <Link
                    href={`/user/${carSelected && carSelected?.user.uuid}`}
                    className="rounded max-w-[206px] w-full h-12 btn-gray1-big p-0 text-grey10 flex justify-center items-center">
                    Ver todos anuncios
                  </Link>
                </section>
              </div>
            </section>

            <section className="flex flex-col gap-8 lg:max-w-[61.5%]">
              <section className="bg-grey10 py-9 px-7 sm:px-11 mt-4 lg:mt-0">
                <h2 className="text-grey1 heading-6-600 mb-6">Comentários</h2>

                <ul className="flex flex-col gap-11">
                  {carSelected.comments.length ? (
                    carSelected.comments.map((comment: any, index: number) => {
                      const corRandom = `background-random${Math.floor(Math.random() * 12) + 1}`;

                      return (
                        <li key={index} className="flex flex-col gap-3">
                          <div className="flex gap-2 items-center">
                            <div
                              className={clsx(
                                `w-8 h-8 rounded-full flex justify-center items-center`,
                                corRandom
                              )}>
                              <p className="text-whiteFixed font-medium text-sm">
                                {comment.user.name[0].toUpperCase() +
                                  comment.user.name[
                                    comment.user.name.lastIndexOf(" ") + 1
                                  ].toUpperCase()}
                              </p>
                            </div>
                            <p className="text-grey1 body-2-500">{comment.user.name}</p>
                            <p className="text-grey4">•</p>
                            <p className="text-grey3 body-2-400 text-xs">
                              {calcDatePost(comment.added_in)}
                            </p>
                          </div>

                          <div>
                            <p className="text-grey2 body-2-400">{comment.decription}</p>
                          </div>
                        </li>
                      );
                    })
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
                    {...register("comment")}
                    defaultValue={message}
                    placeholder="Digitar comentário"
                    className="input-placeholder text-grey2 p-3 resize-none border-2 border-grey7 rounded placeholder:text-grey3 w-full max-h-[150px] min-h-[128px] focus:outline-none md:border-none"
                  />
                  <Button
                    type="submit"
                    className={clsx(user ? "btn-brand1-big" : "btn-disable-big cursor-default")}
                    disable={user ? false : true}>
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
      ) : null}
      <Footer />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="w-11/12 p-6 flex flex-col gap-8 max-w-[520px]">
          <ModalHeader className="p-0 heading-7-500 text-grey1">Imagem do veículo</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="p-0">
            <figure>
              <img src={imgDefault} alt={carSelected && carSelected?.model} />
            </figure>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VehicleDetail;
