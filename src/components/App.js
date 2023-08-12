import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import ConfirmationPopup from "./ConfirmationPopup";

function App() {
    const [isEditAvatarPopupOpen,setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen,setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen,setIsAddPlacePopupOpen] = React.useState(false);
    const [isConfirmationPopupOpen,setIsConfirmationPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard]=React.useState({});
    const [isImagePopup, setImagePopup]=React.useState(false);

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

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsConfirmationPopupOpen(false);
        setImagePopup(false);
    }

    return (
        <div className="site">
            <div className="page">
                <Header/>
                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardDeleteClick={handleConfirmationClick}
                    onCardClick={handleCardClick}
                />
                <Footer/>
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
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
  );
}

export default App;
