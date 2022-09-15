import { useEffect } from 'react';
import closeIcon from '../images/popup__close-icon.svg';


function PopupWithForm({ children, title, name, buttonText, valid, isOpen, onClose, onSubmit }) {

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }

    isOpen && document.addEventListener('keyup', handleEscClose);
    return () => document.removeEventListener('keyup', handleEscClose);
  }, [isOpen, onClose])

  return (
    <div onMouseDown={onClose} className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div onMouseDown={(e) => e.stopPropagation()} className="popup__container">
        <button onClick={onClose} type="button" className="popup__close-button">
          <img src={closeIcon} alt="Закрыть" className="popup__close-icon" />
        </button>
        <form
          onSubmit={onSubmit}
          noValidate
          name={name}
          className={`editing-form editing-form_related-to_${name}`}
          id={name}
          method="get"
        >
          <fieldset className="editing-form__fieldset" form={name}>
            <legend className="editing-form__legend">{title}
            </legend>
            {children}
            <button
              type="submit"
              className={`editing-form__button ${!valid && "editing-form__button_inactive"}`}
            >
              {buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm