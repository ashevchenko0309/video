import React, { useState, useCallback } from 'react';
import { throttle } from 'lodash';
import classNames from 'classnames';

import FormFieldErrorHint from '../FormErrorHints/FormFieldErrorHint';

function InputField({
  type,
  name,
  defaultValue,
  placeholder,
  labelText,
  isRequired,
  options,
  hasError,
  delay,
  errorMessage,
  onChange,
  onBlur,
}) {

  const [inputValue, setInputValue] = useState(defaultValue);

  const throttledInputChange = useCallback(throttle(v => onChange(v), delay), []);

  const _options = options || { minLength: isRequired ? 1 : 0, maxLength: 120 };

  const formFieldClass = classNames({
    "form_field": true,
    "has-error": hasError
  })

  const _onChange = (e) => {
    const value = e.currentTarget.value;
    setInputValue(value);
    throttledInputChange(value);
  }

  const _onBlur = (e) => {
    const value = e.currentTarget.value;
    onBlur(value, name);
  }

  return (
    <div className={formFieldClass}>
      <label htmlFor={name}>
        <span className="input_field--label">{labelText}{isRequired && <span className="is-required"> *</span>}</span>
        <span className="input_field--hint">{inputValue.length} / {_options.maxLength}</span>
        <input
          type={type}
          className="form_field--input"
          value={inputValue}
          name={name}
          placeholder={placeholder}
          required={isRequired}
          maxLength={_options.maxLength}
          onChange={_onChange}
          onBlur={_onBlur}
        />
      </label>
      <FormFieldErrorHint hasError={hasError} errorMessage={errorMessage} />
    </div>
  )

}

InputField.defaultProps = {
  type: "text",
  name: '',
  defaultValue: '',
  placeholder: '',
  labelText: '',
  isRequired: false,
  options: null,
  hasError: false,
  delay: 150,
  errorMessage: '',
  onChange: () => { },
  onBlur: () => { }
}

export default InputField;