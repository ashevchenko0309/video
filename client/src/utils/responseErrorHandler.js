function responseErrorHandler(code, data) {
  switch (code) {
    case 404: {
      return data.error
    }
    case 422: {
      return data.errors.map((e) => e.msg).join(";")
    }
    default: {
      return null
    }
  }
}

export default responseErrorHandler
