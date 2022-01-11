import React, { RefObject } from "react";

import { FieldErrors } from "react-hook-form/dist/types";

import "../styles/form.scss";

type SelectProps = {
  className?: string;
  errors?: FieldErrors<Record<string, never>>;
  errorId?: string;
  fieldErrorMsg?: string;
  id?: string;
  label?: string;
  name: string;
  onChange?: Function;
  options: { name: string; value: string | number }[];
  placeholder?: string;
  register?:
    | string
    | ((instance: HTMLSelectElement | null) => void)
    | RefObject<HTMLSelectElement>
    | null
    | undefined;
  value?: string | number;
  defaultValue?: string | number;
  automationid?: string;
};

const Select = ({
  className = "",
  errors = {},
  errorId = "",
  fieldErrorMsg = "",
  id = "",
  label = "",
  name,
  options = [],
  onChange,
  placeholder = "Choose...",
  register,
  value = "",
  defaultValue = "",
  automationid,
}: SelectProps): JSX.Element => {
  const fieldError =
    errors[name] || fieldErrorMsg ? "is-invalid" : "";

  const attributes: any = {
    className: `fieldy-select form-control ${fieldError}`,
    name: name,
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
      className={`fieldy-form-group search-section form-group ${className}`}
    >
      {label && <label htmlFor={id}>{label}</label>}
      <select
        data-automationid={automationid}
        {...attributes}
        onChange={onChange}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.name}
          </option>
        ))}
      </select>
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

export default Select;
export type { SelectProps };
