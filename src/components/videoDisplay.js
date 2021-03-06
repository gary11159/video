import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

function VideoDisplay(props) {
    const inputEl = React.useRef(null);
    const [picWidth, setPicWidth] = React.useState(0);
    const [picHeight, setPicHeight] = React.useState(0);
    const [showDuration, setShowDuration] = React.useState(false);
    const [pageNumber, setPageNumber] = React.useState(1);
    const videoItems = props.from === 'home' && props.videoItems !== undefined ? Object.keys(props.videoItems).length > 0 ? props.videoItems[pageNumber - 1] : null
        : props.videoItems;
    let picDoneNum = 0;
    let paginationItem = [];
    
    const handlePic = () => {
        if (inputEl.current === null) return;
        setPicWidth(inputEl.current.clientWidth);
        setPicHeight(inputEl.current.clientHeight);
    };

    React.useEffect(() => {
        window.addEventListener('resize', handlePic);
        return (() => {
            window.removeEventListener('resize', handlePic);
        })
    }, []);

    React.useEffect(() => {
        setPageNumber(1);
    }, [props.curChannel]);


    function pageClickHandler(event) {
        if (event === 'pre') {
            setPageNumber(pageNumber > 1 ? pageNumber - 1 : pageNumber);
        } else if (event === 'next') {
            setPageNumber(pageNumber < paginationItem.length ? pageNumber + 1 : pageNumber)
        } else {
            setPageNumber(event)
        }
    }

    function donePic() {
        if (picDoneNum === videoItems.length - 1) {
            picDoneNum = 0;
            setShowDuration(true);
            handlePic();
        } else {
            picDoneNum++;
        }
    }

    function durationHandler(item) {
        if (item.contentDetails !== undefined) {
            let duration = item.contentDetails.duration;
            duration = duration.replace("PT", "");
            duration = duration.replace("M", "分");
            duration = duration.replace("S", "秒");
            duration = duration.replace("H", "時");
            return duration.replace("PT", "");
        } else {
            return "讀取中";
        }
    }

    for (let i = 0; i < props.totalPage; i++) {
        paginationItem.push(<a href={null} key={i} onClick={() => { pageClickHandler(i + 1); if(pageNumber !== (i + 1) ) setShowDuration(false) ; }} className={pageNumber === i + 1 ? 'active' : null}>{i + 1}</a>);
    }

    return (
        <>
            {videoItems !== undefined && videoItems.map((item) => {
                return (
                    <div className="videoItem" key={item.id}>
                        <figure>
                            <Link to={{
                                pathname: 'play',
                                state: {
                                    item: item
                                }
                            }}>
                                <img
                                    src={item.snippet.thumbnails.medium.url}
                                    alt=""
                                    ref={inputEl}
                                    onLoad={() => donePic()}
                                    style={{ width: '100%' }}
                                />
                            </Link>
                            {showDuration &&
                                <div className="timeThumb" style={{ top: picHeight, right: picWidth / 4 }}>
                                    {durationHandler(item)}
                                </div>
                            }
                        </figure>
                        <h3 className="title">
                            {item.snippet.title}
                        </h3>
                        <span className="description">
                            {item.snippet.description}
                        </span>
                        {props.from === 'home' &&
                            <>
                                {
                                    props.collectItems.some(collectItem => collectItem.id === item.id) ?
                                        <button className="btn_disable" disabled={true} onClick={() => props.addCollectItems(item)}>已加入收藏</button> :
                                        <button className="btn" onClick={() => props.addCollectItems(item)}>加入收藏</button>
                                }
                            </>
                        }
                        {props.from === 'collect' &&
                            <>
                                <button className="btn" style={{ backgroundColor: 'red' }} onClick={() => props.deleteCollectItems(item)}>刪除此收藏</button>
                            </>
                        }
                    </div>
                )
            })
            }
            {props.from === 'home' &&
                <div className="pagination">
                    <a href={null} onClick={() => pageClickHandler('pre')}>&laquo;</a>
                    {paginationItem}
                    <a href={null} onClick={() => pageClickHandler('next')}>&raquo;</a>
                </div>
            }
        </>
    )
}

export default VideoDisplay;