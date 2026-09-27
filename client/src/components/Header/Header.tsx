
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';

type HeaderProps = {
  isLoggedIn: boolean;
  email: string;
  onLogout: () => void;
  authLink?: "signin" | "signup";
};

function Header({
  isLoggedIn,
  email,
  onLogout,
  authLink,
}: HeaderProps) {
 return (
  <header className="header page__section">
    <img
      alt="Around The U.S."
      className="logo header__logo"
      src={logo}
    />

    {isLoggedIn && (
      <div className="header__user">
        <span className="header__email">{email}</span>

        <button
          className="header__logout"
          type="button"
          onClick={onLogout}
        >
          Cerrar sesión
        </button>
      </div>
    )}
    
    {!isLoggedIn && authLink === "signup" && (
  <Link className="header__auth-link" to="/signup">
    Regístrate
  </Link>
)}

{!isLoggedIn && authLink === "signin" && (
  <Link className="header__auth-link" to="/signin">
    Inicia sesión
  </Link>
)}
  </header>
);
}

export default Header;