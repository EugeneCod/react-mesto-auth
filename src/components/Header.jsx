import { useLocation, Link } from 'react-router-dom';
import headerLogo from '../images/header__logo.svg';

function Header({ loggedIn, loginInfo, onLogout }) {

  const location = useLocation();
  const linkText = `${location.pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
  const nextPath = `${location.pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`;

  return (
    <header className="header">
      <div className="header__content">
        <a href="#app" className="header__logo">
          <img src={headerLogo} alt="Логотип" className="header__logo-image" />
        </a>
        {loggedIn
          ? 
            (<div className="header__auth-group">
              <p className="header__login-info">{loginInfo}</p>
              <button type="button" className="header__logout-button" onClick={onLogout}>Выйти</button>
            </div>)
          : 
            (<div className="header__auth-group">
              <Link to={nextPath} className="header__auth-link">{linkText}</Link>
            </div>)
        }
      </div>
    </header>
  )
}

export default Header