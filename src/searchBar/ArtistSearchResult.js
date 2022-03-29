import React from "react";
import { Container } from "react-bootstrap";

export default function ArtistSearchResult({ artistName, artistId, selectedArtist, setSelectedArtist }) {

    function handleChoice() {
        if (selectedArtist) {
            if (selectedArtist.selectedArtistId === artistId) {
                setSelectedArtist()
            }
            else {
                setSelectedArtist(
                    {
                        selectedArtistName: artistName,
                        selectedArtistId: artistId
                    }
                )
            }
        }
        else{
            setSelectedArtist(
                {
                    selectedArtistName: artistName,
                    selectedArtistId: artistId
                })
        }
    }



    if (selectedArtist) {
        if (selectedArtist.selectedArtistId === artistId) {
            return (
                <div className="d-flex my-3 align-items-center"
                    style={{ cursor: 'pointer' }}
                    onClick={handleChoice}>

                    <div key={artistId} className="white" style={{ fontWeight: "bold" }}> {artistName}</div>

                </div>
            )

        }

        else {
            return (
                <div className="d-flex my-3 align-items-center"
                    style={{ cursor: 'pointer' }}
                    onClick={handleChoice}>

                    <div key={artistId} className="white" > {artistName}</div>

                </div>

            )
        }
    }

    else {



        return (
            <div className="d-flex my-3 align-items-center"
                style={{ cursor: 'pointer' }}
                onClick={handleChoice}>

                <div key={artistId} className="white" > {artistName}</div>

            </div>

        )
    }
}