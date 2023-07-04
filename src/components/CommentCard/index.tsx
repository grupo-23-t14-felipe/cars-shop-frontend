"use client";

import clsx from "clsx";
import { ICars, IComments } from "../ProductCard";
import { Button } from "../Button";
import { calcDatePost } from "@/utils/calcDatePost";
import { useUser } from "@/hooks/useUser";
import { HiOutlineTrash } from "react-icons/hi";
import { BsFillPencilFill } from "react-icons/bs";
import { FiCheck } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { Dispatch, SetStateAction, useRef, useState } from "react";

export interface ICommentCardProps {
  comment: IComments;
  getCarByParams: (id: string) => Promise<void>;
  paramId: string;
  carState: Dispatch<SetStateAction<ICars | undefined>>;
}

export const CommentCard = ({ comment, getCarByParams, paramId, carState }: ICommentCardProps) => {
  const { updateComment, deleteComment, user } = useUser();
  const [editing, setEditing] = useState(false);

  const commentEdit = useRef<HTMLTextAreaElement>(null);

  const buttonDeleteComment = async (uuidComment: string) => {
    const result = await deleteComment(uuidComment);
    if (result) {
      getCarByParams(paramId);
    }
  };

  const buttonUpdateComment = async (uuidComment: string, commentDefault: string) => {
    const newCommentValue = commentEdit.current?.value;

    if (!newCommentValue || newCommentValue === commentDefault) {
      setEditing(false);
    } else {
      const result = await updateComment({ description: newCommentValue }, uuidComment);

      if (result.status === 201) {
        carState((prev) => {
          const newValues = prev;

          newValues?.comments.map((cmmt) => {
            if (cmmt.uuid === uuidComment) {
              cmmt.description = newCommentValue;
            }
            return cmmt;
          });

          return newValues;
        });

        setEditing(false);
      }
    }
  };

  return (
    <li className="flex flex-col gap-3">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div
            className={clsx(
              `w-8 h-8 rounded-full flex justify-center items-center`,
              comment.user.randomColor
            )}>
            <p className="text-whiteFixed font-medium text-sm">
              {comment.user.name[0].toUpperCase() +
                comment.user.name[comment.user.name.lastIndexOf(" ") + 1].toUpperCase()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-grey1 body-2-500">{comment.user.name}</p>
            <p className="text-grey4 p-0 m-0">•</p>
            <p className="text-grey3 body-2-400 text-xs">{calcDatePost(comment.addedIn)}</p>
          </div>
        </div>
        {user?.uuid === comment.user.uuid && (
          <div className="flex gap-2 items-center">
            {editing && (
              <Button
                onClick={() => setEditing(false)}
                className="text-grey3 hover:text-grey2 duration-300 relative after:absolute after:top-0 after:right-0 after:content-[''] after:z-20 after:text-[12px] after:font-bold after:w-max after:duration-700 after:text-transparent hover:after:content-['Cancelar'] hover:after:-top-5 hover:after:text-grey0">
                {<IoMdClose size={18} />}
              </Button>
            )}
            <Button
              onClick={() =>
                editing ? buttonUpdateComment(comment.uuid, comment.description) : setEditing(true)
              }
              className={clsx(
                "text-grey3 duration-300 relative after:absolute after:top-0 after:right-0 after:content-[''] after:z-20 after:text-[12px] after:font-bold after:w-max after:duration-700 after:text-transparent hover:after:-top-5 ",
                editing
                  ? "hover:text-feedbackSucess1 hover:after:content-['Concluir']  hover:after:text-feedbackSucess1"
                  : "hover:text-amber-400 hover:after:content-['Editar'] hover:after:text-amber-400"
              )}>
              {editing ? <FiCheck size={18} /> : <BsFillPencilFill size={16} />}
            </Button>
            {!editing && (
              <Button
                onClick={() => buttonDeleteComment(comment.uuid)}
                className="text-grey3 hover:text-feedbackAlert1 duration-300 relative after:absolute after:top-0 after:right-0 after:content-[''] after:z-20 after:text-[12px] after:font-bold after:w-max after:duration-700 after:text-transparent hover:after:content-['Excluir'] hover:after:-top-5 hover:after:text-feedbackAlert1">
                <HiOutlineTrash size={16} />
              </Button>
            )}
          </div>
        )}
      </div>

      {editing ? (
        <textarea
          className="p-3 bg-grey8 outline-none resize-none text-grey2 body-2-400 max-h-28 rounded"
          defaultValue={comment.description}
          ref={commentEdit}
        />
      ) : (
        <p className="text-grey2 body-2-400 max-h-28 overflow-y-auto">{comment.description}</p>
      )}
    </li>
  );
};
