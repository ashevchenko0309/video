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
    type: "password",
    name: "password",
    labelText: "Password",
    placeholder: "Password",
    isRequired: true,
    options: {
      minLength: 8,
      maxLength: 64,
    },
  },
}

export default FORM_SCHEMA
