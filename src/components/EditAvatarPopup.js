import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const inputEl = useRef(null);

  const handleSubmit = (event) => {
    // Prevent the browser from navigating to the form address
    event.preventDefault();
    props.onUpdateAvatar({
      avatar: inputEl.current.value,
    });
  };

  return (
    <PopupWithForm
      title="Change profile picture"
      name="avatar"
      lable="Save"
      isOpen={props.isOpen}
      close={props.onClose}
      formName="avatarForm"
      onSubmit={handleSubmit}
    >
      <input
        ref={inputEl}
        id="avatar-link-input"
        className="popup__input popup__input-text popup__input-text_type_avatar-link"
        required
        type="url"
        placeholder="Avatar link"
        name="avatarImageLink"
      />
      <span className="popup__input-error avatar-link-input-error"/>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
