import React, { useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { initState, reducer, actions } from './video-form.reducer';
import FORM_SCHEMA, { isValidTitle, isValidDescription } from './video-from.helpers';

import Container from '../../components/Grid/Container';
import Row from '../../components/Grid/Row';
import Column from '../../components/Grid/Column';
import InputField from './../../components/InputField/InputField';
import TextareaField from './../../components/TextareaField/TextareaField';
import VideoUploader from './../../components/VideoUploader/VideoUploader';
import FormErrorHint from './../../components/FormErrorHints/FormErrorHint';

import dataURLtoFile from './../../utils/dataUrlToFile';

function VideoFrom() {

  const [state, dispatch] = useReducer(reducer, initState);
  const [formError, setFormError] = useState(null);
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();

    const { title, description, video } = state;

    if (title.hasError || description.hasError || video.hasError) {
      return setFormError('Some form field(s) is invalid');
    } else {
      if (formError) {
        setFormError(null);
      }
    }

    const elements = e.currentTarget.elements;

    const videoFile = elements.video.files[0];

    if (!videoFile) {
      return dispatch({ type: actions.ON_VALIDATE_VIDEO_UPLOAD, payload: { hasError: true, errorMessage: `Must have video file` } })
    }

    const videoTitle = elements.title.value;
    const videoDescription = elements.description.value;
    const thumbUrlData = elements.thumb.value;

    const formData = new FormData();
    formData.append("title", videoTitle);
    formData.append("description", videoDescription);
    formData.append("video", videoFile);
    formData.append("thumb", dataURLtoFile(thumbUrlData, 'thumb'));

    fetch(`${process.env.REACT_APP_API_HOST}/video`, {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.errors && data.errors.length) {
          return setFormError(data.errors.map(error => `${error.param} - ${error.msg}`).join('; '))
        }
        history.replace(`/video/${data.video.id}`, { ...data.video })
      })
      .catch(e => console.error(e))
  }

  const onTitleChange = (value) => {
    dispatch({ type: actions.ON_CHANGE_TITLE, payload: { value, hasError: false, errorMessage: '' } })
  }

  const onTitleBlur = (value) => {
    if (FORM_SCHEMA.title.isRequired) {
      const validationResult = isValidTitle(value);

      if (validationResult.hasError) {
        return dispatch({ type: actions.ON_CHANGE_TITLE, payload: { ...validationResult } })
      } else {
        return dispatch({ type: actions.ON_CHANGE_TITLE, payload: { ...validationResult } })
      }
    }
  }

  const onDescriptionChange = (value) => {
    dispatch({ type: actions.ON_CHANGE_DESCRIPTION, payload: { value, hasError: false, errorMessage: '' } })
  }

  const onDescriptionBlur = (value) => {
    if (FORM_SCHEMA.description.isRequired) {
      const validationResult = isValidDescription(value);

      if (validationResult.hasError) {
        return dispatch({ type: actions.ON_CHANGE_DESCRIPTION, payload: { ...validationResult } })
      } else {
        return dispatch({ type: actions.ON_CHANGE_DESCRIPTION, payload: { ...validationResult } })
      }
    }
  }

  const onVideoChange = () => {
    dispatch({ type: actions.ON_CHANGE_VIDEO_UPLOAD, payload: { hasError: false, errorMessage: '' } })
  }

  return (
    <Container>
      <Row>
        <Column>
          <h2>Create new video</h2>
          <form className="upload-video__form" onSubmit={onSubmit}>
            <InputField
              {...FORM_SCHEMA.title}
              defaultValue={state.title.value}
              errorMessage={state.title.errorMessage}
              hasError={state.title.hasError}
              onChange={onTitleChange}
              onBlur={onTitleBlur}
            />
            <TextareaField
              {...FORM_SCHEMA.description}
              defaultValue={state.description.value}
              errorMessage={state.description.errorMessage}
              hasError={state.description.hasError}
              onChange={onDescriptionChange}
              onBlur={onDescriptionBlur}
            />
            <VideoUploader
              {...FORM_SCHEMA.video}
              onFileUpload={onVideoChange}
              errorMessage={state.video.errorMessage}
              hasError={state.video.hasError}
            />
            {formError && <FormErrorHint errorMessage={formError} />}
            <button className="button form_button--submit" type="submit">Submit</button>
          </form>
        </Column>
      </Row>
    </Container>
  )
}

export default VideoFrom;