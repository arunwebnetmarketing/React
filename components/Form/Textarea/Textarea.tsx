import React, { RefObject } from "react";

import { FieldErrors } from "react-hook-form/dist/types";

import "../styles/form.scss";

type TextareaProps = {
  className?: string;
  errors?: FieldErrors<Record<string, never>>;
  errorId?: string;
  id?: string;
  label?: string;
  name: string;
  onChange?: Function;
  placeholder?: string;
  readonly?: true | false;
  register?:
    | string
    | ((instance: HTMLTextAreaElement | null) => void)
    | RefObject<HTMLTextAreaElement>
    | null
    | undefined;
  rows?: number;
  value?: string;
  defaultValue?: string;
  automationid?: string;
};

const Textarea = ({
  className = "",
  errors = {},
  errorId = "",
  id = "",
  label = "",
  name,
  onChange,
  placeholder = "",
  readonly = false,
  register,
  rows = 5,
  value = "",
  defaultValue = "",
  automationid,
}: TextareaProps): JSX.Element => {
  const fieldError = errors[name] ? "is-invalid" : "";

  const attributes: any = {
    className: `fieldy-textarea form-control ${fieldError}`,
    name: name,
    readOnly: readonly,
    placeholder: placeholder,
    rows: rows,
  };
  if (id) {
    attributes.id = id;
  }
  if (register) {
    attributes.ref = register;
  }
  if (value) {
    attributes.onChange = onChange;
    attributes.value = value;
  } else {
    attributes.defaultValue = defaultValue;
  }

  return (
    <div className={`fieldy-form-group form-group ${className}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <textarea
        data-automationid={automationid}
        {...attributes}
      ></textarea>
      {errors[name] && (
        <div className="invalid-feedback" data-automationid={errorId}>
          {errors?.[name]?.message}
        </div>
      )}
    </div>
  );
};

export default Textarea;
export type { TextareaProps };
