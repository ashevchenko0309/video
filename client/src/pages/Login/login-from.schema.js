const FORM_SCHEMA = {
  email: {
    type: "email",
    name: "email",
    labelText: "E-mail",
    placeholder: "E-mail",
    isRequired: true,
    options: null,
  },
  password: {
    name: "password",
    labelText: "Password",
    placeholder: "Password",
    isRequired: true,
    options: {
      minLength: 5,
      maxLength: 64,
    },
  },
}

export default FORM_SCHEMA
