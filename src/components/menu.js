import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Menu(props) {
    const [ curTab, setCurTab ] = React.useState('home');

    return (
        <div className="scrollmenu" >
          <Link to="/home" onClick={() => setCurTab('home')} style={{backgroundColor: curTab === 'home' ? 'red' : null}}>首頁</Link>
          <Link to="/collect" onClick={() => setCurTab('collect')} style={{backgroundColor: curTab === 'collect' ? 'red' : null}}>收藏頁</Link>
        </div>
    )
}

export default Menu;