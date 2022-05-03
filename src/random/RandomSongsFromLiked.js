
import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node"

const spotifyApi = new SpotifyWebApi({
    clientId: '80256b057e324c5f952f3577ff843c29'
})



async function RandomSongsFromLiked(accessToken, randomSongArray, setRandomSongArray) {

    spotifyApi.setAccessToken(accessToken)

    const songNumber = 20;


    var randomTracks = []

    for (let i = 0; i < songNumber; i++) {



        spotifyApi.getMySavedTracks({ limit: 1 })
            .then((data) => {
                return data.body.total
            })
            .then((totalTracks) => {

                var randomSongNumber = Math.floor(Math.random() * totalTracks);
                return spotifyApi.getMySavedTracks({ limit: 1, offset: randomSongNumber })

            })
            .then((data) => {
                setRandomSongArray(arr => [...arr, data.body.items[0].track])
               
            })
            
            .catch((err) => {
                console.log(err)
            });

    }







    return (randomSongArray)

    


}


function callbackFin(_callback){
   
    _callback();
}

export default RandomSongsFromLiked