import imageApproval from '../images/popup__info-image_approval.svg';
import imageFailure from '../images/popup__info-image_failure.svg';
import Popup from './Popup';


function InfoTooltip({ isOpen, onClose, data }) {
  const images = {approval: imageApproval, failure: imageFailure}

  return (
    <Popup
      isOpen = {isOpen}
      onClose = {onClose}
      name = "info"
    >
      <div className="popup__info">
          <img className="popup__info-image" src={images[data.imageName]} alt="Инфографика" />
          <p className="popup__info-text">
            {data.text}
          </p>
        </div>
    </Popup>
  )
}

export default InfoTooltip