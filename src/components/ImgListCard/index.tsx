import { MdOutlineClose } from "react-icons/md";
import { Button } from "../Button";
import { MouseEventHandler } from "react";
import { ModalButtonDeleteImg } from "../ModalDeleteImg";
import { useDisclosure } from "@chakra-ui/react";

interface IImgListCardProps {
  onClick?: MouseEventHandler<HTMLLIElement>;
  imgUrl: string;
  imgAlt: string;
  objName: string | number;
  imgUuid?: string;
  deleteImg?: boolean;
}

export const ImgListCard = ({
  onClick,
  imgUrl,
  imgAlt,
  objName,
  imgUuid,
  deleteImg = false
}: IImgListCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <li className="w-28 relative group/item cursor-pointer" onClick={deleteImg ? onOpen : onClick}>
      <figure className="w-28 h-28 flex justify-center items-center rounded bg-grey7 group-hover/item:bg-grey5 duration-300 overflow-hidden">
        <img src={imgUrl} alt={imgAlt} className="object-contain" />
      </figure>
      <p className="truncate body-2-400 text-xs text-grey2">{objName}</p>

      <Button
        type="button"
        className="absolute p-1 top-0 right-0 bg-grey5 rounded-full group/edit opacity-0 group-hover/item:opacity-100 duration-300">
        <MdOutlineClose size={16} color="red" />
      </Button>

      <ModalButtonDeleteImg imageUuid={imgUuid} isOpen={isOpen} onClose={onClose} />
    </li>
  );
};