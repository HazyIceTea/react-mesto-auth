import PopupWithForm from "./PopupWithForm";
import {useRef} from "react";

function EditAvatarPopup({isOpened, onClose, onUpdateAvatar}){

    const avatarRef = useRef();
    function handleSubmit(evt){
        evt.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }
    return(
        <PopupWithForm name="update-avatar"
                       title="Обновить аватар"
                       buttonName="Сохранить"
                       isOpened={isOpened}
                       onClose={onClose}
                       onSubmit={handleSubmit}>
            <fieldset className="edit-form__input-field">
                <input type="url" name="avatar" placeholder="Ссылка на аватар"
                       id="change-avatar-input"
                       className="edit-form__input edit-form__input_value_change-avatar" required
                       ref={avatarRef}/>
                <span className="edit-form__validation-error" id="change-avatar-input-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
