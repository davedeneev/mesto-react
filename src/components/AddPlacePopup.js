import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    return (
        <PopupWithForm
            name='add_card'
            title='Новое место'
            titleBtn='Создать'
            isOpen={props.isOpen}
            onClose={props.onClose}>
            <label className="popup__input-block">
                <input name="name" type="text" id="input-card-name" placeholder="Название"
                       className="popup__input popup__input_type_name"
                       minLength="2" maxLength="30" required/>
                    <span className="popup__input-error input-card-name-error"></span>
            </label>
            <label className="popup__input-block">
                <input name="link" type="url" id="input-card-url" placeholder="Ссылка на картинку"
                       className="popup__input popup__input_type_desc" required/>
                    <span className="popup__input-error input-card-url-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;