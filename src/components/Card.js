import CurrentUserContext from "../contexts/CurrentUserContext";
import React from "react";

function Card({cardData,onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = cardData.owner._id === currentUser._id;
    const isLiked = cardData.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like-button ${isLiked && 'element__like-button_active'}`
    );
    return (
        <article className="element">
            <img className="element__image" alt={cardData.name} src={cardData.link}
                 onClick={() => {
                     onCardClick(cardData)
                 }}/>
            <h2 className="element__name">{cardData.name}</h2>
            {isOwn && <button className="element__button-delete" onClick={() => {onCardDelete(cardData)}}></button>}
            <div>
                <button type="button" className={cardLikeButtonClassName} onClick={() =>{onCardLike(cardData)}}></button>
                <p className="element__like-button-counter">{cardData.likes.length}</p>
            </div>
        </article>
    )
}

export default Card;