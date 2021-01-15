import React, { useState, useEffect } from "react"
import { Scrollbars } from 'react-custom-scrollbars'

function CategoryFilter({ selectedCategory, setCategory }) {
  const [categories, setCategories] = useState([])

  const fetchCategories = () => {
    // TODO: create category fetcher
  }

  useEffect(() => {

  }, [])

  return (
    <Scrollbars>
      {categories.map((category) => <div className="category-tag">category</div>)}
    </Scrollbars>
  )
}

CategoryFilter.propTypes = {
  setCategory: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string,
}

CategoryFilter.defaultProps = {
  selectedCategory: "",
}

export default CategoryFilter