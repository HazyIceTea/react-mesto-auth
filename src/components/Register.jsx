import Header from "./Header";
import AuthMenu from "./AuthMenu";
import imageSuccess from "../images/register-success.svg";
import imageFail from "../images/register-fail.svg"
import {useState} from "react";
import {Link} from "react-router-dom";
import {register} from "../utils/Auth";
import RegisterPopup from "./RegisterPopup";

function Register() {
    const [isRegisterFailed, setIsRegisterFailed] = useState(false)
    const [isRegisterPopupOpened, setIsRegisterPopupOpened] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    function onClose() {
        setIsRegisterPopupOpened(false);
    }

    return (
        <>
            <Header linkName="Войти" linkPath="/sign-in"/>
            <AuthMenu title="Регистрация" linkText="Уже зарегистрированы? Войти" buttonName="Зарегистрироваться"
                      onSubmit={(evt) => {
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
                      }}>
                <input type="email" name="registerEmail" className="auth-menu__input" placeholder="Email"
                       onChange={(evt) => setEmailInput(evt.target.value)}/>
                <input type="password" name="registerPassword" className="auth-menu__input" placeholder="Пароль"
                       onChange={(evt) => setPasswordInput(evt.target.value)}/>
            </AuthMenu>


            <RegisterPopup registerPic={isRegisterFailed ? imageFail : imageSuccess}
                           registerMessage={isRegisterFailed ?
                               "Что-то пошло не так! Поробуйте ещё раз." :
                               "Вы успешно зарегистрировались!"}
                           isOpened={isRegisterPopupOpened} onClose={onClose}/>
        </>
    )
}

export default Register