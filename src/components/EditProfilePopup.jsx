import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';
import { useForm } from '../hooks/useForm';
import Input from './Input';
import PopupWithForm from './PopupWithForm';


function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonText }) {

  const currentUser = useContext(CurrentUserContext);

  const { values, setValues, handleChange } = useForm({});
  const [formValid, setFormValid] = useState(true);
  const [inputValid, setInputValid] = useState({ name: true, about: true })
  const [errMessages, setErrMessages] = useState({ name: '', about: '' });

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values);
  }

  useEffect(() => {
    setValues({
      name: currentUser.name || '',
      about: currentUser.about || '',
    })
    setInputValid({ name: true, about: true });
    setErrMessages({ name: '', about: '' })
  }, [currentUser, isOpen])

  useEffect(() => {
    setFormValid(!!inputValid.name && !!inputValid.about);
  }, [inputValid, formValid])

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
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
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        inputValid={inputValid}
        setInputValid={setInputValid}
        errMessages={errMessages}
        setErrMessage={setErrMessages}
        place="modal"
      />
      <Input
        value={values.about || ''}
        onChange={handleChange}
        type="text"
        name="about"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        inputValid={inputValid}
        setInputValid={setInputValid}
        errMessages={errMessages}
        setErrMessage={setErrMessages}
        place="modal"
      />
    </PopupWithForm>
  )
}

export default EditProfilePopup