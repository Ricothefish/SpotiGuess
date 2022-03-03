
import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node"

const spotifyApi = new SpotifyWebApi({
    clientId: '80256b057e324c5f952f3577ff843c29'
})



function RandomSongs(accessToken, songNumber) {

    spotifyApi.setAccessToken(accessToken)

    const [savedTracks, setSavedTracks] = useState([]);
    const [randomTracks, setRandomTracks] = useState([])
    const [totalTracks, setTotalTracks] = useState(0);

    useEffect(() => {
        if (accessToken) {

            spotifyApi.getMySavedTracks({ limit: 1 })
                .then((data) => {
                    setTotalTracks(data.body.total)
                })
                .catch((err) => {
                    console.log(err)
                });

        }
    }, [accessToken])


    useEffect(() => {
        if (totalTracks !== 0) {
            for (let i = 0; i < songNumber; i++) {
                var randomSongNumber = Math.floor(Math.random() * totalTracks);

                spotifyApi.getMySavedTracks({ limit: 1, offset: randomSongNumber })
                    .then((data) => {
                        setRandomTracks(arr => [...arr, data.body.items[0]])
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            }
        }
    }, [totalTracks])

    
    if (randomTracks.length === songNumber) {
        
        return (randomTracks)
    }

    else{
        return null
    }
    


}

export default RandomSongs