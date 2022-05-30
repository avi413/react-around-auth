import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [placeName, setPlaceName] = useState("");
  const [placeImageLink, setPlaceImageLink] = useState("");

  const handleNameChange = (e) => setPlaceName(e.currentTarget.value);
  const handleImageLinkChange = (e) => setPlaceImageLink(e.currentTarget.value);

  const handleSubmit = (event) => {
    // Prevent the browser from navigating to the form address
    event.preventDefault();
    props.onAddPlace({
      link: placeImageLink,
      name: placeName,
    });
    setPlaceName("");
    setPlaceImageLink("");
  };
  return (
    <PopupWithForm
      title="New place"
      name="new-card"
      lable="Save"
      isOpen={props.isOpen}
      close={props.onClose}
      formName="newCardForm"
      onSubmit={handleSubmit}
    >
      <input
        id="card-title-input"
        className="popup__input popup__input-text popup__input-text_type_title"
        required
        type="text"
        placeholder="Title"
        name="placeName"
        minLength="2"
        maxLength="30"
        onChange={handleNameChange}
        value={placeName}
      />
      <span className="popup__input-error card-title-input-error" />
      <input
        id="card-link-input"
        className="popup__input popup__input-text popup__input-text_type_Image-link"
        required
        type="url"
        placeholder="Image link"
        name="placeImageLink"
        onChange={handleImageLinkChange}
        value={placeImageLink}
      />
      <span className="popup__input-error card-link-input-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
