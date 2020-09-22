import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import VideoDisplay from './videoDisplay';
function Collect(props) {
    React.useEffect(()=> {
        if ( props.curTab !== 'collect' ) {
            props.setCurTab('collect');
        }
    });
    return (
        <VideoDisplay
            videoItems={props.collectItems}
            collectItems={props.collectItems}
            from={'collect'}
        />
    )
}

export default Collect;