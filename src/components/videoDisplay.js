import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function VideoDisplay(props) {
    const inputEl = React.useRef(null);
    const inputTimeEl = React.useRef(null);
    const [picWidth, setPicWidth] = React.useState(0);
    const [picHeight, setPicHeight] = React.useState(0);
    const [timeWidth, setTimeWidth] = React.useState(0);
    const [pageNumber, setPageNumber] = React.useState(1);
    const videoItems = props.from === 'home' && props.videoItems !== undefined ? Object.keys(props.videoItems).length > 0 ? props.videoItems[pageNumber - 1] : null
        : props.videoItems;

    const handlePic = () => {
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
        }
        else if (event === 'next') {
            setPageNumber(pageNumber < 9 ? pageNumber + 1 : pageNumber)
        } else {
            setPageNumber(event)
        }
    }

    return (
        <>
            {videoItems !== undefined && videoItems.map((item) => {
                return (
                    <div className="videoItem" key={item.id}>
                        <figure>
                            <Link to="/play">
                                <img
                                    src={item.snippet.thumbnails.medium.url}
                                    alt=""
                                    ref={inputEl}
                                />
                            </Link>
                            {/* <div className="timeThumb" style={{ top: picHeight, left: picWidth - timeWidth }} ref={inputTimeEl}>1:10:30</div> */}
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
                    </div>
                )
            })
            }
            {props.from === 'home' &&
                <div className="pagination">
                    <a href={null} onClick={() => pageClickHandler('pre')}>&laquo;</a>
                    <a href={null} onClick={() => pageClickHandler(1)} className={pageNumber === 1 ? 'active' : null}>1</a>
                    <a href={null} onClick={() => pageClickHandler(2)} className={pageNumber === 2 ? 'active' : null}>2</a>
                    <a href={null} onClick={() => pageClickHandler(3)} className={pageNumber === 3 ? 'active' : null}>3</a>
                    <a href={null} onClick={() => pageClickHandler(4)} className={pageNumber === 4 ? 'active' : null}>4</a>
                    <a href={null} onClick={() => pageClickHandler(5)} className={pageNumber === 5 ? 'active' : null}>5</a>
                    <a href={null} onClick={() => pageClickHandler(6)} className={pageNumber === 6 ? 'active' : null}>6</a>
                    <a href={null} onClick={() => pageClickHandler(7)} className={pageNumber === 7 ? 'active' : null}>7</a>
                    <a href={null} onClick={() => pageClickHandler(8)} className={pageNumber === 8 ? 'active' : null}>8</a>
                    <a href={null} onClick={() => pageClickHandler(9)} className={pageNumber === 9 ? 'active' : null}>9</a>
                    <a href={null} onClick={() => pageClickHandler('next')}>&raquo;</a>
                </div>
            }
        </>
    )
}

export default VideoDisplay;