import React from "react";
import "./Button.scss";

export default function Button({ children, className, ...rest }) {
  return (
    <button className={`btn ${className ? className : ""}`} {...rest}>
      {children}
    </button>
  );
}
