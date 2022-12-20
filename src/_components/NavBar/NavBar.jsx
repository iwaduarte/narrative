import React from "react";
import style from "./NavBar.module.css";
import { Link } from "react-router-dom";

const { outerBar, navBar, navItem } = style;

const NavBar = ({ items = [] }) => (
  <div className={outerBar}>
    <div className={navBar}>
      {items?.reduce((acc, item, index) => {
        const { path, name } = item || {};
        if (!name) return acc;
        acc.push(
          <Link key={index} className={navItem} to={path}>
            {name}
          </Link>
        );
        return acc;
      }, [])}
    </div>
  </div>
);

export default NavBar;
