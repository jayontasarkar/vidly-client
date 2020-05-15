import React from "react";

const Textbox = ({
  name,
  value,
  type,
  label,
  placeholder,
  error,
  onChange,
}) => {
  return (
    <React.Fragment>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        className="form-control"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <small className="form-text text-danger">{error}</small>}
    </React.Fragment>
  );
};

Textbox.defaultProps = {
  type: "text",
  placeholder: "",
};

export default Textbox;
