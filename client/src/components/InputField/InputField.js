import React, { useState, useCallback } from "react"
import PropTypes from "prop-types"
import { throttle } from "lodash"
import classNames from "classnames"

import FormFieldErrorHint from "../FormErrorHints/FormFieldErrorHint"

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
  showHint,
  onChange,
  onBlur,
}) {
  const [inputValue, setInputValue] = useState(defaultValue)

  const throttledInputChange = useCallback(
    throttle((v) => onChange(v), delay),
    []
  )

  const defaultValidation = { minLength: isRequired ? 1 : 0, maxLength: 120 }

  const validationOptions = options || defaultValidation

  const formFieldClass = classNames({
    form_field: true,
    "has-error": hasError,
  })

  const onChangeHandler = (e) => {
    const { value } = e.currentTarget
    setInputValue(value)
    throttledInputChange(value)
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
        {showHint && (
          <span className="input_field--hint">
            {inputValue.length} / {validationOptions.maxLength}
          </span>
        )}

        <input
          type={type}
          className="form_field--input"
          value={inputValue}
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

InputField.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  labelText: PropTypes.string,
  isRequired: PropTypes.bool,
  options: PropTypes.shape({}),
  hasError: PropTypes.bool,
  delay: PropTypes.number,
  showHint: PropTypes.bool,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
}

InputField.defaultProps = {
  type: "text",
  name: "",
  defaultValue: "",
  placeholder: "",
  labelText: "",
  isRequired: false,
  options: null,
  hasError: false,
  showHint: true,
  delay: 150,
  errorMessage: "",
  onChange: () => {},
  onBlur: () => {},
}

export default InputField
