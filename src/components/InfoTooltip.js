import React from "react";

function InfoTooltip(props) {
  const open = props.isOpen ? " popup_opened" : "";

  return (
    <div className={`popup popup_type_${props.name} ${open}`}>
      <button
        aria-label="tooltip"
        className="popup__close popup__close_place_tooltip button button_opacity_m"
        onClick={props.onClose}
      />
      <div className="popup__container tooltip">
        <img src={props.link} className={`tooltip__img`} alt={props.name} />
        <h2 className="tooltip__text">{props.title}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
