import { useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import Input from './Input.jsx';

function Login({ buttonText, onLogin  }) {

  const { values, setValues, handleChange } = useForm({});
  const [formValid, setFormValid] = useState(false);
  const [inputValid, setInputValid] = useState({ email: false, password: false })
  const [errMessages, setErrMessages] = useState({email: '', password: ''});

  useEffect(() => {
    setFormValid(!!inputValid.email && !!inputValid.password);
  }, [inputValid, formValid]);

  useEffect(() => {
    setValues({});
    setInputValid({ email: false, password: false });
    setErrMessages({email: '', password: ''})
  }, [setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values.email, values.password);
  }
  
  return (
    <section className="login">
      <form
        onSubmit={handleSubmit}
        noValidate
        name="login"
        className="editing-form editing-form_related-to_auth"
        id="login"
        method="get"
      >
        <fieldset className="editing-form__fieldset" form="login">
          <legend className="editing-form__legend editing-form__legend_place_auth">
            Вход
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
            minLength=""
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
    </section>
  )
}

export default Login;