import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import * as auth from "../utils/auth.js";
import AuthForm from "./AuthForm.js";
const Login = (props) => {
  const [username, setUsernamee] = useState("");
  const [password, setPpassword] = useState("");
  const handleUsernameChange = (e) => setUsernamee(e.currentTarget.value);
  const handlePasswordChange = (e) => setPpassword(e.currentTarget.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      props.handleErrorLogin("Pleas fill all the fields");
      return;
    }
    auth
      .authorize(password, username)
      .then((data) => {
        if (data.isError) {
          props.handleErrorLogin(data.message);
        } else if (data.token) {
          props.history.push("/");
          props.handleLogin("Success! You have now been registered.");
        }
      })
      .catch((err) => {
        console.log(err);
        props.handleErrorLogin(err);
      });
  };
  

  return (
    <AuthForm
      title="Log in"
      handleSubmit={handleSubmit}
      buttonTitle="Log in"
      subTitle="Ready to begin your journey?"
      subTitleLink=" Sign up"
    >
      <input
        className="authe__input"
        placeholder="Email"
        required
        id="username"
        name="username"
        type="text"
        value={username}
        onChange={handleUsernameChange}
      />
      <input
        className="authe__input"
        placeholder="Password"
        required
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
    </AuthForm>
  );
};

export default withRouter(Login);
