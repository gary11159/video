import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
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
  const [curChannel, setCurChannel] = React.useState('Gary');

  React.useEffect(() => {
    fetchData('Gary');
  }, []);

  function fetchData(channel) {
    let tempItems = [];
    setLoadingStatus(false);
    let id = '';
    if (channel === 'Gary') {
      id = 'UUPnponLRAgfnDuHE7OsxFOQ';
    } else if (channel === 'Funny') {
      id = 'UUzjNxGvrqfxL9KGkObbzrmg';
    } else if (channel === 'Music') {
      id = 'UUudwNYFE5jCpfRdoz6iGwXA';
    }
    let url =
      "https://www.googleapis.com/youtube/v3/" +
      "playlistItems?part=snippet,contentDetails,status" +
      "&playlistId=" + id +
      "&key=AIzaSyBVGU4seqI1-erDl8TZHd2mo4_orBgy_NY" +
      "&maxResults=100";
    // 第一次Fetch
    fetch(url, { method: 'get' })
      .then(function (response) {
        return response.json();
      }).then((jsonData) => {
        if (jsonData.error !== undefined && jsonData.error !== null && jsonData.error.code === 403) {
          alert('API出了些問題，可能是本日流量已用盡，請重整試試看');
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
              getVideoDetail(tempItems);
            }).catch(function (err) {
              console.log('error')
            })
        } else {
          getVideoDetail(tempItems);
        }
      }).catch(function (err) {
        console.log(err);
        setLoadingStatus(true);
      })
  }

  async function getVideoDetail(items) {
    let i = 0
    let templateUrl =
      "https://www.googleapis.com/youtube/v3/" +
      "videos?part=snippet,contentDetails" +
      "&key=AIzaSyBVGU4seqI1-erDl8TZHd2mo4_orBgy_NY";
    let tempItems = [];
    let url = templateUrl;
    for (i = 0; i < items.length && i < 50; i++) {
      url += "&id=" + items[i].contentDetails.videoId;
    }

    await fetch(url, { method: 'get' }).then(function (response) {
      return response.json();
    }).then((jsonData) => {
      if (jsonData.error !== undefined && jsonData.error !== null && jsonData.error.code === 403) {
        alert('API出了些問題，可能是本日流量已用盡，請重整試試看');
        return;
      } else if (jsonData.error !== undefined && jsonData.error !== null && jsonData.error.code === 404) {
        alert('請檢查PlayListID是否有誤');
        return;
      }
      tempItems = jsonData.items;
    }).catch(function (err) {
      console.log(err)
    })

    if (i === items.length) {
      tempItems = splitItems(tempItems);
      setVideoItems(tempItems);
      setLoadingStatus(true);
      return;
    }

    url = templateUrl;
    for (i = 50; i < items.length ; i++) {
      url += "&id=" + items[i].contentDetails.videoId;
    }

    fetch(url, { method: 'get' }).then(function (response) {
      return response.json();
    }).then((jsonData) => {
      if (jsonData.error !== undefined && jsonData.error !== null && jsonData.error.code === 403) {
        alert('API出了些問題，可能是本日流量已用盡，請重整試試看');
        return;
      } else if (jsonData.error !== undefined && jsonData.error !== null && jsonData.error.code === 404) {
        alert('請檢查PlayListID是否有誤');
        return;
      }
      tempItems = tempItems.concat(jsonData.items);
      tempItems = splitItems(tempItems);
      setVideoItems(tempItems);
      setLoadingStatus(true);
    }).catch(function (err) {
      console.log(err)
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
    console.log(channel, curChannel);
    if (channel === curChannel) return;
    await fetchData(channel);
    setCurChannel(channel);
  }

  return (
    <>
      {!loadingStatus &&
        <Spinner />
      }

      <Router>
        <Menu changeChannel={(channel) => changeChannel(channel)} curTab={curTab} setCurTab={(tab) => setCurTab(tab)} />
        <Route path="/" render={() => (<Home setCurTab={(tab) => setCurTab(tab)} videoItems={videoItems} totalVideo={totalVideo} collectItems={collectItems} addCollectItems={(item) => addCollectItems(item)} totalPage={totalPage} />)}>
          <Route path="/play" render={() => <Play setCurTab={(tab) => setCurTab(tab)} setLoadingStatus={(status) => setLoadingStatus(status)}/>} />
          <Route path="/collect" render={() => <Collect curChannel={curChannel} collectItems={collectItems} deleteCollectItems={(item) => deleteCollectItems(item)} setCurTab={(tab) => setCurTab(tab)} />} />
          <Route path="/home" render={() => <Home curChannel={curChannel} setCurTab={(tab) => setCurTab(tab)} videoItems={videoItems} totalVideo={totalVideo} collectItems={collectItems} addCollectItems={(item) => addCollectItems(item)} totalPage={totalPage} />} />
          <Redirect to={"/home"} />
        </Route>

      </Router>
      <ScrollToTop />
    </>
  );
}

export default App;
