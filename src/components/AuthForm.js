import React from "react";

function AuthForm(props) {
  return (
    <form
      action="#"
      className={`form form_type_${props.name}`}
      name={props.formName}
      onSubmit={props.onSubmit}
    >
      <fieldset className="form-set">
        {props.children}
        <button
          type="submit"
          className={`submit-btn button button_opacity_h submit-btn_place_${props.name}`}
        >
          {props.lable}
        </button>
      </fieldset>
    </form>
  );
}

export default AuthForm;
