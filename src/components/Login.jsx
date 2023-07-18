import Header from "./Header";
import AuthMenu from "./AuthMenu";
import {login} from "../utils/Auth";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Login({logIn, getEmail}) {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const navigate = useNavigate();
    return (
        <>
            <Header linkName="Регистрация" linkPath="/sign-up"/>
            <AuthMenu title="Вход" buttonName="Войти" onSubmit={(evt) => {
                evt.preventDefault();
                login({email: emailInput, password: passwordInput})
                    .then(() => {getEmail(); logIn();  navigate('/')})
                    .catch(err => console.error(`Ошибка входа ${err }`))
            }}>
                <input type="email" name="loginEmail" className="auth-menu__input" placeholder="Email"
                       onChange={(evt) => setEmailInput(evt.target.value)}/>
                <input type="password" name="loginPassword" className="auth-menu__input" placeholder="Пароль"
                       onChange={(evt) => setPasswordInput(evt.target.value)}/>
            </AuthMenu>
        </>
    )
}

export default Login