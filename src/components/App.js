import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React, {useEffect, useState} from "react";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddCardPopup from "./AddCardPopup";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import {getMyInfo} from "../utils/Auth";

function App() {
    const [loggedIn, setLoggedIn] = useState(false)

    function logIn() {
        setLoggedIn(true);
    }

    function logOut(){
        setLoggedIn(false);
        localStorage.removeItem('jwt');
    }

    const navigate = useNavigate();

    const [isAvatarPopupOpened, setIsAvatarPopupOpened] = useState(false);
    const [isEditProfileOpened, setIsEditProfileOpened] = useState(false);
    const [isAddPlacePopupOpened, setIsAddPlacePopupOpened] = useState(false);
    const [isImagePopupOpened, setIsImagePopupOpened] = useState(false);
    const [currentCard, setCurrentCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});


    const [cards, setCards] = useState([]);

    const [email, setEmail] = useState('');

    function getEmail(){
        getMyInfo(localStorage.getItem('jwt'))
            .then(res => setEmail(res.data.email))
    }

    useEffect(() => {
        api.getAllCards()
            .then(res => setCards(res))
            .catch(err => console.error(`Ошибка при загрузке начальных данных страницы ${err}`))
    }, [])


    useEffect(() => {
        api.getUserInfo()
            .then(res => setCurrentUser(res))
            .catch(err => console.error(`Ошибка получения данных пользователя ${err}`))
    }, [])

    useEffect(() =>{
        const jwt = localStorage.getItem('jwt');
        if(jwt){
            getMyInfo(jwt)
                .then(res=> {if(res){
                    setLoggedIn(true);
                    setEmail(res.data.email)
                    navigate('/');
                }})
        }
    }, [])

    function closeAllPopups() {
        setIsAvatarPopupOpened(false);
        setIsEditProfileOpened(false);
        setIsAddPlacePopupOpened(false);
        setIsImagePopupOpened(false);
    }

    function handleEditAvatarClick() {
        setIsAvatarPopupOpened
        (true);
    }

    function handleEditProfileClick() {
        setIsEditProfileOpened(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpened(true);
    }

    function handleCardClick(data) {
        setIsImagePopupOpened(true);
        setCurrentCard(data);
    }

    function handleUpdateUser(userData) {
        api.sendUserInfo(userData)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups()
            })
            .catch(err => console.error(`Ошибка изменения профиля ${err}`))
    }

    function handleUpdateAvatar(data) {
        api.changeAvatar(data)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups()
            })
            .catch(err => console.error(`Ошибка смены аватара ${err}`))
    }

    function handleAddCardSubmit(cardData) {
        api.sendCard(cardData)
            .then(res => {
                setCards([res, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.error(`Ошибка отправки карточки ${err}`))
    }


    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        if (!isLiked) {
            api.likeCard(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch(err => console.error(`Ошибка обработки лайка карточки ${err}`))
        } else {
            api.dislikeCard(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch(err => console.error(`Ошибка обработки лайка карточки ${err}`))
        }

    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards(cards.filter(item => {
                    return item._id !== card._id
                }))
            })
            .catch(err => console.error(`Ошибка удаления карточки ${err}`))

    }

    return (
        <CurrentUserContext.Provider value={currentUser}>


            <Routes>
                <Route path="/" element={<ProtectedRoute path="/" element={Main} onEditAvatar={handleEditAvatarClick}
                                                         onEditProfile={handleEditProfileClick}
                                                         onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick}
                                                         cards={cards}
                                                         onCardLike={handleCardLike} onCardDelete={handleCardDelete}
                                                         loggedIn={loggedIn} logOut={logOut} email={email}/>}/>
                <Route path="/sign-up" element={<Register/>}/>
                <Route path="/sign-in" element={<Login logIn={logIn} getEmail={getEmail}/>}/>
                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>

            <EditProfilePopup isOpened={isEditProfileOpened} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

            <AddCardPopup isOpened={isAddPlacePopupOpened} onClose={closeAllPopups} onAddPlace={handleAddCardSubmit}/>

            <PopupWithForm name="confirm" title="Вы уверены?" buttonName="Да"/>

            <EditAvatarPopup isOpened={isAvatarPopupOpened} onClose={closeAllPopups}
                             onUpdateAvatar={handleUpdateAvatar}/>

            <ImagePopup isOpened={isImagePopupOpened} currentCard={currentCard} onClose={closeAllPopups}/>

        </CurrentUserContext.Provider>

    );
}

export default App;
