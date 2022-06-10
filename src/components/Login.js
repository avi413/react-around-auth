import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import * as auth from "../utils/auth.js";

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
        if (typeof data === "undefined") {
          props.handleErrorLogin("Username or password not exist");
        } else if (data.token) {
          props.handleLogin();
          props.history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        props.handleErrorLogin(err);
      });
  };

  return (
    <div className="authe">
      <p className="authe__welcome">Log in</p>
      <form onSubmit={handleSubmit} className="authe__form">
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
        <div className="authe__button-container">
          <button type="submit" className="authe__btn" onClick={handleSubmit}>
            Log in
          </button>
        </div>
      </form>

      <div className="authe__footer">
        <p className="authe__text">
          Ready to begin your journey?
          <Link to="/signup" className="authe__link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default withRouter(Login);
