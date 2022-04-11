import React from "react";
import "./TextInput.scss";

export default function TextInput({
  name,
  label,
  className,
  onBlur,
  onChange,
  ...props
}) {
  return (
    <div className="position-relative">
      <input
        {...props}
        className={`form-control ${className ? className : ""}`}
        id={name}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
      />
    </div>
  );
}
