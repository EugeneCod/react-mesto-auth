import { useEffect } from 'react';
import closeIcon from '../images/popup__close-icon.svg';
import imageApproval from '../images/popup__info-image_approval.svg';
import imageFailure from '../images/popup__info-image_failure.svg';


function InfoTooltip({ isOpen, onClose, data }) {
  const images = {approval: imageApproval, failure: imageFailure}

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
    <div onClick={onClose} className={`popup popup_contain_info ${isOpen && 'popup_opened'}`}>
      <div onClick={(e) => e.stopPropagation()} className="popup__container popup__container_contain_info">
        <button onClick={onClose} type="button" className="popup__close-button">
          <img src={closeIcon} alt="Закрыть" className="popup__close-icon" />
        </button>
        <div className="popup__info">
          <img className="popup__info-image" src={images[data.imageName]} alt="Инфографика" />
          <p className="popup__info-text">
            {data.text}
          </p>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip