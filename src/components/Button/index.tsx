import { HTMLAttributes, ReactNode } from "react";

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  type?: "button" | "reset" | "submit" | undefined;
  disable?: boolean;
}

export const Button = ({ children, disable, ...rest }: IButtonProps) => {
  return (
    <button
      id={rest.id}
      type={rest.type}
      onClick={rest.onClick}
      className={rest.className}
      disabled={disable}>
      {children}
    </button>
  );
};
