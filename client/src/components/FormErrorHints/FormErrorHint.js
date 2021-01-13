import React from "react"
import PropTypes from "prop-types"

function FormErrorHint({ errorMessage }) {
  return <div className="form-error__hint">{errorMessage}</div>
}

FormErrorHint.propTypes = {
  errorMessage: PropTypes.string,
}

FormErrorHint.defaultProps = {
  errorMessage: "",
}

export default FormErrorHint
