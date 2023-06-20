"use client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../Button";
import { ICars } from "../ProductCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

interface IFilterHome {
  className?: string;
  maxWidthButtons?: string;
  listCars?: ICars[];
}

export const FilterHome = ({
  className,
  maxWidthButtons = "max-w-[125px]",
  listCars
}: IFilterHome) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams()!;

  const [brands, setBrands] = useState<string[]>();

  useEffect(() => {
    fetch("https://kenzie-kars.herokuapp.com/cars")
      .then((response) => response.json())
      .then((data) => {
        setBrands(Object.keys(data));
      });
  }, []);

  const setModel = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (params.get(name) === value) {
        params.delete(name);

        return params.toString();
      } else if (
        (name.includes("value") && searchParams.toString().includes("value")) ||
        (name.includes("mileage") && searchParams.toString().includes("mileage"))
      ) {
        if (searchParams.toString().includes("mileage") && name.includes("mileage")) {
          params.delete("mileageMin");
          params.delete("mileageMax");

          params.set(name, value);
        }
        if (searchParams.toString().includes("value") && name.includes("value")) {
          params.delete("valueMin");
          params.delete("valueMax");

          params.set(name, value);
        }
        return params.toString();
      } else {
        params.set(name, value);

        return params.toString();
      }
    },
    [searchParams]
  );

  const listColors: string[] = [];
  const listYears: number[] = [];

  return (
    <section className={className}>
      <div className="flex flex-col gap-4">
        <h3 className="heading-4-600 text-black">Marca</h3>
        <ul>
          {brands &&
            brands.map((brnd, index) => (
              <li key={index} className="heading-6-500 pl-2 -my-1">
                <Button
                  onClick={() => {
                    router.push(pathName + "?" + setModel("brand", brnd));
                  }}
                  className={clsx(
                    "duration-300 truncate",
                    searchParams.get("brand") === brnd
                      ? "text-brand1 hover:text-brand2"
                      : "text-grey3 hover:text-grey0"
                  )}>
                  {brnd[0].toUpperCase() + brnd.substring(1)}
                </Button>
              </li>
            ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="heading-4-600 text-black">Modelo</h3>
        <ul>
          {listCars &&
            listCars.map((car, index) => (
              <li key={index} className="heading-6-500 pl-2 -my-1">
                <Button
                  onClick={() => {
                    router.push(pathName + "?" + setModel("model", car.model));
                  }}
                  className={clsx(
                    "duration-300 truncate",
                    searchParams.get("model") === car.model
                      ? "text-brand1 hover:text-brand2"
                      : "text-grey3 hover:text-grey0"
                  )}>
                  {car.model[0].toUpperCase() + car.model.substring(1)}
                </Button>
              </li>
            ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="heading-4-600 text-black">Cor</h3>
        <ul>
          {listCars &&
            listCars.map((car, index) => {
              if (!listColors.includes(car.color.toLowerCase())) {
                listColors.push(car.color.toLowerCase());

                return (
                  <li key={index} className="heading-6-500 pl-2 -my-1">
                    <Button
                      onClick={() => {
                        router.push(pathName + "?" + setModel("color", car.color));
                      }}
                      className={clsx(
                        "duration-300 truncate",
                        searchParams.get("color") === car.color
                          ? "text-brand1 hover:text-brand2"
                          : "text-grey3 hover:text-grey0"
                      )}>
                      {car.color[0].toUpperCase() + car.color.substring(1)}
                    </Button>
                  </li>
                );
              }
            })}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="heading-4-600 text-black">Ano</h3>
        <ul>
          {listCars &&
            listCars.map((car, index) => {
              if (!listYears.includes(car.year)) {
                listYears.push(car.year);
                return (
                  <li
                    onClick={() => {
                      router.push(pathName + "?" + setModel("year", car.year.toString()));
                    }}
                    key={index}
                    className="heading-6-500 pl-2 -my-1">
                    <Button
                      className={clsx(
                        "duration-300 truncate",
                        searchParams.get("year") === car.year.toString()
                          ? "text-brand1 hover:text-brand2"
                          : "text-grey3 hover:text-grey0"
                      )}>
                      {car.year}
                    </Button>
                  </li>
                );
              }
            })}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="heading-4-600 text-black">Combustível</h3>
        <ul>
          {["Flex", "Híbrido", "Elétrico"].map((fuel, index) => {
            return (
              <li key={index} className="heading-6-500 pl-2 -my-1">
                <Button
                  onClick={() => {
                    router.push(pathName + "?" + setModel("fuelType", (index + 1).toString()));
                  }}
                  className={clsx(
                    "duration-300 truncate",
                    searchParams.get("fuelType") === (index + 1).toString()
                      ? "text-brand1 hover:text-brand2"
                      : "text-grey3 hover:text-grey0"
                  )}>
                  {fuel}
                </Button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="heading-4-600 text-black">Km</h3>
        <div className="flex gap-6 pl-2">
          <Button
            onClick={() => {
              router.push(pathName + "?" + setModel("mileageMin", "true"));
            }}
            className={clsx(
              `heading-7-600 flex justify-center items-center py-[0.4rem] w-full ${maxWidthButtons}`,
              searchParams.has("mileageMin")
                ? "text-brand1 bg-brand4 border-2 border-brand1"
                : "text-grey3 bg-grey5"
            )}>
            Mínima
          </Button>
          <Button
            onClick={() => {
              router.push(pathName + "?" + setModel("mileageMax", "true"));
            }}
            className={clsx(
              `heading-7-600 flex justify-center items-center py-[0.4rem] w-full ${maxWidthButtons}`,
              searchParams.has("mileageMax")
                ? "text-brand1 bg-brand4 border-2 border-brand1"
                : "text-grey3 bg-grey5"
            )}>
            Máxima
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="heading-4-600 text-black">Preço</h3>
        <div className="flex gap-6 pl-2">
          <Button
            onClick={() => {
              router.push(pathName + "?" + setModel("valueMin", "true"));
            }}
            className={clsx(
              `heading-7-600 flex justify-center items-center py-[0.4rem] w-full ${maxWidthButtons}`,
              searchParams.has("valueMin")
                ? "text-brand1 bg-brand4 border-2 border-brand1"
                : "text-grey3 bg-grey5"
            )}>
            Mínima
          </Button>
          <Button
            onClick={() => {
              router.push(pathName + "?" + setModel("valueMax", "true"));
            }}
            className={clsx(
              `heading-7-600 flex justify-center items-center py-[0.4rem] w-full ${maxWidthButtons}`,
              searchParams.has("valueMax")
                ? "text-brand1 bg-brand4 border-2 border-brand1"
                : "text-grey3 bg-grey5"
            )}>
            Máxima
          </Button>
        </div>
      </div>
      {searchParams.toString() && (
        <div className="w-full flex justify-center items-center">
          <Button
            className="btn-brand1-big w-full max-w-[279px]"
            onClick={() => {
              router.replace("/");
            }}>
            Limpar filtro
          </Button>
        </div>
      )}
    </section>
  );
};
