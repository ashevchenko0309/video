import React from "react"
import PropTypes from "prop-types"

function Button({ label, variant, onClick }) {
  return (
    <button
      type="button"
      className={`button ${variant}-button`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string,
}

Button.defaultProps = {
  variant: "primary",
}

export default Button
