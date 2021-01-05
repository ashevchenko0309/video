import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Header from './components/Header/Header';

import RouterMapper from './routes';

import './App.scss';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <RouterMapper />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
