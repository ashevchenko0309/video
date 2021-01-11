import React, { useState, useCallback } from 'react';
import { throttle } from 'lodash';
import classNames from 'classnames';

import FormFieldErrorHint from '../FormErrorHints/FormFieldErrorHint'
import './TextareaField.scss'

function TextareaField({
  name = '',
  defaultValue = '',
  placeholder = '',
  labelText = '',
  isRequired = false,
  options = null,
  hasError = false,
  delay = 150,
  errorMessage = '',
  onChange = () => { },
  onBlur = () => { },
}) {

  const [textareaValue, setTextareaValue] = useState(defaultValue);

  const throttledTextareaChange = useCallback(throttle(v => onChange(v), delay), []);

  const _options = options || { minLength: isRequired ? 1 : 0, maxLength: 120 };

  const formFieldClass = classNames({
    "form_field": true,
    "has-error": hasError
  })

  const _onChange = (e) => {
    const value = e.currentTarget.value;
    setTextareaValue(value);
    throttledTextareaChange(value);
  }

  const _onBlur = (e) => {
    const value = e.currentTarget.value;
    onBlur(value)
  }

  return (
    <div className={formFieldClass}>
      <label htmlFor={name}>
        <span className="input_field--label">{labelText}</span>
        <span className="input_field--hint">{textareaValue.length} / {_options.maxLength}</span>
        <textarea
          className="form_field--textarea"
          value={textareaValue}
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

export default TextareaField