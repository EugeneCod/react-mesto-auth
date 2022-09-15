import { useForm } from '../hooks/useForm';
import * as auth from '../auth.js';
import { useHistory } from 'react-router-dom';
import Input from './Input';
import { useState, useEffect } from 'react';

function Register() {

  const { values, setValues, handleChange } = useForm({});
  const [formValid, setFormValid] = useState(false);
  const [inputValid, setInputValid] = useState({ name: false, link: false })
  const [errMessages, setErrMessages] = useState({name: '', link: ''});

  useEffect(() => {
    if (inputValid.name === false || inputValid.link === false) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [inputValid, formValid]);

  useEffect(() => {
    setValues({});
    setInputValid({ name: false, link: false });
    setErrMessages({name: '', link: ''})
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    auth.register(values.email, values.password).then((res) => {
      if (res.statusCode !== 400) {
        useHistory.push('/login');
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      name="regitration"
      className="editing-form editing-form_related-to_regitration"
      id="regitration"
      method="get"
    >
      <fieldset className="editing-form__fieldset" form="regitration">
        <legend className="editing-form__legend">
          Региистрация
        </legend>
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
        />
        <button
          type="submit"
          className={`editing-form__button ${!formValid && "editing-form__button_inactive"}`}
        >
          Зарегистрироваться
        </button>
      </fieldset>
    </form>
  )
}

export default Register