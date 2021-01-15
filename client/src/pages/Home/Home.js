import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import queryString from "query-string"
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter"
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator"
import Container from "../../components/Grid/Container"
import Row from "../../components/Grid/Row"
import Cards from "../../components/Cards/Cards"
import Column from "../../components/Grid/Column"

// TODO: add category filter to url query
function Home() {
  const { search } = useLocation()
  const [category, setCategory] = useState(0)
  const [totalVideos, setTotalVideos] = useState(0)
  const [initVideos, setInitVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = () => {
    let categoryId = 0

    if (search) {
      const queryStr = queryString.parse(search)
      categoryId = queryStr.category
    }

    const query = `?start=0&end=10${
      categoryId ? `&category=${categoryId}` : ""
    }`
    const apiUrl = `${process.env.REACT_APP_API_HOST}/videos${query}`

    setCategory(+categoryId)
    setIsLoading(true)
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
  }, [search])

  return (
    <Container className="page">
      <Row>
        <Column>
          <div className="mb-2">
            <CategoryFilter selectedCategory={category} />
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
