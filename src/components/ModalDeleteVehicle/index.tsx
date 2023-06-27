import {
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  ModalCloseButton
} from "@chakra-ui/react";
import { MouseEventHandler, useRef } from "react";
import { Button } from "../Button";
import { useUser } from "@/hooks/useUser";

export const ModalButtonDeleteAd = ({
  uuid,
  onClick
}: {
  uuid: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  const { deleteAd } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: any = useRef();

  return (
    <>
      <Button type="button" onClick={onOpen} className="btn-negative-big w-full">
        Excluir anúncio
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              <p className="heading-7-600 text-grey1">Excluir anúncio</p>
            </AlertDialogHeader>
            <ModalCloseButton />

            <AlertDialogBody>
              <p className="heading-7-600 mb-6">Tem certeza que deseja remover este anúncio?</p>
              <p className="text-grey2 body-1-400 mb-8">
                Essa ação não pode ser desfeita. Isso excluirá permanentemente seu anúncio e
                removerá seus dados de nossos servidores.
              </p>
            </AlertDialogBody>

            <AlertDialogFooter className="flex gap-2">
              <Button type="button" className="btn-negative-big" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="button" className="btn-alert-big" onClick={onClick}>
                Sim, excluir anúncio
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
