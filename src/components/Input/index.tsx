"use client";

import { ChangeEventHandler, HTMLInputTypeAttribute, LegacyRef, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Button } from "../Button";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import clsx from "clsx";

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
  viewPass?: boolean;
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
  ref,
  viewPass = false
}: IInputProps) => {
  const [seePass, setSeePass] = useState(false);

  return (
    <>
      <label htmlFor={labelFor} className={labelClass}>
        {labelChildren}
      </label>
      <input
        id={inputId}
        ref={ref}
        type={seePass ? "text" : inputType}
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
      {viewPass && (
        <Button
          type="button"
          onClick={() => setSeePass(!seePass)}
          className="absolute right-5 top-[46px]">
          {seePass ? <VscEye size={20} /> : <VscEyeClosed size={20} />}
        </Button>
      )}
    </>
  );
};
// to see a button, is required a div with relative style
