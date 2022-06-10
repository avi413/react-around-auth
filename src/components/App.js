import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  useHistory,
  Switch,
  Route,
} from "react-router-dom";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { api } from "../utils/api";
import * as auth from "../utils/auth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import success from "../images/success.svg";
import error from "../images/error.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInData, setLoggedInData] = useState(null);
  const history = useHistory();
  const handleLogedInUser = (loggedInData) => {
    setLoggedIn(true);
    setLoggedInData(loggedInData);
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            const loggedInData = {
              email: res.data.email,
            };
            setLoggedIn(true);
            setLoggedInData(loggedInData);
            api
              .init()
              .then(([user, cards]) => {
                user.loggedIn = true;
                setCurrentUser(user);
                setCards(cards);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        })
        .then(() => {
          history.push("/");
        });
    } else {
      setLoggedIn(false);
      console.log(loggedIn);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    } else {
      history.push("/login");
    }
  }, [loggedIn, history]);

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
    setIsErrorPopupOpen(false);
    setIsSuccessPopupOpen(false);
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
  const handleLogin = () => {
    setIsSuccessPopupOpen(true);
    setLoggedIn(true);
  };

  const handleErrorLogin = () => {
    setIsErrorPopupOpen(true);
  };

  return (
    <Router>
      <div className="app">
        <CurrentUserContext.Provider value={currentUser}>
          <InfoTooltip
            link={success}
            title="Success! You have now been registered."
            onClose={closeAllPopups}
            isOpen={isSuccessPopupOpen}
          />
          <InfoTooltip
            link={error}
            title="Oops, something went wrong! Please try again."
            onClose={closeAllPopups}
            isOpen={isErrorPopupOpen}
          />
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

          <Switch>
            <Route path="/signin">
              <Header loggedIn={loggedIn} page={"Sign Up"} link="/signup" />
              <Login
                handleLogin={handleLogin}
                handleErrorLogin={handleErrorLogin}
              />
            </Route>
            <Route path="/signup">
              <Header loggedIn={loggedIn} page={"Log in"} link="/signin" />
              <Register />
            </Route>

            <ProtectedRoute
              path="/"
              email={loggedInData.email}
              page="Log out"
              link="/signin"
              loggedIn={loggedIn}
              HandleLogedInUser={handleLogedInUser}
              component={Main}
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
          </Switch>
          <Footer />
        </CurrentUserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
