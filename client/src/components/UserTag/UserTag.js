import React from "react"
import PropTypes from "prop-types"
import queryString from "query-string"
import { useHistory, useLocation } from "react-router-dom"

function UserTag({ id, nickname }) {
  const history = useHistory()
  const { search } = useLocation()

  const onUserSelected = () => {
    const query = queryString.parse(search)
    if (id) {
      return history.push(`/?${queryString.stringify({ ...query, user: id })}`)
    }
    return history.push("/")
  }

  return (
    <span
      role="button"
      tabIndex="0"
      className="user-tag"
      onClick={onUserSelected}
      onKeyDown={onUserSelected}
    >
      By: {nickname}
    </span>
  )
}

UserTag.propTypes = {
  id: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
}

export default UserTag
