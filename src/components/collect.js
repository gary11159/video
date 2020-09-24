import React from "react";
import VideoDisplay from './videoDisplay';
function Collect(props) {
    React.useEffect(() => {
        if (props.curTab !== 'collect') {
            props.setCurTab('collect');
        }
    });
    return (
        <div>
            {Object.keys(props.collectItems).length > 0 ?
                <VideoDisplay
                    videoItems={props.collectItems}
                    collectItems={props.collectItems}
                    deleteCollectItems={(item) => props.deleteCollectItems(item)}
                    from={'collect'}
                />
                :
                <h1 className="video" style={{ marginTop: '50px' }}>目前無收藏影片</h1>}
        </div>
    )
}

export default Collect;