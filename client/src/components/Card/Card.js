import React from 'react';
import { Link } from 'react-router-dom';

function Card({ data: { id, title, description, thumbFilename, videoFilename } }) {

  const path = {
    pathname: `/video/${id}`,
    state: { title, description, videoFilename }
  }

  return (
    <div className="card">
      <Link className="" to={path}>
        <img className="card__img" src={`${process.env.REACT_APP_THUMB_HOST}/${thumbFilename}`} alt={thumbFilename} />
      </Link>
      <div className="card__content">
        <h3 className="card__title">
          <Link className="text-truncate text-slice" to={path}>{title}</Link>
        </h3>
        <p className="text-truncate text-slice">
          <Link className="" to={path}>
            {description}
          </Link>
        </p>

        <Link className="card__link" to={path}>Read more...</Link>
      </div>
    </div >
  )
}

export default React.memo(Card);