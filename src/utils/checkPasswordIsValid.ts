import { Dispatch, SetStateAction } from "react";

export const checkPassword = (
  pass: string,
  setValidationPass: Dispatch<
    SetStateAction<{
      length: boolean;
      capital: boolean;
      tiny: boolean;
      special: boolean;
    }>
  >
) => {
  if (pass.length > 8) {
    setValidationPass((prev) => {
      return { ...prev, length: true };
    });
  } else {
    setValidationPass((prev) => {
      return { ...prev, length: false };
    });
  }

  if (/(?=.*[A-Z])/.test(pass)) {
    setValidationPass((prev) => {
      return { ...prev, capital: true };
    });
  } else {
    setValidationPass((prev) => {
      return { ...prev, capital: false };
    });
  }

  if (/(?=.*[a-z])/.test(pass)) {
    setValidationPass((prev) => {
      return { ...prev, tiny: true };
    });
  } else {
    setValidationPass((prev) => {
      return { ...prev, tiny: false };
    });
  }

  if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) {
    setValidationPass((prev) => {
      return { ...prev, special: true };
    });
  } else {
    setValidationPass((prev) => {
      return { ...prev, special: false };
    });
  }
};
