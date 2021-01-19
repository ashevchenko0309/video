import React from "react"

import Container from "../../components/Grid/Container"
import Row from "../../components/Grid/Row"
import Column from "../../components/Grid/Column"

import InputField from "../../components/InputField/InputField"
import FormErrorHint from "../../components/FormErrorHints/FormErrorHint"

import SIGNUP_FORM_SCHEMA from "./signup-from.schema"

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

  onSubmit = (e) => {
    e.preventDefault()

    const { elements } = e.currentTarget
    const email = elements.email.value
    const nickname = elements.nickname.value
    const password = elements.password.value
    // const confirmPassword = elements.confirm.value

    fetch(`${process.env.REACT_APP_API_HOST}/auth/singup`, {
      method: "POST",
      body: JSON.stringify({ email, nickname, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => console.error(error))
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

export default Signup
