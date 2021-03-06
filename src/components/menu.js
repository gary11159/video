import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

function Menu(props) {

  return (
    <div className="navbar">
      <div className="dropdown">
        <button className="dropbtn" onClick={() => props.setCurTab('home')} style={{ backgroundColor: props.curTab === 'home' ? 'red' : null }}>首頁
          <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          <Link to="/home" onClick={() => props.changeChannel('Gary')}>自製頻道(10部影片)</Link>
          <Link to="/home" onClick={() => props.changeChannel('Funny')}>反正我很閒({'<'}100部影片)</Link>
          <Link to="/home" onClick={() => props.changeChannel('Music')}>音樂頻道(只抓100部影片)</Link>
        </div>
      </div>
      <Link to="/collect" onClick={() => props.setCurTab('collect')} style={{ backgroundColor: props.curTab === 'collect' ? 'red' : null }}>收藏頁</Link>
      <Link to="/play" onClick={() => props.setCurTab('play')} style={{ backgroundColor: props.curTab === 'play' ? 'red' : null }}>播放頁</Link>
    </div>
  )
}

export default Menu;