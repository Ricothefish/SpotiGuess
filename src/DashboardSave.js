import React, { useEffect, useState } from "react";
import UseAuth from "./UseAuth";
import RandomSongs from "./RandomSongs";
import TrackSearchResult from "./TrackSearchResult";
import SearchBar from "./SearchBar";
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from "spotify-web-api-node"

const spotifyApi = new SpotifyWebApi({
    clientId: '80256b057e324c5f952f3577ff843c29',
})




function Dashboard({ code }) {
    const accessToken = UseAuth(code)
    spotifyApi.setAccessToken(accessToken)
    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])



    const randomSongArray = RandomSongs(accessToken, 5)
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    console.log(searchResult)


    useEffect(() => {
        if (!search) return setSearchResult([])
        if (!accessToken) return

        let cancel = false
        spotifyApi.searchTracks(search, { limit: 3 })
            .then((data) => {
                if (cancel) return
                setSearchResult(
                    data.body.tracks.items.map(track => {
                        return {
                            artist: track.artists[0].name,
                            title: track.name,
                            id: track.id

                        }
                    }))
            })
            .catch((e) => {
                console.log(e)
            })
        return () => cancel = true
    }, [search, accessToken])


    return (<Container className="">
        <Form.Control
            type="search"
            placeholder="Rechercher Titres/Artistes"
            value={search}
            onChange={e => setSearch(e.target.value)} />

        <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>

            {searchResult.map(track => (
                <TrackSearchResult track={track} id={track.id} />
            ))}
        </div>

        //<SearchBar/>

    </Container>)


}



/*<ul>

        {randomSongArray.length === 5 ? (
            randomSongArray.map((track, i) => <li key={i}>{track.track.name}</li>)
        ) : (
            null
        )}
    </ul>*/

export default Dashboard