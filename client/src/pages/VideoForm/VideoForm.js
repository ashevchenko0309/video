import React from "react"
import ReactRouterPropTypes from "react-router-prop-types"

import FORM_SCHEMA from "./video-from.schema"

import Container from "../../components/Grid/Container"
import Row from "../../components/Grid/Row"
import Column from "../../components/Grid/Column"
import InputField from "../../components/InputField/InputField"
import TextareaField from "../../components/TextareaField/TextareaField"
import VideoUploader from "../../components/VideoUploader/VideoUploader"
import FormErrorHint from "../../components/FormErrorHints/FormErrorHint"

import dataURLtoFile from "../../utils/dataUrlToFile"
import isValidLength from "../../utils/validations"

/* eslint-disable react/jsx-props-no-spreading */
class VideoFrom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formError: null,
      title: {
        hasError: null,
        errorMessage: "",
      },
      description: {
        hasError: null,
        errorMessage: "",
      },
      video: {
        hasError: null,
        errorMessage: "",
      },
    }
  }

  isFormValid = (title, description, videoFile) => {
    const titleValidationResult = isValidLength(
      title,
      FORM_SCHEMA.title.options.minLength,
      FORM_SCHEMA.title.options.maxLength
    )
    const descriptionValidationResult = isValidLength(
      description,
      FORM_SCHEMA.description.options.minLength,
      FORM_SCHEMA.description.options.maxLength
    )
    let isFormValid = true

    if (titleValidationResult.hasError) {
      this.setState({ title: { ...titleValidationResult } })
      isFormValid = false
    }

    if (descriptionValidationResult.hasError) {
      this.setState({ description: { ...descriptionValidationResult } })
      isFormValid = false
    }

    if (!videoFile) {
      this.setState({
        video: {
          hasError: true,
          errorMessage: "Must have video file",
        },
      })
      isFormValid = false
    }

    return isFormValid
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { elements } = e.currentTarget

    const videoTitle = elements.title.value
    const videoDescription = elements.description.value
    const thumbUrlData = elements.thumb.value
    const videoFile = elements.video.files[0]

    if (!this.isFormValid(videoTitle, videoDescription, videoFile)) {
      this.setState({ formError: "Form have invalid value(s)" })
      return
    }

    const { formError } = this.state

    if (formError) {
      this.setState({ formError: null })
    }

    const formData = new FormData()
    formData.append("title", videoTitle)
    formData.append("description", videoDescription)
    formData.append("video", videoFile)
    formData.append("thumb", dataURLtoFile(thumbUrlData, "thumb"))
    this.onPostData(formData)
  }

  onPostData = (formData) => {
    fetch(`${process.env.REACT_APP_API_HOST}/video`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then(this.onFulfilledPost)
      .catch((e) => console.error(e))
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

    return history.replace(`/video/${data.video.id}`, { ...data.video })
  }

  onFieldBlur = (value, fieldName) => {
    const fieldSettings = FORM_SCHEMA[fieldName]

    if (!fieldSettings) return null

    if (fieldSettings.isRequired) {
      const validationResult = isValidLength(
        value,
        fieldSettings.options,
        `Field value must be between ${fieldSettings.options.minLength} to ${fieldSettings.options.maxLength}`
      )

      switch (fieldName) {
        case "title": {
          this.setState({ title: { ...validationResult } })
          break
        }
        case "description": {
          this.setState({ description: { ...validationResult } })
          break
        }
        default: {
          return null
        }
      }
    }

    return null
  }

  onTitleChange = () => {
    this.setState({ title: { hasError: false, errorMessage: "" } })
  }

  onDescriptionChange = () => {
    this.setState({ description: { hasError: false, errorMessage: "" } })
  }

  onVideoChange = () => {
    this.setState({ video: { hasError: false, errorMessage: "" } })
  }

  render() {
    const { title, description, video, formError } = this.state

    return (
      <Container>
        <Row>
          <Column>
            <h2>Create new video</h2>
            <form className="upload-video__form" onSubmit={this.onSubmit}>
              <InputField
                {...FORM_SCHEMA.title}
                errorMessage={title.errorMessage}
                hasError={title.hasError}
                onChange={this.onTitleChange}
                onBlur={this.onFieldBlur}
              />
              <TextareaField
                {...FORM_SCHEMA.description}
                errorMessage={description.errorMessage}
                hasError={description.hasError}
                onChange={this.onDescriptionChange}
                onBlur={this.onFieldBlur}
              />
              <VideoUploader
                {...FORM_SCHEMA.video}
                onFileUpload={this.onVideoChange}
                errorMessage={video.errorMessage}
                hasError={video.hasError}
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

VideoFrom.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
}

export default VideoFrom
