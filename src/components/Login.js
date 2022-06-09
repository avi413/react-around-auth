import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as auth from "../utils/auth.js";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // you'll need to add your login code here
    if (!this.state.username || !this.state.password) {
      return;
    }
    auth
      .authorize(this.state.password,this.state.username)
      .then((data) => {
        if (data.token) {
          this.setState(
            {
              username: "",
              password: "",
            },
            () => {
              this.props.handleLogin();
              this.props.history.push("/");
            }
          );
        }
        // you need to check if the data has a jwt
        // reset the state then in the callback, set the
        // parent App's loggedIn state to true,
        // then redirect to '/diary'
      })
      .catch((err) => {
        console.log(err);
        this.props.handleErrorLogin();
      });
  }

  render() {
    return (
      <div className="authe">
        <p className="authe__welcome">Log in</p>
        <form onSubmit={this.handleSubmit} className="authe__form">
          <input
            className="authe__input"
            placeholder="Email"
            required
            id="username"
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            className="authe__input"
            placeholder="Password"
            required
            id="password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <div className="authe__button-container">
            <button type="submit" className="authe__btn" onClick={this.handleSubmit}>
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
  }
}

export default withRouter(Login);
