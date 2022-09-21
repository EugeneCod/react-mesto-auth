import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import headerLogo from '../images/header__logo.svg';

const screenWithTablet = 767;

function Header({ loggedIn, loginInfo, onLogout }) {
  const location = useLocation();
  const linkText = `${location.pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
  const nextPath = `${location.pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMenuOpenClassFr = '_is-menu-open';
  const isMenuClassFr = '_is-menu';

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    if (windowWidth <= screenWithTablet){setIsMenu(true)}

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [windowWidth])

  useEffect(() => {
    if (windowWidth > screenWithTablet && (isMenu || isMenuOpen)) {
      setIsMenu(false);
      setIsMenuOpen(false);
    }
  }, [windowWidth, isMenu, isMenuOpen])

  useEffect(() => {
    if (windowWidth <= screenWithTablet && !loggedIn) {
      setIsMenu(false);
      setIsMenuOpen(false);
    } else if (windowWidth <= screenWithTablet) {
      setIsMenu(true);
    }
  }, [windowWidth, loggedIn])

  function toggleMenuOpen() {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="header">
      <div className={`header__content ${isMenuOpen ? `header__content${isMenuOpenClassFr}` : ""}`}>
        <a href="#app" className="header__logo">
          <img src={headerLogo} alt="Логотип" className="header__logo-image" />
        </a>
        <div 
          onClick={toggleMenuOpen}
          className={`
            header__burger-container 
            ${isMenuOpen ? `header__burger-container${isMenuOpenClassFr}` : ""}
            ${isMenu ? `header__burger-container${isMenuClassFr}` : ""}
          `}
        >
          <span className={`header__burger ${isMenuOpen ? `header__burger${isMenuOpenClassFr}` : ""}`}></span>
        </div>
        <div 
          className={`
            header__auth-group
            ${isMenuOpen ? `header__auth-group${isMenuOpenClassFr}` : ""}
            ${isMenu ? `header__auth-group${isMenuClassFr}` : ""}
          `}
        >
          {loggedIn
            ?
            <>
              <p className="header__login-info">{loginInfo}</p>
              <button type="button" className="header__logout-button" onClick={onLogout}>Выйти</button>
            </>
            :
            <Link to={nextPath} className="header__auth-link">{linkText}</Link>
          }
        </div>
      </div>
    </header>
  )
}

export default Header