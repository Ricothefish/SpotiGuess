
import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node"

const spotifyApi = new SpotifyWebApi({
    clientId: '80256b057e324c5f952f3577ff843c29'
})



function RandomSongsFromPlaylist(accessToken, playlistId, randomSongArray, setRandomSongArray) {

    spotifyApi.setAccessToken(accessToken)

    const songNumber = 15;



    var total = 0
    var tour = 0

    spotifyApi.getPlaylistTracks(playlistId)
        .then((data) => {

            return (data.body.total)
        })
        .then((total) => {

            const limit = 100
            const nbTour = Math.floor(total / limit) + 1

            for (let tour = 0; tour < nbTour; tour++) {
                return spotifyApi.getPlaylistTracks(playlistId, { offset: tour * limit, limit: 100 })
                    .then((data) => {
                        var a = []
                        data.body.items.map((track) => {
                            a.push(track.track)
                        })

                        return (a)

                    })

            }

        })
        .then((liste) => {
            setRandomSongArray(liste)
        })

        .catch((err) => {
            console.error(err);
        })



    return (randomSongArray)



}

export default RandomSongsFromPlaylist



