import { useEffect, useContext } from "react"
import { useHistory } from "react-router-dom"

import { UserContext } from "../../context/userContext"

function Logout() {
  const history = useHistory()
  const [, setRole] = useContext(UserContext)

  useEffect(() => {
    localStorage.clear()
    setRole(null)
    history.replace("/")
  }, [])

  return null
}

export default Logout
