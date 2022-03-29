import React, { useEffect, useState } from "react";
import PlaylistSearchResult from "./PlaylistSearchResult.js"
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from "spotify-web-api-node"

const spotifyApi = new SpotifyWebApi({
    clientId: '80256b057e324c5f952f3577ff843c29',
})


export default function PlaylistSearchBar({ accessToken, selectedPlaylist, setSelectedPlaylist}) {

    spotifyApi.setAccessToken(accessToken)

    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])


    useEffect(() => {
        if (!search) return setSearchResult([])
        if (!accessToken) return

        let cancel = false
        spotifyApi.searchPlaylists(search, { limit: 3 })
            .then((data) => {
                console.log('searchResult', searchResult)
                if (cancel) return
                setSearchResult(
                    data.body.playlists.items.map(playlist => {
                        return {
                            playlistName: playlist.name,
                            playlistId: playlist.id
                        }
                    }))
                console.log('searchResult', searchResult)
            })
            .catch((e) => {
                
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

                {searchResult.map(playlist => (
                    <PlaylistSearchResult
                    playlistName={playlist.playlistName}
                    playlistId={playlist.playlistId}
                    selectedPlaylist = {selectedPlaylist}
                    setSelectedPlaylist = {setSelectedPlaylist}
                    />
                ))}
            </div>
        </Container>

    )
}