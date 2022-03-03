import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";

function Player({accessToken , trackUri}){
    return <div style={{ display: "none" }}><SpotifyPlayer
    token={accessToken}
    uris = {trackUri} 
    autoPlay = {true}/>
    </div>
}

export default Player