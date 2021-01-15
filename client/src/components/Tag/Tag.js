import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

function Tag({ categoryId, isSelected, categoryName, selectCategory }) {
  const className = classnames({
    "category-tag": true,
    selected: isSelected,
  })

  const onCategorySelected = () => {
    selectCategory(categoryId)
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
  selectCategory: PropTypes.func,
  isSelected: PropTypes.bool,
}

Tag.defaultProps = {
  isSelected: false,
  selectCategory: () => {},
}

export default Tag
