import React from "react";
import { Link } from "react-router-dom";
function AuthForm(props) {
  return (
    <div className="authe">
    <p className="authe__welcome">{props.title}</p>
    <form
      className="authe__form"
      name={props.formName}
      onSubmit={props.handleSubmit}
    >
        {props.children}
        <div className="authe__button-container">
          <button type="submit" className="authe__btn">
            {props.buttonTitle}
          </button>
        </div>
        </form>
        <div className="authe__footer">
        <p className="authe__text">
          {props.subTitle}
          <Link to="/signup" className="authe__link">
            {props.subTitleLink}
          </Link>
        </p>
      </div>
    </div>

  );
}

export default AuthForm;
