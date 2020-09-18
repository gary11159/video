import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoadingImg from '../public/loading.gif';
import LoadingError from '../public/blank.png';
import VideoImg from '../public/pin.png';
function VideoDisplay(props) {
    const videoItems = props.videoItems;
    return (
        <>
            {videoItems !== undefined && videoItems.map((item) => {
                return (
                    <>
                        <div className="videoItem">
                            <figure>
                                <Link to="/play">
                                    <img style={{ maxWidth: '100%' }}
                                        onLoad={LoadingImg}
                                        onError={LoadingError}
                                        src={item.snippet.thumbnails.medium.url} alt="" />

                                </Link>
                                <div className="timeThumb">123</div>
                            </figure>
                            <h3 className="title">
                                {item.snippet.title}
                            </h3>
                            <span className="description">
                                {item.snippet.description}
                            </span>
                            <button className="btn" onClick={() => 123}>加入收藏</button>
                        </div>
                    </>
                )
            })
            }
        </>
    )
}

export default VideoDisplay;