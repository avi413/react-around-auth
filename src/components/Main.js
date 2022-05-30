import React, { useContext } from "react";
import Card from "./Card";
import profileEdit from "../images/profile-edit.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <p className="profile__error" />
        <div className="profile__info">
          <div className="profile__img">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="avatar"
            />
            <img
              className="profile__edit-avatar"
              src={profileEdit}
              alt="edit profile"
              onClick={props.onEditAvatarClick}
            />
          </div>
          <div className="profile__text">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__about-me">{currentUser.about}</p>
            <button
              aria-label="edit profile"
              type="button"
              className="profile__edit-btn button button_clear button_open button_opacity_m button_border_sm"
              onClick={props.onEditProfileClick}
            />
          </div>
        </div>
        <button
          aria-label="add profile"
          type="button"
          className="profile__add-btn button button_clear button_open button_opacity_m button_border_m"
          onClick={props.onAddPlaceClick}
        />
      </section>

      <section className="gallery">
        <ul className="gallery__list">
          {props.cards.map(function(card) {
            const isLiked = card.likes.some(
              (user) => user._id === currentUser._id
            );

            return (
              <Card
                click={props.onCardClick}
                card={card}
                key={card._id}
                onCardLike={props.onCardLike}
                isLiked={isLiked}
                onCardDelete={props.onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
