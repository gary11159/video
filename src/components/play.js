import React from "react";
import { act } from "react-dom/test-utils";
import ReactHlsPlayer from 'react-hls-player';
import Advertise from '../public/ad.jpg';
import ReactResizeDetector from 'react-resize-detector';

function Play(props) {
    const videoEl = React.useRef(null);
    React.useEffect(() => {
        if (props.curTab !== 'play') {
            props.setCurTab('play');
        }
    });

    function adHandler(action) {
        document.getElementById('advertisePic').style.display = action;
    }

    return (
        <>
            <ReactResizeDetector handleWidth handleHeight>
                {({ width, height }) =>
                    <>
                        <div>{`${width}x${height}`}</div>
                        <div className="video" id="videoBox">
                            <ReactHlsPlayer
                                url='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
                                autoplay={false}
                                controls={true}
                                width='70%'
                                height='200px'
                                style={{ marginTop: '50px', minHeight: '200px' }}
                                onPause={() => adHandler('')}
                                onPlay={() => adHandler('none')}
                                playerRef={videoEl}
                            />
                            <img id="advertisePic" src={Advertise} className="ad" style={{ display: 'none' }}></img>
                        </div>
                    </>
                }
            </ReactResizeDetector>
        </>
    )
}

export default Play;