import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
    return (
        <PopupWithForm
            name='edit_profile'
            title='Редактировать профиль'
            titleBtn='Сохранить'
            isOpen={props.isOpen}
            onClose={props.onClose}>
            <label className="popup__input-block">
                <input name="name" type="text" id="input-profile-name" placeholder="Имя"
                       className="popup__input popup__input_type_name"
                       minLength="2" maxLength="40" required/>
                    <span className="popup__input-error input-profile-name-error"></span>
            </label>
            <label className="popup__input-block">
                <input name="about" type="text" id="input-profile-desc" placeholder="О себе"
                       className="popup__input popup__input_type_desc"
                       minLength="2" maxLength="200" required/>
                    <span className="popup__input-error input-profile-desc-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;