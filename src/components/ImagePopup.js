import React from "react";

function ImagePopup(props) {
  const { selectedCard, click, close } = props;
  const isOpen = selectedCard.isCardOpen ? " popup_opened" : "";
  return (
    <div className={`popup popup_type_img ${isOpen}`} onClick={click}>
      <div className="popup__img-container">
        <button
          aria-label="close popup"
          className="popup__close popup__close_place_img button button_opacity_m"
          onClick={close}
        />
        <img
          src={selectedCard.link}
          alt="popup img"
          className="popup__img"
        />
        <p className="popup__img-title">{selectedCard.title}</p>
      </div>
    </div>
  );
}
export default ImagePopup;
