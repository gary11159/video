import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Menu(props) {

    return (
        <div className="scrollmenu" >
          <Link to="/home" onClick={() => props.setCurTab('home')} style={{backgroundColor: props.curTab === 'home' ? 'red' : null}}>首頁</Link>
          <Link to="/collect" onClick={() => props.setCurTab('collect')} style={{backgroundColor: props.curTab === 'collect' ? 'red' : null}}>收藏頁</Link>
          <Link to="/play" onClick={() => props.setCurTab('play')} style={{backgroundColor: props.curTab === 'play' ? 'red' : null}}>播放頁</Link>
        </div>
    )
}

export default Menu;