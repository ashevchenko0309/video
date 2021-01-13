import React from "react"
import PropTypes from "prop-types"
import FormFieldErrorHint from "../FormErrorHints/FormFieldErrorHint"

function UploadFileField({
  name,
  accept,
  onChange,
  multiple,
  hasError,
  errorMessage,
}) {
  return (
    <>
      <input
        className="form_field--upload"
        type="file"
        name={name}
        accept={accept}
        onChange={onChange}
        multiple={multiple}
      />
      <FormFieldErrorHint hasError={hasError} errorMessage={errorMessage} />
    </>
  )
}

UploadFileField.propTypes = {
  name: PropTypes.string,
  accept: PropTypes.string,
  errorMessage: PropTypes.string,
  multiple: PropTypes.bool,
  hasError: PropTypes.bool,
  onChange: PropTypes.func,
}

UploadFileField.defaultProps = {
  name: "",
  accept: "",
  errorMessage: "",
  multiple: false,
  hasError: false,
  onChange: () => {},
}

export default UploadFileField
