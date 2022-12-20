import React from "react";
import style from "./Container.module.css";

const { container } = style;

const Container = ({ children }) => {
  return <div className={container}>{children}</div>;
};

export default Container;
