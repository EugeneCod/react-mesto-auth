import { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../context/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithConfirmation from './PopupWithConfirmation';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import * as auth from '../utils/auth.js';
import InfoTooltip from './InfoTooltip';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIisEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isPopupWithConfirmOpen, setIsPopupWithConfirmOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [idDeletedCard, setIdDeletedCard] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('')
  const [infoTooltipData, setInfoTooltipData] = useState({ text: '', imageName: '' });
  const history = useHistory();

  console.log(localStorage.getItem('jwt'));

  useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getCards(),
    ])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData)
      })
      .catch(err => console.log(`${err} при первичной загрузке данных`));
  }, [])
  
  useEffect(() => {
    if (!loggedIn) return;
    history.push('/');
  }, [loggedIn])
  
  useEffect(() => {
    function tokenCheck () {
      if (!localStorage.getItem('jwt')) return;
      const jwt = localStorage.getItem('jwt');
      auth.getTokenAndEmail(jwt)
      .then(data => {
        setLoggedIn(true);
        setUserEmail(data.email);
        history.push('/');
      })
      .catch(err => console.log(err));
    }
    tokenCheck();
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(isLiked, card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(`${err} при обновлении "лайка" карточки`));
  }

  function handleCardDelete() {
    setIsLoading(true);
    api.deleteCard(idDeletedCard)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== idDeletedCard))
        closeAllPopups();
      })
      .catch(err => console.log(`${err} при удалении карточки`))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleCardDeleteIconClick(cardId) {
    setIdDeletedCard(cardId);
    setIsPopupWithConfirmOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIisEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIisEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPopupWithConfirmOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({})
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(userInfo) {
    setIsLoading(true);
    api.setUserInfo(userInfo)
      .then(userData => {
        setCurrentUser(userData)
        closeAllPopups();
      })
      .catch(err => console.log(`${err} при обновлении данных о пользователе`))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateAvatar(avatarInfo) {
    setIsLoading(true);
    api.setAvatar(avatarInfo)
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => console.log(`${err} при обновлении аватара пользователя`))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleAddPlaceSubmit(cardsData) {
    setIsLoading(true);
    api.addCard(cardsData)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(`${err} при добавлении карточки`))
      .finally(() => {
        setIsLoading(false);
      })
  }
  
  function handleRegistration(email, password) {
    setIsLoading(true);
    auth.register(email, password)
      .then((res) => {
        setInfoTooltipData({
          text: 'Вы успешно зарегистрировались!',
          imageName: 'approval'
        });
        setIsInfoTooltipOpen(true);
        history.push('/sign-in');
      })
      .catch(err => {
        setInfoTooltipData({
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
          // text: err,
          imageName: 'failure'
        });
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleLogin(email, password) {
    setIsLoading(true);
    auth.authorize(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }
  
  return (
    <CurrentUserContext.Provider value={
      currentUser
    }>
      <div className="App" id="app">
        <div className="wrapper">
          <Header
            loginInfo={userEmail}
            loggedIn={loggedIn}
            onLogout={handleLogout}
          />
          <div className="container">
            <Switch>
              <Route path="/sign-up">
                <Register
                  isLoading={isLoading}
                  onRegistration={handleRegistration}
                />
              </Route>
              <Route path="/sign-in">
                <Login
                  isLoading={isLoading}
                  onLogin={handleLogin}
                />
              </Route>
              <ProtectedRoute
                path="/"
                exact
                loggedIn={loggedIn}
                component={Main}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDeleteIconClick}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
              />
              <Route path="*">
                <p style={{ color: "white", textAlign: "center", minHeight: "100vh", marginTop: "50px" }}>404 NOT FOUND</p>
              </Route>
            </Switch>
            {loggedIn && <Footer />}
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              buttonText={!isLoading ? "Сохранить" : "Сохранение..."}
            />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              buttonText={!isLoading ? "Сохранить" : "Сохранение..."}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
              buttonText={!isLoading ? "Создать" : "Создание..."}
            />
            <PopupWithConfirmation
              isOpen={isPopupWithConfirmOpen}
              onClose={closeAllPopups}
              onConfirm={handleCardDelete}
              buttonText={!isLoading ? "Да" : "Выполнение..."}
            />
            <ImagePopup
              onClose={closeAllPopups}
              card={selectedCard}
            />
            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
              data={infoTooltipData}
            />
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;


