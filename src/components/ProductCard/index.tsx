import { useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import { ModalSwiper } from "../ModalSwiperImages";
import { IUser } from "@/context/UserContext/types";
import { useUser } from "@/hooks/useUser";
import { useParams } from "next/navigation";
import clsx from "clsx";

export interface ICars {
  uuid: string;
  brand: string;
  model: string;
  year: number;
  fuel_type: string;
  mileage: number;
  color: string;
  is_good_deal: boolean;
  is_active: boolean;
  img_default: string;
  value: string;
  description: string;
  user: IUser;
  gallery: IGallery[];
  comments: any;
}

export interface IGallery {
  imageUrl: string;
}

interface IProductCardProps {
  car: ICars;
}

export const ProductCard = ({ car }: IProductCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser();
  const params = useParams();

  return (
    <li className="max-w-[312px] w-full min-w-[290px] h-min cursor-pointer relative">
      <figure
        className="bg-grey7 h-[152px] overflow-hidden flex justify-center items-center"
        onClick={onOpen}>
        <img src={car.img_default} alt={car.model} className=" h-[152px]" />
      </figure>

      {params.id && user?.uuid && (
        <div
          className={clsx(
            "text-whiteFixed body-2-500 text-center px-2 absolute top-3 left-3",
            car.is_active ? "bg-brand1" : "bg-grey4"
          )}>
          {car.is_active ? "Ativo" : "Inativo"}
        </div>
      )}

      {car.is_good_deal && (
        <div className="w-4 h-7 border-[1px] border-[#48a382] bg-random7 rounded rounded-tr-none flex justify-center items-center text-whiteFixed input-label absolute top-0 right-0 z-10">
          $
        </div>
      )}
      <Link href={`/vehicle/${car.uuid}`} className="flex flex-col gap-4 mt-4 text-start">
        <h2 className="heading-7-600 text-grey1 truncate">
          {car.brand} - {car.model}
        </h2>

        {car.description ? (
          <p className="body-2-400 text-grey2 line-clamp-2 h-[46px]">{car.description}</p>
        ) : (
          <p className="body-2-400 text-grey2 line-clamp-2 h-[46px]">
            Este veículo não possui descrição
          </p>
        )}

        <div className="flex gap-2 items-center">
          <div className="w-8 h-8 rounded-full bg-brand2 flex justify-center items-center">
            <p className="text-whiteFixed font-medium text-sm">
              {car.user.name[0].toUpperCase() +
                car.user.name[car.user.name.lastIndexOf(" ") + 1].toUpperCase()}
            </p>
          </div>
          <p className="text-grey2 body-2-500">{car.user.name}</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <p className="body-2-500 text-brand1 rounded py-1 px-2 bg-brand4">{car.mileage} KM</p>
            <p className="body-2-500 text-brand1 rounded py-1 px-2 bg-brand4">{car.year}</p>
          </div>

          <p className="heading-7-600 text-grey1">
            {parseInt(car.value).toLocaleString(undefined, { style: "currency", currency: "BRL" })}
          </p>
        </div>
      </Link>

      {car.gallery.length > 0 && <ModalSwiper car={car} isOpen={isOpen} onClose={onClose} />}
    </li>
  );
};
