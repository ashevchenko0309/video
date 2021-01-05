import React from 'react';
import { useParams } from 'react-router-dom';

function Video() {
  const { id } = useParams();
  return (
    <div>
      Video container {id}
    </div>
  )
}

export default Video