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

export const isValidLength = (value, options, errorMessage) => {
  if (value.length > options.maxLength) {
    return { hasError: true, errorMessage }
  }

  if (value.length < options.minLength) {
    return { hasError: true, errorMessage }
  }

  return { hasError: false, errorMessage: '' };
}

export default FORM_SCHEMA