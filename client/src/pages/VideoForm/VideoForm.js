import React from 'react';

import FORM_SCHEMA, { isValidLength } from './video-from.helpers';

import Container from '../../components/Grid/Container';
import Row from '../../components/Grid/Row';
import Column from '../../components/Grid/Column';
import InputField from './../../components/InputField/InputField';
import TextareaField from './../../components/TextareaField/TextareaField';
import VideoUploader from './../../components/VideoUploader/VideoUploader';
import FormErrorHint from './../../components/FormErrorHints/FormErrorHint';


import dataURLtoFile from './../../utils/dataUrlToFile';

class VideoFrom extends React.Component {

  state = {
    formError: null,
    title: {
      hasError: null,
      errorMessage: '',
    },
    description: {
      hasError: null,
      errorMessage: '',
    },
    video: {
      hasError: null,
      errorMessage: '',
    }
  }


  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, video } = this.state;

    if (
      (title.hasError || title.hasError === null) ||
      (description.hasError || description.hasError === null) ||
      (video.hasError || video.hasError === null)
    ) {
      return this.setState({ formError: 'Some form field(s) is invalid or empty' });
    } else {
      if (this.state.formError) {
        this.setState({ formError: null });
      }
    }

    const elements = e.currentTarget.elements;

    const videoFile = elements.video.files[0];
    if (!videoFile) {
      return this.setState({ video: { hasError: true, errorMessage: `Must have video file` } });
    }

    const videoTitle = elements.title.value;
    const videoDescription = elements.description.value;
    const thumbUrlData = elements.thumb.value;

    const formData = new FormData();
    formData.append("title", videoTitle);
    formData.append("description", videoDescription);
    formData.append("video", videoFile);
    formData.append("thumb", dataURLtoFile(thumbUrlData, 'thumb'));
    this.onPostData(formData)
  }

  onPostData = (formData) => {
    fetch(`${process.env.REACT_APP_API_HOST}/video`, {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(this.onFulfilledPost)
      .catch(e => console.error(e))
  }

  onFulfilledPost = (data) => {
    if (data.errors && data.errors.length) {
      return this.setState({ formError: data.errors.map(error => `${error.param} - ${error.msg}`).join('; ') });
    }
    this.props.history.replace(`/video/${data.video.id}`, { ...data.video })
  }

  onFieldBlur = (value, fieldName) => {
    const fieldSettings = FORM_SCHEMA[fieldName];

    if(!fieldSettings) return null;

    if (fieldSettings.isRequired) {
      const validationResult = isValidLength(value, fieldSettings.options, `Field value must be between ${fieldSettings.options.minLength} to ${fieldSettings.options.maxLength}`);

      switch (fieldName) {
        case 'title':
          this.setState({ title: { ...validationResult } });
          break;
        case 'description':
          this.setState({ description: { ...validationResult } });
          break;
      }
    }
  }

  onTitleChange = (value) => {
    this.setState({ title: { hasError: false, errorMessage: '' } });
  }

  onDescriptionChange = (value) => {
    this.setState({ description: { hasError: false, errorMessage: '' } });
  }

  onVideoChange = () => {
    this.setState({ video: { hasError: false, errorMessage: '' } });
  }


  render() {
    return (
      <Container>
        <Row>
          <Column>
            <h2>Create new video</h2>
            <form className="upload-video__form" onSubmit={this.onSubmit}>
              <InputField
                {...FORM_SCHEMA.title}
                defaultValue={this.state.title.value}
                errorMessage={this.state.title.errorMessage}
                hasError={this.state.title.hasError}
                onChange={this.onTitleChange}
                onBlur={this.onFieldBlur}
              />
              <TextareaField
                {...FORM_SCHEMA.description}
                defaultValue={this.state.description.value}
                errorMessage={this.state.description.errorMessage}
                hasError={this.state.description.hasError}
                onChange={this.onDescriptionChange}
                onBlur={this.onFieldBlur}
              />
              <VideoUploader
                {...FORM_SCHEMA.video}
                onFileUpload={this.onVideoChange}
                errorMessage={this.state.video.errorMessage}
                hasError={this.state.video.hasError}
              />
              {this.state.formError && <FormErrorHint errorMessage={this.state.formError} />}
              <button className="button form_button--submit" type="submit">Submit</button>
            </form>
          </Column>
        </Row>
      </Container>
    )
  }
}

export default VideoFrom;