function ImagePopup({isOpened, currentCard, onClose}) {
    return (
        <div className={`popup popup_event_open-picture ${isOpened && "popup_opened"}`}>
            <div className="popup__container popup__container_type_picture">
                <img className="popup__image-full" src={currentCard.link} alt={currentCard.name}/>
                <h2 className="popup__image-title">{currentCard.name}</h2>
                <button type="button" className="popup__close-button" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default ImagePopup;