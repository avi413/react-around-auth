import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import * as auth from "../utils/auth.js";
import AuthForm from "./AuthForm.js";
const Register = (props) => {
  const [username, setUsernamee] = useState("");
  const [password, setPpassword] = useState("");

  const handleUsernameChange = (e) => setUsernamee(e.currentTarget.value);
  const handlePasswordChange = (e) => setPpassword(e.currentTarget.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .register(password, username)
      .then((res) => {
        if (res.error) {
          props.handleErrorLogin(res.error);
        } else if (res.message) {
          props.handleErrorLogin(res.message);
        } else {
          props.history.push("/signin");
          props.handleRegister(
            "User with Email: '" + res.data.email + "' created successfully"
          );
        }
      })
      .catch((err) => {
        props.handleErrorLogin(err);
      });
  };

  return (
    <AuthForm
      title="Sign up"
      handleSubmit={handleSubmit}
      buttonTitle="Sign up"
      subTitle="Already a member? "
      subTitleLink=" Log in here!"
    >
      <input
        className="authe__input"
        placeholder="Email"
        required
        id="email"
        name="email"
        type="email"
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

export default withRouter(Register);
