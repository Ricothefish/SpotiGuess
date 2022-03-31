import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import SpotifyWebApi from "spotify-web-api-node"

const spotifyApi = new SpotifyWebApi({
    clientId: '80256b057e324c5f952f3577ff843c29'
})
 
function Player({accessToken , trackUri}){

    spotifyApi.setAccessToken(accessToken)

    
      //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
      

  
    
    return <div style={{ display: "none" }}><SpotifyPlayer
    token={accessToken}
    uris = {trackUri} 
    autoPlay = {true}
    name="SpotiGuess"/>
    </div>
    
}

export default Player