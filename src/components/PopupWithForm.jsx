import Popup from "./Popup"


function PopupWithForm({ children, title, name, buttonText, valid, isOpen, onClose, onSubmit }) {
  return (
    <Popup
      isOpen = {isOpen}
      onClose = {onClose}
      name = {name}
    >
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
    </Popup>
  )
}

export default PopupWithForm