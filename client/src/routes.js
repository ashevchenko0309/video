import React from "react"
import { Route } from "react-router-dom"

import Home from "./pages/Home/Home"
import Video from "./pages/Video/Video"
import VideoFrom from "./pages/VideoForm/VideoForm"

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
