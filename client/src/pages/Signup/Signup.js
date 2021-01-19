import React from "react"
import ReactRouterPropTypes from "react-router-prop-types"
import validator from "validator"

import Container from "../../components/Grid/Container"
import Row from "../../components/Grid/Row"
import Column from "../../components/Grid/Column"

import InputField from "../../components/InputField/InputField"
import FormErrorHint from "../../components/FormErrorHints/FormErrorHint"

import { UserContext } from "../../context/userContext"

import SIGNUP_FORM_SCHEMA from "./signup-from.schema"

import stringLengthError from "../../utils/stringLengthError"
import responseErrorHandler from "../../utils/responseErrorHandler"

/* eslint-disable react/jsx-props-no-spreading */
class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formError: null,
      email: {
        hasError: null,
        errorMessage: "",
      },
      nickname: {
        hasError: null,
        errorMessage: "",
      },
      password: {
        hasError: null,
        errorMessage: "",
      },
      confirm: {
        hasError: null,
        errorMessage: "",
      },
    }
  }

  isFormValid = (email, nickname, password, confirmPassword) => {
    let isValid = true

    if (password !== confirmPassword) {
      isValid = false

      const error = {
        hasError: true,
        errorMessage: "Password did not match",
      }

      this.setState({
        password: { ...error },
        confirm: { ...error },
      })
    }
    const emailValidationResult = validator.isEmail(email)
    const nicknameValidationResult = validator.isLength(nickname, {
      min: SIGNUP_FORM_SCHEMA.nickname.options.minLength,
      max: SIGNUP_FORM_SCHEMA.nickname.options.maxLength,
    })

    const passwordValidationResult = validator.isLength(password, {
      min: SIGNUP_FORM_SCHEMA.password.options.minLength,
      max: SIGNUP_FORM_SCHEMA.password.options.maxLength,
    })

    if (!emailValidationResult) {
      isValid = false

      this.setState({
        email: {
          hasError: true,
          errorMessage: "Email is invalid",
        },
      })
    }

    if (!nicknameValidationResult) {
      isValid = false

      this.setState({
        nickname: {
          hasError: true,
          errorMessage: `Nickname is invalid. ${stringLengthError(
            SIGNUP_FORM_SCHEMA.nickname.options
          )}`,
        },
      })
    }

    if (!passwordValidationResult) {
      isValid = false

      this.setState({
        password: {
          hasError: true,
          errorMessage: `Password is invalid. ${stringLengthError(
            SIGNUP_FORM_SCHEMA.password.options
          )}`,
        },
      })
    }

    return isValid
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { elements } = e.currentTarget
    const email = elements.email.value
    const nickname = elements.nickname.value
    const password = elements.password.value
    const confirmPassword = elements.confirm.value

    if (!this.isFormValid(email, nickname, password, confirmPassword)) {
      return this.setState({ formError: "Form have invalid values" })
    }

    return this.onPostData(JSON.stringify({ email, nickname, password }))
  }

  onPostData = async (body) => {
    const response = await fetch(
      `
        ${process.env.REACT_APP_API_HOST}/auth/singup
      `,
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

    if (status !== 201) {
      this.setState({ formError: responseErrorHandler(status, data) })
      return null
    }

    this.onFulfilledPost(data)
    return null
  }

  onFulfilledPost = (data) => {
    console.log(data)
    const { token, expiresIn, role } = data
    const [, setRole] = this.context

    localStorage.setItem("token", JSON.stringify({ token, expiresIn }))
    localStorage.setItem("role", role)

    setRole(role)

    const { history } = this.props

    return history.replace("/")
  }

  render() {
    const { email, nickname, password, confirm, formError } = this.state

    return (
      <Container>
        <Row>
          <Column>
            <form className="signup__form" onSubmit={this.onSubmit}>
              <h2>Create new video</h2>
              <InputField
                {...SIGNUP_FORM_SCHEMA.email}
                errorMessage={email.errorMessage}
                hasError={email.hasError}
              />
              <InputField
                {...SIGNUP_FORM_SCHEMA.nickname}
                errorMessage={nickname.errorMessage}
                hasError={nickname.hasError}
              />
              <InputField
                {...SIGNUP_FORM_SCHEMA.password}
                errorMessage={password.errorMessage}
                hasError={password.hasError}
              />
              <InputField
                {...SIGNUP_FORM_SCHEMA.confirm}
                errorMessage={confirm.errorMessage}
                hasError={confirm.hasError}
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

Signup.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
}

Signup.contextType = UserContext

export default Signup
