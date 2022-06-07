import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Header from './Header';

const ProtectedRoute = ({ component: Component, ...props  }) => {
  return (
    <Route>
      <Header page={props.page} email={props.email} link={props.link}></Header>
      {
        () => props.loggedIn ? <Component {...props} /> : <Redirect to="./login" />
      }
    </Route>
)}

export default ProtectedRoute;