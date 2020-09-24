import React from "react";
import VideoDisplay from './videoDisplay';

function Home(props) {
    React.useEffect(() => {
        if (props.curTab !== 'home') {
            props.setCurTab('home');
        }
    });

    return (
        <div>
            <VideoDisplay
                videoItems={props.videoItems}
                collectItems={props.collectItems}
                addCollectItems={(item) => props.addCollectItems(item)}
                totalVideo={props.totalVideo}
                from={'home'}
                totalPage={props.totalPage}
            />
        </div>
    )
}

export default Home;