import { useState, useEffect } from 'react'
import { useForm } from '../hooks/useForm';
import Input from './Input';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, buttonText }) {

  const { values, setValues, handleChange } = useForm({});
  const [formValid, setFormValid] = useState(false);
  const [inputValid, setInputValid] = useState({ name: false, link: false })
  const [errMessages, setErrMessages] = useState({name: '', link: ''});
  
  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(values);
  }

  useEffect(() => {
    setFormValid(!!inputValid.name && !!inputValid.link);
  }, [inputValid, formValid])

  useEffect(() => {
    setValues({});
    setInputValid({ name: false, link: false });
    setErrMessages({name: '', link: ''})
  }, [isOpen])

  return (
    <PopupWithForm
      title="Новое место"
      name="add-cards"
      buttonText={buttonText}
      valid={formValid}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <Input
        value={values.name || ''}
        onChange={handleChange}
        type="text"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        inputValid={inputValid}
        setInputValid={setInputValid}
        errMessages={errMessages}
        setErrMessage={setErrMessages}
        place="modal"
      />
      <Input
        value={values.link || ''}
        onChange={handleChange}
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        minLength=""
        maxLength=""
        inputValid={inputValid}
        setInputValid={setInputValid}
        errMessages={errMessages}
        setErrMessage={setErrMessages}
        place="modal"
      />
    </PopupWithForm>
  )
}

export default AddPlacePopup