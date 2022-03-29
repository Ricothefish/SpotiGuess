
import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node"

const spotifyApi = new SpotifyWebApi({
    clientId: '80256b057e324c5f952f3577ff843c29'
})



function RandomSongsFromArtist(accessToken, artistId) {

    spotifyApi.setAccessToken(accessToken)

    const songNumber = 15;
    const [randomTracks, setRandomTracks] = useState([])
    const [randomTracksIds, setRandomTracksIds] = useState([])

    const [artistAlbumsIds, setArtistAlbumsIds] = useState([]);


    

    useEffect(() => {

        if (accessToken) {

            spotifyApi.getArtistAlbums(artistId, { limit: 10 })
                .then(function (data) {
                    const albumsArray = data.body.items
                    albumsArray.map((a) => {
                        setArtistAlbumsIds(arr => [...arr, a.id])
                    })


                }, function (err) {
                    console.error(err);
                })

        }


    }, [accessToken])



    useEffect(() => {

        if (artistAlbumsIds.length === 10) {
            
            artistAlbumsIds.forEach(albumId => {

                spotifyApi.getAlbumTracks(albumId, { limit: 40, offset: 0 })
                    .then(function (data) {

                        setRandomTracks(arr => [...arr, data.body.items])
                        
                    }, function (err) {
                        console.log('Something went wrong!', err);
                    });
            });
        }
        
        

    }, [artistAlbumsIds])


    console.log('randomtracks', randomTracks.flat())


        if (randomTracks.flat().length > songNumber){
            const randomTracksShuffle = []
            for (let i = 0; i < songNumber; i++) {
                randomTracksShuffle.push(randomTracks.flat()[Math.floor(Math.random()*randomTracks.length)])
            }

 
            return(randomTracksShuffle)
        }

        else{
            return(randomTracks.flat())
        }
    


}

export default RandomSongsFromArtist