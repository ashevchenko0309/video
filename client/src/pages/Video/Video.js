import React, { useEffect, useState, useContext } from "react"
import ReactRouterPropTypes from "react-router-prop-types"
import { useParams, useHistory } from "react-router-dom"

import Container from "../../components/Grid/Container"
import Row from "../../components/Grid/Row"
import Column from "../../components/Grid/Column"
import Tag from "../../components/Tag/Tag"
import UserTag from "../../components/UserTag/UserTag"
import Button from "../../components/Button/Button"

import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator"

import { UserContext } from "../../context/userContext"

import ROLES from "../../constants/roles"

function Video(props) {
  const { id } = useParams()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(true)
  const [role] = useContext(UserContext)
  const [video, setVideo] = useState({
    title: "",
    description: "",
    videoFilename: "",
    category: {},
    user: {},
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
      .then(
        ({ video: { title, description, videoFilename, category, user } }) => {
          console.log()
          setIsLoading(false)
          setVideo({ title, description, videoFilename, category, user })
        }
      )
      .catch((err) => console.error(err))

  const getVideo = () => {
    if (props.location.state) {
      const {
        title,
        description,
        videoFilename,
        category,
        user,
      } = props.location.state
      setVideo({ title, description, videoFilename, category, user })
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
                <div className="mt-1">
                  <UserTag id={video.user.id} nickname={video.user.nickname} />
                </div>
              </div>
              <div>
                {role === ROLES.ADMIN && (
                  <Button
                    type="button"
                    variant="danger"
                    onClick={deleteVideo}
                    label="Delete"
                  />
                )}
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
