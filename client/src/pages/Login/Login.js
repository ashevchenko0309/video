import React from "react"
import ReactRouterPropTypes from "react-router-prop-types"
import validator from "validator"

import Container from "../../components/Grid/Container"
import Row from "../../components/Grid/Row"
import Column from "../../components/Grid/Column"

import InputField from "../../components/InputField/InputField"
import FormErrorHint from "../../components/FormErrorHints/FormErrorHint"

import { UserContext } from "../../context/userContext"

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

    if (!emailValidationResult) {
      this.setState({
        email: {
          hasError: true,
          errorMessage: "Email field is invalid",
        },
      })
    }

    if (!passwordValidationResult) {
      this.setState({
        password: {
          hasError: true,
          errorMessage: `Password field is invalid. Min length: ${LOGIN_FORM_SCHEMA.password.options.minLength}, max length: ${LOGIN_FORM_SCHEMA.password.options.maxLength}`,
        },
      })
    }

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

  onPostData = async (body) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/auth/login`,
        {
          method: "POST",
          body,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      const { status } = response

      const data = await response.json()

      if (status !== 200) {
        if (status === 404) {
          this.setState({ formError: data.error })
        } else if (status === 422) {
          this.setState({ formError: data.errors.map((e) => e.msg).join(";") })
        }
        return null
      }

      this.onFulfilledPost(data)
      return null
    } catch (error) {
      console.error(error)
      return null
    }
  }

  onFulfilledPost = (data) => {
    console.log(data)
    if (data.errors && data.errors.length) {
      return this.setState({
        formError: data.errors
          .map((error) => `${error.param} - ${error.msg}`)
          .join("; "),
      })
    }

    this.setLoginData(data)

    const { history } = this.props

    return history.replace("/")
  }

  setLoginData = (data) => {
    const { token, expiresIn, role } = data
    const [, setRole] = this.context

    localStorage.setItem("token", JSON.stringify({ token, expiresIn }))
    localStorage.setItem("role", role)
    setRole(role)
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
                showHint={false}
                errorMessage={email.errorMessage}
                hasError={email.hasError}
              />
              <InputField
                {...LOGIN_FORM_SCHEMA.password}
                showHint={false}
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

Login.contextType = UserContext

export default Login
