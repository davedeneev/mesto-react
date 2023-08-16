import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import ConfirmationPopup from "./ConfirmationPopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
    const [isEditAvatarPopupOpen,setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen,setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen,setIsAddPlacePopupOpen] = useState(false);
    const [isConfirmationPopupOpen,setIsConfirmationPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard]= useState({});
    const [isImagePopup, setImagePopup]= useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getUser(), api.getInitialCards()])
            .then(([userInfo, initialCards]) => {
                setCurrentUser(userInfo);
                setCards(initialCards);
            })
            .catch(console.error);
    }, []);

    function handleEditAvatarClick () {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick () {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick () {
        setIsAddPlacePopupOpen(true);
    }

    function handleConfirmationClick () {
        setIsConfirmationPopupOpen(true);
    }

    function handleCardClick (card) {
        setSelectedCard(card);
        setImagePopup(true);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus({
            id: card._id,
            isLiked: !isLiked
        }).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch(console.error);
    }

    function handleCardDelete(card) {
        api.deleteCard({
            id: card._id
        })
            .then(() => {
                setCards(state => state.filter(item => item._id !== card._id));
            })
            .catch(console.error);
    }

    function handleUpdateUser(user) {
        api.editUserProfile(user)
            .then((inputs) => {
                setCurrentUser(inputs);
                closeAllPopups();
            })
            .catch(console.error);
    }

    function handleUpdateAvatar(user) {
        api.editUserAvatar(user)
            .then((inputs) => {
                setCurrentUser(inputs);
                closeAllPopups();
            })
            .catch(console.error);
    }

    function handleAddPlaceSubmit(data) {
        api.addCard(data)
            .then((card) => {
                setCards([card, ...cards]);
                closeAllPopups();
            })
            .catch(console.error);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsConfirmationPopupOpen(false);
        setImagePopup(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="site">
                <div className="page">
                    <Header/>
                    <Main
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardDeleteClick={handleConfirmationClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
                    <Footer/>
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
                    <ConfirmationPopup
                        isOpen={isConfirmationPopupOpen}
                        onClose={closeAllPopups}
                    />
                    <ImagePopup
                        card={selectedCard}
                        isOpen={isImagePopup}
                        onClose={closeAllPopups}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
  );
}

export default App;
