import React from "react"
import { Route } from "react-router-dom"

import Home from "./pages/Home/Home"
import Video from "./pages/Video/Video"
import VideoFrom from "./pages/VideoForm/VideoForm"

import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import Logout from "./pages/Logout/Logout"

/* eslint-disable react/jsx-props-no-spreading */
const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/create-video",
    component: VideoFrom,
  },
  {
    path: "/video/:id",
    component: Video,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/logout",
    component: Logout,
  },
  {
    path: "/register",
    component: Signup,
  },
]

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  )
}

function RouterMapper() {
  return routes.map((route) => (
    <RouteWithSubRoutes key={route.path} {...route} />
  ))
}

export default RouterMapper
