import React from "react"
import ReactRouterPropTypes from "react-router-prop-types"
import validator from "validator"

import Container from "../../components/Grid/Container"
import Row from "../../components/Grid/Row"
import Column from "../../components/Grid/Column"

import InputField from "../../components/InputField/InputField"
import FormErrorHint from "../../components/FormErrorHints/FormErrorHint"

import LOGIN_FORM_SCHEMA from "./login-from.schema"

/* eslint-disable react/jsx-props-no-spreading */
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formError: null,
      email: {
        hasError: false,
        errorMessage: "",
      },
      password: {
        hasError: false,
        errorMessage: "",
      },
    }
  }

  isFormValid = (email, password) => {
    const emailValidationResult = validator.isEmail(email)
    const passwordValidationResult = validator.isLength(password, {
      min: LOGIN_FORM_SCHEMA.password.options.minLength,
      max: LOGIN_FORM_SCHEMA.password.options.maxLength,
    })

    if (!emailValidationResult || !passwordValidationResult) {
      return false
    }

    return true
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { elements } = e.currentTarget

    const email = elements.email.value
    const password = elements.password.value

    if (!this.isFormValid(email, password)) {
      return this.setState({ formError: "Form invalid" })
    }

    const { formError } = this.state

    if (formError) {
      this.setState({ formError: null })
    }

    return this.onPostData(JSON.stringify({ email, password }))
  }

  onPostData = (body) => {
    fetch(`${process.env.REACT_APP_API_HOST}/auth/login`, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(this.onFulfilledPost)
      .catch((error) => console.error(error))
  }

  onFulfilledPost = (data) => {
    if (data.errors && data.errors.length) {
      return this.setState({
        formError: data.errors
          .map((error) => `${error.param} - ${error.msg}`)
          .join("; "),
      })
    }

    const { history } = this.props

    return history.replace("/")
  }

  render() {
    const { formError, email, password } = this.state

    return (
      <Container>
        <Row>
          <Column>
            <form className="login__form" onSubmit={this.onSubmit}>
              <h2>Create new video</h2>
              <InputField
                {...LOGIN_FORM_SCHEMA.email}
                errorMessage={email.errorMessage}
                hasError={email.hasError}
              />
              <InputField
                {...LOGIN_FORM_SCHEMA.password}
                errorMessage={password.errorMessage}
                hasError={password.hasError}
              />
              {formError && <FormErrorHint errorMessage={formError} />}
              <button className="button form_button--submit" type="submit">
                Submit
              </button>
            </form>
          </Column>
        </Row>
      </Container>
    )
  }
}

Login.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
}

export default Login
