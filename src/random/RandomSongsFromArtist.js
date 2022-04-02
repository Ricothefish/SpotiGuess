
import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node"

const spotifyApi = new SpotifyWebApi({
    clientId: '80256b057e324c5f952f3577ff843c29'
})



function RandomSongsFromArtist(accessToken, artistId, randomSongArray, setRandomSongArray) {

    spotifyApi.setAccessToken(accessToken)

    const songNumber = 15;
    //const [randomTracks, setRandomTracks] = useState([])
    //const [randomTracksIds, setRandomTracksIds] = useState([])

    //const [artistAlbumsIds, setArtistAlbumsIds] = useState([]);


    //randomTracks = []


    var total =0

    spotifyApi.getArtistAlbums(artistId, { limit: 20 , market: "FR"})
        .then(function (data) {
            const albumsArray = data.body.items
            return albumsArray.map((album) => {
                console.log(album.name)
                total = total + album.total_tracks
                console.log(total)
                return album.id
            })
        })
        .then((ids) => {

            return spotifyApi.getAlbums(ids)

        })
        .then((data) => {
            var a=[]
            console.log('data albums',data.body.albums)
            
            data.body.albums.map((album) => {


                album.tracks.items.map((track) => {
                    //if (track.explicit) {
                        a.push(track)
                        
                        //randomTracks.push(track)
                    //}
                })
            })
            setRandomSongArray(a)
            console.log(data)

        })
        .catch((err) => {
            console.error(err);
        })




    return (randomSongArray)




}

export default RandomSongsFromArtist