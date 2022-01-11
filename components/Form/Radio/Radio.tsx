import React, { RefObject } from "react";

import { FieldErrors } from "react-hook-form/dist/types";

import "../styles/form.scss";

type RadioProps = {
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

const Radio = ({
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
}: RadioProps): JSX.Element => {
  const radioLabelClassName = !vertical ? "" : "d-flex";

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
    <div className={`fieldy-form-group check_box `}>
      {label && <label>{label}</label>}
      <div className={`${radioLabelClassName}`}>
        {options.map((option) => (
          <label
            className={`fieldy-radio check-main`}
            key={option.value}
          >
            <span className="p-1 pr-3">{option.name}</span>

            {value ? (
              <input
                type="radio"
                checked={value === option.value}
                onChange={onChange}
                data-automationid={automationid}
                {...attributes}
              />
            ) : (
              <input
                type="radio"
                defaultChecked={defaultValue === option.value}
                data-automationid={automationid}
                {...attributes}
              />
            )}
            <span className="checkmark rounded-50"></span>
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

export default Radio;
export type { RadioProps };
