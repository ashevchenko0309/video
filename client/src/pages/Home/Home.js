import React, { useState, useEffect } from "react"
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter"
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator"
import Container from "../../components/Grid/Container"
import Row from "../../components/Grid/Row"
import Cards from "../../components/Cards/Cards"
import Column from "../../components/Grid/Column"

// TODO: add category filter to url query
function Home() {
  const [categoryId, setCategoryId] = useState(0)
  const [totalVideos, setTotalVideos] = useState(0)
  const [initVideos, setInitVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = () => {
    setIsLoading(true)
    const apiUrl = `${process.env.REACT_APP_API_HOST}/videos?start=0&end=10${
      categoryId ? `&category=${categoryId}` : ""
    }`
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setTotalVideos(data.count)
        setInitVideos([...data.rows])
        setIsLoading(false)
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    fetchData()
  }, [categoryId])

  return (
    <Container className="page">
      {/* TODO: add row with categories */}
      <Row>
        <Column>
          <div className="mb-2">
            <CategoryFilter
              selectedCategory={categoryId}
              setCategory={setCategoryId}
            />
          </div>
        </Column>
      </Row>
      <Row>
        <Column>
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <Cards initVideos={initVideos} totalVideos={totalVideos} />
          )}
        </Column>
      </Row>
    </Container>
  )
}

export default Home
