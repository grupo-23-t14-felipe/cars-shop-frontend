"use client";

import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/Navbar";
import { ICars, ProductCard } from "@/components/ProductCard";
import background from "@/assets/bg_header.png";
import Image from "next/image";
import { FilterHome } from "@/components/Filters";
import { ModalFilter } from "@/components/ModalFilter";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { UserProvider } from "@/context/UserContext";

const Home = () => {
  return (
    <UserProvider>
      <HomePage />
    </UserProvider>
  );
};

const HomePage = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [cars, setCars] = useState<ICars[]>();

  const searchParams = useSearchParams();

  useEffect(() => {
    (async () => {
      const response = await api.get(`/cars${window.location.search}`);

      setCars(response.data);
    })();
  }, [searchParams]);

  return (
    <>
      <NavBar />
      <header className="h-screen lg:h-[537px] w-full relative">
        <figure className="absolute top-0 right-0 left-0 bottom-0 -z-10">
          <Image src={background} alt="background" className="object-contain h-full w-full" />
        </figure>

        <div className="h-full pb-72 lg:pb-32 gap-8 flex flex-col justify-center items-center text-center text-grey10 bg-gradient-to-t from-black to-[#868e9630]">
          <h1 className="heading-3-500 md:heading-1-700">Motors Shop</h1>
          <p className="heading-5-500 md:heading-2-600">
            A melhor plataforma de anúncios de carros do país
          </p>
        </div>
      </header>

      <main className="py-14 pb-20 flex flex-col container-1">
        <section className="flex gap-7">
          <FilterHome
            listCars={cars}
            className="hidden lg:flex lg:flex-col lg:w-[45%] overflow-hidden max-w-[454px] pl-4 sm:pl-[1.875rem] gap-9 xl:w-1/4 2xl:w-full"
          />
          {cars?.length ? (
            <ul className="flex flex-nowrap w-full h-min overflow-x-scroll pl-[1rem] pr-4 sm:pr-[1.875rem] xl:pr-[3.75rem] lg:pl-0 gap-6 mb-20 lg:overflow-auto lg:flex-wrap xl:grid xl:grid-cols-3 xl:w-9/12 2xl:flex 2xl:gap-10">
              {cars.map((car, index) => (
                <ProductCard key={index} car={car} />
              ))}
            </ul>
          ) : searchParams.toString() ? (
            <div className="w-full pb-10 text-center">
              <h2 className="heading-6-500">Não possuimos carro para este filtro</h2>
              <Button
                className="text-brand1 heading-7-500"
                onClick={() => {
                  router.push("/");
                }}>
                Limpar filtro
              </Button>
            </div>
          ) : (
            <div className="w-full pb-10 text-center">
              <h2 className="heading-6-500">O Site ainda não possuí carros</h2>
            </div>
          )}
        </section>

        <div className="flex justify-center mb-12 lg:hidden">
          <Button className="btn-brand1-big w-[279px]" onClick={onOpen}>
            Filtros
          </Button>
        </div>

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
      </main>

      <Footer />
      <ModalFilter cars={cars} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Home;
