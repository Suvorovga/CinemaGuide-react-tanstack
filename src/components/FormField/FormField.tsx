import { FC, ReactNode } from "react";
import "../FormField/FormField.css"

export interface FormFieldProps {
  children: ReactNode;
  errorMesage?: string;
}

export const FormField: FC<FormFieldProps> = ({ children, errorMesage }) => {
  return (
    <label className="form-field">
      {children}
      {errorMesage && (
        <span className="form-field__error-text">{errorMesage}</span>
      )}
    </label>
  );
};
