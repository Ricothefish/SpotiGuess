import React, { useEffect, useState } from "react";
import UseAuth from "./UseAuth";
import RandomSongs from "./RandomSongs";
import Reponse from "./Reponse";
import SpotifyWebApi from "spotify-web-api-node"
import Player from "./Player";
import './styles/dashboard.css'
const spotifyApi = new SpotifyWebApi({
    clientId: '80256b057e324c5f952f3577ff843c29',
})

var nextSongTrigger = false

function Dashboard({ code }) {
    const accessToken = UseAuth(code)
    spotifyApi.setAccessToken(accessToken)


    function handleClickNext() {
        if (compteur == 15) {
            
            alert('fin du jeu')
        }
        else {
            console.log('handleClick')
            setCompteur(compteur + 1)
            setCurrentSong(randomSongArray[compteur])
            setShowReponse(false)

        }
    }

    function handleClickReponse() {
        setShowReponse(!showReponse)
    }




    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])



    var randomSongArray = RandomSongs(accessToken, 15)

    const [compteur, setCompteur] = useState(0)
    const [currentSong, setCurrentSong] = useState()
    const [showReponse,setShowReponse] = useState(false)






    return (




        <div > {currentSong ?
            <div className="dashboard-jeu">

                <a onClick={handleClickNext}>
                    <button className="btn-suivant">Suivant</button></a>

                <a onClick={handleClickReponse}>
                    <button className="btn-reponse">Afficher la réponse</button></a>


                {showReponse? <Reponse currentSong={currentSong} /> : null}

                <Player
                    accessToken={accessToken}
                    trackUri={currentSong.track.uri} />

            </div>


            :
            <div className="menu-depart">
            <a onClick={handleClickNext}>
                <button className="btn-commencer">Commencer la partie</button></a>
                
                </div>
        }

        </div>


    )


}



/*<ul>

 



        {randomSongArray.length === 5 ? (
            randomSongArray.map((track, i) => <li key={i}>{track.track.name}</li>)
        ) : (
            null
        )}
    </ul>*/

export default Dashboard