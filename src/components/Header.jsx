import headerLogo from '../images/header__logo.svg';

function Header({ buttonText, onAuth }) {
  return (
    <header className="header">
      <a href="#app" className="header__logo">
        <img src={headerLogo} alt="Логотип" className="header__logo-image" />
      </a>
      <div className="header__auth-group">
        <p className="header__login-info">email@mail.com</p>
        <button onClick={onAuth} type="button" className="header__auth-button">{buttonText}</button>
      </div>
    </header>
  )
}

export default Header