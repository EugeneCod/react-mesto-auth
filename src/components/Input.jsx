function Input({ value, onChange, type, name, placeholder, minLength, maxLength, inputValid, setInputValid, errMessages, setErrMessage, place }) {

  function handleChange(e) {
    onChange(e);
    setErrMessage({...errMessages, [name]: e.target.validationMessage});
    setInputValid({...inputValid, [name]: e.target.validity.valid})
  }

  return (
    <label className="editing-form__field">
        <input
          required 
          onChange={handleChange}
          value={value}
          type={type}
          name={name}
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          className={`editing-form__input-line editing-form__input-line_place_${place}`} />
        <span className="editing-form__input-error">{errMessages[name]}</span>
      </label>
  )
}


export default Input