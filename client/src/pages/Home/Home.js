import React, { useState, useEffect } from "react"
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter"
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator"
import Container from "../../components/Grid/Container"
import Row from "../../components/Grid/Row"
import Cards  from "../../components/Cards/Cards"
import Column from "../../components/Grid/Column"

function Home() {
  // TODO: create category state
  const [category, setCategory] = useState("")
  const [totalVideos, setTotalVideos] = useState(0)
  const [initVideos, setInitVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // TODO: create fetcher fn

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_HOST}/video?start=0&end=10&category=${category}`)
    .then((response) => response.json())
    .then((data) => {
      setTotalVideos(data.total)
      setInitVideos(data.videos)
      setIsLoading(false)
    })
    .catch((err) => console.error(err))
  }

  useEffect(() => {
    fetchData()
  }, [category])

  if (isLoading) return <LoadingIndicator />

  return (
    <Container className="page">
      {/* TODO: add row with categories */}
      <Row>
        <Column>
          <CategoryFilter selectedCategory={category} setCategory={setCategory} />
        </Column>
      </Row>
      <Row>
        <Column>
        {/* TODO: throw category prop*/}
          <Cards initVideos={initVideos} totalVideos={totalVideos} />
        </Column>
      </Row>
    </Container>
  )
}

export default Home
