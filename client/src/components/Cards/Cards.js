import React, { useState } from 'react';
import Card from '../Card/Card';
import { Masonry, useInfiniteLoader } from 'masonic';

function Cards({ initVideos = [], totalVideos = 0 }) {

  const [items, setItems] = useState([...initVideos]);

  const fetchMoreItems = async (startIndex, stopIndex) => {
    const nextItems = await fetch(`${process.env.REACT_APP_API_HOST}/video?start=${startIndex}&end=${stopIndex + 1}`).then(response => response.json());
    setItems((current) => [...current, ...nextItems.videos])
  }

  const maybeLoadMore = useInfiniteLoader(fetchMoreItems, {
    isItemLoaded: (index, items) => !!items[index],
    minimumBatchSize: 32,
    threshold: 3,
    totalItems: totalVideos
  })

  return (
    <Masonry
      items={items}
      onRender={maybeLoadMore}
      render={Card}
      columnGutter={15}
      columnWidth={300}
      overscanBy={10}
    />
  )
}

export default React.memo(Cards);