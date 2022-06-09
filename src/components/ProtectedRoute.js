import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import * as auth from "../utils/auth.js";
import Header from "./Header";

const ProtectedRoute = ({ component: Component, ...props }) => {
  const jwt = localStorage.getItem("jwt");

  const [myValues, setMyValues] = useState(props.loggedIn);

  useEffect(async () => {
    await auth.getContent(jwt).then((res) => {
      if (res) {
        console.log(res);
        return () => {
          setMyValues(true);
          
        };
      
      }
    });
  }, [props.loggedIn]);

  return (
    <>
      <Header page={props.page} email={props.email} link={props.link}></Header>
      <Route>
        {() =>
          myValues ? <Component {...props} /> : <Redirect to="./signin" />
        }
      </Route>
    </>
  );
};

export default ProtectedRoute;
