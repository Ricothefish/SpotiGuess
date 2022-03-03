import React from "react";
import { Container } from "react-bootstrap";

export default function TrackSearchResult({ track, currentSong }) {
    
    function handleChoice(){


        if(track.title === currentSong.track.name && track.artist === currentSong.track.artists[0].name){
            alert("Bonne réponse")
        }
        else{
            alert("Mauvaise réponse")
        }
        
    }
    
    return (
    <div className="d-flex my-3 align-items-center" 
    style={{cursor: 'pointer'}}
    onClick= {handleChoice}>
        
        <div>{track.title}</div>
        <div> - </div>
        <div className="text-muted"> {track.artist}</div>

    </div>
    
    )
}