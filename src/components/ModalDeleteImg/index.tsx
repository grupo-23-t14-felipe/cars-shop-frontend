import {
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

interface IModalButtonDeleteImgProps {
  imageUuid?: string;
  isOpen: boolean;
  onClose: () => void;
  callFuncRemoveImg: (uuidImg: string) => void;
}

export const ModalButtonDeleteImg = ({
  imageUuid,
  isOpen,
  onClose,
  callFuncRemoveImg
}: IModalButtonDeleteImgProps) => {
  const cancelRef: any = useRef();

  const { deleteImgOfAd } = useUser();

  const deleteImg = async (imageUuid: string) => {
    const result = await deleteImgOfAd(imageUuid);

    if (result) {
      callFuncRemoveImg(imageUuid);
      onClose();
    }
  };

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>
            <p className="heading-7-600 text-grey1">Excluir Imagem</p>
          </AlertDialogHeader>
          <ModalCloseButton />

          <AlertDialogBody>
            <p className="heading-7-600 mb-6">Tem certeza que deseja excluir a imagem?</p>
            <p className="text-grey2 body-1-400 mb-8">
              Essa ação não pode ser desfeita, isso excluirá permanentemente sua imagem.
            </p>
          </AlertDialogBody>

          <AlertDialogFooter className="flex gap-2">
            <Button type="button" className="btn-negative-big" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="button" className="btn-alert-big" onClick={() => deleteImg(imageUuid!)}>
              Sim, excluir imagem
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
