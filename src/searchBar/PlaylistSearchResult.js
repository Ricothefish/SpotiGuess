import React from "react";
import { Container } from "react-bootstrap";

export default function PlaylistSearchResult({ playlistName, playlistId , selectedPlaylist, setSelectedPlaylist}) {
    
    function handleChoice(){
        if (selectedPlaylist) {
            if (selectedPlaylist.selectedPlaylistId === playlistId) {
                setSelectedPlaylist()
            }
            else {
                setSelectedPlaylist(
                    {
                        selectedPlaylistName: playlistName,
                        selectedPlaylistId: playlistId
                    }
                )
            }
        }
        else{
            setSelectedPlaylist(
                {
                    selectedPlaylistName: playlistName,
                    selectedPlaylistId: playlistId
                }
            )
        }
    }
    

    if(selectedPlaylist){
        if(selectedPlaylist.selectedPlaylistId === playlistId){
            return (
                <div className="d-flex my-3 align-items-center" 
                style={{cursor: 'pointer'}}
                onClick= {handleChoice}>
            
                    <div key={playlistId} className="white" style= {{fontWeight: "bold"}}> {playlistName}</div>
            
                </div>
            )
            
        }

        else{
            return (
                <div className="d-flex my-3 align-items-center" 
                style={{cursor: 'pointer'}}
                onClick= {handleChoice}>
            
                    <div key={playlistId} className="white" > {playlistName}</div>
            
                </div>
                
                )
        }
    }

    else{



    return (
    <div className="d-flex my-3 align-items-center" 
    style={{cursor: 'pointer'}}
    onClick= {handleChoice}>

        <div key={playlistId} className="white" > {playlistName}</div>

    </div>
    
    )
    }
}