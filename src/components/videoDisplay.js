import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

function VideoDisplay(props) {
    const inputEl = React.useRef(null);
    const inputTimeEl = React.useRef(null);
    const [picWidth, setPicWidth] = React.useState(0);
    const [picHeight, setPicHeight] = React.useState(0);
    const [timeWidth, setTimeWidth] = React.useState(0);
    const [pageNumber, setPageNumber] = React.useState(1);
    const videoItems = props.from === 'home' && props.videoItems !== undefined ? Object.keys(props.videoItems).length > 0 ? props.videoItems[pageNumber - 1] : null
        : props.videoItems;
    let picDoneNum = 0;

    const handlePic = () => {
        if (inputEl.current === null) return;
        setPicWidth(inputEl.current.clientWidth - 10);
        setPicHeight(inputEl.current.clientHeight);
        if (inputTimeEl !== null && inputTimeEl.current !== null) {
            setTimeWidth(inputTimeEl.current.clientWidth - 20);
        }
    };

    React.useEffect(() => {
        window.addEventListener('resize', handlePic);
        return (() => {
            window.removeEventListener('resize', handlePic);
        })
    }, []);

    React.useEffect(() => {
        if (inputEl !== null && inputEl.current !== null) {
            handlePic();
        }
    });

    function pageClickHandler(event) {
        if (event === 'pre') {
            setPageNumber(pageNumber > 1 ? pageNumber - 1 : pageNumber);
        } else if (event === 'next') {
            setPageNumber(pageNumber < 9 ? pageNumber + 1 : pageNumber)
        } else {
            setPageNumber(event)
        }
    }

    function donePic() {
        if (picDoneNum === videoItems.length - 1) {
            picDoneNum = 0;
            handlePic();
        } else {
            picDoneNum++;
        }
    }

    let paginationItem = [];
    for (let i = 0; i < props.totalPage; i++) {
        paginationItem.push(<a href={null} key={i} onClick={() => pageClickHandler(i + 1)} className={pageNumber === i + 1 ? 'active' : null}>{i + 1}</a>);
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
                            <div className="timeThumb" style={{ top: picHeight, left: picWidth - timeWidth }} ref={inputTimeEl}>影片長度</div>
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