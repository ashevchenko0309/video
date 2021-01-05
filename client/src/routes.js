import { Route } from "react-router-dom";

import Home from './pages/Home/Home';
import Video from './pages/Video/Video';
import VideoFrom from './pages/VideoForm/VideoForm';

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/create-video",
    component: VideoFrom,
  },
  {
    path: "/video/:id",
    component: Video,
  }
];

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component {...props} routes={route.routes} />}
    />
  );
}

function RouterMapper(params) {
  return routes.map((route, i) => (
    <RouteWithSubRoutes key={i} {...route} />
  ))
}

export default RouterMapper