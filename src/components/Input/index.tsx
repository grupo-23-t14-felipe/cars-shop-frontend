import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface IInputProps {
  labelClass?: string;
  labelChildren?: string;
  inputType: HTMLInputTypeAttribute;
  inputName?: string;
  placeHolder?: string;
  inputDefaultValue?: string | number;
  register?: UseFormRegisterReturn;
  inputClass?: string;
  inputId?: string;
  labelFor?: string;
  inputChecked?: boolean;
  disable?: boolean;
  value?: string | number;
  maxLength?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Input = ({
  labelClass,
  labelChildren,
  inputType,
  inputName,
  placeHolder,
  inputDefaultValue,
  register,
  inputClass,
  inputId,
  labelFor,
  inputChecked,
  disable,
  value,
  maxLength,
  onChange
}: IInputProps) => {
  return (
    <>
      <label htmlFor={labelFor} className={labelClass}>
        {labelChildren}
      </label>
      <input
        id={inputId}
        type={inputType}
        name={inputName}
        placeholder={placeHolder}
        defaultValue={inputDefaultValue}
        value={value}
        {...register}
        className={inputClass}
        disabled={disable}
        onChange={onChange}
        defaultChecked={inputChecked}
        maxLength={maxLength}
      />
    </>
  );
};
