import React from 'react';
import Card from './../../components/Card/Card';
import { Masonry } from 'masonic'
import './Cards.scss';

function Cards() {

  let i = 0
  const items = Array.from(Array(100), () => ({ id: i++ }))

  return (
    <div className="cards">
      <Masonry
        items={items}
        render={Card}
        columnGutter={15}
        columnWidth={300}
        overscanBy={2}
      />
    </div>
  )
}

export default React.memo(Cards);