import React from "react";
import './styles/reponse.css'

function Reponse({currentSong}){

    console.log('reponse',currentSong)
    console.log('titre',currentSong.track.name)
    console.log('artiste',currentSong.track.artists[0].name)
    console.log('album',currentSong.track.album.name)

return(<div className="reponse">
    
    <h2>Réponse:</h2>
            <h3>Titre: {currentSong.track.name}</h3>
            <h3>Album: {currentSong.track.album.name}</h3>
            <h3>Artiste: {currentSong.track.artists[0].name}</h3>
            
            <img className="cover" src={currentSong.track.album.images[1].url}/>



</div>)
}

export default Reponse