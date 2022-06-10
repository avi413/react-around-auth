import React from "react";
import { Route, Redirect } from "react-router-dom";
import Header from "./Header";

function ProtectedRoute({ component: Component, ...props }) {
  return (
    <>
      <Header
        page={props.page}
        email={props.email}
        link={props.link}
      ></Header>
      <Route>
        {() =>
          props.loggedIn ? <Component {...props} /> : <Redirect to="./signin" />
        }
      </Route>
    </>
  );
}

export default ProtectedRoute;
