import React from "react"
import PropTypes from "prop-types"

function FormFieldErrorHint({ hasError, errorMessage }) {
  return (
    <span className={`input_field--error ${hasError ? "active" : "inactive"}`}>
      {errorMessage}
    </span>
  )
}

FormFieldErrorHint.propTypes = {
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
}

FormFieldErrorHint.defaultProps = {
  hasError: false,
  errorMessage: "",
}

export default FormFieldErrorHint
