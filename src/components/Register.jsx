import React from 'react'
import Header from './Header'
import { useFormAndValidation } from '../hooks/useForm';

function Register() {

  const { values, setValues, handleChange, errors, setErrors, isValid, setIsValid, resetForm } = useFormAndValidation(false);

  function signIn() {

  }

  function handleSubmit(e) {
    e.preventDefault();
    auth.register(email, password).then((res) => {
      if (res.statusCode !== 400) {
        this.props.history.push('/login');
      }
    });
    

    return (
      <>
        <Header
          buttonText="Войти"
          buttonColor="#fff"
          onAuth={signIn}
          loginInfo=""
        />
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
            <label className="editing-form__field">
              <input
                onChange={handleChange}
                ref={inputRef}
                type="url"
                name="avatar"
                placeholder="Ссылка на картинку"
                required
                className="editing-form__input-line" />
              <span className="editing-form__input-error">{errMessage}</span>
            </label>
            <button
              type="submit"
              className={`editing-form__button ${!isValid && "editing-form__button_inactive"}`}
            >
              {buttonText}
            </button>
          </fieldset>
        </form>
      </>
    )
  }

  export default Register