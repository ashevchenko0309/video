import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Scrollbars from "react-scrollbars-custom"

import Tag from "../Tag/Tag"

function CategoryFilter({ selectedCategory, setCategory }) {
  const [categories, setCategories] = useState([])

  const fetchCategories = () => {
    console.log("fetch categories")
    // TODO: create category fetcher
    fetch(`${process.env.REACT_APP_API_HOST}/categories`)
      .then((response) => response.json())
      .then((jsonCategories) => setCategories([...jsonCategories.categories]))
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <Scrollbars style={{ width: "100%", height: "32px" }}>
      <div className="d-flex align-items-center">
        {categories.map((category) => (
          <Tag
            key={category.name}
            categoryId={category.id}
            isSelected={category.id === selectedCategory}
            categoryName={category.name}
            selectCategory={setCategory}
          />
        ))}
      </div>
    </Scrollbars>
  )
}

CategoryFilter.propTypes = {
  setCategory: PropTypes.func.isRequired,
  selectedCategory: PropTypes.number,
}

CategoryFilter.defaultProps = {
  selectedCategory: "",
}

export default CategoryFilter
