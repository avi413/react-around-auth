import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const card = props.card;
  const isOwn = card.owner._id === currentUser._id;
  // Creating a variable which will then set in `className` for the delete button
  const cardDeleteButtonClassName = `${
    isOwn
      ? "gallery__item-trash-btn_visible"
      : " gallery__item-trash-btn_hidden"
  }`;
  const isLikedClass = `${
    props.isLiked ? "gallery__like-btn_active" : "gallery__like-btn"
  }`;
  return (
    <div id={card.id}>
      <li className="gallery__item">
        <button
          aria-label="trash button"
          type="button"
          className={`${cardDeleteButtonClassName} button button_clear`}
          onClick={() => props.onCardDelete(card)}
        />
        <img
          src={card.link}
          className="gallery__item-img"
          onClick={() => props.click({ link: card.link, name: card.name })}
          alt={card.name}
        />
        <div className="gallery__item-footer">
          <h2 className="gallery__item-name">{card.name}</h2>
          <div className="gllery__like">
            <button
              aria-label="like button"
              type="button"
              className={`${isLikedClass} button button_clear`}
              onClick={() => props.onCardLike(card)}
            />
            <p className="gllery__like-count">{card.likes.length}</p>
          </div>
        </div>
      </li>
    </div>
  );
}

export default Card;
