import React, { useState, useCallback } from "react"
import PropTypes from "prop-types"
import { throttle } from "lodash"
import classNames from "classnames"

import FormFieldErrorHint from "../FormErrorHints/FormFieldErrorHint"

function TextareaField({
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
  const [textareaValue, setTextareaValue] = useState(defaultValue)

  const throttledTextareaChange = useCallback(
    throttle((v) => onChange(v), delay),
    []
  )

  const defaultValidation = { minLength: isRequired ? 1 : 0, maxLength: 255 }

  const validationOptions = options || defaultValidation

  const formFieldClass = classNames({
    form_field: true,
    "has-error": hasError,
  })

  const onChangeHandler = (e) => {
    const { value } = e.currentTarget
    setTextareaValue(value)
    throttledTextareaChange(value)
  }

  const onBlurHandler = (e) => {
    const { value } = e.currentTarget
    onBlur(value, name)
  }

  return (
    <div className={formFieldClass}>
      <label htmlFor={name}>
        <span className="input_field--label">
          {labelText}
          {isRequired && <span className="is-required"> *</span>}
        </span>
        <span className="input_field--hint">
          {textareaValue.length} / {validationOptions.maxLength}
        </span>
        <textarea
          className="form_field--textarea"
          value={textareaValue}
          name={name}
          placeholder={placeholder}
          required={isRequired}
          maxLength={validationOptions.maxLength}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
        />
      </label>
      <FormFieldErrorHint hasError={hasError} errorMessage={errorMessage} />
    </div>
  )
}

TextareaField.propTypes = {
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  labelText: PropTypes.string,
  errorMessage: PropTypes.string,
  isRequired: PropTypes.bool,
  hasError: PropTypes.bool,
  delay: PropTypes.number,
  options: PropTypes.shape({}),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
}

TextareaField.defaultProps = {
  name: "",
  defaultValue: "",
  placeholder: "",
  labelText: "",
  isRequired: false,
  options: null,
  hasError: false,
  delay: 150,
  errorMessage: "",
  onChange: () => {},
  onBlur: () => {},
}

export default TextareaField
