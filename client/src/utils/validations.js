function isValidLength(value = "", min = 0, max = Number.MAX_SAFE_INTEGER) {
  const trimmedValue = value.trim()
  if (trimmedValue.length > max) {
    return { hasError: true, errorMessage: "Value greater than allowed length" }
  }

  if (trimmedValue.length < min) {
    return { hasError: true, errorMessage: "Value less than allowed length" }
  }

  return { hasError: false, errorMessage: "" }
}

export { isValidLength as default }
