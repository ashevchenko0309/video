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
  const [categoryFilter, setCategoryFilter] = useState(0)
  const [userFilter, setUserFilter] = useState(0)
  const [totalVideos, setTotalVideos] = useState(0)
  const [initVideos, setInitVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = () => {
    const query = {
      start: 0,
      end: 10,
    }

    if (search) {
      if (categoryFilter) {
        query.category = categoryFilter
      }

      if (userFilter) {
        query.user = userFilter
      }

      const queryStr = queryString.parse(search)
      if (queryStr.category) {
        const { category } = queryStr
        query.category = category
        setCategoryFilter(+category)
      }

      if (queryStr.user) {
        const { user } = queryStr
        query.user = user
        setUserFilter(+user)
      }
    } else {
      console.log("no search")
      setCategoryFilter(0)
      setUserFilter(0)
    }

    const apiUrl = `${
      process.env.REACT_APP_API_HOST
    }/videos?${queryString.stringify(query)}`

    setIsLoading(true)
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
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
            <CategoryFilter selectedCategory={categoryFilter} />
          </div>
        </Column>
      </Row>
      <Row>
        <Column>
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <Cards
              initVideos={initVideos}
              totalVideos={totalVideos}
              userId={userFilter}
              categoryId={categoryFilter}
            />
          )}
        </Column>
      </Row>
    </Container>
  )
}

export default Home
