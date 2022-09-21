import { useEffect } from 'react'
import closeIcon from '../images/popup__close-icon.svg';


function Popup({ children, isOpen, onClose, name }) {

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
    <div onMouseDown={onClose} className={`popup popup_contain_${name} ${isOpen && 'popup_opened'}`}>
      <div onMouseDown={(e) => e.stopPropagation()} className={`popup__container popup__container_contain_${name}`}>
        <button onClick={onClose} type="button" className="popup__close-button">
          <img src={closeIcon} alt="Закрыть" className="popup__close-icon" />
        </button>
        {children}
      </div>
    </div>
  )
}

export default Popup