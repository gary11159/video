import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Home from './components/home';
import Collect from './components/collect';
import Menu from './components/menu';
import Play from './components/play';
import Spinner from './components/spinner';
import ScrollToTop from './components/scrollToTop';

import './App.css';

function App() {
  const [collectItems, setCollectItems] = React.useState([]);
  const [curTab, setCurTab] = React.useState('home');
  const [videoItems, setVideoItems] = React.useState();
  const [totalVideo, setTotalVideo] = React.useState(0);
  const [totalPage, setTotalPage] = React.useState(0);
  const [loadingStatus, setLoadingStatus] = React.useState(false);
  const [isFirst, setIsFirst] = React.useState(true);
  const [curChannel, setCurChannel] = React.useState('Gary');

  React.useEffect(() => {
    if (isFirst) {
      fetchData('Gary');
      setIsFirst(false);
    }
  })

  function fetchData(channel) {
    let tempItems = [];
    setLoadingStatus(false);
    let id = '';
    if (channel === 'Gary') {
      id = 'UUPnponLRAgfnDuHE7OsxFOQ';
    } else if (channel === 'Funny') {
      id = '';
    } else if ( channel === 'music' ) {
      id = 'UUudwNYFE5jCpfRdoz6iGwXA';
    }
    let url =
      "https://www.googleapis.com/youtube/v3/" +
      "playlistItems?part=snippet,contentDetails,status" +
      "&playlistId=" + id +
      "&key=AIzaSyBVGU4seqI1-erDl8TZHd2mo4_orBgy_NY" +
      "&maxResults=50";
    // 第一次Fetch
    fetch(url, { method: 'get' })
      .then(function (response) {
        return response.json();
      }).then((jsonData) => {
        if (jsonData.error !== undefined && jsonData.error !== null && jsonData.error.code === 403) {
          alert('本日流量已用盡');
          return;
        } else if (jsonData.error !== undefined && jsonData.error !== null && jsonData.error.code === 404) {
          alert('請檢查PlayListID是否有誤');
          return;
        }
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
              setLoadingStatus(true);
            }).catch(function (err) {
              console.log('error')
            })
        } else {
          tempItems = splitItems(tempItems);
          setVideoItems(tempItems);
          setLoadingStatus(true);
        }
      }).catch(function (err) {
        console.log(err);
      })
  }

  function addCollectItems(item) {
    setCollectItems(oldArray => [...oldArray, item]);
  }

  function deleteCollectItems(item) {
    let index = collectItems.findIndex((el) => el.id === item.id);
    if (index > -1) {
      let temp = [...collectItems];
      temp.splice(index, 1);
      setCollectItems(temp);
    }
  }

  function splitItems(splitItems) {
    let tempArray = [];
    setTotalPage(Math.floor(Object.keys(splitItems).length / 12) + 1);
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

  async function changeChannel(channel) {
    if ( channel === curChannel ) return;
    await fetchData(channel);
    setCurChannel(curChannel);
  }

  return (
    <>
      {!loadingStatus &&
        <Spinner />
      }

      <Router>
        <Menu changeChannel={(channel) => changeChannel(channel)} curTab={curTab} setCurTab={(tab) => setCurTab(tab)} />
        <Route path="/" render={() => (<Home setCurTab={(tab) => setCurTab(tab)} videoItems={videoItems} totalVideo={totalVideo} collectItems={collectItems} addCollectItems={(item) => addCollectItems(item)} totalPage={totalPage} />)}>
          <Route path="/play" render={() => <Play setCurTab={(tab) => setCurTab(tab)} />} />
          <Route path="/collect" render={() => <Collect collectItems={collectItems} deleteCollectItems={(item) => deleteCollectItems(item)} setCurTab={(tab) => setCurTab(tab)} />} />
          <Route path="/home" render={() => <Home setCurTab={(tab) => setCurTab(tab)} videoItems={videoItems} totalVideo={totalVideo} collectItems={collectItems} addCollectItems={(item) => addCollectItems(item)} totalPage={totalPage} />} />
          <Redirect to={"/home"} />
        </Route>

      </Router>
      <ScrollToTop />
    </>
  );
}

export default App;
