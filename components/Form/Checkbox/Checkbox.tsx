import React, { RefObject } from "react";

import { FieldErrors } from "react-hook-form/dist/types";

import "../styles/form.scss";

type CheckboxProps = {
  className?: string;
  errors?: FieldErrors<Record<string, never>>;
  errorId?: string;
  id?: string;
  label?: string;
  name: string;
  onChange?: () => void;
  options: { name: string; value: string | number }[];
  register?:
    | string
    | ((instance: HTMLInputElement | null) => void)
    | RefObject<HTMLInputElement>
    | null
    | undefined;
  vertical?: true | false;
  checked?: string | number;
  defaultChecked?: string | number;
  automationid?: string;
};

const Checkbox = ({
  errors = {},
  errorId = "",
  id = "",
  label = "",
  name,
  onChange,
  options = [],
  register,
  checked = "",
  defaultChecked = "",
  vertical = true,
  automationid,
}: CheckboxProps): JSX.Element => {
  const checkboxLabelClassName = !vertical ? "d-flex" : "";

  const attributes: any = {
    className: ``,
    name: name,
  };
  if (id) {
    attributes.id = id;
  }
  if (register) {
    attributes.ref = register;
  }

  const value = checked;
  const defaultValue = defaultChecked;

  return (
    <div className={`fieldy-form-group form-group`}>
      {label && <label>{label}</label>}
      <div className={` ${checkboxLabelClassName}`}>
        {options.map((option) => (
          <label
            className={`fieldy-checkbox custom `}
            key={option.value}
          >
            <span className="p-1 pr-1">{option.name}</span>
            {value ? (
              <input
                type="checkbox"
                checked={value === option.value}
                data-automationid={automationid}
                onChange={onChange}
                {...attributes}
              />
            ) : (
              <input
                type="checkbox"
                defaultChecked={defaultValue === option.value}
                data-automationid={automationid}
                {...attributes}
              />
            )}
            <span className="checkmark"></span>
          </label>
        ))}
      </div>
      {errors[name] && (
        <div className="invalid-feedback" data-automationid={errorId}>
          {errors?.[name]?.message}
        </div>
      )}
    </div>
  );
};

export default Checkbox;
export type { CheckboxProps };
