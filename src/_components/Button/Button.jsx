import React from "react";
import style from "./Button.module.css";

const { button, radius25, disabled: disabledClass } = style;

const Button = ({ value, noRadius, onClick, disabled, type = "button" }) => {
  const _radius = noRadius ? "" : radius25;
  const _disabled = disabled ? disabledClass : "";
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${button} ${_radius} ${_disabled}`}
    >
      {value}
    </button>
  );
};

export default Button;
