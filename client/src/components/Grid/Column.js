import React from 'react';

function Column({ classNameSize = "col-12", children }) {
  return (
    <div className={classNameSize}>
      {children}
    </div>
  )
}

export default Column;