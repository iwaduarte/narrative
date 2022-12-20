import React from "react";
import { Link, useNavigate, useRouteError } from "react-router-dom";
import style from "./error.module.css";
import Container from "../../_components/Container/Container.jsx";

const { errorPage } = style;

const Error = () => {
  const error = useRouteError();
  return (
    <Container>
      <div className={errorPage}>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error?.statusText || error?.message}</i>
        </p>
        <Link to="/"> Return to Home</Link>
      </div>
    </Container>
  );
};

export default Error;
