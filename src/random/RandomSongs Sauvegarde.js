
import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node"

const spotifyApi = new SpotifyWebApi({
    clientId: '80256b057e324c5f952f3577ff843c29'
})



function RandomSongs(accessToken, basedOnLikedSongs, playlistsId, artistId) {

    spotifyApi.setAccessToken(accessToken)

    const songNumber = 15;
    const [randomTracks, setRandomTracks] = useState([])
    const [randomTracksIds, setRandomTracksIds] = useState([])

    const [totalTracks, setTotalTracks] = useState(0);
    const [artistAlbumsIds, setArtistAlbumsIds] = useState([]);
 

    useEffect(() => {
        if (accessToken && basedOnLikedSongs) {

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
        if (basedOnLikedSongs && totalTracks !== 0) {
            for (let i = 0; i < 50; i++) {
                var randomSongNumber = Math.floor(Math.random() * totalTracks);

                spotifyApi.getMySavedTracks({ limit: 1, offset: randomSongNumber })
                    .then((data) => {
                        setRandomTracks(arr => [...arr, data.body.items[0].track])
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            }
        }
    }, [totalTracks])


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
 
/* Get Audio Features for a Track */

    //id ninho 6Te49r3A6f5BiIgBRxH7FH
    //id MILS 3 551pGp1sw4FNItesRbVVzF


    if (playlistsId.length !== 0) {
        //console.log("Playlist")
    }

    if (artistId.length !== 0) {
        if (randomTracks.flat().length > songNumber){
            const randomTracksShuffle = []
            for (let i = 0; i < songNumber; i++) {
                randomTracksShuffle.push(randomTracks.flat()[Math.floor(Math.random()*randomTracks.length)])
            }

            //console.log('randomsongTropGros')
            //console.log('shuffle', randomTracksShuffle)
            return(randomTracksShuffle)
        }

        else{
            return(randomTracks.flat())
        }
    }

    if (randomTracks.length === songNumber) {

        //return (randomTracks)
    }

    else {
        return null
    }



}

export default RandomSongs