import React from "react"
import { BrowserRouter as Router, Switch } from "react-router-dom"

import { UserContextProvider } from "./context/userContext"

import Header from "./components/Header/Header"

import RouterMapper from "./routes"

import "./App.scss"

function App() {
  return (
    <UserContextProvider>
      <Router>
        <div>
          <Header />
          <Switch>
            <RouterMapper />
          </Switch>
        </div>
      </Router>
    </UserContextProvider>
  )
}

export default App
