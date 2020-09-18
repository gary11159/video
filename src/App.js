import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/home';
import Collect from './components/collect';
import Menu from './components/menu';
import './App.css';

function App() {
  
  return (
    <Router>
      <Menu/>
      <Switch>
        <Route path="/play">
        </Route>
        <Route path="/collect">
          <Collect />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
