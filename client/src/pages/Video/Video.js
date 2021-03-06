import React, { useEffect, useState } from "react"
import ReactRouterPropTypes from "react-router-prop-types"
import { useParams, useHistory } from "react-router-dom"

import Container from "../../components/Grid/Container"
import Row from "../../components/Grid/Row"
import Column from "../../components/Grid/Column"
import Tag from "../../components/Tag/Tag"

import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator"

function Video(props) {
  const { id } = useParams()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(true)
  const [video, setVideo] = useState({
    title: "",
    description: "",
    videoFilename: "",
    category: {},
  })

  const deleteVideo = () => {
    const acceptDelete = window.confirm(
      "Are you sure, you want delete this video?"
    )

    if (!acceptDelete) return null

    return fetch(`${process.env.REACT_APP_API_HOST}/videos/${id}`, {
      method: "DELETE",
    })
      .then(() => history.replace("/"))
      .catch((err) => console.error(err))
  }

  const fetchVideo = () =>
    fetch(`${process.env.REACT_APP_API_HOST}/videos/${id}`)
      .then((response) => response.json())
      .then(({ video: { title, description, videoFilename, category } }) => {
        setIsLoading(false)
        setVideo({ title, description, videoFilename, category })
      })
      .catch((err) => console.error(err))

  const getVideo = () => {
    if (props.location.state) {
      const {
        title,
        description,
        videoFilename,
        category,
      } = props.location.state
      setVideo({ title, description, videoFilename, category })
      return setIsLoading(false)
    }
    return fetchVideo()
  }

  useEffect(() => {
    getVideo()
  }, [])

  if (isLoading) return <LoadingIndicator />

  return (
    <Container className="page">
      <Row>
        <Column>
          <div>
            <video
              src={`${process.env.REACT_APP_VIDEO_HOST}/${video.videoFilename}`}
              controls
              autoPlay
            >
              <track default kind="captions" srcLang="en" />
            </video>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <div>
                  <Tag
                    categoryId={video.category.id}
                    categoryName={video.category.name}
                    isSmall
                  />
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="button danger-button"
                  onClick={deleteVideo}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </Column>
      </Row>
    </Container>
  )
}

Video.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
}

export default Video
