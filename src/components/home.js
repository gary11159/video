import React from "react";
import VideoDisplay from './videoDisplay';

function Home(props) {
    const [isfirstIn, setIsfirstIn] = React.useState(true);
    const [videoItems, setVideoItems] = React.useState();
    const [nextPageToken, setNextPageToken] = React.useState();
    const [prePageToken, setPrePageToken] = React.useState();

    React.useEffect(() => {
        if (isfirstIn) {
            setIsfirstIn(false);
            let url =
                "https://www.googleapis.com/youtube/v3/" +
                "playlistItems?part=snippet,contentDetails,status" +
                "&playlistId=UUudwNYFE5jCpfRdoz6iGwXA" +
                "&key=AIzaSyCcLoBWrSwqFI5uxY_8qdhqCkse_QEcRDM" +
                "&maxResults=12";
            fetch(url, { method: 'get' })
                .then(function (response) {
                    return response.json(); 
                }).then((jsonData) => {
                    setVideoItems(jsonData.items);
                    setNextPageToken(jsonData.nextPageToken);
                    setPrePageToken(jsonData.prevPageToken);
                }).catch(function (err) {
                    console.log('error')
                })
        }
    })

    function pageChange(handler) {
        console.log(handler);
    }

    return (
        <>
            <VideoDisplay pageChange={(handler) => pageChange(handler)} videoItems={videoItems} prePageToken={prePageToken} nextPageToken={nextPageToken}/>
        </>
    )
}

export default Home;