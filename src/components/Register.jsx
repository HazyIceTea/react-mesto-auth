import AuthForm from "./AuthForm";
import imageSuccess from "../images/register-success.svg";
import imageFail from "../images/register-fail.svg"
import {useState} from "react";
import {register} from "../utils/Auth";
import InfoTooltip from "./InfoTooltip";

function Register() {
    const [isRegisterFailed, setIsRegisterFailed] = useState(false)
    const [isRegisterPopupOpened, setIsRegisterPopupOpened] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    function onClose() {
        setIsRegisterPopupOpened(false);
    }

    const handleEmailChange = (evt) => setEmailInput(evt.target.value);

    const handlePasswordChange = (evt) => setPasswordInput(evt.target.value);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        register({email: emailInput, password: passwordInput})
            .then(res => {
                setIsRegisterFailed(false);
                setIsRegisterPopupOpened(true);
            })
            .catch(err => {
                console.error(`Ошибка регистрации ${err}`);
                setIsRegisterFailed(true);
                setIsRegisterPopupOpened(true);
            })
    }

    return (
        <>

            <AuthForm title="Регистрация" linkText="Уже зарегистрированы? Войти" buttonName="Зарегистрироваться"
                      onSubmit={handleSubmit}>
                <input type="email" name="registerEmail" className="auth-menu__input" placeholder="Email"
                       value={emailInput}
                       onChange={handleEmailChange}/>
                <input type="password" name="registerPassword" className="auth-menu__input" placeholder="Пароль"
                       value={passwordInput}
                       onChange={handlePasswordChange}/>
            </AuthForm>


            <InfoTooltip registerPic={isRegisterFailed ? imageFail : imageSuccess}
                         registerMessage={isRegisterFailed ?
                             "Что-то пошло не так! Поробуйте ещё раз." :
                             "Вы успешно зарегистрировались!"}
                         isOpened={isRegisterPopupOpened} onClose={onClose}/>
        </>
    )
}

export default Register