import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

export const UserContext = React.createContext()

export const UserContextProvider = ({ children }) => {
  const [role, setRole] = useState(null)

  useEffect(() => {
    const localToken = localStorage.getItem("token")
    const localRole = localStorage.getItem("role")

    setRole(localToken ? localRole : null)
  }, [])

  return (
    <UserContext.Provider value={[role, setRole]}>
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
}
