import logo from "../images/mesto-logo.svg";
import {Link} from "react-router-dom";

function Header({loggedIn, linkName, linkPath, onClick, email}){



    return (
        <header className="header page__header">
            <img src={logo} alt="Логотип Место" className="header__logo" />
            {loggedIn && <p className="header__email" >{email}</p>}
            <Link className="header__link" to={linkPath} onClick={onClick}>{linkName}</Link>
        </header>
    )
}

export default Header;