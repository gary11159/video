import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/home';
import Collect from './components/collect';
import Menu from './components/menu';
import './App.css';

function App() {
  const [collectItems, setCollectItems] = React.useState([]);
  const [curTab, setCurTab] = React.useState('home');
  function addCollectItems(item) {
    setCollectItems(oldArray => [...oldArray, item]);
  }


  return (
    <Router>
      <Menu curTab={curTab} setCurTab={(tab) => setCurTab(tab)} />
      <Switch>
        <Route path="/play">
        </Route>
        <Route path="/collect">
          <Collect collectItems={collectItems} setCurTab={(tab) => setCurTab(tab)} />
        </Route>
        <Route path="/">
          <Home collectItems={collectItems} addCollectItems={(item) => addCollectItems(item)} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
