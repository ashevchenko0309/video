import React from "react"
import PropTypes from "prop-types"

function Container({ children, className = "" }) {
  return <div className={`container ${className}`}>{children}</div>
}

Container.propTypes = {
  children: PropTypes.shape([PropTypes.element]).isRequired,
  className: PropTypes.string,
}

Container.defaultProps = {
  className: "",
}

export default Container
