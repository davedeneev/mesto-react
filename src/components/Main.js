import React, { useState, useEffect } from 'react';
import api from "../utils/api.js";
import Card from './Card.js';
import editPic from '../images/edit_pic.svg';

function Main(props) {

    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getUser(), api.getInitialCards()])
            .then(([userInfo, initialCards]) => {
                setUserName(userInfo.name);
                setUserDescription(userInfo.about);
                setUserAvatar(userInfo.avatar);
                initialCards.forEach(data => data.id = userInfo._id);
                setCards(initialCards);
            })
            .catch((error) => console.log(`Ошибка: ${error}`));
    }, []);

    return(
        <main>
            <section className="profile">
                <div className="profile__wrapper">
                    <img
                        className="profile__image"
                        src={userAvatar}
                        alt="Аватар пользователя"
                    />
                    <button
                        type="button"
                        className="profile__avatar-btn"
                        onClick={props.onEditAvatar}>
                        <img
                            className="profile__edit-avatar"
                            src={editPic}
                            alt="Аватар пользователя"
                        />
                    </button>
                    <div className="profile__info">
                        <div className="profile__name-block">
                            <h1 className="profile__name">{userName}</h1>
                            <button
                                type="button"
                                aria-label="Редактировать"
                                className="profile__edit-btn"
                                onClick={props.onEditProfile}
                            />
                        </div>
                        <p className="profile__description">{userDescription}</p>
                    </div>
                </div>
                <button
                    type="button"
                    className="profile__add-btn"
                    onClick={props.onAddPlace}
                />
            </section>
            <section className="places">
                {cards.map((data) => (
                    <Card
                        key={data['_id']}
                        card={data}
                        onCardDeleteClick={props.onCardDeleteClick}
                        onCardClick={props.onCardClick}/>
                ))}
            </section>
        </main>
    );
}

export default Main;