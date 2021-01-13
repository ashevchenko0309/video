import React from "react"
import PropTypes from "prop-types"

function Column({ children, classNameSize }) {
  return <div className={classNameSize}>{children}</div>
}

Column.propTypes = {
  children: PropTypes.element.isRequired,
  classNameSize: PropTypes.string,
}

Column.defaultProps = {
  classNameSize: "col-12",
}

export default Column
