const FORM_SCHEMA = {
  email: {
    type: "email",
    name: "email",
    labelText: "E-mail",
    placeholder: "E-mail",
    isRequired: true,
    options: null,
  },
  nickname: {
    name: "nickname",
    labelText: "Nickname",
    placeholder: "Nickname",
    isRequired: true,
    options: {
      minLength: 5,
      maxLength: 120,
    },
  },
  password: {
    type: "password",
    name: "password",
    labelText: "Password",
    placeholder: "Password",
    isRequired: true,
    options: {
      minLength: 5,
      maxLength: 64,
    },
  },
  confirm: {
    type: "password",
    name: "confirm",
    labelText: "Confirm password",
    placeholder: "Confirm password",
    isRequired: true,
    options: {
      minLength: 5,
      maxLength: 64,
    },
  },
}

export default FORM_SCHEMA
