import React, { useState } from "react"
import PropTypes from "prop-types"
import { Masonry, useInfiniteLoader } from "masonic"
import queryString from "query-string"

import Card from "../Card/Card"
import NoVideoIndicator from "../NoVideoIndicator/NoVideoIndicator"

function Cards({ initVideos, totalVideos, categoryId, userId }) {
  const [videos, setVideos] = useState([...initVideos])

  const fetchMoreItems = async (startIndex, stopIndex) => {
    const query = {
      start: startIndex,
      end: stopIndex,
    }

    if (startIndex === stopIndex) return

    if (categoryId) {
      query.category = categoryId
    }

    if (userId) {
      query.user = userId
    }

    const apiUrl = `${
      process.env.REACT_APP_API_HOST
    }/videos?${queryString.stringify(query)}`

    const nextItems = await fetch(apiUrl).then((response) => response.json())
    setVideos((current) => [...current, ...nextItems.rows])
  }

  const maybeLoadMore = useInfiniteLoader(fetchMoreItems, {
    isItemLoaded: (index, items) => !!items[index],
    minimumBatchSize: 32,
    threshold: 3,
    totalItems: totalVideos,
  })

  if (videos.length === 0) {
    return <NoVideoIndicator />
  }

  return (
    <Masonry
      items={videos}
      onRender={maybeLoadMore}
      render={Card}
      columnGutter={15}
      columnWidth={300}
      overscanBy={10}
    />
  )
}

Cards.propTypes = {
  initVideos: PropTypes.shape([]),
  totalVideos: PropTypes.number,
  categoryId: PropTypes.number,
  userId: PropTypes.number,
}

Cards.defaultProps = {
  initVideos: [],
  totalVideos: 0,
  categoryId: 0,
  userId: 0,
}

export default React.memo(Cards)
