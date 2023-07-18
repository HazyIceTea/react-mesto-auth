import PopupWithForm from "./PopupWithForm";
import React, {useState} from "react";

function AddCardPopup ({isOpened, onClose, onAddPlace}) {

    const [cardName, setCardName] = useState('');
    const [cardLink, setCardLink] = useState('');

    React.useEffect(() => {
        setCardName('');
        setCardLink('');
    }, [isOpened]);

    function handleName(evt){
        setCardName(evt.target.value);
    }

    function handleLink(evt){
        setCardLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({name: cardName, link: cardLink});
    }
    return(
        <PopupWithForm name="add-card"
                       title="Новое место"
                       buttonName="Создать"
                       isOpened={isOpened}
                       onClose={onClose}
                       onSubmit={handleSubmit}>
            <fieldset className="edit-form__input-field">
                <input type="text" name="name" placeholder="Название" id="picture-name-input"
                       className="edit-form__input edit-form__input_value_card-name" required
                       minLength="2"
                       maxLength="30" value={cardName} onChange={handleName}/>
                <span className="edit-form__validation-error" id="picture-name-input-error"></span>
                <input type="url" name="link" placeholder="Ссылка на картинку"
                       id="picture-link-input"
                       className="edit-form__input edit-form__input_value_image-src" required
                       value={cardLink} onChange={handleLink}/>
                <span className="edit-form__validation-error" id="picture-link-input-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default AddCardPopup;