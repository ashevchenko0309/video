import React from "react"
import PropTypes from "prop-types"

function Row({ children }) {
  return <div className="row">{children}</div>
}

Row.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Row
