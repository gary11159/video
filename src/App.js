import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './components/home';
import Collect from './components/collect';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <div className="scrollmenu">
          <Link to="/home">首頁</Link>
          <Link to="/collect">收藏頁</Link>
        </div>
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
      </div>
    </Router>
  );
}

export default App;
