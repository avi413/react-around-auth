import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [profileName, setProfileName] = useState("");
  const [profileAboutMe, setProfileAboutMe] = useState({});

  const handleSubmit = (event) => {
    // Prevent the browser from navigating to the form address
    event.preventDefault();
    // Pass the values of the managed components to the external handler
    props.onUpdateUser({
      name: profileName,
      about: profileAboutMe,
    });
  };
  const handleNameChange = (e) => setProfileName(e.currentTarget.value);
  const handleAboutMeChange = (e) => setProfileAboutMe(e.currentTarget.value);

  useEffect(() => {
    setProfileName(currentUser.name);
    setProfileAboutMe(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      title="Edit profile"
      name="profile"
      lable="Save"
      isOpen={props.isOpen}
      close={props.onClose}
      formName="profileForm"
      onSubmit={handleSubmit}
    >
      <input
        id="profile-name-input"
        required
        className="popup__input popup__input-text popup__input-text_type_name"
        type="text"
        placeholder="name"
        value={profileName ? profileName : ""}
        name="profileName"
        minLength="2"
        maxLength="40"
        onChange={handleNameChange}
      />
      <span className="popup__input-error profile-name-input-error" />
      <input
        id="profile-about-me-input"
        required
        className="popup__input popup__input-text popup__input-text_type_about-me"
        type="text"
        placeholder="About me"
        value={profileAboutMe ? profileAboutMe : ""}
        name="profileAboutMe"
        minLength="2"
        maxLength="400"
        onChange={handleAboutMeChange}
      />
      <span className="popup__input-error profile-about-me-input-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
