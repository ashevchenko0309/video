import React, { useState } from "react"
import PropTypes from "prop-types"
import { Masonry, useInfiniteLoader } from "masonic"
import Card from "../Card/Card"
import NoVideoIndicator from "../NoVideoIndicator/NoVideoIndicator"

function Cards({ initVideos = [], totalVideos = 0 }) {
  const [videos, setVideos] = useState([...initVideos])

  const fetchMoreItems = async (startIndex, stopIndex) => {
    // TODO: read category prop for fetch in category
    const nextItems = await fetch(
      `${process.env.REACT_APP_API_HOST}/video?start=${startIndex}&end=${
        stopIndex + 1
      }`
    ).then((response) => response.json())
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
}

Cards.defaultProps = {
  initVideos: [],
  totalVideos: 0,
  // TODO: add def prop for category
}

export default React.memo(Cards)
