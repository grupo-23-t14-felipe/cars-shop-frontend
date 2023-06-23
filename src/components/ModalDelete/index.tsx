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
import { useRef } from "react";
import { Button } from "../Button";
import { useUser } from "@/hooks/useUser";

export const ButtonDelete = () => {
  const { deleteUser } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: any = useRef();

  return (
    <>
      <Button type="button" onClick={onOpen} className="btn-alert-big w-[47%] sm:w-2/6 px-0">
        Excluir Perfil
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              <p className="heading-7-600 text-grey1">Excluir conta</p>
            </AlertDialogHeader>
            <ModalCloseButton />

            <AlertDialogBody>
              <p className="heading-7-600 mb-6">Tem certeza que deseja excluir a conta?</p>
              <p className="text-grey2 body-1-400 mb-8">
                Essa ação não pode ser desfeita. Isso excluirá permanentemente sua conta e removerá
                seus dados de nossos servidores.
              </p>
            </AlertDialogBody>

            <AlertDialogFooter className="flex gap-2">
              <Button type="button" className="btn-negative-big" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="button" className="btn-alert-big" onClick={deleteUser}>
                Sim, excluir conta
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
