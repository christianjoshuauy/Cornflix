import React from "react";
import "./Input.scss";

function Input({
  type,
  placeholder,
  name,
  additionalClass,
  validationMessage,
  validation,
  errors,
}) {
  return (
    <React.Fragment>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`Input
                    ${errors?.[name] && "error"}
                    ${additionalClass && additionalClass}
                `}
        ref={validation}
      />
      {errors?.[name] && <p className="Input__label">{validationMessage}</p>}
    </React.Fragment>
  );
}

export default Input;
