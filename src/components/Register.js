import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as auth from '../utils/auth.js';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      calGoal: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    auth.register(this.state.password, this.state.email)
    .then((res) => {
        console.log(res);
        if (res.statusCode !== 400) {
          this.props.history.push('/signin');
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }
 

  render() {
    return (
       <div className="authe">
        <p className="authe__welcome">Sign up</p>
        <form onSubmit={this.handleSubmit} className="authe__form">
          <input className="authe__input" placeholder='Email' required id="email" name="email" type="email" value={this.state.email} onChange={this.handleChange} />
          <input className="authe__input" placeholder='Password' required id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          <div className="authe__button-container">
            <button type="submit" className="authe__btn" onClick={this.handleSubmit}>Sign up</button>
          </div>
        </form>

        <div className="authe__footer">
          <p  className="authe__text">Already a member? <Link to="/signin" className="authe__link">Log in here!</Link></p>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);