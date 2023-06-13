import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody
} from "@chakra-ui/react";
import { FilterHome } from "../Filters";
import { Button } from "../Button";

interface IModalFilter {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalFilter = ({ isOpen, onClose }: IModalFilter) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="w-11/12 p-6 flex flex-col gap-8 max-w-[520px]">
          <ModalHeader className="p-0 heading-7-500 text-grey1">Filtro</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="p-0">
            <FilterHome className=" flex flex-col w-full gap-9" maxWidthButtons="max-w-full" />
            <div className="w-full pt-10 pb-8 flex justify-center items-center">
              <Button className="btn-brand1-big w-9/12" onClick={onClose}>
                Ver anúncios
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
