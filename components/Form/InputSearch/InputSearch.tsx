import React from "react";

import "../styles/form.scss";

type InputSearchProps = {
  className?: string;
  id?: string;
  placeholder: string;
  rounded?: true | false;
  automationid?: string;
};

const InputSearch = ({
  className = "",
  id = "",
  placeholder = "",
  rounded = false,
  automationid,
}: InputSearchProps): JSX.Element => {
  const roundedClass = rounded ? "rounded-search" : "";

  return (
    <div
      className={`fieldy-input-search search-section ${className} ${roundedClass}`}
    >
      <label htmlFor={id}>
        <i className="fa fa-search" aria-hidden="true"></i>
        <input
          type="text"
          className="search form-control"
          placeholder={placeholder}
          data-automationid={automationid}
          id={id}
        />
      </label>
    </div>
  );
};

export default InputSearch;
export type { InputSearchProps };
