import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .init()
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({
      isCardOpen: false,
      link: "",
    });
  };

  const handleCardClick = (data) => {
    const src = data.link;
    const title = data.name;
    setSelectedCard({
      isCardOpen: true,
      link: src,
      title: title,
    });
  };

  const handleUpdateUser = (data) => {
    api
      .editProfile(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleUpdateAvatar = (data) => {
    api
      .editProfileAvatar(data.avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    // Check one more time if this card was already liked
    // Send a request to the API and getting the updated card data
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => item._id !== card._id));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleAddPlaceSubmit = (card) => {
    api
      .createNewCard(card.link, card.name)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          title="Are you sure?"
          name="delete"
          lable="Yes"
          isOpen={false}
          close={closeAllPopups}
          formName="deleteForm"
        />

        <ImagePopup selectedCard={selectedCard} close={closeAllPopups} />
        <Header />
        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          isEditProfilePopupOpen={isEditProfilePopupOpen}
          isAddPlacePopupOpen={isAddPlacePopupOpen}
          isEditAvatarPopupOpen={isEditAvatarPopupOpen}
          selectedCard={selectedCard}
          cards={cards}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
