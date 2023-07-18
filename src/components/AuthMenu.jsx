import {Link} from "react-router-dom";

function AuthMenu({title, buttonName, children, onSubmit, linkText}) {
    return (
        <form className="auth-menu">
            <h2 className="auth-menu__title">{title}</h2>
            {children}
            <button className="auth-menu__submit-button" onClick={onSubmit}>{buttonName}</button>
            <Link to="/sign-in" className="auth-menu__link">{linkText}</Link>
        </form>
    )
}

export default AuthMenu