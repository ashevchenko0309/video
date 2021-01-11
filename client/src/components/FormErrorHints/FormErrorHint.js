import React from 'react'

function FormErrorHint({ errorMessage = '' }) {
  return <div className="form-error__hint">{errorMessage}</div>
}

export default FormErrorHint