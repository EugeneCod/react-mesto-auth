import { useEffect } from 'react';
import closeIcon from '../images/popup__close-icon.svg';

function ImagePopup({ onClose, card }) {

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }

    Object.keys(card).length !== 0 && document.addEventListener('keyup', handleEscClose);
    return () => document.removeEventListener('keyup', handleEscClose);
  }, [card, onClose])

  return (
    <div onClick={onClose} className={`popup popup_contain_picture ${Object.keys(card).length !== 0 && 'popup_opened'}`}>
      <div onClick={(e) => e.stopPropagation()} className="popup__container popup__container_contain_picture">
        <button onClick={onClose} type="button" className="popup__close-button">
          <img src={closeIcon} alt="Закрыть" className="popup__close-icon" />
        </button>
        <img src={card?.link} alt={card?.name} className="popup__image" />
        <p className="popup__image-caption">{card?.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup