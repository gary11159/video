import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoadingImg from '../public/loading.gif';
import LoadingError from '../public/blank.png';
import VideoImg from '../public/pin.png';
function VideoDisplay(props) {
    const videoItems = props.videoItems;
    const inputEl = React.useRef(null);
    const inputTimeEl = React.useRef(null);
    const [picWidth, setPicWidth] = React.useState(0);
    const [picHeight, setPicHeight] = React.useState(0);
    const [timeWidth, setTimeWidth] = React.useState(0);
    const [pageNumber, setPageNumber] = React.useState(1);


    const handlePic = () => {
        setPicWidth(inputEl.current.clientWidth - 10);
        setPicHeight(inputEl.current.clientHeight);
        if (inputTimeEl !== null && inputTimeEl.current !== null) {
            setTimeWidth(inputTimeEl.current.clientWidth - 20);
        }
        console.log(inputEl.current.clientHeight, inputEl.current.clientWidth);

    };

    React.useEffect(() => {
        window.addEventListener('resize', handlePic);
        return (() => {
            window.removeEventListener('resize', handlePic);
        })
    }, []);

    React.useEffect(() => {
        if (inputEl !== null && inputEl.current !== null) {
            console.log("aaa", inputEl, inputEl.current.clientHeight)
            handlePic();
        }

    });

    function pageClickHandler(event) {
        if (event === 'pre') {
            setPageNumber(pageNumber > 1 ? pageNumber - 1 : pageNumber);
        }
        else if ( event === 'next' ) {
            setPageNumber(pageNumber < 6 ? pageNumber + 1 : pageNumber)
        }

        props.pageChange(event);
    }

    return (
        <>
            {videoItems !== undefined && videoItems.map((item) => {
                return (
                    <div className="videoItem" key={item.id}>
                        <figure>
                            <Link to="/play">
                                <img style={{ width: '100%', height: '100%' }}
                                    src={item.snippet.thumbnails.medium.url}
                                    alt=""
                                    ref={inputEl}
                                />

                            </Link>
                            <div className="timeThumb" style={{ top: picHeight, left: picWidth - timeWidth }} ref={inputTimeEl}>1:10:30</div>
                        </figure>
                        <h3 className="title">
                            {item.snippet.title}
                        </h3>
                        <span className="description">
                            {item.snippet.description}
                        </span>
                        <button className="btn" onClick={() => 123}>加入收藏</button>
                    </div>
                )
            })
            }
            <br/>
            <div className="pagination">
                <a href={null} className="pageChanger" onClick={() => pageClickHandler('pre')}>&laquo;</a>
                <a href={null} className={pageNumber === 1 ? 'active' : null}>1</a>
                <a href={null} className={pageNumber === 2 ? 'active' : null}>2</a>
                <a href={null} className={pageNumber === 3 ? 'active' : null}>3</a>
                <a href={null} className={pageNumber === 4 ? 'active' : null}>4</a>
                <a href={null} className={pageNumber === 5 ? 'active' : null}>5</a>
                <a href={null} className={pageNumber === 6 ? 'active' : null}>6</a>
                <a href={null} className="pageChanger" onClick={() => pageClickHandler('next')}>&raquo;</a>
            </div>
        </>
    )
}

export default VideoDisplay;