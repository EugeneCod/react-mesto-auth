import { useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { useHistory } from 'react-router-dom';
import * as auth from '../auth.js';
import Input from './Input.jsx';

function Login() {

  const history = useHistory();
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
    if (!values.email || !values.password) {
      return;
    }
    auth.authorize(values.email, values.password)
      .then((data) => {
        if (data.jwt) {
          setValues({});
          history.push('/');
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="login">
      <form
        onSubmit={handleSubmit}
        noValidate
        name="regitration"
        className="editing-form editing-form_related-to_login"
        id="regitration"
        method="get"
      >
        <fieldset className="editing-form__fieldset" form="regitration">
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
            className={`editing-form__button editing-form__button_place_auth `}
          >
            Войти
          </button>
        </fieldset>
      </form>
    </div>
  )
}

export default Login;