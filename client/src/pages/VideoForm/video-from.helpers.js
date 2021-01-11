const FORM_SCHEMA = {
  title: {
    name: "title",
    labelText: "Video name",
    placeholder: "Video name",
    isRequired: true,
    options: {
      minLength: 5,
      maxLength: 120
    }
  },
  description: {
    name: "description",
    labelText: "Video description",
    placeholder: "Video description",
    isRequired: true,
    options: {
      minLength: 5,
      maxLength: 255
    }
  },
  video: {
    name: "video",
    isRequired: true,
    accept: "video/mpeg,video/mp4"
  }
}

export const isValidTitle = (value) => {
  if (value.length > FORM_SCHEMA.title.options.maxLength) {
    return { value, hasError: true, errorMessage: `Video title cannot be greater than ${FORM_SCHEMA.title.options.maxLength}` }
  }

  if (value.length < FORM_SCHEMA.title.options.minLength) {
    return { value, hasError: true, errorMessage: `Video title cannot be less than ${FORM_SCHEMA.title.options.minLength}` }
  }

  return { value, hasError: false, errorMessage: '' };
}

export const isValidDescription = (value) => {
  if (value.length > FORM_SCHEMA.description.options.maxLength) {
    return { value, hasError: true, errorMessage: `Video description cannot be greater than ${FORM_SCHEMA.title.options.maxLength}` }
  }

  if (value.length < FORM_SCHEMA.description.options.minLength) {
    return { value, hasError: true, errorMessage: `Video description cannot be less than ${FORM_SCHEMA.title.options.minLength}` }
  }

  return { value, hasError: false, errorMessage: '' };
}

export default FORM_SCHEMA