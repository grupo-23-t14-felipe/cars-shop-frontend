import { HTMLInputTypeAttribute } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface IInputProps {
  labelClass?: string;
  labelChildren?: string;
  inputType: HTMLInputTypeAttribute;
  inputName?: string;
  placeHolder?: string;
  inputDefaultValue?: string;
  register?: UseFormRegisterReturn;
  inputClass?: string;
}

export const Input = ({
  labelClass,
  labelChildren,
  inputType,
  inputName,
  placeHolder,
  inputDefaultValue,
  register,
  inputClass
}: IInputProps) => {
  return (
    <>
      <label className={labelClass}>{labelChildren}</label>
      <input
        type={inputType}
        name={inputName}
        placeholder={placeHolder}
        defaultValue={inputDefaultValue}
        {...register}
        className={inputClass}
      />
    </>
  );
};
