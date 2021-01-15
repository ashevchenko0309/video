import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import CreatableSelect from "react-select/creatable"

import FormFieldErrorHint from "../FormErrorHints/FormFieldErrorHint"
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator"

function CategorySelect({
  name,
  labelText,
  isRequired,
  hasError,
  errorMessage,
  onChange,
}) {
  const [categoryOptions, setCategoryOptions] = useState([])

  const transformCategory = (category) => ({
    value: category.id,
    label: category.name,
  })

  const handleChange = ({ value }) => {
    onChange(value, name)
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_HOST}/categories`)
      .then((response) => response.json())
      .then((jsonCategories) =>
        setCategoryOptions(
          Array.from(jsonCategories.categories, transformCategory)
        )
      )
      .catch((error) => console.error(error))
  }, [])

  const formFieldClass = classNames({
    form_field: true,
    "has-error": hasError,
  })

  if (categoryOptions.length === 0) {
    return <LoadingIndicator />
  }

  return (
    <div className={formFieldClass}>
      <label htmlFor={name}>
        <span className="input_field--label">
          {labelText}
          {isRequired && <span className="is-required"> *</span>}
        </span>
        <CreatableSelect
          name={name}
          isClearable
          onChange={handleChange}
          options={categoryOptions}
          defaultValue={categoryOptions[0]}
        />
      </label>
      <FormFieldErrorHint hasError={hasError} errorMessage={errorMessage} />
    </div>
  )
}

CategorySelect.propTypes = {
  name: PropTypes.string,
  labelText: PropTypes.string,
  isRequired: PropTypes.bool,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
}

CategorySelect.defaultProps = {
  name: "",
  labelText: "",
  isRequired: false,
  hasError: false,
  errorMessage: "",
  onChange: () => {},
}

export default CategorySelect
