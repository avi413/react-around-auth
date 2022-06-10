import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import * as auth from "../utils/auth.js";

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
        } else {
          props.history.push("/signin");
        }
      })
      .catch((err) => {
        props.handleErrorLogin(err);
      });
  };

  return (
    <div className="authe">
      <p className="authe__welcome">Sign up</p>
      <form onSubmit={handleSubmit} className="authe__form">
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
        <div className="authe__button-container">
          <button type="submit" className="authe__btn" onClick={handleSubmit}>
            Sign up
          </button>
        </div>
      </form>

      <div className="authe__footer">
        <p className="authe__text">
          Already a member?{" "}
          <Link to="/signin" className="authe__link">
            Log in here!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default withRouter(Register);
