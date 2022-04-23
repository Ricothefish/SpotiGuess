
import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
  clientId: '80256b057e324c5f952f3577ff843c29'
})
/*
function checkForPlayer() {
 const { token } = this.state;

 if (window.Spotify !== null) {
   this.player = new window.Spotify.Player({
     name: "Matt's Spotify Player",
     getOAuthToken: cb => { cb(token); },
   });
   // this.createEventHandlers();

   // finally, connect!
   this.player.connect();
 }
}


function Player({ accessToken, trackUri }) {

  spotifyApi.setAccessToken(accessToken)
  const [deviceId, setDeviceId] = useState()
  const [player, setPlayer] = useState(undefined);

  useEffect(() => {

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);
    
    window.onSpotifyWebPlaybackSDKReady = () => {

      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: cb => { cb(accessToken); },
        volume: 0.5
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setDeviceId(device_id)

      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });


      player.connect();


    };
  }, []);


  useEffect(()=>{
    spotifyApi.transferMyPlayback(
       [deviceId]
    )
    .then(function () {
      console.log('Transfering playback to ' + deviceId)
      return
      
    })
    .then(()=>{
      return spotifyApi.play({
        uri: trackUri

      })
      
    })
    .then(()=>{
      console.log("playing: ", trackUri);
    })
    .catch((err)=>{
      console.log('Something went wrong!', err);
    })
      



  },[deviceId])

  return (<></>)
*/
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