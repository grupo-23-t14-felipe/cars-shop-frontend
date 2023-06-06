import { HTMLAttributes, ReactNode } from "react";

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  type?: "button" | "reset" | "submit" | undefined;
}

export const Button = ({ children, ...rest }: IButtonProps) => {
  return (
    <button id={rest.id} type={rest.type} onClick={rest.onClick} className={rest.className}>
      {children}
    </button>
  );
};
