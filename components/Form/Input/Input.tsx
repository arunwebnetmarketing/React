import React, { RefObject } from "react";

import { FieldErrors } from "react-hook-form/dist/types";

import "../styles/form.scss";

type InputProps = {
  className?: string;
  errors?: FieldErrors<Record<string, never>>;
  errorId?: string;
  fieldErrorMsg?: string;
  id?: string;
  icon?: string;
  label?: string;
  name: string;
  onChange?: Function;
  placeholder?: string;
  readonly?: true | false;
  register?:
    | string
    | ((instance: HTMLInputElement | null) => void)
    | RefObject<HTMLInputElement>
    | null
    | undefined;
  type: "text" | "email" | "number" | "date" | "time" | "password";
  value?: string | number;
  defaultValue?: string | number;
  automationid?: string;
};

const Input = ({
  className = "",
  errors = {},
  errorId = "",
  fieldErrorMsg = "",
  id = "",
  icon = "",
  label = "",
  name,
  onChange,
  placeholder = "",
  readonly = false,
  register,
  type,
  value = "",
  defaultValue = "",
  automationid,
}: InputProps): JSX.Element => {
  const fieldError =
    errors[name] || fieldErrorMsg ? "is-invalid" : "";
  const inputIcon = !label && icon ? "text-indent-25" : "";

  const attributes: any = {
    type: type,
    className: `fieldy-input form-control ${inputIcon} ${fieldError}`,
    name: name,
    readOnly: readonly,
    placeholder: placeholder,
  };
  if (id) {
    attributes.id = id;
  }
  if (register) {
    attributes.ref = register;
  }
  if (value) {
    attributes.value = value;
  } else {
    attributes.defaultValue = defaultValue;
  }

  return (
    <div
      className={`fieldy-form-group form-group search-section ${className}`}
    >
      {label && <label htmlFor={id}>{label}</label>}
      {!label && icon && (
        <i className={`fa ${icon}`} aria-hidden="true"></i>
      )}
      <input
        onChange={onChange}
        data-automationid={automationid}
        {...attributes}
      />
      {errors[name] && (
        <div className="invalid-feedback" data-automationid={errorId}>
          {errors?.[name]?.message}
        </div>
      )}
      {fieldErrorMsg && (
        <div className="invalid-feedback" data-automationid={errorId}>
          {fieldErrorMsg}
        </div>
      )}
    </div>
  );
};

export default Input;
export type { InputProps };
