
import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
  clientId: '80256b057e324c5f952f3577ff843c29'
})

function Player({ accessToken, trackUri }) {

   return <div style={{ display: "none" }}><SpotifyPlayer
   token={accessToken}
   uris = {trackUri} 
   autoPlay = {true}
   name="SpotiGuess"/>
   </div>
   


}

export default Player










/*
     var player = new Spotify.Player({
       name: 'Carly Rae Jepsen Player',
       getOAuthToken: callback => {
         // Run code to get a fresh access token
     
         callback('access token here');
       },
       volume: 0.5
     });
 
 
     spotifyApi.
 
     
       spotifyApi
         .play({
           uri: trackUri,
           position_ms: 1000,
         })
         .then(
           function () {
             console.log("playing: ", trackUri);
           },
           function (err) {
             //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
             console.log("Something went wrong!", err);
           }
         );
     


         spotifyApi.getMyDevices()
         .then(function(data) {
           console.log('Data', data.body);
         }, function(err) {
           console.error(err);
         });

 return (<>


 </>

 )

*/