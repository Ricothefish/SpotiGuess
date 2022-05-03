
import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node"

const spotifyApi = new SpotifyWebApi({
    clientId: '80256b057e324c5f952f3577ff843c29'
})



function RandomSongsFromArtist(accessToken, artistId, randomSongArray, setRandomSongArray) {

    spotifyApi.setAccessToken(accessToken)

    const songNumber = 25;


    var total = 0

    spotifyApi.getArtistAlbums(artistId, { limit: 20, market: "FR" })
        .then(function (data) {
            const albumsArray = data.body.items
            return albumsArray.map((album) => {
                total = total + album.total_tracks
                return album.id
            })
        })
        .then((ids) => {

            return spotifyApi.getAlbums(ids)

        })
        .then((data) => {
            var a = []
            data.body.albums.map((album) => {


                album.tracks.items.map((track) => {

                    a.push(track)


                })
            })
            setRandomSongArray(a)
          

        })
        .catch((err) => {
            console.error(err);
        })




    return (randomSongArray)




}

export default RandomSongsFromArtist