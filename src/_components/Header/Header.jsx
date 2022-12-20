import React from "react";

const Header = ({ title, subHeader }) => {
  return (
    <>
      <h2>{title}</h2>
      {subHeader && <p>{subHeader}</p>}{" "}
    </>
  );
};

export default Header;
