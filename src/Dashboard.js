import React, { useEffect, useState } from "react";
import UseAuth from "./UseAuth";
import Reponse from "./Reponse";
import SpotifyWebApi from "spotify-web-api-node"
import Player from "./Player";
import ArtistSearchBar from "./searchBar/ArtistSearchBar";
import PlaylistSearchBar from "./searchBar/PlaylistSearchBar";
import './styles/dashboard.css'
import { Container } from 'react-bootstrap'
import { Form } from "react-bootstrap";
import RandomSongsFromLiked from "./random/RandomSongsFromLiked";
import RandomSongsFromArtist from "./random/RandomSongsFromArtist";
import RandomSongsFromPlaylist from "./random/RandomSongsFromPlaylist";
const spotifyApi = new SpotifyWebApi({
    clientId: '80256b057e324c5f952f3577ff843c29',
})




function Dashboard({ code }) {
    const accessToken = UseAuth(code)
    spotifyApi.setAccessToken(accessToken)


    const [compteur, setCompteur] = useState(0)
    const [currentSong, setCurrentSong] = useState()
    const [showReponse, setShowReponse] = useState(false)
    const [randomSongArray, setRandomSongArray] = useState([])
    const [gameStart, setGameStart] = useState(false)
    const [selectedMode, setSelectedMode] = useState()
    const [selectedArtist, setSelectedArtist] = useState()
    const [selectedPlaylist, setSelectedPlaylist] = useState()


    function handleClickCommencer() {

        if (selectedMode === 'liked') {
            RandomSongsFromLiked(accessToken, randomSongArray, setRandomSongArray)
        }

        if (selectedMode === 'artist') {

            RandomSongsFromArtist(accessToken, selectedArtist.selectedArtistId, randomSongArray, setRandomSongArray)

        }

        if (selectedMode === 'playlist') {
            RandomSongsFromPlaylist(accessToken, selectedPlaylist.selectedPlaylistId, randomSongArray, setRandomSongArray)
        }


        //setCurrentSong(randomSongArray[0])
        setGameStart(true)
        //:setRandomSongArray(arr)

        //console.log('premierson', arr[0])

        //setCompteur(compteur + 1)
        //const currentSongBis = arr[0]

        //console.log('Clickarray', arr)
        //console.log('ClickarrayLength', arr.length)
        //console.log('Clickcompteur', compteur)
        //console.log('ClickcurrentSong', currentSongBis)

    }



    function handleClickNext() {
        if (compteur === randomSongArray.length) {

            alert('fin du jeu')
        }

        else {
            console.log('handleClick')
            setCompteur(compteur + 1)
            setShowReponse(false)
            setCurrentSong(randomSongArray[compteur])

        }
    }

    function handleClickReponse() {
        setShowReponse(!showReponse)
    }


    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)

        

    }, [accessToken])

    useEffect(() => {
        if (selectedMode !== "liked") {

            console.log('useeffect')
            setRandomSongArray(randomSongArray.sort(() => Math.random() - 0.5))
            var explicitCounter = 0
            var arr = randomSongArray
            const total = randomSongArray.length
            arr.map((track) => {
                if (track.explicit) {
                    explicitCounter++
                }
            })
            console.log('division', explicitCounter / total)
            if (explicitCounter / total > 0.1 && arr.length !== explicitCounter) {
                console.log('10%')
                console.log('arr.length', arr.length)
                console.log('explicitCounter', explicitCounter)
                arr = arr.filter(track => track.explicit)
            }

            setRandomSongArray(arr)


            setCurrentSong(randomSongArray[compteur])
        }
    }, [gameStart, randomSongArray])


    useEffect(()=>{
        spotifyApi.transferMyPlayback("SpotiGuess")
    .then(()=> {
      console.log('Transfering playback to SpotiGuess');
    })
    .catch((err)=>{
    console.log('Something went wrong!', err);
    }) 
    },[selectedMode])
    
    useEffect(() => {
        setCurrentSong(randomSongArray[compteur])

    }, [randomSongArray])

    //const [randomSongArray, setRandomSongArray] = useState()
    //console.log('selected',selectedArtist.selectedArtistId)



    //var randomSongArray = RandomSongsFromLiked(accessToken)


    // var randomSongArray








    console.log('randomSongArray', randomSongArray)
    console.log('compteur', compteur)
    console.log('currentSong', currentSong)
    if (selectedArtist) {
        console.log('selected artist', selectedArtist.selectedArtistId)
    }

    if (selectedPlaylist) {
        console.log('selected playlist', selectedPlaylist.selectedPlaylistId)
    }
    //console.log('mode',selectedMode)

    //partie en cours
    if (currentSong && accessToken) {
        //setCurrentSong(randomSongArray[compteur])
        console.log('songReponse', currentSong)

        return (


            <div className="dashboard-jeu">

                <a onClick={handleClickNext}>
                    <button className="btn-suivant">Suivant</button></a>

                <a onClick={handleClickReponse}>
                    <button className="btn-reponse">Afficher la réponse</button></a>


                {showReponse ?
                    <Reponse
                        accessToken={accessToken}
                        trackId={currentSong.id} /> : null}

                <a onClick={() => {
                    setCurrentSong()
                    setRandomSongArray([])
                    setCompteur(0)
                    setShowReponse(false)
                }
                }>
                    <button className="btn-retour">Retour</button></a>

                <Player
                    accessToken={accessToken}
                    trackUri={currentSong.uri} />

            </div>
        )
    }
    //Sélection du mode de jeu
    if (!selectedMode) {

        return (
            <Container>
                <div className="menu-mode">
                    <h1 className="titre-mode">Veuillez choisir votre mode de jeu.</h1>
                    <div className="btn-mode">
                        <a onClick={() => (setSelectedMode('liked'))}><button className="btn-liked">Titres Likés</button></a>
                        <a onClick={() => (setSelectedMode('playlist'))}><button className="btn-playlist">Playlist</button></a>
                        <a onClick={() => (setSelectedMode('artist'))}><button className="btn-artist">Artiste</button></a>
                    </div>
                </div>
            </Container>
        )
    }


    //Sélection artiste ou playlist sélectionné
    else {

        if (selectedMode === 'artist') {
            return (<Container>
                <div className="menu-depart">
                    <h1> Veuillez choisir l'artiste souhaité.</h1>
                    <ArtistSearchBar
                        accessToken={accessToken}
                        selectedArtist={selectedArtist}
                        setSelectedArtist={setSelectedArtist} />


                    <a onClick={handleClickCommencer}>
                        <button className="btn-commencer">Commencer la partie</button></a>

                    <a onClick={() => (setSelectedMode())}>
                        <button className="btn-retour">Retour</button></a>


                </div>
            </Container>)
        }


        if (selectedMode === 'playlist') {
            return (
                <Container>
                    <div className="menu-depart">
                        <h1> Veuillez choisir la playlist souhaitée.</h1>
                        <PlaylistSearchBar
                            accessToken={accessToken}
                            selectedPlaylist={selectedPlaylist}
                            setSelectedPlaylist={setSelectedPlaylist} />


                        <a onClick={handleClickCommencer}>
                            <button className="btn-commencer">Commencer la partie</button></a>

                        <a onClick={() => (setSelectedMode())}>
                            <button className="btn-retour">Retour</button></a>

                    </div>
                </Container>)
        }


        else {
            return (
                <Container>
                    <div className="menu-depart">

                        <a onClick={handleClickCommencer}>
                            <button className="btn-commencer">Commencer la partie</button></a>

                        <a onClick={() => (setSelectedMode())}>
                            <button className="btn-retour">Retour</button></a>

                    </div>
                </Container>)
        }



    }
}





export default Dashboard