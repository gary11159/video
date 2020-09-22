import React from "react";
import VideoDisplay from './videoDisplay';

function Home(props) {
    const [isfirstIn, setIsfirstIn] = React.useState(true);
    const [videoItems, setVideoItems] = React.useState();
    const [totalVideo, setTotalVideo] = React.useState(0);

    React.useEffect(() => {
        async function fetchData() {
            let tempItems = [];
            let url =
                "https://www.googleapis.com/youtube/v3/" +
                "playlistItems?part=snippet,contentDetails,status" +
                "&playlistId=UUudwNYFE5jCpfRdoz6iGwXA" +
                "&key=AIzaSyBVGU4seqI1-erDl8TZHd2mo4_orBgy_NY" +
                "&maxResults=50";
            // 第一次Fetch
            await fetch(url, { method: 'get' })
                .then(function (response) {
                    return response.json();
                }).then((jsonData) => {
                    tempItems = tempItems.concat(jsonData.items);
                    setTotalVideo(jsonData.pageInfo.totalResults > 100 ? 100 : jsonData.pageInfo.totalResults);
                    if (jsonData.nextPageToken !== undefined) {
                        // 第二次Fetch
                        url = url + "&pageToken=" + jsonData.nextPageToken;
                        fetch(url, { method: 'get' })
                            .then(function (response) {
                                return response.json();
                            }).then((jsonData) => {
                                tempItems = tempItems.concat(jsonData.items);
                                tempItems = splitItems(tempItems);
                                setVideoItems(tempItems);
                            }).catch(function (err) {
                                console.log('error')
                            })
                    } else {
                        tempItems = splitItems(tempItems);
                        setVideoItems(tempItems);
                    }
                }).catch(function (err) {
                    console.log('error')
                })
        }

        if (isfirstIn) {
            setIsfirstIn(false);
            fetchData();
        }
    })

    function splitItems(splitItems) {
        let tempArray = [];
        for (let i = 0; i < Object.keys(splitItems).length; i += 12) {
            if (i + 12 < Object.keys(splitItems).length) {
                tempArray.push(splitItems.slice(i, i + 12));
            }
            else {
                tempArray.push(splitItems.slice(i, Object.keys(splitItems).length));
            }
        }
        return tempArray;
    }

    return (
        <>
            <VideoDisplay
                videoItems={videoItems}
                collectItems={props.collectItems}
                addCollectItems={(item) => props.addCollectItems(item)}
                totalVideo={totalVideo}
                from={'home'}
            />
        </>
    )
}

export default Home;