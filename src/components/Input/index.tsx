import { ChangeEventHandler, HTMLInputTypeAttribute, LegacyRef } from "react";
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
  inputDefaultChecked?: boolean;
  disable?: boolean;
  value?: string | number;
  maxLength?: number;
  readOnly?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  ref?: LegacyRef<HTMLInputElement> | undefined;
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
  inputDefaultChecked,
  readOnly,
  onChange,
  ref
}: IInputProps) => {
  return (
    <>
      <label htmlFor={labelFor} className={labelClass}>
        {labelChildren}
      </label>
      <input
        id={inputId}
        ref={ref}
        type={inputType}
        name={inputName}
        placeholder={placeHolder}
        defaultValue={inputDefaultValue}
        value={value}
        {...register}
        className={inputClass}
        disabled={disable}
        onChange={onChange}
        checked={inputChecked}
        maxLength={maxLength}
        defaultChecked={inputDefaultChecked}
        readOnly={readOnly}
      />
    </>
  );
};
