import AuthForm from "./AuthForm";
import {login} from "../utils/Auth";
import {useState} from "react";

function Login({handleLogin}) {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const handleEmailChange = (evt) => setEmailInput(evt.target.value);

    const handlePasswordChange = (evt) => setPasswordInput(evt.target.value);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        login({email: emailInput, password: passwordInput})
            .then(() => handleLogin(emailInput))
            .catch(err => console.error(`Ошибка входа ${err }`))
    }
    return (
        <>

            <AuthForm title="Вход" buttonName="Войти" onSubmit={handleSubmit}>
                <input type="email" name="loginEmail" className="auth-menu__input" placeholder="Email"
                       onChange={handleEmailChange} value={emailInput}/>
                <input type="password" name="loginPassword" className="auth-menu__input" placeholder="Пароль"
                       onChange={handlePasswordChange} value={passwordInput}/>
            </AuthForm>
        </>
    )
}

export default Login