import { useState, useEffect } from 'react';
import Popup from './Popup';


function ImagePopup({ onClose, card }) {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    setIsOpen(Object.keys(card).length !== 0)
  }, [card]);
  
  return (
    <Popup
      isOpen = {isOpen}
      onClose = {onClose}
      name = "picture"
    >
      <img src={card?.link} alt={card?.name} className="popup__image" />
      <p className="popup__image-caption">{card?.name}</p>
    </Popup>
  )
}

export default ImagePopup