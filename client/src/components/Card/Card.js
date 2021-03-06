import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import Tag from "../Tag/Tag"

function Card({
  data: { id, title, description, thumbFilename, videoFilename, category },
}) {
  const path = {
    pathname: `/video/${id}`,
    state: { title, description, videoFilename, category },
  }

  return (
    <div className="card">
      <Link className="" to={path}>
        <img
          className="card__img"
          src={`${process.env.REACT_APP_THUMB_HOST}/${thumbFilename}`}
          alt={thumbFilename}
        />
      </Link>
      <div className="card__content">
        <h3 className="card__title">
          <Link className="text-truncate text-slice" to={path}>
            {title}
          </Link>
        </h3>
        <p className="text-truncate text-slice">
          <Link className="" to={path}>
            {description}
          </Link>
        </p>
        <p>
          <Tag categoryId={category.id} categoryName={category.name} isSmall />
        </p>
        <Link className="card__link" to={path}>
          Read more...
        </Link>
      </div>
    </div>
  )
}

Card.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    thumbFilename: PropTypes.string,
    videoFilename: PropTypes.string,
    category: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }).isRequired,
}

export default React.memo(Card)
