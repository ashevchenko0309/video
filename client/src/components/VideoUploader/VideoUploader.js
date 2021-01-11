import React, { useRef, useState, useCallback } from 'react'
import classNames from 'classnames';

import Row from '../../components/Grid/Row';
import Column from '../../components/Grid/Column';
import UploadFileField from './../UploadFileField/UploadFileField';

function VideoUploader({ name = '', accept = '', onFileUpload = () => { }, hasError = false, errorMessage = '' }) {

  const [videoUrl, setVideoUrl] = useState(null);
  const videoElRef = useRef();
  const canvasElRef = useRef();
  const thumbInputElRef = useRef();

  const formFieldClass = classNames({
    "form_field": true,
    "has-error": hasError
  })

  const drawPreview = useCallback(() => {
    const context = canvasElRef.current.getContext('2d');
    context.drawImage(videoElRef.current, 0, 0, canvasElRef.current.width, canvasElRef.current.height);

    thumbInputElRef.current.value = canvasElRef.current.toDataURL('image/jpeg', 1.0);
  }, [])

  const onChange = (e) => {
    const file = e.currentTarget.files[0];

    if (!file) {
      return setVideoUrl(null);
    }

    setVideoUrl(URL.createObjectURL(file));

    setTimeout(() => {
      drawPreview()
      onFileUpload()
    }, 200)
  }

  return (
    <Row>
      <Column>
        <div className={formFieldClass}>
          <UploadFileField name={name} accept={accept} onChange={onChange} hasError={hasError} errorMessage={errorMessage} />
          {videoUrl ? (
            <>
              <Row>
                <Column classNameSize="col-12 col-md-6">
                  <div className="d-flex flex-column h-100">
                    <h3>Video:</h3>
                    <video className="uploaded-video" width={500} src={videoUrl} ref={videoElRef} controls />
                  </div>

                </Column>
                <Column classNameSize="col-12 col-md-6">
                  <div className="d-flex flex-column h-100">
                    <h3>Video preview: </h3>
                    <canvas className="video-preview" ref={canvasElRef} />
                    <input type="hidden" name="thumb" ref={thumbInputElRef} />
                  </div>
                </Column>
              </Row>
              <Row>
                <Column>
                  <button type="button" className="button primary-button" onClick={drawPreview}>Update preview</button>
                </Column>
              </Row>
            </>
          ) : null}
        </div>
      </Column>
    </Row>
  )
}

export default VideoUploader