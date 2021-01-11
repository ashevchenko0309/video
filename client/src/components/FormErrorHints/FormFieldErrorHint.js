import React from 'react'

function FormFieldErrorHint({ hasError = false, errorMessage = '' }) {
  return <span className={`input_field--error ${hasError ? 'active' : 'inactive'}`}>{errorMessage}</span>
}

export default FormFieldErrorHint