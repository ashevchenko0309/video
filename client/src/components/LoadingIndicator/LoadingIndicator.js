import React from "react"
import Container from "../Grid/Container"
import Row from "../Grid/Row"
import Column from "../Grid/Column"

function LoadingIndicator() {
  return (
    <Container>
      <Row>
        <Column>
          <p>Loading...</p>
        </Column>
      </Row>
    </Container>
  )
}

export default LoadingIndicator
