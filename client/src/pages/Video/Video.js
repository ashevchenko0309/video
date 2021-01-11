import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Container from './../../components/Grid/Container';
import Row from './../../components/Grid/Row';
import Column from './../../components/Grid/Column';

import LoadingIndicator from './../../components/LoadingIndicator/LoadingIndicator';

function Video(props) {
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [video, setVideo] = useState({
    title: '',
    description: '',
    videoFilename: ''
  });

  const deleteVideo = () => {

    const acceptDelete = window.confirm("Are you sure, you want delete this video?");

    if (!acceptDelete) return;

    fetch(`${process.env.REACT_APP_API_HOST}/video/${id}`, { method: 'DELETE' })
      .then(() => history.replace('/'))
      .catch(err => console.error(err))
  }

  const fetchVideo = () => {
    fetch(`${process.env.REACT_APP_API_HOST}/video/${id}`)
      .then((response) => response.json())
      .then(({ video: { title, description, videoFilename } }) => {
        setIsLoading(false);
        setVideo({ title, description, videoFilename })
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    if (props.location.state) {
      const { title, description, videoFilename } = props.location.state;
      setVideo({ title, description, videoFilename });
      return setIsLoading(false);
    }
    fetchVideo();
  }, [])

  if(isLoading) return <LoadingIndicator />

  return (
    <Container className="page">
      <Row>
        <Column>
          <video src={`${process.env.REACT_APP_VIDEO_HOST}/${video.videoFilename}`} controls autoPlay />
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </div>
            <div>
              <button className="button danger-button" onClick={deleteVideo}>Delete</button>
            </div>
          </div>
        </Column>
      </Row>
    </Container>
  )
}

export default Video