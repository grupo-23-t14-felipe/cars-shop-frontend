"use client";

import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { ModalVehicle } from "@/components/ModalVehicle";
import { NavBar } from "@/components/Navbar";
import { ICars, ProductCard } from "@/components/ProductCard";
import { IUser } from "@/context/UserContext/types";
import { useUser } from "@/hooks/useUser";
import { api } from "@/services/api";
import { useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IProfileProps {
  params: {
    id: string;
  };
}

const ProfileDetailPage = ({ params }: IProfileProps) => {
  const [defineModal, setDefineModal] = useState<boolean>(true);

  const [carSelected, setCarSelected] = useState<ICars>();
  const [car, setCar] = useState<ICars[]>();
  const [ownerPage, setOwnerPage] = useState<IUser>();

  const { user } = useUser();

  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    api.get(`/users/${params.id}`).then((response) => {
      setCar(response.data);
      setOwnerPage(response.data[0].user);
    });
  }, []);

  return (
    <>
      <NavBar />
      <main className="background-detail-page pt-16">
        <div className="container-default px-4">
          <section className="bg-grey10 py-10 px-7 flex flex-col gap-4 rounded">
            <div className="flex flex-col gap-6 items-start justify-center">
              <div className="w-[104px] h-[104px] rounded-full bg-brand2 flex justify-center items-center">
                {ownerPage && (
                  <p className="text-whiteFixed font-medium text-4xl">
                    {ownerPage.name[0].toUpperCase() +
                      ownerPage.name[ownerPage.name.lastIndexOf(" ") + 1].toUpperCase()}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                {ownerPage && <p className="text-grey1 heading-6-600">{ownerPage.name}</p>}
                {ownerPage?.is_seller && (
                  <p className="body-2-500 text-brand1 rounded bg-brand4 text-center py-1 px-2">
                    Anunciante
                  </p>
                )}
              </div>
              {ownerPage && <p className="text-grey2 body-1-400">{ownerPage.description}</p>}
            </div>
            {user?.uuid === params.id && (
              <Button
                className="btn-outline-brand-1-big w-fit"
                onClick={() => {
                  onOpen(), setDefineModal(false);
                }}>
                Criar anúncio
              </Button>
            )}
          </section>
        </div>

        <section className="flex flex-col gap-[106px] pb-12 py-48 items-center">
          {ownerPage?.uuid !== user?.uuid && (
            <div className="flex w-full xl:w-11/12 px-4 -mt-36 -mb-11">
              <h2 className="heading-5-600 text-grey0 text-left">Anúncios</h2>
            </div>
          )}
          <ul className="flex flex-nowrap w-full overflow-x-scroll pb-4 px-4 gap-12 lg:overflow-auto lg:flex-wrap lg:justify-center xl:grid xl:grid-cols-3 xl:w-9/12 2xl:flex 2xl:w-auto 2xl:gap-10">
            {car &&
              car.map((car, index) => (
                <div key={index} className="flex flex-col gap-4 max-w-[312px] min-w-[290px]">
                  <ProductCard car={car} />
                  {user?.uuid === params.id && (
                    <div className="flex gap-4 flex-wrap">
                      <Button
                        className="btn-outline-1-medium"
                        onClick={() => {
                          onOpen(), setCarSelected(car), setDefineModal(true);
                        }}>
                        Editar
                      </Button>
                      <Link href={`/vehicle/${car.uuid}`} className="btn-outline-1-medium">
                        Ver detalhes
                      </Link>
                    </div>
                  )}
                </div>
              ))}
          </ul>

          <div className="flex flex-col md:flex-row justify-center items-center gap-5">
            {/* <Button className="text-brand2 heading-5-600 hover:text-brand1 duration-300">
            {"<"} Anterior
          </Button> */}

            <p className="heading-5-600 text-grey4">
              <span className="text-grey3">1</span> de 2
            </p>

            <Button className="text-brand2 heading-5-600 hover:text-brand1 duration-300">
              Seguinte {">"}
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      {isOpen && (
        <ModalVehicle
          isOpen={isOpen}
          onClose={onClose}
          edit={defineModal}
          car={carSelected}
          setCar={setCar}
        />
      )}
    </>
  );
};
export default ProfileDetailPage;
