import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import * as auth from "../utils/auth.js";
import Header from "./Header";

function ProtectedRoute({ component: Component, ...props }) {
  const [isLoading, setIsLoading] = useState(true);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await auth.checkToken(jwt);
        setIsLoading(true);
        props.handleIsLogedIn(true);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    jwt ? verifyToken() : setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading... </p>
      ) : (
        <Route
          {...props}
          render={({ location }) => {
            return props.loggedIn === true ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/signin",
                  state: { from: location },
                }}
              />
            );
          }}
        />
      )}
    </>
  );
}

export default ProtectedRoute;
