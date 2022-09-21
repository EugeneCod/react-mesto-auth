import { useRef, useState, useEffect } from 'react'
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, buttonText }) {

  const inputRef = useRef()
  const [errMessage, setErrMessage] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [inputValid, setInputValid] = useState({avatar: false})

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  function handleChange(e) {
    setErrMessage(e.target.validationMessage);
    setInputValid({avatar: e.target.validity.valid})
  }

  useEffect(() => {
    setFormValid(!!inputValid.avatar);
  }, [inputValid, formValid])

  useEffect(() => {
    inputRef.current.value = '';
    setErrMessage('');
    setInputValid({avatar: false});
  }, [isOpen])

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      buttonText={buttonText}
      valid={formValid}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="editing-form__field">
        <input
          onChange={handleChange}
          ref={inputRef}
          type="url"
          name="avatar"
          placeholder="Ссылка на картинку"
          required
          className="editing-form__input-line editing-form__input-line_place_modal" />
        <span className="editing-form__input-error">{errMessage}</span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup