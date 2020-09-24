import React from "react";
import ReactHlsPlayer from 'react-hls-player';
import Advertise from '../public/ad.jpg';
import { useLocation } from "react-router";

function Play(props) {
    const videoItem = useLocation().state;
    const videoEl = React.useRef(null);

    React.useEffect(() => {
        if (props.curTab !== 'play') {
            props.setCurTab('play');
        }
    });

    React.useEffect(() => {
        window.addEventListener('resize', adHandler);
        return (() => {
            window.removeEventListener('resize', adHandler);
        })
    });

    function adHandler(action) {
        if (videoItem === undefined || videoItem === null) return;
        if (action === '' || action === 'none') {
            document.getElementById('advertisePic').style.display = action;
        }

        let picHeight = document.getElementById('advertisePic').clientHeight;
        let videoBoxHeight = document.getElementById('videoBox').clientHeight;
        let changeHeight = videoBoxHeight > 250 ? (videoBoxHeight / 2) - (picHeight / 2) : 115;
        document.getElementById('advertisePic').style.transform = 'translate(0, ' + changeHeight + 'px)';
    }

    return (
        <>
            { videoItem !== undefined ?
                <>
                    <div className="video" id="videoBox">
                        <ReactHlsPlayer
                            url='https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
                            autoplay={false}
                            controls={true}
                            width='70%'
                            height='50%'
                            style={{ marginTop: '50px', minHeight: '200px' }}
                            onPause={() => adHandler('')}
                            onPlay={() => adHandler('none')}
                            playerRef={videoEl}
                        />
                        <img id="advertisePic" alt="ad" src={Advertise} className="ad" style={{ display: 'none' }}></img>
                    </div>
                    <div className="video" style={{ marginTop: '10px' }}>
                        <h3 className="play_title" style={{ width: '70%' }}>
                            {videoItem.item.snippet.title}
                        </h3>
                    </div>
                    <div className="video">
                        <span className="play_description">
                            {videoItem.item.snippet.description}
                        </span>
                    </div>
                </>
                :
                <h1 className="video" style={{ marginTop: '50px' }}>請先選擇影片</h1>
            }
        </>
    )
}

export default Play;