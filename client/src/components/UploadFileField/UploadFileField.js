import React from 'react';
import FormFieldErrorHint from '../FormErrorHints/FormFieldErrorHint';

function UploadFileField({ name = '', accept = '', onChange = () => { }, multiple = false, hasError = false, errorMessage }) {
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

export default UploadFileField