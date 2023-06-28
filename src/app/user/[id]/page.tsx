"use client";

import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { ModalCreateVehicle } from "@/components/ModalCreateVehicle";
import { ModalEditVehicle } from "@/components/ModalEditVehicle";
import { NavBar } from "@/components/Navbar";
import { ICars, ProductCard } from "@/components/ProductCard";
import { UserProvider } from "@/context/UserContext";
import { IUser } from "@/context/UserContext/types";
import { useUser } from "@/hooks/useUser";
import { api } from "@/services/api";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface IProfileProps {
  params: {
    id: string;
  };
}

const ProfileDetail = ({ params }: IProfileProps) => {
  return (
    <UserProvider>
      <ProfileDetailPage params={params} />
    </UserProvider>
  );
};

const ProfileDetailPage = ({ params }: IProfileProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const [car, setCar] = useState<ICars[]>();
  const [ownerPage, setOwnerPage] = useState<IUser>();
  const [pagination, setPagination] = useState<{ count: number; page: number }>();

  const { user } = useUser();

  useEffect(() => {
    api.get(`/users/cars/${params.id}${window.location.search}`).then((response) => {
      setCar(response.data.data.cars);
      setOwnerPage(response.data.data);

      setPagination({ count: response.data.count, page: response.data.page });
    });
  }, [searchParams]);

  const setNextPage = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

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
            {user?.uuid === params.id && <ModalCreateVehicle setCar={setCar} />}
          </section>
        </div>

        <section className="flex flex-col gap-16 pt-12 pb-48 lg:py-20 lg:gap-20 items-center">
          {ownerPage?.uuid !== user?.uuid && (
            <div className="flex w-full xl:w-11/12 px-4">
              <h2 className="heading-5-600 text-grey0 text-left">Anúncios</h2>
            </div>
          )}
          <ul className="flex flex-nowrap w-full overflow-x-scroll pb-4 px-4 gap-12 lg:overflow-auto lg:flex-wrap lg:justify-center xl:grid xl:grid-cols-3 xl:w-9/12 2xl:flex 2xl:w-auto 2xl:gap-10">
            {car ? (
              car.map((car, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 max-w-[312px] lg:w-full min-w-[290px]">
                  <ProductCard car={car} />
                  {user?.uuid === params.id && (
                    <div className="flex gap-4 flex-wrap">
                      <ModalEditVehicle setCar={setCar} carToEdit={car} />
                      <Link href={`/vehicle/${car.uuid}`} className="btn-outline-1-medium">
                        Ver detalhes
                      </Link>
                    </div>
                  )}
                </div>
              ))
            ) : user?.uuid === params.id ? (
              <h2 className="heading-5-600">Você não possuí carros anunciados</h2>
            ) : (
              <h2 className="heading-5-600">Vendedor não possuí carros anunciados</h2>
            )}
          </ul>

          {pagination && (
            <div className="flex flex-col md:flex-row justify-center items-center gap-5">
              {pagination.page > 1 && (
                <Button
                  onClick={() => {
                    router.push(pathName + "?" + setNextPage("page", String(pagination.page - 1)));
                  }}
                  className="text-brand2 heading-5-600 hover:text-brand1 duration-300">
                  {"<"} Anterior
                </Button>
              )}

              <p className="heading-5-600 text-grey4">
                <span className="text-grey3">{pagination.page}</span> de{" "}
                {Math.ceil(pagination.count / 12)}
              </p>

              {pagination.page < Math.ceil(pagination.count / 12) && (
                <Button
                  onClick={() => {
                    router.push(pathName + "?" + setNextPage("page", String(pagination.page + 1)));
                  }}
                  className="text-brand2 heading-5-600 hover:text-brand1 duration-300">
                  Seguinte {">"}
                </Button>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};
export default ProfileDetail;
