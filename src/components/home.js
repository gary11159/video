import React from "react";
import VideoDisplay from './videoDisplay';

function Home(props) {
    return (
        <>
            <VideoDisplay
                videoItems={props.videoItems}
                collectItems={props.collectItems}
                addCollectItems={(item) => props.addCollectItems(item)}
                totalVideo={props.totalVideo}
                from={'home'}
            />
        </>
    )
}

export default Home;