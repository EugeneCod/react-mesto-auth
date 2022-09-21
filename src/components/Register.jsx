import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import Input from './Input.jsx';

function Register({ buttonText, onRegistration, linkToSignIn }) {

  const { values, setValues, handleChange } = useForm({});
  const [formValid, setFormValid] = useState(false);
  const [inputValid, setInputValid] = useState({ email: false, password: false })
  const [errMessages, setErrMessages] = useState({ email: '', password: '' });

  useEffect(() => {
    setFormValid(!!inputValid.email && !!inputValid.password);
  }, [inputValid, formValid]);

  useEffect(() => {
    setValues({});
    setInputValid({ email: false, password: false });
    setErrMessages({ email: '', password: '' })
  }, [setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegistration(values.email, values.password);
  }

  return (
    <section className="registration">
      <form
        onSubmit={handleSubmit}
        noValidate
        name="regitration"
        className="editing-form editing-form_related-to_auth"
        id="regitration"
        method="get"
      >
        <fieldset className="editing-form__fieldset" form="regitration">
          <legend className="editing-form__legend editing-form__legend_place_auth">
            Регистрация
          </legend>
          <Input
            value={values.email || ''}
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Email"
            minLength=""
            maxLength=""
            inputValid={inputValid}
            setInputValid={setInputValid}
            errMessages={errMessages}
            setErrMessage={setErrMessages}
            place="auth"
          />
          <Input
            value={values.password || ''}
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            minLength="8"
            maxLength=""
            inputValid={inputValid}
            setInputValid={setInputValid}
            errMessages={errMessages}
            setErrMessage={setErrMessages}
            place="auth"
          />
          <button
            type="submit"
            className={`editing-form__button-auth ${!formValid && "editing-form__button-auth_inactive"}`}
          >
            {buttonText}
          </button>
        </fieldset>
      </form>
      <div className="registration__signin">
        <span className="registration__signin-text">Уже зарегистрированы? <Link to={linkToSignIn} className="registration__signin-link">Войти</Link></span>
      </div>
    </section>
  )
}

export default Register;