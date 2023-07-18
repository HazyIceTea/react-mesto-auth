function RegisterPopup({isOpened, registerPic, registerMessage, onClose}) {


    return (
        <div className={`popup ${isOpened && "popup_opened"}`}>
            <div className="popup__container popup__container_type_register">
                <img src={registerPic} alt="Декоративная картинка статуса регистрации" className="popup__register-image"/>
                <p className="popup__register-title">{registerMessage}</p>
                <button type="button" className="popup__close-button" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default RegisterPopup;