import React from "react";

function Card({card,onCardClick,onCardDeleteClick}) {
    return (
        <article className="place-card">
            <img
                className="place-card__image"
                src={card.link}
                alt={card.name}
                onClick={() => onCardClick({link: card.link, name: card.name})}
            />
            <button className="place-card__delete-btn"
                    type="button"
                    onClick={onCardDeleteClick}>
            </button>
            <div className="place-card__description">
                <h2 className="place-card__title">{card.name}</h2>
                <div className="place-card__like-block">
                    <button type="button" className="place-card__like-btn"></button>
                    <p className="place-card__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </article>

    )
}

export default Card;