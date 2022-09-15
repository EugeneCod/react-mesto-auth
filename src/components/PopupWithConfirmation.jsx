import PopupWithForm from './PopupWithForm'

function PopupWithConfirmation({isOpen, onClose, onConfirm, buttonText}) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onConfirm();
  }
  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      buttonText={buttonText}
      valid={true}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default PopupWithConfirmation