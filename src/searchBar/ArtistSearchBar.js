import React, { useEffect, useState } from "react";
import ArtistSearchResult from "./ArtistSearchResult.js";
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from "spotify-web-api-node"

const spotifyApi = new SpotifyWebApi({
    clientId: '80256b057e324c5f952f3577ff843c29',
})


export default function ArtistSearchBar({ accessToken, selectedArtist, setSelectedArtist}) {

    spotifyApi.setAccessToken(accessToken)

    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])


    useEffect(() => {
        if (!search) return setSearchResult([])
        if (!accessToken) return

        let cancel = false
        spotifyApi.searchArtists(search, { limit: 3 })
            .then((data) => {
                if (cancel) return
                setSearchResult(
                    data.body.artists.items.map(artist => {
                        return {
                            artistName: artist.name,
                            artistId: artist.id
                        }
                    }))
            })
            .catch((e) => {
                console.log('accessToken erreur', accessToken)
                console.log(e)
            })
        return () => cancel = true
    }, [search, accessToken])

    
    return (
        <Container className="">
            <Form.Control
                type="search"
                placeholder="Rechercher Titres/Artistes"
                value={search}
                onChange={e => setSearch(e.target.value)} />

            <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>

                {searchResult.map(artist => (
                    <ArtistSearchResult 
                    artistName={artist.artistName}
                    artistId={artist.artistId}
                    selectedArtist = {selectedArtist}
                    setSelectedArtist = {setSelectedArtist}
                    />
                ))}
            </div>
        </Container>

    )
}