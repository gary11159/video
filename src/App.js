import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/home';
import Collect from './components/collect';
import Menu from './components/menu';
import Play from './components/play';
import './App.css';

function App() {
  const [collectItems, setCollectItems] = React.useState([]);
  const [curTab, setCurTab] = React.useState('home');
  const [isfirstIn, setIsfirstIn] = React.useState(true);
  const [videoItems, setVideoItems] = React.useState();
  const [totalVideo, setTotalVideo] = React.useState(0);

  React.useEffect(() => {
    async function fetchData() {
      let tempItems = [];
      let url =
        "https://www.googleapis.com/youtube/v3/" +
        "playlistItems?part=snippet,contentDetails,status" +
        "&playlistId=UUudwNYFE5jCpfRdoz6iGwXA" +
        "&key=AIzaSyBVGU4seqI1-erDl8TZHd2mo4_orBgy_NY" +
        "&maxResults=50";
      // 第一次Fetch
      await fetch(url, { method: 'get' })
        .then(function (response) {
          return response.json();
        }).then((jsonData) => {
          tempItems = tempItems.concat(jsonData.items);
          setTotalVideo(jsonData.pageInfo.totalResults > 100 ? 100 : jsonData.pageInfo.totalResults);
          if (jsonData.nextPageToken !== undefined) {
            // 第二次Fetch
            url = url + "&pageToken=" + jsonData.nextPageToken;
            fetch(url, { method: 'get' })
              .then(function (response) {
                return response.json();
              }).then((jsonData) => {
                tempItems = tempItems.concat(jsonData.items);
                tempItems = splitItems(tempItems);
                setVideoItems(tempItems);
              }).catch(function (err) {
                console.log('error')
              })
          } else {
            tempItems = splitItems(tempItems);
            setVideoItems(tempItems);
          }
        }).catch(function (err) {
          console.log('error')
        })
    }

    if (isfirstIn) {
      setIsfirstIn(false);
      fetchData();
    }
  })

  function addCollectItems(item) {
    setCollectItems(oldArray => [...oldArray, item]);
  }

  function splitItems(splitItems) {
    let tempArray = [];
    for (let i = 0; i < Object.keys(splitItems).length; i += 12) {
      if (i + 12 < Object.keys(splitItems).length) {
        tempArray.push(splitItems.slice(i, i + 12));
      }
      else {
        tempArray.push(splitItems.slice(i, Object.keys(splitItems).length));
      }
    }
    return tempArray;
  }

  return (
    <Router>
      <Menu curTab={curTab} setCurTab={(tab) => setCurTab(tab)} />
      <Switch>
        <Route path="/play">
          <Play setCurTab={(tab) => setCurTab(tab)} />
        </Route>
        <Route path="/collect">
          <Collect collectItems={collectItems} setCurTab={(tab) => setCurTab(tab)} />
        </Route>
        <Route path="/">
          <Home videoItems={videoItems} totalVideo={totalVideo} collectItems={collectItems} addCollectItems={(item) => addCollectItems(item)} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
