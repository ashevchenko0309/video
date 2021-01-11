import React from 'react';
import Container from './../Grid/Container';
import Row from './../Grid/Row';
import Column from './../Grid/Column';

function LoadingIndicator(params) {
  return (
    <Container>
      <Row>
        <Column>
          Loading...
        </Column>
      </Row>
    </Container>
  )
}

export default LoadingIndicator;