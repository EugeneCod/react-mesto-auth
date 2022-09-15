import headerLogo from '../images/header__logo.svg';

function Header({ buttonText, buttonColor, loginInfo }) {
  return (
    <header className="header">
      <div className="header__content">
        <a href="#app" className="header__logo">
          <img src={headerLogo} alt="Логотип" className="header__logo-image" />
        </a>
        <div className="header__auth-group">
          <p className="header__login-info">{loginInfo}</p>
          <button style={{color: buttonColor}} type="button" className="header__auth-button">{buttonText}</button>
        </div>
      </div>
    </header>
  )
}

export default Header