import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { useHistory } from "react-router-dom"

function Tag({ categoryId, isSelected, categoryName, isSmall }) {
  const history = useHistory()
  const className = classNames({
    small: isSmall,
    selected: isSelected,
    "category-tag": true,
  })

  const onCategorySelected = () => {
    if (categoryId) {
      return history.push(`?category=${categoryId}`)
    }
    return history.push("/")
  }

  return (
    <span
      role="button"
      tabIndex="0"
      className={className}
      onClick={onCategorySelected}
      onKeyDown={onCategorySelected}
    >
      {categoryName}
    </span>
  )
}

Tag.propTypes = {
  categoryId: PropTypes.number.isRequired,
  categoryName: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  isSmall: PropTypes.bool,
}

Tag.defaultProps = {
  isSelected: false,
  isSmall: false,
}

export default Tag
