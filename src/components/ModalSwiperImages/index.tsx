import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody
} from "@chakra-ui/react";
import { ICars } from "../ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

interface IModalSwiper {
  car: ICars;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalSwiper = ({ car, isOpen, onClose }: IModalSwiper) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="w-11/12 p-6 flex flex-col gap-8 max-w-[520px]">
          <ModalHeader className="p-0 heading-7-500 text-grey1">Imagem do veículo</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="p-0">
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              pagination={{
                clickable: true
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper">
              {car.gallery.map((gallery, index) => (
                <SwiperSlide key={index} className="overflow-hidden">
                  <figure className="bg-grey7 h-[472px] max-w-[472px] w-full flex justify-center items-center">
                    <img src={gallery.imageUrl} className="h-full w-full object-contain" />
                  </figure>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="flex justify-end items-end w-full">
              <Link href={`/vehicle/${car.uuid}`} className="btn-brand1-big mt-6">
                Ver Anúncio
              </Link>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
