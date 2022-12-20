import React from "react";
import NavBar from "../_components/NavBar/NavBar.jsx";
import Container from "../_components/Container/Container.jsx";
import { Outlet } from "react-router-dom";

const Root = ({ navItems }) => (
  <>
    <NavBar items={navItems} />
    <Container>
      <Outlet />
    </Container>
  </>
);

export default Root;
